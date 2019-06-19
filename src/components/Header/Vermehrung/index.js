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
  border-width: ${props =>
    props['data-active'] ? '1px !important' : '0 !important'};
`
const HideActiveDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 14px;
  min-width: 40px;
  padding-left: 8px;
  > div {
    color: white !important;
  }
`
const StyledSwitch = styled(Switch)`
  margin-left: -5px;
  margin-top: -18px;
`
const StyledLabel = styled.div`
  margin-top: 10px;
  cursor: text;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.5);
  pointer-events: none;
  user-select: none;
  padding-bottom: 8px;
`

const HeaderVermehrung = () => {
  const store = useContext(storeContext)
  const { setHideInactive, hideInactive, filter } = store
  const { show: showFilter, setShow: setShowFilter } = filter

  const onClickHideActive = useCallback(() => setHideInactive(!hideInactive), [
    hideInactive,
  ])
  const onClickFilter = useCallback(() => setShowFilter(!showFilter), [
    showFilter,
  ])

  return (
    <ErrorBoundary>
      <AppBar position="fixed">
        <Toolbar>
          <SiteTitle variant="outlined" component={Link} to="/" title="Home">
            Vermehrung
          </SiteTitle>
          <Spacer />
          <StyledButton
            variant="outlined"
            component={Link}
            to="/Dokumentation/Benutzer/"
          >
            Dokumentation
          </StyledButton>
          <FilterButton
            variant="outlined"
            onClick={onClickFilter}
            data-active={showFilter}
          >
            Filter
          </FilterButton>
          <HideActiveDiv>
            <StyledLabel
              label="nur aktive"
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
          <Search />
          <Account />
          {/*<More />*/}
        </Toolbar>
      </AppBar>
    </ErrorBoundary>
  )
}

export default observer(HeaderVermehrung)
