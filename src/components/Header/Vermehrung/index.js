import React, { useContext, useCallback } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import { FaBars, FaHome, FaBook, FaFilter } from 'react-icons/fa'
import {
  MdCloudDone as NetworkOn,
  MdCloudOff as NetworkOff,
} from 'react-icons/md'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { observer } from 'mobx-react-lite'
import ReactResizeDetector from 'react-resize-detector'

import Account from './Account'
import Settings from './Settings'
//import More from './More'
import Search from './Search'
import { StoreContext } from '../../../models/reactUtils'
import constants from '../../../utils/constants'
import exists from '../../../utils/exists'
import ErrorBoundary from '../../shared/ErrorBoundary'

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
const StyledButton = styled(Button)`
  color: white !important;
  border-color: rgba(255, 255, 255, 0.5) !important;
  border-width: 0 !important;
  text-transform: none !important;
  margin-right: 5px !important;
  &:hover {
    border-width: 1px !important;
  }
`
const FilterButton = styled(StyledButton)`
  border-width: ${(props) =>
    props['data-active'] ? '1px !important' : '0 !important'};
`

const HeaderVermehrung = () => {
  const store = useContext(StoreContext)
  const { filter, online } = store
  const { show: showFilter, setShow: setShowFilter } = filter
  const { widthEnforced, setWidthEnforced } = store.tree

  const onClickFilter = useCallback(() => setShowFilter(!showFilter), [
    setShowFilter,
    showFilter,
  ])
  const onResize = useCallback(
    (width) => {
      if (width > constants.tree.minimalWindowWidth && exists(widthEnforced)) {
        setWidthEnforced(null)
      }
      if (width < constants.tree.minimalWindowWidth && widthEnforced === null) {
        setWidthEnforced(0)
      }
    },
    [setWidthEnforced, widthEnforced],
  )
  const onClickTreeMenu = useCallback(() => {
    if (widthEnforced === 0) {
      setWidthEnforced(constants.tree.minimalWidth)
    }
    if (widthEnforced > 0) {
      setWidthEnforced(0)
    }
  }, [setWidthEnforced, widthEnforced])

  return (
    <ErrorBoundary>
      <AppBar position="fixed">
        <ReactResizeDetector handleWidth handleHeight onResize={onResize} />
        <Toolbar>
          {exists(widthEnforced) ? (
            <>
              <IconButton
                color="inherit"
                aria-label="Navigations-Baum öffnen"
                onClick={onClickTreeMenu}
                title={
                  widthEnforced === 0
                    ? 'Navigations-Baum öffnen'
                    : 'Navigations-Baum schliessen'
                }
              >
                <FaBars />
              </IconButton>
              <IconButton
                color="inherit"
                aria-label="Home"
                component={Link}
                to="/"
                title="Home"
              >
                <FaHome />
              </IconButton>
            </>
          ) : (
            <SiteTitle variant="outlined" component={Link} to="/" title="Home">
              Vermehrung
            </SiteTitle>
          )}
          <Spacer />
          {exists(widthEnforced) ? (
            <IconButton
              color="inherit"
              aria-label="Dokumentation"
              component={Link}
              to="/Dokumentation/"
              title="Dokumentation"
            >
              <FaBook />
            </IconButton>
          ) : (
            <StyledButton
              variant="outlined"
              component={Link}
              to="/Dokumentation/"
            >
              Dokumentation
            </StyledButton>
          )}
          {exists(widthEnforced) ? (
            <IconButton
              color="inherit"
              aria-label="Filter"
              onClick={onClickFilter}
              title="Filter"
            >
              <FaFilter />
            </IconButton>
          ) : (
            <FilterButton
              variant="outlined"
              onClick={onClickFilter}
              data-active={showFilter}
            >
              Filter
            </FilterButton>
          )}
          {online ? (
            <>
              <Search />
              <IconButton color="inherit" aria-label="online" title="online">
                <NetworkOn />
              </IconButton>
            </>
          ) : (
            <IconButton color="inherit" aria-label="offline" title="offline">
              <NetworkOff />
            </IconButton>
          )}
          <Account />
          <Settings />
          {/*<More />*/}
        </Toolbar>
      </AppBar>
    </ErrorBoundary>
  )
}

export default observer(HeaderVermehrung)
