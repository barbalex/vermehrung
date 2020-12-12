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

  const totalCount = sammlungsSorted.filter(hierarchyFilter).length
  const filteredCount = sammlungsFiltered.filter(hierarchyFilter).length

  if (showFilter) {
    return (
      <FilterTitle
        title="Sammlung"
        table="sammlung"
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

export default observer(SammlungFormTitleChooser)
