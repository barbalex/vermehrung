import { useState, useEffect } from 'react'
import { useAtomValue } from 'jotai'
import { combineLatest } from 'rxjs'
import { Q } from '@nozbe/watermelondb'

import {
  dbAtom,
  filterSammelLieferungAtom,
  filterShowAtom,
} from '../../../../store/index.js'
import { FilterTitle } from '../../../shared/FilterTitle.jsx'
import { SammelLieferungFormTitle as FormTitle } from './FormTitle.jsx'
import { tableFilter } from '../../../../utils/tableFilter.js'

export const SammelLieferungFormTitleChooser = ({
  lieferung,
  printPreview,
  row,
  rawRow,
  setPrintPreview,
  showFilter,
  showHistory,
  setShowHistory,
}) => {
  const db = useAtomValue(dbAtom)
  const sammelLieferungFilter = useAtomValue(filterSammelLieferungAtom)
  const filterShow = useAtomValue(filterShowAtom)

  const [countState, setCountState] = useState({
    totalCount: 0,
    filteredCount: 0,
  })
  useEffect(() => {
    const collection = db.get('sammel_lieferung')
    const sammelLieferungDelQuery =
      sammelLieferungFilter._deleted === false
        ? Q.where('_deleted', false)
        : sammelLieferungFilter._deleted === true
          ? Q.where('_deleted', true)
          : Q.or(
              Q.where('_deleted', false),
              Q.where('_deleted', true),
              Q.where('_deleted', null),
            )
    const totalCountObservable = collection
      .query(sammelLieferungDelQuery)
      .observeCount()
    const filteredCountObservable = collection
      .query(...tableFilter({ table: 'sammel_lieferung' }))
      .observeCount()
    const combinedObservables = combineLatest([
      totalCountObservable,
      filteredCountObservable,
    ])
    const subscription = combinedObservables.subscribe(
      ([totalCount, filteredCount]) =>
        setCountState({ totalCount, filteredCount }),
    )

    return () => subscription?.unsubscribe?.()
  }, [
    db,
    // need to rerender if any of the values of sammelLieferungFilter changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    sammelLieferungFilter,
  ])

  const { totalCount, filteredCount } = countState

  if (!row || (!showFilter && filterShow)) return null

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
