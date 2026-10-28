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
