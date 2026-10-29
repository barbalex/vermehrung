import { useState, useEffect } from 'react'
import { useAtomValue } from 'jotai'
import { Q } from '@nozbe/watermelondb'
import { combineLatest } from 'rxjs'

import {
  dbAtom,
  filterBedarfAtom,
  kulturIdInActiveNodeArrayAtom,
} from '../../../../store/index.ts'
import { FilterTitle } from '../../../shared/FilterTitle.tsx'
import { BedarfFormTitle as FormTitle } from './FormTitle.tsx'
import { tableFilter } from '../../../../utils/tableFilter.ts'

export const BedarfFormTitle = ({
  row,
  showFilter,
  showHistory,
}: {
  row?: import('../../../../dbModel.ts').Bedarf | null | undefined
  showFilter: boolean
  showHistory: boolean
}) => {
  const db = useAtomValue(dbAtom)
  const kulturIdInActiveNodeArray = useAtomValue(kulturIdInActiveNodeArrayAtom)
  const bedarfFilter = useAtomValue(filterBedarfAtom)

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
    const collection =
      db?.get<import('../../../../dbModel.ts').Bedarf>('bedarf')
    if (!collection) return
    const delQuery =
      bedarfFilter._deleted === false
        ? Q.where('_deleted', false)
        : bedarfFilter._deleted === true
          ? Q.where('_deleted', true)
          : Q.or(
              Q.where('_deleted', false),
              Q.where('_deleted', true),
              Q.where('_deleted', null),
            )
    const totalCountObservable = collection
      .query(delQuery, ...hierarchyQuery)
      .observeCount()
    const filteredCountObservable = collection
      .query(...tableFilter({ table: 'bedarf' }), ...hierarchyQuery)
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
    // need to rerender if any of the values of bedarfFilter changes
    bedarfFilter,
  ])

  const { totalCount, filteredCount } = countState

  if (showFilter) {
    return (
      <FilterTitle
        title="Bedarf"
        table="bedarf"
        totalCount={totalCount}
        filteredCount={filteredCount}
      />
    )
  }

  return (
    <FormTitle
      row={row}
      totalCount={totalCount}
      filteredCount={filteredCount}
      showHistory={showHistory}
    />
  )
}
