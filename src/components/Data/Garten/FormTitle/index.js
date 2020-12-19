import React, { useContext, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Q } from '@nozbe/watermelondb'
import { combineLatest } from 'rxjs'

import StoreContext from '../../../../storeContext'
import FilterTitle from '../../../shared/FilterTitle'
import FormTitle from './FormTitle'
import tableFilter from '../../../../utils/tableFilter'

const GartenFormTitle = ({
  showFilter,
  row,
  rawRow,
  showHistory,
  setShowHistory,
}) => {
  const store = useContext(StoreContext)
  const { personIdInActiveNodeArray, db } = store

  const [countState, setCountState] = useState({
    totalCount: 0,
    filteredCount: 0,
  })
  useEffect(() => {
    const hierarchyQuery = personIdInActiveNodeArray
      ? [
          Q.experimentalJoinTables(['person']),
          Q.on('person', 'id', personIdInActiveNodeArray),
        ]
      : []
    const collection = db.get('garten')
    const totalCountObservable = collection
      .query(
        Q.where('_deleted', false),
        Q.where('aktiv', true),
        ...hierarchyQuery,
      )
      .observeCount()
    const filteredCountObservable = collection
      .query(...tableFilter({ store, table: 'garten' }), ...hierarchyQuery)
      .observeCount()
    const combinedObservables = combineLatest([
      totalCountObservable,
      filteredCountObservable,
    ])
    const allSubscription = combinedObservables.subscribe(
      ([totalCount, filteredCount]) =>
        setCountState({ totalCount, filteredCount }),
    )

    return () => allSubscription.unsubscribe()
  }, [
    db,
    personIdInActiveNodeArray,
    // need to rerender if any of the values of gartenFilter changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ...Object.values(store.filter.garten),
    store,
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
      rawRow={rawRow}
      showHistory={showHistory}
      setShowHistory={setShowHistory}
      totalCount={totalCount}
      filteredCount={filteredCount}
    />
  )
}

export default observer(GartenFormTitle)
