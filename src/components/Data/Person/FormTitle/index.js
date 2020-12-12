import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'

import { StoreContext } from '../../../../models/reactUtils'
import FilterTitle from '../../../shared/FilterTitle'
import FormTitle from './FormTitle'

const PersonFormTitleChooser = ({
  showFilter,
  row,
  rawRow,
  showHistory,
  setShowHistory,
}) => {
  const store = useContext(StoreContext)
  const { personsSorted, personsFiltered } = store

  const hierarchyFilter = () => {
    return true
  }
  const totalCount = personsSorted.filter(hierarchyFilter).length
  const filteredCount = personsFiltered.filter(hierarchyFilter).length

  if (showFilter) {
    return (
      <FilterTitle
        title="PersonFormTitleChooser"
        table="person"
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

export default observer(PersonFormTitleChooser)
