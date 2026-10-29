import { useState, useEffect } from 'react'
import { useAtomValue } from 'jotai'
import { Q } from 'nitromelondb'
import { combineLatest } from 'rxjs'

import {
  dbAtom,
  herkunftIdInActiveNodeArrayAtom,
  personIdInActiveNodeArrayAtom,
  artIdInActiveNodeArrayAtom,
  filterSammlungAtom,
} from '../../../../store/index.ts'
import { FilterTitle } from '../../../shared/FilterTitle.tsx'
import { SammlungFormTitle as FormTitle } from './FormTitle.tsx'
import { tableFilter } from '../../../../utils/tableFilter.ts'

export const SammlungFormTitleChooser = ({
  row,
  showFilter,
  showHistory,
}: {
  row?: import('../../../../dbModel.ts').Sammlung | null | undefined
  showFilter: boolean
  showHistory: boolean
}) => {
  const db = useAtomValue(dbAtom)
  const herkunftIdInActiveNodeArray = useAtomValue(
    herkunftIdInActiveNodeArrayAtom,
  )
  const personIdInActiveNodeArray = useAtomValue(personIdInActiveNodeArrayAtom)
  const artIdInActiveNodeArray = useAtomValue(artIdInActiveNodeArrayAtom)
  const sammlungFilter = useAtomValue(filterSammlungAtom)

  const [countState, setCountState] = useState({
    totalCount: 0,
    filteredCount: 0,
  })
  useEffect(() => {
    const hierarchyQuery = artIdInActiveNodeArray
      ? [
          Q.experimentalJoinTables(['art']),
          Q.on('art', 'id', artIdInActiveNodeArray),
        ]
      : herkunftIdInActiveNodeArray
        ? [
            Q.experimentalJoinTables(['herkunft']),
            Q.on('herkunft', 'id', herkunftIdInActiveNodeArray),
          ]
        : personIdInActiveNodeArray
          ? [
              Q.experimentalJoinTables(['person']),
              Q.on('person', 'id', personIdInActiveNodeArray),
            ]
          : []
    const collection =
      db?.get<import('../../../../dbModel.ts').Sammlung>('sammlung')
    if (!collection) return
    const sammlungDelQuery =
      sammlungFilter._deleted === false
        ? Q.where('_deleted', false)
        : sammlungFilter._deleted === true
          ? Q.where('_deleted', true)
          : Q.or(
              Q.where('_deleted', false),
              Q.where('_deleted', true),
              Q.where('_deleted', null),
            )
    const totalCountObservable = collection
      .query(sammlungDelQuery, ...hierarchyQuery)
      .observeCount()
    const filteredCountObservable = collection
      .query(...tableFilter({ table: 'sammlung' }), ...hierarchyQuery)
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
    artIdInActiveNodeArray,
    herkunftIdInActiveNodeArray,
    personIdInActiveNodeArray,
    // need to rerender if any of the values of sammlungFilter changes
    sammlungFilter,
  ])

  const { totalCount, filteredCount } = countState

  if (showFilter) {
    return (
      <FilterTitle
        title="Sammlung"
        table="sammlung"
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
