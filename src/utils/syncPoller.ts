import {
  store,
  apiClientAtom,
  authorizingAtom,
  initiallyQueriedAtom,
  lastUpdatedAtom,
  onlineAtom,
  setOnline,
  setShortTermOnline,
  tables,
  userAtom,
} from '../store/index.ts'
import { getAuthToken } from './getAuthToken.ts'
import { processSubscriptionResult } from './processSubscriptionResult.ts'
import {
  startSyncEvents,
  stopSyncEvents,
  syncEventsConnected,
} from './syncEvents.ts'
import { ApiError, type Row, type SyncResult } from './apiTypes.ts'

// polls the /rpc/sync endpoint, which returns the rows changed per table
// since the per-table cursors (lastUpdated, epoch seconds).
// While the SSE /events stream is connected, a poll only runs as the
// fallback (the stream signals changes within ~200ms) and when the tab
// becomes visible again. Also doubles as the server-online check: a
// successful poll means online.

// fallback interval while no SSE stream is connected
const POLL_INTERVAL_MS = 5000
// with a live change signal there is no need to poll frequently - this
// only catches what the stream missed (e.g. ae_art, foreign-table
// changes that fire no local trigger)
const SSE_POLL_INTERVAL_MS = 60000
const MAX_BACKOFF_MS = 60000
// rows committed while a sync was running must not be missed: continue
// from slightly before the server watermark the sync reported
const WATERMARK_SAFETY_S = 5

let timer: ReturnType<typeof setTimeout> | null = null
let polling = false
let stopped = true
let backoffMs = 0
// a change signal that arrived while a poll was running must trigger
// the next poll immediately instead of waiting for the interval
let syncAgainAfterPoll = false

const nextDelay = () =>
  syncEventsConnected() ? SSE_POLL_INTERVAL_MS : POLL_INTERVAL_MS

const scheduleNext = (delay: number) => {
  if (!timer) timer = setTimeout(poll, delay)
}

const poll = async () => {
  timer = null
  if (stopped || polling) return

  const apiClient = store.get(apiClientAtom)
  if (!apiClient || !store.get(userAtom)?.uid || store.get(authorizingAtom)) {
    return scheduleNext(nextDelay())
  }

  polling = true
  try {
    // initial sync: one table per request. A single >10k-row table dump
    // then stays within the request timeout, and every completed table
    // keeps its cursor - a failure resumes at the pending tables
    // instead of restarting the whole import
    const pendingTables = tables.filter(
      (table) => !store.get(initiallyQueriedAtom)[table],
    )
    const requests =
      pendingTables.length > 0 ?
        pendingTables.map((table) => ({
          tables: [table] as const,
          // full cursor map in every request: p_tables limits the
          // result, the server reads only the requested table's cursor
          body: {
            p_since: store.get(lastUpdatedAtom),
            p_tables: [table],
          },
        }))
      : [
          {
            tables,
            body: { p_since: store.get(lastUpdatedAtom) },
          },
        ]
    for (const request of requests) {
      const result = await apiClient.post<SyncResult>('/rpc/sync', request.body)
      // reaching the api means we are online
      if (!store.get(onlineAtom)) setOnline(true)
      setShortTermOnline(true)
      backoffMs = 0
      const watermark = result.synced_at - WATERMARK_SAFETY_S
      for (const table of request.tables) {
        await processSubscriptionResult({
          data: (result[table] ?? []) as unknown as Row[],
          table,
          lastUpdatedValue: watermark,
        })
      }
    }
  } catch (error) {
    console.log('sync poll failed:', error)
    if ((error as ApiError).status === 401) {
      // stale token: get a fresh one, then poll again soon
      await getAuthToken()
      backoffMs = POLL_INTERVAL_MS
    } else {
      setShortTermOnline(false)
      backoffMs = Math.min(backoffMs ? backoffMs * 2 : 10000, MAX_BACKOFF_MS)
    }
  } finally {
    polling = false
    if (!stopped) {
      const delay = syncAgainAfterPoll ? 200 : backoffMs || nextDelay()
      scheduleNext(delay)
      syncAgainAfterPoll = false
    }
  }
}

export const startSyncPoller = () => {
  if (!stopped) return
  stopped = false
  document.addEventListener('visibilitychange', onVisible)
  // a change signal fetches deltas promptly (~200ms debounce); on
  // (re)connect it also covers signals missed while disconnected
  startSyncEvents(requestSyncSoon, onEventsStateChanged)
  scheduleNext(0)
}

export const stopSyncPoller = () => {
  stopped = true
  if (timer) clearTimeout(timer)
  timer = null
  document.removeEventListener('visibilitychange', onVisible)
  stopSyncEvents()
}

const onVisible = () => {
  // the os may have killed the stream while the tab was hidden
  if (!document.hidden) requestSyncSoon()
}

const onEventsStateChanged = () => {
  if (syncEventsConnected()) requestSyncSoon()
}

// called after the queue drained a mutation: the rev triggers recompute
// winning revisions and conflicts server-side, fetch them promptly.
// Also the handler for SSE change signals. A signal during a running
// poll is not lost: the next poll runs immediately after.
export const requestSyncSoon = () => {
  if (stopped) return
  if (polling) {
    syncAgainAfterPoll = true
    return
  }
  if (timer) clearTimeout(timer)
  timer = null
  scheduleNext(200)
}
