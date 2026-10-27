import {
  store,
  apiClientAtom,
  authorizingAtom,
  lastUpdatedAtom,
  onlineAtom,
  setOnline,
  setShortTermOnline,
  tables,
  userAtom,
} from '../store/index.js'
import { getAuthToken } from './getAuthToken.js'
import { processSubscriptionResult } from './processSubscriptionResult.js'

// replaces the 28 graphql live subscriptions: polls the /rpc/sync
// endpoint, which returns the rows changed per table since the
// per-table cursors (lastUpdated, epoch seconds).
// doubles as the server-online check: a successful poll means online.

const POLL_INTERVAL_MS = 5000
const MAX_BACKOFF_MS = 60000
// rows committed while a sync was running must not be missed: continue
// from slightly before the server watermark the sync reported
const WATERMARK_SAFETY_S = 5

let timer = null
let polling = false
let stopped = true
let backoffMs = 0

const scheduleNext = (delay) => {
  if (!timer) timer = setTimeout(poll, delay)
}

const poll = async () => {
  timer = null
  if (stopped || polling) return

  if (!store.get(userAtom)?.uid || store.get(authorizingAtom)) {
    return scheduleNext(POLL_INTERVAL_MS)
  }

  polling = true
  try {
    const since = store.get(lastUpdatedAtom)
    const result = await store
      .get(apiClientAtom)
      .post('/rpc/sync', since)
    // reaching the api means we are online
    if (!store.get(onlineAtom)) setOnline(true)
    setShortTermOnline(true)
    backoffMs = 0
    const watermark = result.synced_at - WATERMARK_SAFETY_S
    for (const table of tables) {
      await processSubscriptionResult({
        data: result[table] ?? [],
        table,
        lastUpdatedValue: watermark,
      })
    }
  } catch (error) {
    console.log('sync poll failed:', error)
    if (error.status === 401) {
      // stale token: get a fresh one, then poll again soon
      await getAuthToken()
      backoffMs = POLL_INTERVAL_MS
    } else {
      setShortTermOnline(false)
      backoffMs = Math.min(backoffMs ? backoffMs * 2 : 10000, MAX_BACKOFF_MS)
    }
  } finally {
    polling = false
    if (!stopped) scheduleNext(backoffMs || POLL_INTERVAL_MS)
  }
}

export const startSyncPoller = () => {
  if (!stopped) return
  stopped = false
  scheduleNext(0)
}

export const stopSyncPoller = () => {
  stopped = true
  clearTimeout(timer)
  timer = null
}

// called after the queue drained a mutation: the rev triggers recompute
// winning revisions and conflicts server-side, fetch them promptly
export const requestSyncSoon = () => {
  if (stopped || polling) return
  clearTimeout(timer)
  timer = null
  scheduleNext(200)
}
