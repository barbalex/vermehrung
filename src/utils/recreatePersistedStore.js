import localForage from 'localforage'
import { navigate } from '@reach/router'
import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import persist from 'mst-persist'

import getAuthToken from './getAuthToken'
import isOnline from './isOnline'

// Configure Firebase
const firebaseConfig = {
  apiKey: process.env.GATSBY_FIREBASE_API_KEY,
  authDomain: process.env.GATSBY_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.GATSBY_FIREBASE_PROJECT_ID,
  appId: process.env.GATSBY_FIREBASE_APP_ID,
}

const recreatePersistedStore = async ({ store }) => {
  console.log('recreatePersistedStore running')
  let unregisterAuthObserver = () => {}
  const {
    setUser,
    setGettingAuthUser,
    online,
    setFirebaseAuth,
    setOnline,
    shortTermOnline,
    setShortTermOnline,
  } = store
  window.store = store
  // need to blacklist authorizing or mst-persist will set it to false
  // and login form appears for a short moment until auth state changed
  const blacklist = [
    'authorizing',
    'user',
    'gqlWsClient',
    'gettingAuthUser',
    'online',
    'shortTermOnline',
    'errors',
    'ae_art_initially_queried',
    'art_initially_queried',
    'art_file_initially_queried',
    'art_qk_initially_queried',
    'av_initially_queried',
    'event_initially_queried',
    'garten_initially_queried',
    'garten_file_initially_queried',
    'gv_initially_queried',
    'herkunft_initially_queried',
    'herkunft_file_initially_queried',
    'kultur_initially_queried',
    'kultur_file_initially_queried',
    'kultur_option_initially_queried',
    'kultur_qk_initially_queried',
    'lieferung_initially_queried',
    'lieferung_file_initially_queried',
    'person_initially_queried',
    'person_file_initially_queried',
    'person_option_initially_queried',
    'sammel_lieferung_initially_queried',
    'sammlung_initially_queried',
    'sammlung_file_initially_queried',
    'teilkultur_initially_queried',
    'teilzaehlung_initially_queried',
    'user_role_initially_queried',
    'zaehlung_initially_queried',
  ]
  await persist('store', store, {
    storage: localForage,
    jsonify: false,
    blacklist,
  })
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
  unregisterAuthObserver = onAuthStateChanged(auth, async (user) => {
    // BEWARE: this is called at least twice
    // https://stackoverflow.com/questions/37673616/firebase-android-onauthstatechanged-called-twice
    if (store.user?.uid) return
    setUser(user)
    // set last activeNodeArray
    // only if top domain was visited
    // TODO:
    // without timeout and with timeout too low this errors before page Vermehrung logs
    const visitedTopDomain = window.location.pathname === '/'
    if (!!user && visitedTopDomain) {
      setTimeout(() => {
        navigate(`/Vermehrung/${store.tree.activeNodeArray.join('/')}`)
      }, 200)
    }
    const nowOnline = await isOnline()
    if (nowOnline !== online) setOnline(nowOnline)
    if (nowOnline !== shortTermOnline) setShortTermOnline(nowOnline)
    if (nowOnline) {
      console.log('recreatePersistedStore getting auth token')
      await getAuthToken({ store })
    }
    setGettingAuthUser(false)
  })
  return unregisterAuthObserver
}

export default recreatePersistedStore
