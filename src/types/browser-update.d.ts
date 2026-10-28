declare module 'browser-update' {
  interface BrowserUpdateOptions {
    required?: Record<string, number>
    insecure?: boolean
    unsupported?: boolean
    text?: Record<string, unknown>
    [key: string]: unknown
  }
  function browserUpdate(options: BrowserUpdateOptions): void
  export default browserUpdate
}
