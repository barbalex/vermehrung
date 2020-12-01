import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'

import { StoreContext } from '../../../../models/reactUtils'
import FilterTitle from '../../../shared/FilterTitle'
import FormTitle from './FormTitle'

const ArtFormTitleChooser = ({
  row,
  rawRow,
  showFilter,
  showHistory,
  setShowHistory,
}) => {
  const store = useContext(StoreContext)
  const { artsSorted, artsFiltered } = store

  const totalNr = artsSorted.length
  const filteredNr = artsFiltered.length

  if (showFilter) {
    return (
      <FilterTitle
        title="Art"
        table="art"
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

export default observer(ArtFormTitleChooser)
