import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { Location } from '@reach/router'

import Account from './Account'
import More from './More'
import ErrorBoundary from '../ErrorBoundary'
import Search from './Search'

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
  border-width: ${props =>
    props.active === 'true' ? '1px !important' : '0 !important'};
  text-transform: none !important;
  &:hover {
    border-width: 1px !important;
  }
`

const Header = () => (
  <Location>
    {({ location }) => {
      const { pathname } = location

      return (
        <ErrorBoundary>
          <AppBar position="fixed">
            <Toolbar>
              <SiteTitle
                variant="outlined"
                component={Link}
                to="/"
                title="Home"
              >
                Vermehrung
              </SiteTitle>
              <Spacer />
              {pathname.startsWith('/Vermehrung') ? (
                <>
                  <Search />
                  <Account />
                  <More />
                </>
              ) : (
                <>
                  <NavButton
                    variant="outlined"
                    active={pathname
                      .startsWith('/Benutzer-Dokumentation')
                      .toString()}
                    component={Link}
                    to="/Benutzer-Dokumentation/"
                  >
                    Benutzer-Dokumentation
                  </NavButton>
                  <NavButton
                    variant="outlined"
                    active={pathname
                      .startsWith('/Technische-Dokumentation')
                      .toString()}
                    component={Link}
                    to="/Technische-Dokumentation/"
                  >
                    Technische Dokumentation
                  </NavButton>
                  <NavButton
                    variant="outlined"
                    component={Link}
                    to="/Vermehrung/"
                  >
                    Daten bearbeiten
                  </NavButton>
                </>
              )}
            </Toolbar>
          </AppBar>
        </ErrorBoundary>
      )
    }}
  </Location>
)

export default Header
