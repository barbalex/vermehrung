import React, { useEffect, useState } from 'react'
import 'isomorphic-fetch'
import 'mobx-react-lite/batchingForReactDom'

import { createHttpClient } from 'mst-gql'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import { RootStore, StoreContext } from './models'

import { MuiThemeProvider } from '@material-ui/core/styles'

import { registerLocale, setDefaultLocale } from 'react-datepicker'
import { de } from 'date-fns/locale'
import 'react-datepicker/dist/react-datepicker.css'
import 'isomorphic-fetch'

import localForage from 'localforage'
import { navigate } from '@reach/router'

import Notifications from './components/Notifications'

import materialTheme from './utils/materialTheme'

import createGlobalStyle from './utils/createGlobalStyle'
const GlobalStyle = createGlobalStyle()

import constants from './utils/constants.json'
import getAuthToken from './utils/getAuthToken'

registerLocale('de', de)
setDefaultLocale('de')

if (typeof window !== 'undefined') {
  // inform users of old browsers
  const browserUpdateConfiguration = {
    required: { e: -2, f: -2, o: -2, s: -2, c: -2 },
    text: {
      msg: 'Ihr Browser ({brow_name}) ist veraltet.',
      msgmore:
        'Aktualisieren Sie ihn für mehr Sicherheit, Geschwindigkeit und weil vermehrung.ch einen aktuellen Browser voraussetzt.',
      bupdate: 'Browser aktualisieren',
      bignore: 'Ignorieren',
    },
    style: 'bottom',
    //test: true,
  }
  import('browser-update').then((module) =>
    module.default(browserUpdateConfiguration),
  )
}

// Configure Firebase
const firebaseConfig = {
  apiKey: process.env.GATSBY_FIREBASE_API_KEY,
  authDomain: process.env.GATSBY_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.GATSBY_FIREBASE_PROJECT_ID,
  appId: process.env.GATSBY_FIREBASE_APP_ID,
}

// https://github.com/mobxjs/mst-gql/issues/247
const gqlHttpClient = createHttpClient(constants.graphQlUri)

const tokenWithRoles =
  typeof window !== 'undefined'
    ? window.localStorage.getItem('token') || 'none'
    : 'none'
// is this the place to use the last snapshot of the store instead of undefined?
// to that instead of mst-persist?
gqlHttpClient.setHeaders({ authorization: `Bearer ${tokenWithRoles}` })

// ws client only works in the browser
// need to prevent gatsby from executing it server side
// see: https://github.com/apollographql/subscriptions-transport-ws/issues/333#issuecomment-359261024
let gqlWsClient
let storeOptions = {
  gqlHttpClient,
}
if (typeof window !== 'undefined') {
  // https://www.npmjs.com/package/subscriptions-transport-ws#hybrid-websocket-transport
  gqlWsClient = (() => {
    let authToken =
      typeof window !== 'undefined'
        ? window.localStorage.getItem('token') || 'none'
        : 'none'
    console.log('App, authToken:', authToken)
    return new SubscriptionClient(constants.graphQlWsUri, {
      reconnect: true,
      lazy: true,
      connectionCallback: (error) => {
        console.log('gqlWsClient connectionCallback, error:', error)
        if (error && error.includes('JWT')) {
          getAuthToken({ store }).then(() => {
            const token = window.localStorage.getItem('token') || 'none'
            console.log('gqlWsClient connectionCallback, token:', token)
            //authToken = token
            authToken = window.localStorage.getItem('token') || 'none'
          })
        }
      },
      connectionParams: {
        headers: {
          authorization: `Bearer ${authToken}`,
        },
      },
    })
  })()

  // https://github.com/mobxjs/mst-gql/blob/master/src/MSTGQLStore.ts#L42-L43
  storeOptions = {
    gqlHttpClient,
    gqlWsClient,
  }
}
// need to renew header any time
// solutions:
// https://github.com/apollographql/subscriptions-transport-ws/issues/171#issuecomment-307793837

const store = RootStore.create(undefined, storeOptions)
store.setGqlHttpClient(gqlHttpClient)
store.setGqlWsClient(gqlWsClient)

const App = ({ element }) => {
  const [auth, setAuth] = useState(null)
  useEffect(() => {
    getAuthToken({ store }).then(() =>
      setAuth(window.localStorage.getItem('token') || 'none'),
    )
  }, [])
  useEffect(() => {
    let unregisterAuthObserver = () => {}
    Promise.all([import('firebase'), import('mst-persist')]).then(
      ([fbModule, pModule]) => {
        const { setUser, setAuthorizing, setFirebase } = store
        window.store = store
        // need to blacklist authorizing or mst-persist will set it to false
        // and login form appears for a short moment until auth state changed
        const blacklist = [
          'authorizing',
          'user',
          'loading',
          'gqlHttpClient',
          'gqlWsClient',
        ]
        const persist = pModule.default
        persist('store', store, {
          storage: localForage,
          jsonify: false,
          blacklist,
        }).then(() => {
          const fb = fbModule.default
          fb.initializeApp(firebaseConfig)
          setFirebase(fb)
          unregisterAuthObserver = fb
            .auth()
            .onAuthStateChanged(async (user) => {
              setUser(user)
              if (user && user.uid) {
                getAuthToken({ store })
              } else {
                setAuthorizing(false)
              }
              // set last activeNodeArray
              // only if top domain was visited
              // TODO:
              // without timeout and with timeout too low this errors before page Vermehrung logs
              const visitedTopDomain = window.location.pathname === '/'
              if (!!user && visitedTopDomain) {
                setTimeout(() => {
                  navigate(
                    `/Vermehrung/${store.tree.activeNodeArray.join('/')}`,
                  )
                }, 200)
              }
            })
        })
      },
    )
    return () => {
      console.log('App, unregistering auth observer')
      unregisterAuthObserver()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!store) return null
  ///if (auth === 'none') return null
  return (
    <MuiThemeProvider theme={materialTheme}>
      <StoreContext.Provider value={store}>
        <>
          <GlobalStyle />
          {element}
          <Notifications />
        </>
      </StoreContext.Provider>
    </MuiThemeProvider>
  )
}

export default App
