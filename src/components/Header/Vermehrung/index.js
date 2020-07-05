import React, { useContext, useEffect } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'
import { withResizeDetector } from 'react-resize-detector'

import Account from './Account'
import Settings from './Settings'
import Online from './Online'
import Search from './Search'
import { StoreContext } from '../../../models/reactUtils'
import getConstants from '../../../utils/constants'
import exists from '../../../utils/exists'
import ErrorBoundary from '../../shared/ErrorBoundary'
import NavTree from './NavTree'
import Docu from './Docu'
import Filter from './Filter'
import Home from './Home'
import Menu from './Menu'

const constants = getConstants()

const Spacer = styled.div`
  flex-grow: 1;
`

const HeaderVermehrung = ({ width }) => {
  const store = useContext(StoreContext)
  const { widthEnforced, setWidthEnforced } = store.tree

  useEffect(() => {
    if (width > constants?.tree?.minimalWindowWidth && exists(widthEnforced)) {
      setWidthEnforced(null)
    }
    if (width < constants?.tree?.minimalWindowWidth && widthEnforced === null) {
      setWidthEnforced(0)
    }
  }, [setWidthEnforced, widthEnforced, width])

  if (width < 552) {
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
              <Docu asMenu={true} />
              <Settings asMenu={true} />
            </Menu>
          </Toolbar>
        </AppBar>
      </ErrorBoundary>
    )
  }

  if (width < 600) {
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
            <Settings />
            <Menu>
              <Docu asMenu={true} />
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
          <Settings />
        </Toolbar>
      </AppBar>
    </ErrorBoundary>
  )
}

export default withResizeDetector(observer(HeaderVermehrung))
