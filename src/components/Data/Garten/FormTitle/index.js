import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'

import { StoreContext } from '../../../../models/reactUtils'
import FilterTitle from '../../../shared/FilterTitle'
import FormTitle from './FormTitle'

const GartenFormTitle = ({
  showFilter,
  row,
  rawRow,
  showHistory,
  setShowHistory,
}) => {
  const store = useContext(StoreContext)
  const { gartensSorted, gartensFiltered, personIdInActiveNodeArray } = store

  const hierarchyFilter = (e) => {
    if (personIdInActiveNodeArray)
      return e.person_id === personIdInActiveNodeArray
    return true
  }

  const totalNr = gartensSorted.filter(hierarchyFilter).length
  const filteredNr = gartensFiltered.filter(hierarchyFilter).length

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
    <FormTitle
      row={row}
      rawRow={rawRow}
      showHistory={showHistory}
      setShowHistory={setShowHistory}
      totalNr={totalNr}
      filteredNr={filteredNr}
    />
  )
}

export default observer(GartenFormTitle)
