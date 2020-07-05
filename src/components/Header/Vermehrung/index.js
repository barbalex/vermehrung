import React, { useContext, useEffect } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import { FaHome } from 'react-icons/fa'
import styled from 'styled-components'
import { Link } from 'gatsby'
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

const constants = getConstants()

const SiteTitle = styled(Button)`
  display: none;
  color: white !important;
  font-size: 20px !important;
  border-color: rgba(255, 255, 255, 0.5) !important;
  border-width: 0 !important;
  text-transform: unset !important;
  @media (min-width: 700px) {
    display: block;
  }
  &:hover {
    border-width: 1px !important;
  }
`
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
