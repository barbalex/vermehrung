import React, { useContext, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { combineLatest } from 'rxjs'
import { Q } from '@nozbe/watermelondb'

import StoreContext from '../../../../storeContext.js'
import FilterTitle from '../../../shared/FilterTitle'
import FormTitle from './FormTitle'
import tableFilter from '../../../../utils/tableFilter'

const PersonFormTitleChooser = ({
  showFilter,
  row,
  rawRow,
  showHistory,
  setShowHistory,
}) => {
  const store = useContext(StoreContext)
  const { db, filter } = store

  const [countState, setCountState] = useState({
    totalCount: 0,
    filteredCount: 0,
  })
  useEffect(() => {
    const collection = db.get('person')
    const personDelQuery =
      filter.person._deleted === false
        ? Q.where('_deleted', false)
        : filter.person._deleted === true
        ? Q.where('_deleted', true)
        : Q.or(
            Q.where('_deleted', false),
            Q.where('_deleted', true),
            Q.where('_deleted', null),
          )
    const personAktivQuery =
      filter.person.aktiv === false
        ? Q.where('aktiv', false)
        : filter.person.aktiv === true
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
      .query(...tableFilter({ store, table: 'person' }))
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ...Object.values(filter.person),
    store,
    filter.person._deleted,
    filter.person.aktiv,
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

export default observer(PersonFormTitleChooser)
