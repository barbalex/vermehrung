import React, { useContext, useCallback, useEffect } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import { FaFilter } from 'react-icons/fa'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { observer } from 'mobx-react-lite'
import { withResizeDetector } from 'react-resize-detector'

import Account from './Account'
import Settings from './Settings'
import Online from './Online'
import Search from './Search'
import { StoreContext } from '../../../models/reactUtils'
import getConstants from '../../../utils/constants'
import exists from '../../../utils/exists'
import ErrorBoundary from '../../shared/ErrorBoundary'
import NavTree from './NavTree'
import Docu from './Docu'

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

const HeaderVermehrung = ({ width }) => {
  const store = useContext(StoreContext)
  const { filter } = store
  const { show: showFilter, setShow: setShowFilter } = filter
  const { widthEnforced, setWidthEnforced } = store.tree

  const onClickFilter = useCallback(() => setShowFilter(!showFilter), [
    setShowFilter,
    showFilter,
  ])
  useEffect(() => {
    if (width > constants?.tree?.minimalWindowWidth && exists(widthEnforced)) {
      setWidthEnforced(null)
    }
    if (width < constants?.tree?.minimalWindowWidth && widthEnforced === null) {
      setWidthEnforced(0)
    }
  }, [setWidthEnforced, widthEnforced, width])

  return (
    <ErrorBoundary>
      <AppBar position="fixed">
        <Toolbar>
          {exists(widthEnforced) ? (
            <NavTree
              widthEnforced={widthEnforced}
              setWidthEnforced={setWidthEnforced}
            />
          ) : (
            <SiteTitle variant="outlined" component={Link} to="/" title="Home">
              Vermehrung
            </SiteTitle>
          )}
          <Spacer />
          <Docu widthEnforced={widthEnforced} />
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
          <Search />
          <Online />
          <Account />
          <Settings />
        </Toolbar>
      </AppBar>
    </ErrorBoundary>
  )
}

export default withResizeDetector(observer(HeaderVermehrung))
