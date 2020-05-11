import React, { useEffect } from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import { SnackbarProvider } from 'notistack'
import 'isomorphic-fetch'
import 'mobx-react-lite/batchingForReactDom'

import { createHttpClient } from 'mst-gql'
import { RootStore as DataStore, StoreContext } from './models'

import createGlobalStyle from './utils/createGlobalStyle'

import { MuiThemeProvider } from '@material-ui/core/styles'

import { registerLocale, setDefaultLocale } from 'react-datepicker'
import { de } from 'date-fns/locale'
import 'react-datepicker/dist/react-datepicker.css'
import 'isomorphic-fetch'

import localForage from 'localforage'
import { navigate } from '@reach/router'

import Notifier from './components/Notifier'
import NotificationDismisser from './components/NotificationDismisser'

import materialTheme from './utils/materialTheme'
import createApolloClient from '../apolloClient'

import UpdateExists from './components/UpdateExists'
import setHasuraClaims from './utils/setHasuraClaims'

const GlobalStyle = createGlobalStyle()

import constants from './utils/constants.json'

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

const apolloClient = createApolloClient()

const gqlHttpClient = createHttpClient(constants.graphQlUri)
// todo: is this the place to use tha last snapshot of the store instead of undefined?
// to that instead of mst-persist?
const store = DataStore.create(undefined, {
  gqlHttpClient,
})

const App = ({ element }) => {
  useEffect(() => {
    let unregisterAuthObserver = () => {}
    Promise.all([import('firebase'), import('mst-persist')]).then(
      ([fbModule, pModule]) => {
        const { setUser, setAuthorizing, setFirebase } = store
        window.store = store
        const blacklist = ['user']
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
                setHasuraClaims({ store, user, gqlHttpClient })
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
  return (
    <MuiThemeProvider theme={materialTheme}>
      <StoreContext.Provider value={store}>
        <ApolloProvider client={apolloClient}>
          <SnackbarProvider
            maxSnack={5}
            preventDuplicate
            autoHideDuration={10000}
            action={(key) => <NotificationDismisser nKey={key} />}
          >
            <>
              <GlobalStyle />
              {element}
              <Notifier />
              <UpdateExists />
            </>
          </SnackbarProvider>
        </ApolloProvider>
      </StoreContext.Provider>
    </MuiThemeProvider>
  )
}

export default App
