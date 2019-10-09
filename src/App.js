import React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import { SnackbarProvider } from 'notistack'
import 'isomorphic-fetch'

import createGlobalStyle from './utils/createGlobalStyle'
import Store from './store'
import { Provider as MobxProvider } from './storeContext'
import { MuiThemeProvider } from '@material-ui/core/styles'

import moment from 'moment'
import 'moment/locale/de-ch' // this is the important bit, you have to import the locale your'e trying to use.
import MomentUtils from '@date-io/moment'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'

import localForage from 'localforage'
import { navigate } from '@reach/router'

import materialTheme from './utils/materialTheme'
import client from '../client'
import Notifier from './components/Notifier'
import NotificationDismisser from './components/NotificationDismisser'
import { isAuthenticated } from './utils/auth'

const GlobalStyle = createGlobalStyle()
const mobxStore = Store.create()
const myClient = client()

if (typeof window !== 'undefined') window.store = mobxStore

if (typeof window !== 'undefined') {
  const visitedTopDomain = window.location.pathname === '/'
  const blacklist = []
  import('mst-persist').then(module =>
    module
      .default('store', mobxStore, {
        storage: localForage,
        jsonify: false,
        blacklist,
      })
      .then(() => {
        // set last activeNodeArray
        // only if top domain was visited
        // TODO:
        // without timeout and with timeout too low this errors before page Vermehrung logs
        if (isAuthenticated() && visitedTopDomain) {
          setTimeout(() => {
            navigate(`/Vermehrung/${mobxStore.tree.activeNodeArray.join('/')}`)
          }, 200)
        }
      }),
  )

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

const App = ({ element }) => (
  <MuiThemeProvider theme={materialTheme}>
    <MobxProvider value={mobxStore}>
      <ApolloProvider client={myClient}>
        <MuiPickersUtilsProvider
          utils={MomentUtils}
          moment={moment}
          locale="de-ch"
        >
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
            </>
          </SnackbarProvider>
        </MuiPickersUtilsProvider>
      </ApolloProvider>
    </MobxProvider>
  </MuiThemeProvider>
)

export default App
