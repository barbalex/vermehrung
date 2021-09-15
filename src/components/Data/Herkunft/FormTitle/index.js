import React, { useContext, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Q } from '@nozbe/watermelondb'
import { combineLatest } from 'rxjs'

import StoreContext from '../../../../storeContext'
import FilterTitle from '../../../shared/FilterTitle'
import FormTitle from './FormTitle'
import tableFilter from '../../../../utils/tableFilter'

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
    const totalCountObservable = collection
      .query(
        Q.where(
          '_deleted',
          Q.oneOf(
            filter.herkunft._deleted === false
              ? [false]
              : filter.herkunft._deleted === true
              ? [true]
              : [true, false, null],
          ),
        ),
        ...hierarchyQuery,
      )
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
