import React, { useCallback } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import styled from 'styled-components'
import { Link, navigate } from 'gatsby'
import { Location } from '@reach/router'

import Account from './Account'
import More from './More'
import ErrorBoundary from '../ErrorBoundary'

const SiteTitle = styled(Typography)`
  display: none;
  cursor: pointer;
  @media (min-width: 700px) {
    display: block;
  }
`
const Spacer = styled.div`
  flex-grow: 1;
`

const NavButton = styled(Button)`
  color: white !important;
  border-color: rgba(255, 255, 255, 0.5) !important;
  font-weight: ${props => (props.active ? '700' : '500')};
`

const Header = () => {
  const onClickSiteTitle = useCallback(() => navigate('/'))

  return (
    <Location>
      {({ location }) => {
        const { pathname } = location

        return (
          <ErrorBoundary>
            <AppBar position="fixed">
              <Toolbar>
                <SiteTitle
                  variant="h6"
                  color="inherit"
                  noWrap
                  title="Home"
                  onClick={onClickSiteTitle}
                >
                  Vermehrung
                </SiteTitle>
                <Spacer />
                {!pathname.startsWith('/Vermehrung') && (
                  <NavButton
                    variant="text"
                    component={Link}
                    to="/Vermehrung/"
                    active={pathname === '/Vermehrung/' ? 1 : 0}
                  >
                    Zu den Daten
                  </NavButton>
                )}
                <Account />
                <More />
              </Toolbar>
            </AppBar>
          </ErrorBoundary>
        )
      }}
    </Location>
  )
}

export default Header
