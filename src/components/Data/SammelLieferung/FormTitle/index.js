import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'

import { StoreContext } from '../../../../models/reactUtils'
import FilterTitle from '../../../shared/FilterTitle'
import FormTitle from './FormTitle'

const SammelLieferungFormTitleChooser = ({
  lieferungId,
  printPreview,
  row,
  setPrintPreview,
  showFilter,
}) => {
  const store = useContext(StoreContext)

  const { filter, sammelLieferungsFiltered, sammelLieferungsSorted } = store

  const hierarchyFilter = () => {
    return true
  }

  const totalNr = sammelLieferungsSorted.filter(hierarchyFilter).length
  const filteredNr = sammelLieferungsFiltered.filter(hierarchyFilter).length

  if (!row || (!showFilter && filter.show)) return null

  if (showFilter) {
    return (
      <FilterTitle
        title="Sammel-Lieferung"
        table="sammel_lieferung"
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
      showFilter={showFilter}
      lieferungId={lieferungId}
      printPreview={printPreview}
      setPrintPreview={setPrintPreview}
    />
  )
}

export default observer(SammelLieferungFormTitleChooser)
