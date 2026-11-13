import { constants } from './constants.ts'

// fetch-based SSE subscription to the auth service /events endpoint.
// EventSource cannot send the Authorization header, so the stream is
// read manually. Signals are only a 'fetch deltas now' hint - the data
// itself always comes from the /rpc/sync poll, so a missed, duplicated
// or spoofed signal is harmless. Reconnects with backoff; while
// disconnected the syncPoller falls back to its interval polling.
// The token is re-read on every (re)connect: a 401 from a stale token
// simply retries later, after getAuthToken has stored a fresh one.

const RETRY_MS = 1000
const MAX_RETRY_MS = 30000

let stopped = true
let connected = false
let controller: AbortController | null = null
let retryMs = RETRY_MS

export const syncEventsConnected = () => connected

const sleep = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms))

const run = async (
  onSignal: () => void,
  onStateChange: () => void,
): Promise<void> => {
  while (!stopped) {
    try {
      const token = window.localStorage.getItem('token')
      controller = new AbortController()
      const res = await fetch(`${constants.getAuthUri()}/events`, {
        headers: token ? { authorization: `Bearer ${token}` } : {},
        signal: controller.signal,
      })
      // the fetch may resolve after stopSyncEvents aborted a previous
      // attempt - never mark connected once stopped
      if (stopped) break
      if (!res.ok || !res.body) throw new Error(`status ${res.status}`)
      connected = true
      retryMs = RETRY_MS
      onStateChange()
      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''
      for (;;) {
        const { done, value } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })
        // events are separated by a blank line; ': ...' heartbeat
        // comments are skipped by matching on the event name only
        let separator = buffer.indexOf('\n\n')
        while (separator >= 0) {
          const chunk = buffer.slice(0, separator)
          buffer = buffer.slice(separator + 2)
          if (chunk.startsWith('event: changed')) onSignal()
          separator = buffer.indexOf('\n\n')
        }
      }
    } catch {
      // aborted via stopSyncEvents or the connection was lost: reconnect
    }
    if (connected) {
      connected = false
      onStateChange()
    }
    if (stopped) break
    await sleep(retryMs)
    retryMs = Math.min(retryMs * 2, MAX_RETRY_MS)
  }
}

export const startSyncEvents = (
  onSignal: () => void,
  onStateChange: () => void,
) => {
  if (!stopped) return
  stopped = false
  retryMs = RETRY_MS
  void run(onSignal, onStateChange)
}

export const stopSyncEvents = () => {
  stopped = true
  controller?.abort()
  controller = null
}
