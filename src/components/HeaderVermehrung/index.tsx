import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import styled from 'styled-components'

import ErrorBoundary from '../shared/ErrorBoundary'
import constants from '../../utils/constants'

import Vermehrung from './Vermehrung'

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

const Header = () => (
  <ErrorBoundary>
    <StyledAppBar position="static">
      <Toolbar>
        <Vermehrung />
      </Toolbar>
    </StyledAppBar>
  </ErrorBoundary>
)

export default Header
