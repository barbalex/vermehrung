import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import { useLocation } from 'react-router'

import { ErrorBoundary } from '../shared/ErrorBoundary.jsx'
import { HeaderHome as Home } from './Home.jsx'
import { HeaderDoku as Doku } from './Doku/index.jsx'
import { HeaderVermehrung as Vermehrung } from './Vermehrung/index.jsx'

import styles from './index.module.css'

const Header = () => {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const isVermehrung = pathname.startsWith('/Vermehrung')

  return (
    <ErrorBoundary>
      <AppBar
        position="static"
        className={styles.appBar}
      >
        <Toolbar>
          {isHome ?
            <Home location={location} />
          : isVermehrung ?
            <Vermehrung />
          : <Doku />}
        </Toolbar>
      </AppBar>
    </ErrorBoundary>
  )
}

export default Header
