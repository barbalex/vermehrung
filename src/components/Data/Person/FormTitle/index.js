import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'

import { StoreContext } from '../../../../models/reactUtils'
import FilterTitle from '../../../shared/FilterTitle'
import FormTitle from './FormTitle'

const PersonFormTitleChooser = ({
  showFilter,
  row,
  showHistory,
  setShowHistory,
}) => {
  const store = useContext(StoreContext)
  const { personsSorted, personsFiltered } = store

  const hierarchyFilter = () => {
    return true
  }
  const totalNr = personsSorted.filter(hierarchyFilter).length
  const filteredNr = personsFiltered.filter(hierarchyFilter).length

  if (showFilter) {
    return (
      <FilterTitle
        title="PersonFormTitleChooser"
        table="person"
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

export default observer(PersonFormTitleChooser)
