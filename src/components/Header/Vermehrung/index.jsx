import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import styled from '@emotion/styled'
import { observer } from 'mobx-react-lite'
import { withResizeDetector } from 'react-resize-detector'

import Account from './Account.jsx'
import HamburgerMenu from './Menu/index.jsx'
import { Online } from './Online.jsx'
import Search from './Search/index.jsx'
import ErrorBoundary from '../../shared/ErrorBoundary.jsx'
import NavTree from './NavTree.jsx'
import Docu from './Docu.jsx'
import Filter from './Filter.jsx'
import Home from './Home.jsx'
import Menu from '../../shared/Menu.jsx'

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

export default withResizeDetector(observer(HeaderVermehrung))
