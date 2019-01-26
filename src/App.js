import React from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
//import red from '@material-ui/core/colors/red'
import purple from '@material-ui/core/colors/purple'

import createGlobalStyle from './utils/createGlobalStyle'
import Store from './store'
import { Provider as MobxProvider } from './storeContext'
import 'react-reflex/styles.css'

const GlobalStyle = createGlobalStyle()
const theme = createMuiTheme({
  palette: {
    //type: 'light',
    primary: { main: purple[800] },
    /*error: {
      main: red[800],
    },*/
  },
})
const mobxStore = Store.create()

const App = ({ element }) => (
  <MuiThemeProvider theme={theme}>
    <MobxProvider value={mobxStore}>
      <>
        <GlobalStyle />
        {element}
      </>
    </MobxProvider>
  </MuiThemeProvider>
)

export default App
