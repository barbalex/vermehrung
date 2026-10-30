// nitromelondb's LokiJS web-worker mode expects webpack's worker-loader
// semantics: `new (require('./worker/loki.worker'))()`. No bundler provides
// that, so the vite plugin (vite.config.ts) redirects the dispatcher's
// require to this module. Instances behave like a Worker: they run
// lokiWorkerEntry.ts in a real dedicated worker.
interface DispatcherMessage {
  id: number
  type: string
  payload: unknown[]
  cloneMethod?: string
  returnCloneMethod?: string
}

// Callbacks cannot cross the structured clone boundary of postMessage.
// Only the setUp action carries options with callbacks
// (onQuotaExceededError, onSetUpError). The worker invokes them optionally,
// so removing them is safe. onSetUpError keeps working: LokiJSAdapter
// itself calls it on the main thread with the setUp result.
const scrubCallbacks = (message: DispatcherMessage): DispatcherMessage => {
  const [options, ...rest] = message.payload
  if (options && typeof options === 'object' && !Array.isArray(options)) {
    const scrubbed = { ...options } as Record<string, unknown>
    for (const key of Object.keys(scrubbed)) {
      if (typeof scrubbed[key] === 'function') {
        console.warn(
          `loki worker: the ${key} callback does not run inside the worker`,
        )
        delete scrubbed[key]
      }
    }
    return { ...message, payload: [scrubbed, ...rest] }
  }
  return message
}

export default class LokiWebWorker {
  worker: Worker

  onmessage: ((event: MessageEvent) => void) | null = null

  constructor() {
    // in dev, the worker loads the entry from the dev server, which serves
    // it (and its optimized dependencies) as a module; in the build, Vite
    // replaces the new URL pattern with the emitted worker chunk
    this.worker = import.meta.env.DEV
      ? new Worker('/src/utils/lokiWorkerEntry.ts', { type: 'module' })
      : new Worker(new URL('./lokiWorkerEntry.ts', import.meta.url), {
          type: 'module',
        })
    this.worker.onmessage = (event) => this.onmessage?.(event)
  }

  postMessage(message: DispatcherMessage) {
    this.worker.postMessage(scrubCallbacks(message))
  }
}
