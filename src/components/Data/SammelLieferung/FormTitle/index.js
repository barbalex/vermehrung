import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'

import { StoreContext } from '../../../../models/reactUtils'
import FilterTitle from '../../../shared/FilterTitle'
import FormTitle from './FormTitle'

const SammelLieferungFormTitleChooser = ({
  lieferung,
  printPreview,
  row,
  rawRow,
  setPrintPreview,
  showFilter,
  showHistory,
  setShowHistory,
}) => {
  const store = useContext(StoreContext)

  const { filter, sammelLieferungsFiltered, sammelLieferungsSorted } = store

  const hierarchyFilter = () => {
    return true
  }

  const totalCount = sammelLieferungsSorted.filter(hierarchyFilter).length
  const filteredCount = sammelLieferungsFiltered.filter(hierarchyFilter).length

  if (!row || (!showFilter && filter.show)) return null

  if (showFilter) {
    return (
      <FilterTitle
        title="Sammel-Lieferung"
        table="sammel_lieferung"
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
      showFilter={showFilter}
      lieferung={lieferung}
      printPreview={printPreview}
      setPrintPreview={setPrintPreview}
      showHistory={showHistory}
      setShowHistory={setShowHistory}
    />
  )
}

export default observer(SammelLieferungFormTitleChooser)
