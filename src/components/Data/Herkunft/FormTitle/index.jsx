import React, { useContext, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Q } from '@nozbe/watermelondb'
import { combineLatest } from 'rxjs'

import StoreContext from '../../../../storeContext.js'
import FilterTitle from '../../../shared/FilterTitle.jsx'
import FormTitle from './FormTitle.jsx'
import tableFilter from '../../../../utils/tableFilter.js'

const HerkunftFormTitleChooser = ({
  row,
  rawRow,
  showFilter,
  showHistory,
  setShowHistory,
  activeConflict,
}) => {
  const store = useContext(StoreContext)
  const { sammlungIdInActiveNodeArray, db, filter } = store

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
    const collection = db.get('herkunft')
    const delQuery =
      filter.herkunft._deleted === false
        ? Q.where('_deleted', false)
        : filter.herkunft._deleted === true
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
      .query(...tableFilter({ store, table: 'herkunft' }), ...hierarchyQuery)
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
    // need to rerender if any of the values of herkunftFilter changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ...Object.values(store.filter.herkunft),
    store,
    filter.herkunft._deleted,
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
      rawRow={rawRow}
      totalCount={totalCount}
      filteredCount={filteredCount}
      showHistory={showHistory}
      setShowHistory={setShowHistory}
      activeConflict={activeConflict}
    />
  )
}

export default observer(HerkunftFormTitleChooser)
