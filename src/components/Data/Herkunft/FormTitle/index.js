import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'

import { StoreContext } from '../../../../models/reactUtils'
import FilterTitle from '../../../shared/FilterTitle'
import FormTitle from './FormTitle'

const HerkunftFormTitleChooser = ({
  row,
  showFilter,
  showHistory,
  setShowHistory,
  activeConflict,
}) => {
  const store = useContext(StoreContext)
  const {
    herkunftsSorted,
    herkunftsFiltered,
    sammlungIdInActiveNodeArray,
  } = store

  const hierarchyFilter = (h) => {
    if (sammlungIdInActiveNodeArray) {
      return [...store.sammlungs.values()]
        .filter((s) => s.herkunft_id === h.id)
        .map((s) => s.id)
        .includes(sammlungIdInActiveNodeArray)
    }
    return true
  }

  const totalNr = herkunftsSorted.filter(hierarchyFilter).length
  const filteredNr = herkunftsFiltered.filter(hierarchyFilter).length

  if (showFilter) {
    return (
      <FilterTitle
        title="Herkunft"
        table="herkunft"
        totalNr={totalNr}
        filteredNr={filteredNr}
      />
    )
  }

  return (
    <FormTitle
      row={row}
      totalNr={totalNr}
      filteredNr={filteredNr}
      showHistory={showHistory}
      setShowHistory={setShowHistory}
      activeConflict={activeConflict}
    />
  )
}

export default observer(HerkunftFormTitleChooser)
