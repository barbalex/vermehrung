import { useState, useEffect } from 'react'
import { useAtomValue } from 'jotai'
import { Q } from '@nozbe/watermelondb'
import { combineLatest } from 'rxjs'

import {
  dbAtom,
  kulturIdInActiveNodeArrayAtom,
  filterTeilkulturAtom,
} from '../../../../store/index.js'
import { FilterTitle } from '../../../shared/FilterTitle.jsx'
import { TeilkulturFormTitle as FormTitle } from './FormTitle.jsx'
import { tableFilter } from '../../../../utils/tableFilter.js'

export const TeilkulturFormTitleChooser = ({
  row,
  rawRow,
  showFilter,
  showHistory,
  setShowHistory,
}) => {
  const db = useAtomValue(dbAtom)
  const kulturIdInActiveNodeArray = useAtomValue(kulturIdInActiveNodeArrayAtom)
  const teilkulturFilter = useAtomValue(filterTeilkulturAtom)

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
    const collection = db.get('teilkultur')
    const teilkulturDelQuery =
      teilkulturFilter._deleted === false
        ? Q.where('_deleted', false)
        : teilkulturFilter._deleted === true
          ? Q.where('_deleted', true)
          : Q.or(
              Q.where('_deleted', false),
              Q.where('_deleted', true),
              Q.where('_deleted', null),
            )
    const totalCountObservable = collection
      .query(teilkulturDelQuery, ...hierarchyQuery)
      .observeCount()
    const filteredCountObservable = collection
      .query(...tableFilter({ table: 'teilkultur' }), ...hierarchyQuery)
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
    // need to rerender if any of the values of teilkulturFilter changes
    teilkulturFilter,
  ])

  const { totalCount, filteredCount } = countState

  if (showFilter) {
    return (
      <FilterTitle
        title="Teilkultur"
        table="teilkultur"
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
