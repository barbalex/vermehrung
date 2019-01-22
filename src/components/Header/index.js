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
  /*border: ${props => (props.active ? '1px white' : 'unset')};*/
  border-color: rgba(255, 255, 255, 0.5) !important;
  font-weight: ${props => (props.active ? '700' : '500')};
  /*font-weight: 600;*/
`

const Header = () => {
  const onClickSiteTitle = useCallback(() => navigate('/'))

  return (
    <Location>
      {({ location }) => {
        const { pathname } = location
        console.log({ location, pathname })

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
                <NavButton
                  variant={pathname === '/' ? 'outlined' : 'text'}
                  component={Link}
                  to="/"
                  active={pathname === '/' ? 1 : 0}
                >
                  Home
                </NavButton>
                <NavButton
                  variant={pathname === '/Vermehrung/' ? 'outlined' : 'text'}
                  component={Link}
                  to="/Vermehrung/"
                  active={pathname === '/Vermehrung/' ? 1 : 0}
                >
                  Vermehrung
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
