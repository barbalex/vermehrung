import React, { useContext, useCallback } from 'react'
import { observer } from 'mobx-react-lite'
import styled from 'styled-components'
import IconButton from '@material-ui/core/IconButton'

import { StoreContext } from '../../../models/reactUtils'
import Settings from './Settings'
import DeleteButton from './DeleteButton'
import AddButton from './AddButton'
import Download from './Download'
import FilterNumbers from '../../shared/FilterNumbers'
import UpSvg from '../../../svg/to_up.inline.svg'
import KuDownSvg from '../../../svg/to_ku_down.inline.svg'
import FilterTitle from '../../shared/FilterTitle'
import HistoryButton from '../../shared/HistoryButton'

const Container = styled.div`
  background-color:rgba(74, 20, 140, 0.1);
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

const GartenFormTitle = ({ showFilter, row, showHistory, setShowHistory }) => {
  const store = useContext(StoreContext)
  const { gartensSorted, gartensFiltered, personIdInActiveNodeArray } = store
  const { activeNodeArray, setActiveNodeArray } = store.tree

  const hierarchyFilter = (e) => {
    if (personIdInActiveNodeArray)
      return e.person_id === personIdInActiveNodeArray
    return true
  }

  const totalNr = gartensSorted.filter(hierarchyFilter).length
  const filteredNr = gartensFiltered.filter(hierarchyFilter).length

  const onClickUp = useCallback(
    () => setActiveNodeArray(activeNodeArray.slice(0, -1)),
    [activeNodeArray, setActiveNodeArray],
  )
  const onClickToKulturen = useCallback(
    () => setActiveNodeArray([...activeNodeArray, 'Kulturen']),
    [activeNodeArray, setActiveNodeArray],
  )

  if (showFilter) {
    return (
      <FilterTitle
        title="Garten"
        table="garten"
        totalNr={totalNr}
        filteredNr={filteredNr}
      />
    )
  }

  return (
    <Container>
      <Title>Garten</Title>
      <TitleSymbols>
        <IconButton title="Zur Liste" onClick={onClickUp}>
          <UpSvg />
        </IconButton>
        <IconButton title="Zu den Kulturen" onClick={onClickToKulturen}>
          <KuDownSvg />
        </IconButton>
        <AddButton />
        <DeleteButton row={row} />
        <Download gartenId={row.id} />
        <HistoryButton
          row={row}
          showHistory={showHistory}
          setShowHistory={setShowHistory}
        />
        <Settings />
        <FilterNumbers filteredNr={filteredNr} totalNr={totalNr} />
      </TitleSymbols>
    </Container>
  )
}

export default observer(GartenFormTitle)
