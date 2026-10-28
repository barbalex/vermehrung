import { useState, useEffect } from 'react'
import { useAtomValue } from 'jotai'
import { Q } from '@nozbe/watermelondb'
import { combineLatest } from 'rxjs'

import {
  dbAtom,
  filterZaehlungAtom,
  kulturIdInActiveNodeArrayAtom,
} from '../../../../store/index.ts'
import { FilterTitle } from '../../../shared/FilterTitle.tsx'
import { ZaehlungFormTitle as FormTitle } from './FormTitle.tsx'
import { tableFilter } from '../../../../utils/tableFilter.ts'

export const ZaehlungFormTitleChooser = ({
  row,
  rawRow,
  showFilter,
  showHistory,
}: {
  row: import('../../../../dbModel.ts').Zaehlung | null | undefined
  rawRow: Record<string, unknown> | null | undefined
  showFilter: boolean
  showHistory: boolean
}) => {
  const db = useAtomValue(dbAtom)
  const kulturIdInActiveNodeArray = useAtomValue(kulturIdInActiveNodeArrayAtom)
  const zaehlungFilter = useAtomValue(filterZaehlungAtom)

  const [countState, setCountState] = useState({
    totalCount: 0,
    filteredCount: 0,
  })
  useEffect(() => {
    const hierarchyQuery = kulturIdInActiveNodeArray
      ? [
          Q.experimentalJoinTables(['kultur']),
          Q.on('kultur', 'id', kulturIdInActiveNodeArray),
        ]
      : []
    const collection = db?.get('zaehlung')
    const zaehlungDelQuery =
      zaehlungFilter._deleted === false
        ? Q.where('_deleted', false)
        : zaehlungFilter._deleted === true
          ? Q.where('_deleted', true)
          : Q.or(
              Q.where('_deleted', false),
              Q.where('_deleted', true),
              Q.where('_deleted', null),
            )
    const totalCountObservable = collection
      .query(zaehlungDelQuery, ...hierarchyQuery)
      .observeCount()
    const filteredCountObservable = collection
      .query(...tableFilter({ table: 'zaehlung' }), ...hierarchyQuery)
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
    kulturIdInActiveNodeArray,
    // need to rerun if any of the values of zaehlungFilter changes
    zaehlungFilter,
  ])

  const { totalCount, filteredCount } = countState

  if (showFilter) {
    return (
      <FilterTitle
        title="Zählung"
        table="zaehlung"
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
    />
  )
}
