import React, { useContext, useCallback } from 'react'
import styled from 'styled-components'
import DeleteFilterIcon from '@material-ui/icons/DeleteSweep'
import DeleteFilterIcon2 from '@material-ui/icons/DeleteSweepOutlined'
import IconButton from '@material-ui/core/IconButton'
import { observer } from 'mobx-react-lite'

import { StoreContext } from '../../models/reactUtils'

const Container = styled.div`
  background-color: #ffe0b2;
  padding-bottom: 10px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  @media print {
    display: none !important;
  }
`
const TitleRow = styled.div`
  display: flex;
  justify-content: center;
  user-select: none;
`
const FilterNumbers = styled.div`
  padding-top: 11px;
  padding-right: 8px;
  cursor: default;
  user-select: none;
`
const StyledIconButton = styled(IconButton)`
  height: 34px !important;
  width: 34px !important;
  margin-top: -2px !important;
`
const StyledDeleteFilterIcon = styled(DeleteFilterIcon)`
  cursor: pointer;
  pointer-events: auto;
  /*font-size: 28px !important;*/
`
const StyledDeleteFilterIcon2 = styled(DeleteFilterIcon2)`
  cursor: pointer;
  pointer-events: auto;
  /*font-size: 28px !important;*/
`

const FilterTitle = ({ title, table, totalNr, filteredNr }) => {
  const store = useContext(StoreContext)
  const { tableIsFiltered, isFiltered, emptyTable, empty } = store.filter

  const existsTableFilter = tableIsFiltered({
    table,
  })
  const onEmptyTable = useCallback(() => emptyTable({ table }), [
    emptyTable,
    table,
  ])

  return (
    <Container>
      <TitleRow>
        <FilterNumbers>
          <span title="gefilterte Anzahl">{filteredNr}</span>/
          <span title="ungefilterte Anzahl">{totalNr}</span>
        </FilterNumbers>
        {existsTableFilter && (
          <StyledIconButton
            aria-label={`${title}-Filter entfernen`}
            title={`${title}-Filter entfernen`}
            onClick={onEmptyTable}
          >
            <StyledDeleteFilterIcon2 />
          </StyledIconButton>
        )}
        {isFiltered && (
          <StyledIconButton
            aria-label="Alle Filter entfernen"
            title="Alle Filter entfernen"
            onClick={empty}
          >
            <StyledDeleteFilterIcon />
          </StyledIconButton>
        )}
      </TitleRow>
    </Container>
  )
}

export default observer(FilterTitle)
