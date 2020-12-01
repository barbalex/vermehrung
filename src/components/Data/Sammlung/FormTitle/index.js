import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'

import { StoreContext } from '../../../../models/reactUtils'
import FilterTitle from '../../../shared/FilterTitle'
import FormTitle from './FormTitle'

const SammlungFormTitleChooser = ({
  row,
  rawRow,
  showFilter,
  showHistory,
  setShowHistory,
}) => {
  const store = useContext(StoreContext)
  const {
    herkunftIdInActiveNodeArray,
    personIdInActiveNodeArray,
    artIdInActiveNodeArray,
    sammlungsSorted,
    sammlungsFiltered,
  } = store

  const hierarchyFilter = (s) => {
    if (artIdInActiveNodeArray) {
      return s.art_id === artIdInActiveNodeArray
    }
    if (herkunftIdInActiveNodeArray) {
      return s.herkunft_id === herkunftIdInActiveNodeArray
    }
    if (personIdInActiveNodeArray) {
      return s.person_id === personIdInActiveNodeArray
    }
    return true
  }

  const totalNr = sammlungsSorted.filter(hierarchyFilter).length
  const filteredNr = sammlungsFiltered.filter(hierarchyFilter).length

  if (showFilter) {
    return (
      <FilterTitle
        title="Sammlung"
        table="sammlung"
        totalNr={totalNr}
        filteredNr={filteredNr}
      />
    )
  }

  return (
    <FormTitle
      row={row}
      rawRow={rawRow}
      totalNr={totalNr}
      filteredNr={filteredNr}
      showHistory={showHistory}
      setShowHistory={setShowHistory}
    />
  )
}

export default observer(SammlungFormTitleChooser)
