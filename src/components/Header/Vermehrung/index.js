import React, { useContext, useCallback } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Switch from '@material-ui/core/Switch'
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
import { Offline, Online } from 'react-detect-offline'

import Account from './Account'
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
const HideActiveDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 14px;
  padding-left: 9px;
  margin-top: 5px;
`
const StyledSwitch = styled(Switch)`
  margin-left: -4px;
  margin-top: -8px;
`
const StyledLabel = styled.label`
  cursor: text;
  font-size: 12px;
  margin-bottom: -2px;
  pointer-events: none;
  user-select: none;
`

const HeaderVermehrung = () => {
  const store = useContext(StoreContext)
  const { setHideInactive, hideInactive, filter } = store
  const { show: showFilter, setShow: setShowFilter } = filter
  const { widthEnforced, setWidthEnforced } = store.tree

  const onClickHideActive = useCallback(() => setHideInactive(!hideInactive), [
    hideInactive,
    setHideInactive,
  ])
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
          <HideActiveDiv>
            <StyledLabel
              title={`Inaktive Personen, Gärten und Kulturen ${
                hideInactive ? 'anzeigen' : 'verbergen'
              }`}
            >
              nur aktive
            </StyledLabel>
            <StyledSwitch
              checked={hideInactive}
              onChange={onClickHideActive}
              color="secondary"
              title={`Inaktive Personen, Gärten und Kulturen ${
                hideInactive ? 'anzeigen' : 'verbergen'
              }`}
            />
          </HideActiveDiv>
          <Online>
            <Search />
          </Online>
          <Online>
            <IconButton color="inherit" aria-label="online" title="online">
              <NetworkOn />
            </IconButton>
          </Online>
          <Offline>
            <IconButton color="inherit" aria-label="offline" title="offline">
              <NetworkOff />
            </IconButton>
          </Offline>
          <Account />
          {/*<More />*/}
        </Toolbar>
      </AppBar>
    </ErrorBoundary>
  )
}

export default observer(HeaderVermehrung)
