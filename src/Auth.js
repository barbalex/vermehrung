import React, { useState, useEffect, useContext } from 'react'
import 'isomorphic-fetch'

import { Provider as FirebaseProvider } from './firebaseContext'

//import localForage from 'localforage'
//import { navigate } from '@reach/router'
import 'react-datepicker/dist/react-datepicker.css'

import storeContext from './storeContext'
import setHasuraClaims from './utils/setHasuraClaims'

// Configure Firebase
const firebaseConfig = {
  apiKey: process.env.GATSBY_FIREBASE_API_KEY,
  authDomain: process.env.GATSBY_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.GATSBY_FIREBASE_PROJECT_ID,
  appId: process.env.GATSBY_FIREBASE_APP_ID,
}

const Auth = ({ children }) => {
  const store = useContext(storeContext)
  const {
    setInitializingFirebase,
    setIsSignedIn,
    setUser,
    enqueNotification,
  } = store
  const [firebase, setFirebase] = useState(null)

  //console.log('Auth rendering, firebase:', firebase)

  const visitedTopDomain =
    typeof window !== 'undefined' ? window.location.pathname === '/' : false

  useEffect(() => {
    if (firebase) return

    /**
     * 2020.03.11: suddenly basic mobx errors occured
     * so had to turn off mst-persist
     */
    let unregisterAuthObserver = () => {}
    Promise.all([import('firebase') /*, import('mst-persist')*/]).then(
      ([fbModule /*, pModule*/]) => {
        //const blacklist = []
        //const persist = pModule.default
        //persist('store', store, {
        //  storage: localForage,
        //  jsonify: false,
        //  blacklist,
        //}).then(() => {
        const fb = fbModule.default
        fb.initializeApp(firebaseConfig)
        setFirebase(fb)
        unregisterAuthObserver = fb.auth().onAuthStateChanged(async user => {
          console.log('Auth onAuthStateChanged, user:', user)
          setInitializingFirebase(true)
          setUser(user)
          setIsSignedIn(!!user)
          if (user && user.uid) {
            setHasuraClaims({ store, user })
          } else {
            setInitializingFirebase(false)
          }
          // set last activeNodeArray
          // only if top domain was visited
          // TODO:
          // without timeout and with timeout too low this errors before page Vermehrung logs
          //const isAuthenticated = !!user
          //if (isAuthenticated && visitedTopDomain) {
          //  setTimeout(() => {
          //    navigate(`/Vermehrung/${store.tree.activeNodeArray.join('/')}`)
          //  }, 200)
          //}
        })
        //})
      },
    )
    return () => {
      unregisterAuthObserver()
    }
  }, [
    enqueNotification,
    firebase,
    setInitializingFirebase,
    setIsSignedIn,
    setUser,
    store,
    visitedTopDomain,
  ])

  if (!firebase && !visitedTopDomain) return null

  return <FirebaseProvider value={firebase}>{children}</FirebaseProvider>
}

export default Auth
