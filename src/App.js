import React from 'react'

import createGlobalStyle from './utils/createGlobalStyle'
import Store from './store'
import { Provider as MobxProvider } from './storeContext'
import 'react-reflex/styles.css'

const GlobalStyle = createGlobalStyle()
const mobxStore = Store.create()

/**
 * Initially I passed in materialTheme via MuiThemeProvider here
 * But it never arrived in components
 * So now need to wrap every page into it
 */

const App = ({ element }) => (
  <MobxProvider value={mobxStore}>
    <>
      <GlobalStyle />
      {element}
    </>
  </MobxProvider>
)

export default App
