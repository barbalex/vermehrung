import { useState, useEffect } from 'react'
import { useAtomValue } from 'jotai'
import { combineLatest } from 'rxjs'
import { Q } from '@nozbe/watermelondb'

import { dbAtom, filterArtAtom } from '../../../../store/index.js'
import { FilterTitle } from '../../../shared/FilterTitle.jsx'
import { FormTitle } from './FormTitle.jsx'
import { tableFilter } from '../../../../utils/tableFilter.js'

export const ArtFormTitle = ({
  row,
  rawRow,
  showFilter,
  showHistory,
  setShowHistory,
}) => {
  const db = useAtomValue(dbAtom)
  const artFilter = useAtomValue(filterArtAtom)

  const [countState, setCountState] = useState({
    totalCount: 0,
    filteredCount: 0,
  })
  useEffect(() => {
    const collection = db.get('art')
    const delQuery =
      artFilter._deleted === false
        ? Q.where('_deleted', false)
        : artFilter._deleted === true
          ? Q.where('_deleted', true)
          : Q.or(
              Q.where('_deleted', false),
              Q.where('_deleted', true),
              Q.where('_deleted', null),
            )
    const totalCountObservable = collection.query(delQuery).observeCount()
    const filteredCountObservable = collection
      .query(...tableFilter({ table: 'art' }))
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
    // need to rerender if any of the values of artFilter changes
    artFilter,
  ])

  const { totalCount, filteredCount } = countState

  if (showFilter) {
    return (
      <FilterTitle
        title="Art"
        table="art"
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
