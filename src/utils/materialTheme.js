import { createTheme } from '@mui/material/styles'
import { orange, purple } from '@mui/material/colors'

export const lightTheme = createTheme({
  palette: {
    primary: { main: purple[900] },
    secondary: { main: orange[900] },
  },
})

// purple[900] is too dark for text and outlines on dark surfaces, so
// interactive elements use a lighter purple. The AppBar keeps the dark
// brand purple so the chrome looks the same as in light mode
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: purple[300] },
    secondary: { main: orange[300] },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: purple[900],
          color: '#fff',
        },
      },
    },
  },
})
