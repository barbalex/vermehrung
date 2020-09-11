import React, { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import IconButton from '@material-ui/core/IconButton'
import { withResizeDetector } from 'react-resize-detector'

import { StoreContext } from '../../../../models/reactUtils'
import Settings from './Settings'
import AddButton from './AddButton'
import DeleteButton from './DeleteButton'
import Anleitung from './Anleitung'
import FilterNumbers from '../../../shared/FilterNumbers'
import UpSvg from '../../../../svg/to_up.inline.svg'

const TitleContainer = styled.div`
  background-color: rgba(74, 20, 140, 0.1);
  flex-shrink: 0;
  display: flex;
  @media print {
    display: none !important;
  }
  height: 48px;
  justify-content: space-between;
  padding 0 10px;
`
const Title = styled.div`
  font-weight: bold;
  margin-top: auto;
  margin-bottom: auto;
`
const TitleSymbols = styled.div`
  display: flex;
  margin-top: auto;
  margin-bottom: auto;
`

const EventFormTitle = ({
  row,
  totalNr,
  filteredNr,
  width,
  showHistory,
  setShowHistory,
}) => {
  const store = useContext(StoreContext)
  const { activeNodeArray, setActiveNodeArray } = store.tree

  const onClickUp = useCallback(
    () => setActiveNodeArray(activeNodeArray.slice(0, -1)),
    [activeNodeArray, setActiveNodeArray],
  )

  return (
    <TitleContainer>
      <Title>Event</Title>
      <TitleSymbols>
        <IconButton title="Zur Liste" onClick={onClickUp}>
          <UpSvg />
        </IconButton>
        <AddButton />
        <DeleteButton row={row} />
        {row.kultur_id && <Settings kulturId={row.kultur_id} />}
        <Anleitung />
        <FilterNumbers filteredNr={filteredNr} totalNr={totalNr} />
      </TitleSymbols>
    </TitleContainer>
  )
}

export default withResizeDetector(observer(EventFormTitle))
