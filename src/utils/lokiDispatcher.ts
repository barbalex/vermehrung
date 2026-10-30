// ESM replacement for nitromelondb's adapters/lokijs/dispatcher.js,
// swapped in via the vite plugin (see vite.config.ts). The original
// requires the worker module with webpack worker-loader semantics
// (`new (require('./worker/loki.worker'))()`), which no bundler provides.
// This dispatcher talks to a real dedicated worker (lokiWebWorker.ts)
// using the same { id, type, payload } / { id, result } protocol as
// nitromelondb's DatabaseBridge.
import LokiWebWorker from './lokiWebWorker.ts'

interface WorkerAction {
  id: number
  type: string
  payload: unknown[]
}

let actionId = 0

export default class LokiDispatcher {
  // named like the original so the adapter's debug-only `_driver` getter
  // keeps finding it
  _worker: LokiWebWorker

  _pendingCalls: {
    callback: (result: unknown) => void
    id: number
  }[] = []

  constructor() {
    this._worker = new LokiWebWorker()
    this._worker.onmessage = ({ data }) => {
      const { result, id: responseId } = data as { result: unknown; id: number }
      const pending = this._pendingCalls.shift()
      if (!pending) return
      if (pending.id !== responseId) {
        pending.callback({
          error: new Error('Loki worker responses are out of order'),
        })
        return
      }
      pending.callback(result)
    }
  }

  call(
    type: string,
    payload: unknown[] = [],
    callback: (result: unknown) => void = () => undefined,
  ) {
    const action: WorkerAction = { id: (actionId += 1), type, payload }
    this._pendingCalls.push({ callback, id: action.id })
    this._worker.postMessage(action)
  }
}
