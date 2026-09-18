// fetch with a timeout. Without it a stalled connection (e.g. a server
// closing an idle keep-alive socket right when it is reused) hangs requests
// until the browser's TCP timeout kicks in - blocking boots for ~45s
// or even forever
export const fetchWithTimeout = (url, options = {}, timeoutMs = 10000) => {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs)
  return fetch(url, { ...options, signal: controller.signal }).finally(() => {
    clearTimeout(timeoutId)
  })
}
