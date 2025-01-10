import React, { useContext, useCallback } from 'react'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import { RiFilterFill, RiFilterLine } from 'react-icons/ri'
import { MdDeleteSweep as DeleteFilterIcon } from 'react-icons/md'
import styled from '@emotion/styled'
import { observer } from 'mobx-react-lite'

import { MobxStoreContext } from '../../../mobxStoreContext.js'

const StyledButton = styled(Button)`
  color: white !important;
  border-color: rgba(255, 255, 255, 0.5) !important;
  border-width: 0 !important;
  text-transform: none !important;
  margin-right: 5px !important;
  height: 34px !important;
  &:hover {
    border-width: 1px !important;
  }
`
const FilterButton = styled(StyledButton)`
  border-width: ${(props) =>
    props['data-active'] ? '1px !important' : '0 !important'};
  height: 34px !important;
`
const StyledIconButton = styled(IconButton)`
  ${(props) => props['data-active'] && 'border: 1px solid #9762d9 !important;'}
  font-size: 2rem !important;
`
const IconDiv = styled.div`
  svg {
    height: 34px;
    vertical-align: middle;
  }
`
const StyledDeleteFilterIcon = styled(DeleteFilterIcon)`
  cursor: pointer;
  pointer-events: auto;
  color: white;
  font-size: 1.3rem !important;
  margin-left: 10px;
`

export const HeaderFilter = observer(() => {
  const store = useContext(MobxStoreContext)
  const { filter, singleColumnView } = store
  const { show: showFilter, setShow: setShowFilter, filtered, empty } = filter

  const onClickFilter = useCallback(
    () => setShowFilter(!showFilter),
    [setShowFilter, showFilter],
  )

  if (singleColumnView) {
    return (
      <StyledIconButton
        color="inherit"
        aria-label="Filter"
        onClick={onClickFilter}
        title="Filter"
        data-active={showFilter}
      >
        {filtered ?
          <RiFilterFill />
        : <RiFilterLine />}
      </StyledIconButton>
    )
  }

  return (
    <FilterButton
      variant="outlined"
      onClick={onClickFilter}
      data-active={showFilter}
    >
      Filter
      {filtered && (
        <IconDiv
          aria-label="Alle Filter entfernen"
          title="Alle Filter entfernen"
          onClick={(e) => {
            e.stopPropagation()
            empty()
          }}
        >
          <StyledDeleteFilterIcon />
        </IconDiv>
      )}
    </FilterButton>
  )
})
