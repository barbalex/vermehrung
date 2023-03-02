import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import styled from '@emotion/styled'
import { observer } from 'mobx-react-lite'
import { withResizeDetector } from 'react-resize-detector'

import Account from './Account'
import HamburgerMenu from './Menu'
import Online from './Online'
import Search from './Search'
import ErrorBoundary from '../../shared/ErrorBoundary'
import NavTree from './NavTree'
import Docu from './Docu'
import Filter from './Filter'
import Home from './Home'
import Menu from '../../shared/Menu'

const Spacer = styled.div`
  flex-grow: 1;
`

const HeaderVermehrung = ({ width }) => {
  if (width < 509) {
    return (
      <ErrorBoundary>
        <AppBar position="fixed">
          <Toolbar>
            <NavTree />
            <Spacer />
            <Filter />
            <Search />
            <Online />
            <Account />
            <Menu>
              <Home asMenu />
              <Docu asMenu />
              <HamburgerMenu asMenu />
            </Menu>
          </Toolbar>
        </AppBar>
      </ErrorBoundary>
    )
  }

  if (width < 557) {
    return (
      <ErrorBoundary>
        <AppBar position="fixed">
          <Toolbar>
            <NavTree />
            <Home />
            <Spacer />
            <Filter />
            <Search />
            <Online />
            <Account />
            <Menu>
              <Docu asMenu />
              <HamburgerMenu asMenu />
            </Menu>
          </Toolbar>
        </AppBar>
      </ErrorBoundary>
    )
  }

  if (width < 605) {
    return (
      <ErrorBoundary>
        <AppBar position="fixed">
          <Toolbar>
            <NavTree />
            <Home />
            <Spacer />
            <Filter />
            <Search />
            <Online />
            <Account />
            <HamburgerMenu />
            <Menu>
              <Docu asMenu />
            </Menu>
          </Toolbar>
        </AppBar>
      </ErrorBoundary>
    )
  }

  return (
    <ErrorBoundary>
      <AppBar position="fixed">
        <Toolbar>
          <NavTree />
          <Home />
          <Spacer />
          <Docu />
          <Filter />
          <Search />
          <Online />
          <Account />
          <HamburgerMenu />
        </Toolbar>
      </AppBar>
    </ErrorBoundary>
  )
}

export default withResizeDetector(observer(HeaderVermehrung), {
  refreshMode: 'debounce',
  refreshRate: 300,
  refreshOptions: { trailing: true },
})
