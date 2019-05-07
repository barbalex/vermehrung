import React, { useEffect, useState, useCallback } from 'react'
import { ApolloProvider } from 'react-apollo'
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks'
import 'isomorphic-fetch'

import createGlobalStyle from './utils/createGlobalStyle'
import Store from './store'
import { Provider as MobxProvider } from './storeContext'
import { MuiThemeProvider } from '@material-ui/core/styles'
import 'react-reflex/styles.css'
import { silentAuth } from './utils/auth'

import moment from 'moment'
import 'moment/locale/de-ch' // this is the important bit, you have to import the locale your'e trying to use.
import MomentUtils from '@date-io/moment'
import { MuiPickersUtilsProvider } from 'material-ui-pickers'

import materialTheme from './utils/materialTheme'
import client from '../client'

const GlobalStyle = createGlobalStyle()
const mobxStore = Store.create()
const myClient = client()

const App = ({ element }) => {
  const [loading, setLoading] = useState(true)
  const handleCheckSession = useCallback(() => setLoading(false))
  useEffect(() => {
    silentAuth(handleCheckSession)
  }, [])
  if (loading) return null

  return (
    <MuiThemeProvider theme={materialTheme}>
      <MobxProvider value={mobxStore}>
        <ApolloProvider client={myClient}>
          <ApolloHooksProvider client={myClient}>
            <MuiPickersUtilsProvider
              utils={MomentUtils}
              moment={moment}
              locale="de-ch"
            >
              <>
                <GlobalStyle />
                {element}
              </>
            </MuiPickersUtilsProvider>
          </ApolloHooksProvider>
        </ApolloProvider>
      </MobxProvider>
    </MuiThemeProvider>
  )
}

export default App
