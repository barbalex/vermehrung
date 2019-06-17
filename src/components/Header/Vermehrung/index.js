import React, { useContext, useCallback } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Switch from '@material-ui/core/Switch'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { observer } from 'mobx-react-lite'

import Account from './Account'
//import More from './More'
import ErrorBoundary from '../../ErrorBoundary'
import Search from './Search'
import storeContext from '../../../storeContext'
import Label from '../../shared/Label'

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
  margin-right: 5px !important;
  &:hover {
    border-width: 1px !important;
  }
`
const HideActiveDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 5px;
  min-width: 40px;
  padding-left: 10px;
  > div {
    color: white !important;
  }
`
const StyledSwitch = styled(Switch)`
  margin-left: -13px;
  margin-top: -18px;
`

const HeaderVermehrung = () => {
  const store = useContext(storeContext)
  const { setHideInactive, hideInactive } = store

  const onClickHideActive = useCallback(() => setHideInactive(!hideInactive), [
    hideInactive,
  ])

  return (
    <ErrorBoundary>
      <AppBar position="fixed">
        <Toolbar>
          <SiteTitle variant="outlined" component={Link} to="/" title="Home">
            Vermehrung
          </SiteTitle>
          <Spacer />
          <NavButton
            variant="outlined"
            component={Link}
            to="/Dokumentation/Benutzer/"
          >
            Dokumentation
          </NavButton>
          <Search />
          <HideActiveDiv>
            <Label
              label="Inaktive"
              title={`Inaktive Personen, Gärten und Kulturen ${
                hideInactive ? 'anzeigen' : 'verbergen'
              }`}
            />
            <StyledSwitch
              checked={hideInactive}
              onChange={onClickHideActive}
              color="secondary"
              title={`Inaktive Personen, Gärten und Kulturen ${
                hideInactive ? 'anzeigen' : 'verbergen'
              }`}
            />
          </HideActiveDiv>
          <Account />
          {/*<More />*/}
        </Toolbar>
      </AppBar>
    </ErrorBoundary>
  )
}

export default observer(HeaderVermehrung)
