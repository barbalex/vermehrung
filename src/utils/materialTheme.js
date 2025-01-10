import { createTheme } from '@mui/material/styles'
import { orange, purple } from '@mui/material/colors'

export const materialTheme = createTheme({
  palette: {
    primary: { main: purple[900] },
    secondary: { main: orange[900] },
  },
})
