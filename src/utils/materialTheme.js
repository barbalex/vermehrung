import { createMuiTheme } from '@material-ui/core/styles'
import purple from '@material-ui/core/colors/purple'
//import red from '@material-ui/core/colors/red'

const theme = createMuiTheme({
  palette: {
    primary: { main: purple[900] },
    /*error: {
      main: red[800],
    },*/
  },
  typography: { useNextVariants: true },
})

export default theme
