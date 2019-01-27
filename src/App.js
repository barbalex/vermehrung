import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks'
import 'isomorphic-fetch'

import createGlobalStyle from './utils/createGlobalStyle'
import Store from './store'
import { Provider as MobxProvider } from './storeContext'
import { MuiThemeProvider } from '@material-ui/core/styles'
import 'react-reflex/styles.css'

import materialTheme from './utils/materialTheme'
import client from '../client'

const GlobalStyle = createGlobalStyle()
const mobxStore = Store.create()
const myClient = client()

const App = ({ element }) => (
  <MuiThemeProvider theme={materialTheme}>
    <MobxProvider value={mobxStore}>
      <ApolloProvider client={myClient}>
        <ApolloHooksProvider client={myClient}>
          <>
            <GlobalStyle />
            {element}
          </>
        </ApolloHooksProvider>
      </ApolloProvider>
    </MobxProvider>
  </MuiThemeProvider>
)

export default App
