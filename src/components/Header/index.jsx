import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import styled from '@emotion/styled'
import { useLocation } from 'react-router'

import { ErrorBoundary } from '../shared/ErrorBoundary.jsx'
import { constants } from '../../utils/constants.js'

import { HeaderHome as Home } from './Home.jsx'
import { HeaderDoku as Doku } from './Doku/index.jsx'
import { HeaderVermehrung as Vermehrung } from './Vermehrung/index.jsx'

const StyledAppBar = styled(AppBar)`
  min-height: ${constants.appBarHeight}px !important;
  .MuiToolbar-root {
    min-height: ${constants.appBarHeight}px !important;
    padding-left: 0 !important;
    padding-right: 10px !important;
  }
  @media print {
    display: none !important;
  }
`

const Header = () => {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const isVermehrung = pathname.startsWith('/Vermehrung')

  return (
    <ErrorBoundary>
      <StyledAppBar position="static">
        <Toolbar>
          {isHome ?
            <Home location={location} />
          : isVermehrung ?
            <Vermehrung />
          : <Doku />}
        </Toolbar>
      </StyledAppBar>
    </ErrorBoundary>
  )
}

export default Header
