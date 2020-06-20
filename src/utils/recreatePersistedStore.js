import localForage from 'localforage'
import { navigate } from '@reach/router'
import fb from 'firebase'
import persist from 'mst-persist'

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
    'loading',
    'gqlHttpClient',
    'gqlWsClient',
    'initialDataQueried',
    'queryingAllData',
    'gettingAuthUser',
    'online',
  ]
  await persist('store', store, {
    storage: localForage,
    jsonify: false,
    blacklist,
  })
  fb.initializeApp(firebaseConfig)
  setFirebase(fb)
  unregisterAuthObserver = fb.auth().onAuthStateChanged((user) => {
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
    setGettingAuthUser(false)
  })
  return unregisterAuthObserver
}
