import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'

import { StoreContext } from '../../../../models/reactUtils'
import FilterTitle from '../../../shared/FilterTitle'
import FormTitle from './FormTitle'

const EventFormTitle = ({
  row,
  rawRow,
  showFilter,
  showHistory,
  setShowHistory,
}) => {
  const store = useContext(StoreContext)
  const { kulturIdInActiveNodeArray, eventsSorted, eventsFiltered } = store

  const hierarchyFilter = (e) => {
    if (kulturIdInActiveNodeArray)
      return e.kultur_id === kulturIdInActiveNodeArray
    return true
  }
  const totalNr = eventsSorted.filter(hierarchyFilter).length
  const filteredNr = eventsFiltered.filter(hierarchyFilter).length

  if (showFilter) {
    return (
      <FilterTitle
        title="Event"
        table="event"
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

export default observer(EventFormTitle)
