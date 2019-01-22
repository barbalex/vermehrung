import React from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import red from '@material-ui/core/colors/red'
import teal from '@material-ui/core/colors/teal'

import createGlobalStyle from './utils/createGlobalStyle'
import Store from './store'
import { Provider as MobxProvider } from './storeContext'
import 'react-reflex/styles.css'

const GlobalStyle = createGlobalStyle()
const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    type: 'light',
    primary: { main: teal[800] },
    error: {
      main: red[800],
    },
  },
})
const mobxStore = Store.create()

const App = ({ element }) => (
  <MobxProvider value={mobxStore}>
    <MuiThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        {element}
      </>
    </MuiThemeProvider>
  </MobxProvider>
)

export default App
