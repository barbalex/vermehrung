// A deploy replaces the running bundle's hashed assets under the same
// url: a lazy import() from a session that predates the deploy (or caught
// its cutover) fails to preload its chunk css, and Vite's preload helper
// throws "Unable to preload CSS for /assets/…". The same failure occurs
// transiently when the network blips before a service worker controls the
// page (first visit, fresh after the www kill switch). Vite dispatches
// 'vite:preloadError' before throwing; this handler reloads, which picks
// up the current index.html and its asset hashes. The service-worker
// precache is deliberately left in place: it is the offline lifeline of
// this local-first app (dropping it while offline leaves nothing to boot
// from), and the autoUpdate worker self-heals version cutovers by
// re-precacheing after the next online load. Attempts are capped so a
// persistently broken state cannot trap the app in a reload loop.

const KEY = 'vermehrung:preload-recovery'
const MAX_ATTEMPTS = 3
// a healthy load never clears the counter (nothing knows it succeeded);
// instead the window expires it — a later incident starts fresh
const WINDOW_MS = 5 * 60 * 1000

interface Recovery {
  attempts: number
  startedAt: number
}

const readRecovery = (): Recovery => {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return { attempts: 0, startedAt: 0 }
    const parsed = JSON.parse(raw) as Partial<Recovery>
    if (
      typeof parsed.attempts !== 'number' ||
      typeof parsed.startedAt !== 'number'
    ) {
      return { attempts: 0, startedAt: 0 }
    }
    return {
      attempts: parsed.attempts,
      startedAt: parsed.startedAt,
    }
  } catch {
    return { attempts: 0, startedAt: 0 }
  }
}

const recover = () => {
  const { attempts, startedAt } = readRecovery()
  const fresh = attempts === 0 || Date.now() - startedAt > WINDOW_MS
  if (!fresh && attempts >= MAX_ATTEMPTS) return
  localStorage.setItem(
    KEY,
    JSON.stringify({
      attempts: fresh ? 1 : attempts + 1,
      startedAt: fresh ? Date.now() : startedAt,
    }),
  )
  window.location.reload()
}

export const installPreloadErrorRecovery = () => {
  // the preload helper still throws after the event (unless prevented):
  // on purpose — the error stays visible in the error telemetry while the
  // reload races it (reportError's fetch is keepalive, it survives)
  window.addEventListener('vite:preloadError', () => {
    recover()
  })
}
