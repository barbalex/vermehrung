import { useState, useEffect } from 'react'
import { useAtomValue } from 'jotai'
import { combineLatest } from 'rxjs'
import { Q } from '@nozbe/watermelondb'

import { dbAtom, filterPersonAtom } from '../../../../store/index.js'
import { FilterTitle } from '../../../shared/FilterTitle.jsx'
import { PersonFormTitle as FormTitle } from './FormTitle.jsx'
import { tableFilter } from '../../../../utils/tableFilter.js'

export const PersonFormTitleChooser = ({
  showFilter,
  row,
  rawRow,
  showHistory,
  setShowHistory,
}) => {
  const db = useAtomValue(dbAtom)
  const personFilter = useAtomValue(filterPersonAtom)

  const [countState, setCountState] = useState({
    totalCount: 0,
    filteredCount: 0,
  })
  useEffect(() => {
    const collection = db.get('person')
    const personDelQuery =
      personFilter._deleted === false
        ? Q.where('_deleted', false)
        : personFilter._deleted === true
          ? Q.where('_deleted', true)
          : Q.or(
              Q.where('_deleted', false),
              Q.where('_deleted', true),
              Q.where('_deleted', null),
            )
    const personAktivQuery =
      personFilter.aktiv === false
        ? Q.where('aktiv', false)
        : personFilter.aktiv === true
          ? Q.where('aktiv', true)
          : Q.or(
              Q.where('aktiv', false),
              Q.where('aktiv', true),
              Q.where('aktiv', null),
            )
    const totalCountObservable = collection
      .query(personDelQuery, personAktivQuery)
      .observeCount()
    const filteredCountObservable = collection
      .query(...tableFilter({ table: 'person' }))
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
    // need to rerender if any of the values of personFilter changes
    personFilter,
  ])

  const { totalCount, filteredCount } = countState

  if (showFilter) {
    return (
      <FilterTitle
        title="PersonFormTitleChooser"
        table="person"
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
