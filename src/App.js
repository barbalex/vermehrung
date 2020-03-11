import React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
import { SnackbarProvider } from 'notistack'
import 'isomorphic-fetch'

import createGlobalStyle from './utils/createGlobalStyle'

import Store from './store'
import { Provider as MobxProvider } from './storeContext'
import { MuiThemeProvider } from '@material-ui/core/styles'

import { registerLocale, setDefaultLocale } from 'react-datepicker'
import { de } from 'date-fns/locale'
import 'react-datepicker/dist/react-datepicker.css'

import Notifier from './components/Notifier'
import NotificationDismisser from './components/NotificationDismisser'

import materialTheme from './utils/materialTheme'
import createApolloClient from '../apolloClient'

import Auth from './Auth'
import UpdateExists from './components/UpdateExists'

const GlobalStyle = createGlobalStyle()

const mobxStore = Store.create()

registerLocale('de', de)
setDefaultLocale('de')

if (typeof window !== 'undefined') {
  window.store = mobxStore
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

const App = ({ element }) => {
  //console.log('App rendering')

  return (
    <MuiThemeProvider theme={materialTheme}>
      <MobxProvider value={mobxStore}>
        <ApolloProvider client={apolloClient}>
          <SnackbarProvider
            maxSnack={5}
            preventDuplicate
            autoHideDuration={10000}
            action={key => <NotificationDismisser nKey={key} />}
          >
            <>
              <GlobalStyle />
              <Auth>{element}</Auth>
              <Notifier />
              <UpdateExists />
            </>
          </SnackbarProvider>
        </ApolloProvider>
      </MobxProvider>
    </MuiThemeProvider>
  )
}

export default App
