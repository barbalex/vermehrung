import React, { useState, useEffect, useContext } from 'react'
import 'isomorphic-fetch'
import axios from 'axios'

import { Provider as FirebaseProvider } from './firebaseContext'

import localForage from 'localforage'
import { navigate } from '@reach/router'
import 'react-datepicker/dist/react-datepicker.css'

import storeContext from './storeContext'

// Configure Firebase
const firebaseConfig = {
  apiKey: process.env.GATSBY_FIREBASE_API_KEY,
  authDomain: process.env.GATSBY_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.GATSBY_FIREBASE_PROJECT_ID,
  appId: process.env.GATSBY_FIREBASE_APP_ID,
}

const Auth = ({ children }) => {
  const store = useContext(storeContext)
  const { setInitializingFirebase, setIsSignedIn, setUser } = store
  const [firebase, setFirebase] = useState(null)

  console.log('Auth rendering, firebase:', firebase)

  const visitedTopDomain =
    typeof window !== 'undefined' ? window.location.pathname === '/' : false

  useEffect(() => {
    if (firebase) return

    let unregisterAuthObserver = () => {}
    Promise.all([import('firebase'), import('mst-persist')]).then(
      ([fbModule, pModule]) => {
        const fb = fbModule.default
        fb.initializeApp(firebaseConfig)
        setFirebase(fb)

        const blacklist = ['user']
        const persist = pModule.default
        persist('store', store, {
          storage: localForage,
          jsonify: false,
          blacklist,
        }).then(() => {
          unregisterAuthObserver = fb.auth().onAuthStateChanged(async user => {
            console.log('vermehrung onAuthStateChanged, user:', user)
            setUser(user)
            setIsSignedIn(!!user)
            //setUser(user)
            if (user && user.uid) {
              setInitializingFirebase(true)
              //const idToken = user.getIdToken()
              //console.log('Vermehrung, idToken:', idToken)
              let res
              try {
                res = await axios.get(`https://auth.vermehrung.ch/${user.uid}`)
              } catch (error) {
                // TODO: surface this error
                return console.log(error)
              }
              //console.log('response from auth.vermehrung.ch:', res)
              if (res.status === 200) {
                let tokenWithRoles
                try {
                  tokenWithRoles = await user.getIdToken(true)
                } catch (error) {
                  console.log(error)
                }
                //console.log('tokenWithRoles:', tokenWithRoles)
                // set token to localStorage so authLink picks it up on next db call
                // see: https://www.apollographql.com/docs/react/networking/authentication/#header
                window.localStorage.setItem('token', tokenWithRoles)
                setTimeout(() => setInitializingFirebase(false), 1000)
              } else {
                setTimeout(() => setInitializingFirebase(false), 1000)
              }
            } else {
              setTimeout(() => setInitializingFirebase(false), 1000)
            }
            // set last activeNodeArray
            // only if top domain was visited
            // TODO:
            // without timeout and with timeout too low this errors before page Vermehrung logs
            const isAuthenticated = !!user
            if (isAuthenticated && visitedTopDomain) {
              setTimeout(() => {
                navigate(`/Vermehrung/${store.tree.activeNodeArray.join('/')}`)
              }, 200)
            }
          })
        })
      },
    )
    return () => {
      unregisterAuthObserver()
    }
  }, [
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
