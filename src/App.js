import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks'
import { SnackbarProvider } from 'notistack'
import 'isomorphic-fetch'

import createGlobalStyle from './utils/createGlobalStyle'
import Store from './store'
import { Provider as MobxProvider } from './storeContext'
import { MuiThemeProvider } from '@material-ui/core/styles'

import moment from 'moment'
import 'moment/locale/de-ch' // this is the important bit, you have to import the locale your'e trying to use.
import MomentUtils from '@date-io/moment'
import { MuiPickersUtilsProvider } from 'material-ui-pickers'

import materialTheme from './utils/materialTheme'
import client from '../client'
import Errors from './components/Errors'
import Notifier from './components/Notifier'
import NotificationDismisser from './components/NotificationDismisser'

const GlobalStyle = createGlobalStyle()
const mobxStore = Store.create()
const myClient = client()

const App = ({ element }) => (
  <MuiThemeProvider theme={materialTheme}>
    <MobxProvider value={mobxStore}>
      <ApolloProvider client={myClient}>
        <ApolloHooksProvider client={myClient}>
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
                <Errors />
                <Notifier />
              </>
            </SnackbarProvider>
          </MuiPickersUtilsProvider>
        </ApolloHooksProvider>
      </ApolloProvider>
    </MobxProvider>
  </MuiThemeProvider>
)

export default App
