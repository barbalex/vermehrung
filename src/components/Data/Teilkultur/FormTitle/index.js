import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'

import { StoreContext } from '../../../../models/reactUtils'
import FilterTitle from '../../../shared/FilterTitle'
import FormTitle from './FormTitle'

const TeilkulturFormTitleChooser = ({
  row,
  showFilter,
  showHistory,
  setShowHistory,
}) => {
  const store = useContext(StoreContext)
  const {
    kulturIdInActiveNodeArray,
    teilkultursSorted,
    teilkultursFiltered,
  } = store

  const hierarchyFilter = (r) => {
    if (kulturIdInActiveNodeArray) {
      return r.kultur_id === kulturIdInActiveNodeArray
    }
    return true
  }

  const totalNr = teilkultursSorted.filter(hierarchyFilter).length
  const filteredNr = teilkultursFiltered.filter(hierarchyFilter).length

  if (showFilter) {
    return (
      <FilterTitle
        title="Teilkultur"
        table="teilkultur"
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
    />
  )
}

export default observer(TeilkulturFormTitleChooser)
