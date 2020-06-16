import React, { useContext, useCallback, useEffect } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import { FaBars, FaHome } from 'react-icons/fa'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { withResizeDetector } from 'react-resize-detector'
import { observer } from 'mobx-react-lite'

import { StoreContext } from '../../models/reactUtils'
import constants from '../../utils/constants'
import exists from '../../utils/exists'
import ErrorBoundary from '../shared/ErrorBoundary'

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

const NavButton = styled(Button)`
  color: white !important;
  border-color: rgba(255, 255, 255, 0.5) !important;
  border-width: ${(props) =>
    props.outlined === 'true' ? '1px !important' : '0 !important'};
  text-transform: none !important;
  &:hover {
    border-width: 1px !important;
  }
`

const HeaderDoku = ({ width }) => {
  const { sidebarWidth, setSidebarWidth } = useContext(StoreContext)
  useEffect(
    (width) => {
      if (
        width > constants.sidebar.minimalWindowWidth &&
        exists(sidebarWidth)
      ) {
        setSidebarWidth(null)
      }
      if (
        width < constants.sidebar.minimalWindowWidth &&
        sidebarWidth === null
      ) {
        setSidebarWidth(0)
      }
    },
    [setSidebarWidth, sidebarWidth, width],
  )
  const onClickMenu = useCallback(() => {
    if (sidebarWidth === 0) {
      setSidebarWidth(constants.sidebar.width)
    }
    if (sidebarWidth > 0) {
      setSidebarWidth(0)
    }
  }, [setSidebarWidth, sidebarWidth])

  return (
    <ErrorBoundary>
      <AppBar position="fixed">
        <Toolbar>
          {exists(sidebarWidth) ? (
            <>
              <IconButton
                color="inherit"
                aria-label="Navigations-Baum öffnen"
                onClick={onClickMenu}
                title="Menü öffnen"
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
          <NavButton variant="outlined" component={Link} to="/Vermehrung/">
            Daten bearbeiten
          </NavButton>
        </Toolbar>
      </AppBar>
    </ErrorBoundary>
  )
}

export default withResizeDetector(observer(HeaderDoku))
