import { createMuiTheme } from '@material-ui/core/styles'
import purple from '@material-ui/core/colors/purple'
import orange from '@material-ui/core/colors/orange'

const theme = createMuiTheme({
  palette: {
    primary: { main: purple[900] },
    secondary: { main: orange[900] },
  },
})

export default theme
