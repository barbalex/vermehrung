import React, { useContext, useCallback } from 'react'
import styled from '@emotion/styled'
import {
  MdDeleteSweep as DeleteFilterIcon,
  MdOutlineDeleteSweep as DeleteFilterIconOutlined,
} from 'react-icons/md'
import IconButton from '@mui/material/IconButton'
import { observer } from 'mobx-react-lite'

import { MobxStoreContext } from '../../mobxStoreContext.js'

const Container = styled.div`
  background-color: #ffe0b2;
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
  align-items: center;
  user-select: none;
`
const FilterNumbers = styled.div`
  padding-right: 8px;
  cursor: default;
  user-select: none;
`
const StyledDeleteFilterIcon = styled(DeleteFilterIcon)`
  cursor: pointer;
  pointer-events: auto;
`
const StyledDeleteFilterIcon2 = styled(DeleteFilterIconOutlined)`
  cursor: pointer;
  pointer-events: auto;
`

const FilterTitle = ({ title, table, totalCount, filteredCount }) => {
  const store = useContext(MobxStoreContext)
  const { tableIsFiltered, filtered, emptyTable, empty } = store.filter

  const existsTableFilter = tableIsFiltered({
    table,
  })
  const onEmptyTable = useCallback(
    () => emptyTable({ table }),
    [emptyTable, table],
  )

  return (
    <Container>
      <TitleRow>
        <FilterNumbers>
          <span title="gefilterte Anzahl">{filteredCount}</span>/
          <span title="ungefilterte Anzahl">{totalCount}</span>
        </FilterNumbers>
        {existsTableFilter && (
          <IconButton
            aria-label={`${title}-Filter entfernen`}
            title={`${title}-Filter entfernen`}
            onClick={onEmptyTable}
            size="medium"
          >
            <StyledDeleteFilterIcon2 />
          </IconButton>
        )}
        {filtered && (
          <StyledDeleteFilterIcon
            aria-label="Alle Filter entfernen"
            title="Alle Filter entfernen"
            onClick={empty}
          />
        )}
      </TitleRow>
    </Container>
  )
}

export default observer(FilterTitle)
