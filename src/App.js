import React, { useState, useEffect } from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import { SnackbarProvider } from 'notistack'
import 'isomorphic-fetch'
import axios from 'axios'

import createGlobalStyle from './utils/createGlobalStyle'
import Store from './store'
import { Provider as MobxProvider } from './storeContext'
import { Provider as FirebaseProvider } from './firebaseContext'
import { MuiThemeProvider } from '@material-ui/core/styles'

import localForage from 'localforage'
import { navigate } from '@reach/router'
import { registerLocale, setDefaultLocale } from 'react-datepicker'
import { de } from 'date-fns/locale'
import 'react-datepicker/dist/react-datepicker.css'

import materialTheme from './utils/materialTheme'
import createApolloClient from '../apolloClient'
import Notifier from './components/Notifier'
import NotificationDismisser from './components/NotificationDismisser'

import UpdateExists from './components/UpdateExists'

const GlobalStyle = createGlobalStyle()
const mobxStore = Store.create()

registerLocale('de', de)
setDefaultLocale('de')

if (typeof window !== 'undefined') window.store = mobxStore

if (typeof window !== 'undefined') {
  // inform users of old browsers
  const browserUpdateConfiguration = {
    required: { e: -2, f: -2, o: -2, s: -2, c: -2 },
    text: {
      msg: 'Ihr Browser ({brow_name}) ist veraltet.',
      msgmore:
        'Aktualisieren Sie ihn für mehr Sicherheit, Geschwindigkeit und weil vermehrung einen aktuellen Browser voraussetzt.',
      bupdate: 'Browser aktualisieren',
      bignore: 'Ignorieren',
    },
    style: 'bottom',
    //test: true,
  }
  import('browser-update').then(module =>
    module.default(browserUpdateConfiguration),
  )
}

const apolloClient = createApolloClient()
// Configure Firebase
const firebaseConfig = {
  apiKey: process.env.GATSBY_FIREBASE_API_KEY,
  authDomain: process.env.GATSBY_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.GATSBY_FIREBASE_PROJECT_ID,
  appId: process.env.GATSBY_FIREBASE_APP_ID,
}

const App = ({ element }) => {
  const [firebase, setFirebase] = useState(null)

  const visitedTopDomain =
    typeof window !== 'undefined' ? window.location.pathname === '/' : false

  useEffect(() => {
    if (firebase) return
    let unregisterAuthObserver = () => {}
    import('firebase').then(module => {
      const fb = module.default
      fb.initializeApp(firebaseConfig)
      setFirebase(fb)

      const blacklist = ['user']
      import('mst-persist').then(module => {
        const persist = module.default
        persist('store', mobxStore, {
          storage: localForage,
          jsonify: false,
          blacklist,
        }).then(() => {
          unregisterAuthObserver = fb.auth().onAuthStateChanged(async user => {
            //console.log('vermehrung page registered user:', user)
            mobxStore.setUser(user)
            if (user && user.uid) {
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
              }
            }
            // set last activeNodeArray
            // only if top domain was visited
            // TODO:
            // without timeout and with timeout too low this errors before page Vermehrung logs
            const isAuthenticated = !!user
            if (isAuthenticated && visitedTopDomain) {
              setTimeout(() => {
                navigate(
                  `/Vermehrung/${mobxStore.tree.activeNodeArray.join('/')}`,
                )
              }, 200)
            }
          })
        })
      })
    })
    return () => {
      unregisterAuthObserver()
    }
  }, [firebase, visitedTopDomain])

  if (!firebase && !visitedTopDomain) return null

  return (
    <MuiThemeProvider theme={materialTheme}>
      <MobxProvider value={mobxStore}>
        <FirebaseProvider value={firebase}>
          <ApolloProvider client={apolloClient}>
            <SnackbarProvider
              maxSnack={5}
              preventDuplicate
              autoHideDuration={10000}
              action={key => <NotificationDismisser nKey={key} />}
            >
              <>
                <GlobalStyle />
                {element}
                <Notifier />
                <UpdateExists />
              </>
            </SnackbarProvider>
          </ApolloProvider>
        </FirebaseProvider>
      </MobxProvider>
    </MuiThemeProvider>
  )
}

export default App
