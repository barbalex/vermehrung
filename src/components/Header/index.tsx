import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import { useLocation } from 'react-router'

import { ErrorBoundary } from '../shared/ErrorBoundary.tsx'
import { HeaderHome as Home } from './Home.tsx'
import { HeaderDoku as Doku } from './Doku/index.tsx'
import { HeaderVermehrung as Vermehrung } from './Vermehrung/index.tsx'
import { Breadcrumbs } from '../Breadcrumbs/index.tsx'
import { breadcrumbsEnabled } from '../../utils/breadcrumbsEnabled.ts'

import styles from './index.module.css'

const Header = () => {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const isVermehrung = pathname.startsWith('/Vermehrung')

  return (
    <ErrorBoundary>
      <AppBar position="static" className={styles.appBar}>
        <Toolbar>
          {isHome ? (
            <Home location={location} />
          ) : isVermehrung ? (
            <Vermehrung />
          ) : (
            <Doku />
          )}
        </Toolbar>
        {isVermehrung && breadcrumbsEnabled && <Breadcrumbs />}
      </AppBar>
    </ErrorBoundary>
  )
}

export default Header
