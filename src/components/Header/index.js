import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import styled from 'styled-components'
import { Location } from '@reach/router'
import ErrorBoundary from 'react-error-boundary'

import Home from './Home'
import Doku from './Doku'
import Vermehrung from './Vermehrung'

const StyledAppBar = styled(AppBar)`
  min-height: 64px !important;
  .MuiToolbar-root {
    min-height: 64px !important;
    padding-left: 0 !important;
    padding-right: 5px !important;
  }
  @media print {
    display: none !important;
  }
`

const Header = () => (
  <Location>
    {({ location }) => {
      const { pathname } = location
      const isHome = pathname === '/'
      const isVermehrung = pathname.startsWith('/Vermehrung')

      return (
        <ErrorBoundary>
          <StyledAppBar position="static">
            <Toolbar>
              {isHome ? <Home /> : isVermehrung ? <Vermehrung /> : <Doku />}
            </Toolbar>
          </StyledAppBar>
        </ErrorBoundary>
      )
    }}
  </Location>
)

export default Header
