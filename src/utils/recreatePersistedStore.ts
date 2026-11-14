import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

import {
  store,
  hydratePersistedAtoms,
  setUser,
  setAuthorizing,
  setGettingAuthUser,
  setFirebaseAuth,
  setOnline,
  setShortTermOnline,
  getNavigate,
  onlineAtom,
  shortTermOnlineAtom,
  userAtom,
  activeNodeArrayAtom,
} from '../store/index.ts'
import { getAuthToken } from './getAuthToken.ts'
import { isOnline } from './isOnline.ts'

// Configure Firebase
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

export const recreatePersistedStore = async () => {
  ;(window as unknown as Record<string, unknown>).store = store
  // hydration runs in parallel to app boot: persisted state appears
  // shortly after boot, a slow/blocked storage must not block booting
  hydratePersistedAtoms()
  // DEV ONLY — role sessions without Firebase (scripts/dev-token.mjs):
  // the script mints an api JWT for a person of the chosen role against
  // the local backend and opens the app with ?devToken=<jwt>. Boot
  // straight into that role: no Firebase sign-in, no /token exchange.
  // The claims' sub carries the person's account_id because the role
  // lookup in SubscriptionsInitializer matches person.account_id against
  // the user uid. Stripped from the url so navigation drops it.
  if (import.meta.env.DEV) {
    const devToken = new URLSearchParams(window.location.search).get('devToken')
    if (devToken) {
      try {
        const payload = devToken.split('.')[1] ?? ''
        const claims = JSON.parse(
          atob(payload.replace(/-/g, '+').replace(/_/g, '/')),
        ) as { sub?: string }
        window.localStorage.setItem('token', devToken)
        // flag for getAuthToken: no firebase user to exchange, see there
        window.localStorage.setItem('devToken', '1')
        window.history.replaceState({}, '', window.location.pathname)
        setUser({ uid: claims.sub, email: 'dev@localhost' })
        setAuthorizing(false)
        setGettingAuthUser(false)
        // nothing was registered to unregister
        return () => undefined
      } catch {
        // malformed devToken: fall through to the regular login
      }
    }
  }
  let fbApp
  // catch app already existing
  // https://stackoverflow.com/a/48686803/712005
  if (!getApps().length) {
    fbApp = initializeApp(firebaseConfig)
  } else {
    fbApp = getApp() // if already initialized, use that one
  }
  const auth = getAuth(fbApp)
  setFirebaseAuth(auth)
  const unregisterAuthObserver = onAuthStateChanged(auth, async (user) => {
    // BEWARE: this is called at least twice
    // https://stackoverflow.com/questions/37673616/firebase-android-onauthstatechanged-called-twice
    if (store.get(userAtom)?.uid) return
    setUser(user as unknown as import('../store/index.ts').User)
    // set last activeNodeArray
    // only if top domain was visited
    // TODO:
    // without timeout and with timeout too low this errors before page Vermehrung logs
    const visitedTopDomain = window.location.pathname === '/'
    if (!!user && visitedTopDomain && getNavigate()) {
      setTimeout(() => {
        getNavigate()?.(
          `/Vermehrung/${store.get(activeNodeArrayAtom).join('/')}`,
        )
      }, 200)
    }
    const nowOnline = await isOnline()
    if (nowOnline !== store.get(onlineAtom)) setOnline(nowOnline)
    if (nowOnline !== store.get(shortTermOnlineAtom))
      setShortTermOnline(nowOnline)
    if (nowOnline) {
      // console.log('recreatePersistedStore getting auth token')
      await getAuthToken()
    } else {
      // booting offline: unblock the app so it works locally off the
      // cached data. the role lookup in SubscriptionsInitializer keeps
      // retrying and starts syncing once connectivity is back
      setAuthorizing(false)
    }
    setGettingAuthUser(false)
  })
  // recover when connectivity returns: fetch an auth token (it retries
  // with backoff), which flips authorizing and restarts the sync poller
  // and the offline queue
  window.addEventListener('online', () => {
    setOnline(true)
    setShortTermOnline(true)
    if (!store.get(userAtom)?.uid) return
    getAuthToken()
  })
  window.addEventListener('offline', () => {
    setOnline(false)
    setShortTermOnline(false)
  })
  return unregisterAuthObserver
}
