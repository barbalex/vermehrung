import localForage from 'localforage'
import { navigate } from '@reach/router'
import fb from 'firebase/app'
import 'firebase/auth'
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
  let unregisterAuthObserver = () => {}
  const {
    setUser,
    setGettingAuthUser,
    setFirebase,
    online,
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
  fb.initializeApp(firebaseConfig)
  setFirebase(fb)
  unregisterAuthObserver = fb.auth().onAuthStateChanged(async (user) => {
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
      await getAuthToken({ store })
    }
    setGettingAuthUser(false)
  })
  return unregisterAuthObserver
}

export default recreatePersistedStore
