import { useState, useEffect } from 'react'
import { useAtomValue } from 'jotai'
import { Q } from 'nitromelondb'
import { combineLatest } from 'rxjs'

import {
  dbAtom,
  personIdInActiveNodeArrayAtom,
  filterGartenAtom,
} from '../../../../store/index.ts'
import { FilterTitle } from '../../../shared/FilterTitle.tsx'
import { GartenFormTitle as FormTitle } from './FormTitle.tsx'
import { tableFilter } from '../../../../utils/tableFilter.ts'
import { triStateDeletedQuery } from '../../../../utils/triStateDeletedQuery.ts'

export const GartenFormTitle = ({
  row,
  showFilter,
  showHistory,
}: {
  row?: import('../../../../dbModel.ts').Garten | null | undefined
  showFilter: boolean
  showHistory: boolean
}) => {
  const db = useAtomValue(dbAtom)
  const personIdInActiveNodeArray = useAtomValue(personIdInActiveNodeArrayAtom)
  const gartenFilter = useAtomValue(filterGartenAtom)

  const [countState, setCountState] = useState({
    totalCount: 0,
    filteredCount: 0,
  })
  useEffect(() => {
    const hierarchyQuery =
      personIdInActiveNodeArray ?
        [
          Q.experimentalJoinTables(['person']),
          Q.on('person', 'id', personIdInActiveNodeArray),
        ]
      : []
    const collection =
      db?.get<import('../../../../dbModel.ts').Garten>('garten')
    if (!collection) return
    const delQuery = triStateDeletedQuery(gartenFilter._deleted)
    const aktivQuery =
      gartenFilter.aktiv === false ? Q.where('aktiv', false)
      : gartenFilter.aktiv === true ? Q.where('aktiv', true)
      : Q.or(
          Q.where('aktiv', false),
          Q.where('aktiv', true),
          Q.where('aktiv', null),
        )
    const totalCountObservable = collection
      .query(delQuery, aktivQuery, ...hierarchyQuery)
      .observeCount()
    const filteredCountObservable = collection
      .query(...tableFilter({ table: 'garten' }), ...hierarchyQuery)
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
    personIdInActiveNodeArray,
    // need to rerender if any of the values of gartenFilter changes

    gartenFilter,
  ])

  const { totalCount, filteredCount } = countState

  if (showFilter) {
    return (
      <FilterTitle
        title="Garten"
        table="garten"
        totalCount={totalCount}
        filteredCount={filteredCount}
      />
    )
  }

  return (
    <FormTitle
      row={row}
      showHistory={showHistory}
      totalCount={totalCount}
      filteredCount={filteredCount}
    />
  )
}
