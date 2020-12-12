import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'

import { StoreContext } from '../../../../models/reactUtils'
import FilterTitle from '../../../shared/FilterTitle'
import FormTitle from './FormTitle'

const TeilkulturFormTitleChooser = ({
  row,
  rawRow,
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

  const totalCount = teilkultursSorted.filter(hierarchyFilter).length
  const filteredCount = teilkultursFiltered.filter(hierarchyFilter).length

  if (showFilter) {
    return (
      <FilterTitle
        title="Teilkultur"
        table="teilkultur"
        totalCount={totalCount}
        filteredCount={filteredCount}
      />
    )
  }

  return (
    <FormTitle
      row={row}
      rawRow={rawRow}
      totalCount={totalCount}
      filteredCount={filteredCount}
      showHistory={showHistory}
      setShowHistory={setShowHistory}
    />
  )
}

export default observer(TeilkulturFormTitleChooser)
