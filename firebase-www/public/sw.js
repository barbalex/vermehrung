// kill switch replacing the app's old service worker on www.vermehrung.ch
// (the domain was consolidated into https://vermehrung.ch). Browsers
// holding the old worker can never update it: its script request now
// follows the origin's 301 redirect, which service worker script fetches
// are not allowed to do. This file is therefore served unredirected at
// the old script url - the stale worker updates to it, wipes the www
// caches and unregisters itself, and the next navigation follows the
// redirect to the canonical origin.
self.addEventListener('install', () => {
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const cacheKeys = await caches.keys()
      await Promise.all(cacheKeys.map((key) => caches.delete(key)))
      await self.registration.unregister()
    })(),
  )
})
