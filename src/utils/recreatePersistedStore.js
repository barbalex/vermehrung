import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

import {
  store,
  hydratePersistedAtoms,
  setUser,
  setGettingAuthUser,
  setFirebaseAuth,
  setOnline,
  setShortTermOnline,
  getNavigate,
  onlineAtom,
  shortTermOnlineAtom,
  userAtom,
  activeNodeArrayAtom,
} from '../store/index.js'
import { getAuthToken } from './getAuthToken.js'
import { isOnline } from './isOnline.js'

// Configure Firebase
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

export const recreatePersistedStore = async () => {
  window.store = store
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
    setUser(user)
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
    }
    setGettingAuthUser(false)
  })
  return unregisterAuthObserver
}
