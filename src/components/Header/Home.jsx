import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import { FaHome } from 'react-icons/fa'
import styled from '@emotion/styled'
import { Link } from 'react-router'
import { useResizeDetector } from 'react-resize-detector'

import { ErrorBoundary } from '../shared/ErrorBoundary.jsx'
import { constants } from '../../utils/constants.js'

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

export const HeaderHome = ({ location }) => {
  const { width, ref } = useResizeDetector()
  const mobile = width && width < constants?.tree?.minimalWindowWidth
  const { pathname } = location
  const isHome = pathname === '/'

  return (
    <ErrorBoundary>
      <AppBar
        position="fixed"
        ref={ref}
      >
        <Toolbar>
          {mobile ?
            isHome ?
              <div />
            : <IconButton
                color="inherit"
                aria-label="Home"
                component={Link}
                to="/"
                title="Home"
                size="large"
              >
                <FaHome />
              </IconButton>

          : <SiteTitle
              variant="outlined"
              component={Link}
              to="/"
              title="Home"
            >
              Vermehrung
            </SiteTitle>
          }
          <Spacer />
          <NavButton
            variant="outlined"
            component={Link}
            to="/Dokumentation/"
          >
            Dokumentation
          </NavButton>
          <NavButton
            variant="outlined"
            component={Link}
            to="/Vermehrung/"
          >
            Daten
          </NavButton>
        </Toolbar>
      </AppBar>
    </ErrorBoundary>
  )
}
