import React, { useCallback } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import styled from 'styled-components'
import { Link, navigate } from 'gatsby'
import { Location } from '@reach/router'

import Account from './Account'
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
  border: ${props => (props.active ? '1px white' : 'unset')};
  border-color: rgba(255, 255, 255, 0.5) !important;
  font-weight: ${props => (props.active ? '700' : '600')};
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
                  erfassen.ch
                </SiteTitle>
                <Spacer />
                <NavButton
                  variant={pathname === '/' ? 'outlined' : 'text'}
                  component={Link}
                  to="/"
                  active={(pathname === '/').toString()}
                >
                  Home
                </NavButton>
                <NavButton
                  variant={pathname === '/Projekte/' ? 'outlined' : 'text'}
                  component={Link}
                  to="/Projekte/"
                  active={(pathname === '/Projekte/').toString()}
                >
                  Projekte
                </NavButton>
                <Account />
              </Toolbar>
            </AppBar>
          </ErrorBoundary>
        )
      }}
    </Location>
  )
}

export default Header
