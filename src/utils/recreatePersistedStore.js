import localForage from 'localforage'
import { navigate } from '@reach/router'
import fb from 'firebase/app'
import 'firebase/auth'
import persist from 'mst-persist'

import getAuthToken from './getAuthToken'
import queryAllData from './queryAllData'

// Configure Firebase
const firebaseConfig = {
  apiKey: process.env.GATSBY_FIREBASE_API_KEY,
  authDomain: process.env.GATSBY_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.GATSBY_FIREBASE_PROJECT_ID,
  appId: process.env.GATSBY_FIREBASE_APP_ID,
}

export default async ({ store }) => {
  let unregisterAuthObserver = () => {}
  const { setUser, setGettingAuthUser, setFirebase } = store
  window.store = store
  // need to blacklist authorizing or mst-persist will set it to false
  // and login form appears for a short moment until auth state changed
  const blacklist = [
    'authorizing',
    'user',
    'gqlHttpClient',
    'gqlWsClient',
    'initialDataQueried',
    'gettingAuthUser',
    'online',
    'errors',
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
    setTimeout(async () => {
      if (store.online) {
        await getAuthToken({ store })
        queryAllData({ store })
      }
      setGettingAuthUser(false)
    })
  })
  return unregisterAuthObserver
}
