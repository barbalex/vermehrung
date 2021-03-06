import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import { FaHome } from 'react-icons/fa'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { withResizeDetector } from 'react-resize-detector'

import ErrorBoundary from '../shared/ErrorBoundary'
import getConstants from '../../utils/constants'

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

const NavButton = styled(Button)`
  color: white !important;
  border-color: rgba(255, 255, 255, 0.5) !important;
  border-width: 0 !important;
  text-transform: none !important;
  &:hover {
    border-width: 1px !important;
  }
`

const HeaderHome = ({ width, location }) => {
  const mobile = width && width < constants?.tree?.minimalWindowWidth
  const { pathname } = location
  const isHome = pathname === '/'

  return (
    <ErrorBoundary>
      <AppBar position="fixed">
        <Toolbar>
          {mobile ? (
            isHome ? (
              <div />
            ) : (
              <IconButton
                color="inherit"
                aria-label="Home"
                component={Link}
                to="/"
                title="Home"
              >
                <FaHome />
              </IconButton>
            )
          ) : (
            <SiteTitle variant="outlined" component={Link} to="/" title="Home">
              Vermehrung
            </SiteTitle>
          )}
          <Spacer />
          <NavButton variant="outlined" component={Link} to="/Dokumentation/">
            Dokumentation
          </NavButton>
          <NavButton variant="outlined" component={Link} to="/Vermehrung/">
            Daten
          </NavButton>
        </Toolbar>
      </AppBar>
    </ErrorBoundary>
  )
}

export default withResizeDetector(HeaderHome)
