import React, { useContext, useCallback } from 'react'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import { FaFilter } from 'react-icons/fa'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'

import { StoreContext } from '../../../models/reactUtils'

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

const Filter = () => {
  const store = useContext(StoreContext)
  const { filter, singleColumnView } = store
  const { show: showFilter, setShow: setShowFilter } = filter

  const onClickFilter = useCallback(() => setShowFilter(!showFilter), [
    setShowFilter,
    showFilter,
  ])

  if (singleColumnView) {
    return (
      <IconButton
        color="inherit"
        aria-label="Filter"
        onClick={onClickFilter}
        title="Filter"
      >
        <FaFilter />
      </IconButton>
    )
  }

  return (
    <FilterButton
      variant="outlined"
      onClick={onClickFilter}
      data-active={showFilter}
    >
      Filter
    </FilterButton>
  )
}

export default observer(Filter)
