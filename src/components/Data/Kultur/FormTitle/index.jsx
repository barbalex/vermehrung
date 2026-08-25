import { useState, useEffect } from 'react'
import { useAtomValue } from 'jotai'
import { Q } from '@nozbe/watermelondb'
import { combineLatest } from 'rxjs'

import {
  dbAtom,
  filterKulturAtom,
  artIdInActiveNodeArrayAtom,
  gartenIdInActiveNodeArrayAtom,
} from '../../../../store/index.js'
import { FilterTitle } from '../../../shared/FilterTitle.jsx'
import { KulturFormTitle as FormTitle } from './FormTitle.jsx'
import { tableFilter } from '../../../../utils/tableFilter.js'

export const KulturFormTitleChooser = ({
  row,
  rawRow,
  showFilter,
  showHistory,
  setShowHistory,
}) => {
  const db = useAtomValue(dbAtom)
  const gartenIdInActiveNodeArray = useAtomValue(gartenIdInActiveNodeArrayAtom)
  const artIdInActiveNodeArray = useAtomValue(artIdInActiveNodeArrayAtom)
  const kulturFilter = useAtomValue(filterKulturAtom)

  const [countState, setCountState] = useState({
    totalCount: 0,
    filteredCount: 0,
  })

  useEffect(() => {
    const hierarchyQuery = gartenIdInActiveNodeArray
      ? [
          Q.experimentalJoinTables(['garten']),
          Q.on('garten', 'id', gartenIdInActiveNodeArray),
        ]
      : artIdInActiveNodeArray
        ? [
            Q.experimentalJoinTables(['art']),
            Q.on('art', 'id', artIdInActiveNodeArray),
          ]
        : []
    const collection = db.get('kultur')
    const kulturDelQuery =
      kulturFilter._deleted === false
        ? Q.where('_deleted', false)
        : kulturFilter._deleted === true
          ? Q.where('_deleted', true)
          : Q.or(
              Q.where('_deleted', false),
              Q.where('_deleted', true),
              Q.where('_deleted', null),
            )
    const kulturAktivQuery =
      kulturFilter.aktiv === false
        ? Q.where('aktiv', false)
        : kulturFilter.aktiv === true
          ? Q.where('aktiv', true)
          : Q.or(
              Q.where('aktiv', false),
              Q.where('aktiv', true),
              Q.where('aktiv', null),
            )
    const totalCountObservable = collection
      .query(kulturDelQuery, kulturAktivQuery, ...hierarchyQuery)
      .observeCount()
    const filteredCountObservable = collection
      .query(...tableFilter({ table: 'kultur' }), ...hierarchyQuery)
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
    gartenIdInActiveNodeArray,
    artIdInActiveNodeArray,
    // need to rerender if any of the values of kulturFilter changes
    kulturFilter,
  ])

  const { totalCount, filteredCount } = countState

  if (showFilter) {
    return (
      <FilterTitle
        title="Kultur"
        table="kultur"
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
