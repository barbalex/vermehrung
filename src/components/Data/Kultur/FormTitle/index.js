import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'

import { StoreContext } from '../../../../models/reactUtils'
import FilterTitle from '../../../shared/FilterTitle'
import FormTitle from './FormTitle'

const KulturFormTitleChooser = ({
  row,
  rawRow,
  showFilter,
  showHistory,
  setShowHistory,
}) => {
  const store = useContext(StoreContext)
  const {
    gartenIdInActiveNodeArray,
    artIdInActiveNodeArray,
    kultursSorted,
    kultursFiltered,
  } = store

  const hierarchyFilter = (e) => {
    if (gartenIdInActiveNodeArray) {
      return e.garten_id === gartenIdInActiveNodeArray
    }
    if (artIdInActiveNodeArray) {
      return e.art_id === artIdInActiveNodeArray
    }
    return true
  }

  const totalNr = kultursSorted.filter(hierarchyFilter).length
  const filteredNr = kultursFiltered.filter(hierarchyFilter).length

  if (showFilter) {
    return (
      <FilterTitle
        title="Kultur"
        table="kultur"
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

export default observer(KulturFormTitleChooser)
