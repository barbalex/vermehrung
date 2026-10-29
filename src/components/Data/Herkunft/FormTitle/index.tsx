import { useState, useEffect } from 'react'
import { useAtomValue } from 'jotai'
import { Q } from 'nitromelondb'
import { combineLatest } from 'rxjs'

import {
  dbAtom,
  filterHerkunftAtom,
  sammlungIdInActiveNodeArrayAtom,
} from '../../../../store/index.ts'
import { FilterTitle } from '../../../shared/FilterTitle.tsx'
import { HerkunftFormTitle as FormTitle } from './FormTitle.tsx'
import { tableFilter } from '../../../../utils/tableFilter.ts'

export const HerkunftFormTitleChooser = ({
  row,
  showFilter,
  showHistory,
  activeConflict,
}: {
  row?: import('../../../../dbModel.ts').Herkunft | null | undefined
  showFilter: boolean
  showHistory: boolean
  activeConflict: string | null
}) => {
  const db = useAtomValue(dbAtom)
  const sammlungIdInActiveNodeArray = useAtomValue(
    sammlungIdInActiveNodeArrayAtom,
  )
  const herkunftFilter = useAtomValue(filterHerkunftAtom)

  const [countState, setCountState] = useState({
    totalCount: 0,
    filteredCount: 0,
  })
  useEffect(() => {
    const hierarchyQuery = sammlungIdInActiveNodeArray
      ? [
          Q.experimentalJoinTables(['sammlung']),
          Q.on('sammlung', 'id', sammlungIdInActiveNodeArray),
        ]
      : []
    const collection =
      db?.get<import('../../../../dbModel.ts').Herkunft>('herkunft')
    if (!collection) return
    const delQuery =
      herkunftFilter._deleted === false
        ? Q.where('_deleted', false)
        : herkunftFilter._deleted === true
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
      .query(...tableFilter({ table: 'herkunft' }), ...hierarchyQuery)
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
    sammlungIdInActiveNodeArray,
    // need to rerun if any of the values of herkunftFilter changes
    herkunftFilter,
  ])

  const { totalCount, filteredCount } = countState

  if (showFilter) {
    return (
      <FilterTitle
        title="Herkunft"
        table="herkunft"
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
      activeConflict={activeConflict}
    />
  )
}
