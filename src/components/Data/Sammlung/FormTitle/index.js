import React, { useContext, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Q } from '@nozbe/watermelondb'
import { combineLatest } from 'rxjs'

import StoreContext from '../../../../storeContext'
import FilterTitle from '../../../shared/FilterTitle'
import FormTitle from './FormTitle'
import tableFilter from '../../../../utils/tableFilter'

const SammlungFormTitleChooser = ({
  row,
  rawRow,
  showFilter,
  showHistory,
  setShowHistory,
}) => {
  const store = useContext(StoreContext)
  const {
    herkunftIdInActiveNodeArray,
    personIdInActiveNodeArray,
    artIdInActiveNodeArray,
    db,
    filter,
  } = store

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
    const collection = db.get('sammlung')
    const totalCountObservable = collection
      .query(
        Q.where(
          '_deleted',
          Q.oneOf(
            filter.sammlung._deleted === false
              ? [false]
              : filter.sammlung._deleted === true
              ? [true]
              : [true, false, null],
          ),
        ),
        ...hierarchyQuery,
      )
      .observeCount()
    const filteredCountObservable = collection
      .query(...tableFilter({ store, table: 'sammlung' }), ...hierarchyQuery)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ...Object.values(store.filter.sammlung),
    store,
    filter.sammlung._deleted,
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
      rawRow={rawRow}
      totalCount={totalCount}
      filteredCount={filteredCount}
      showHistory={showHistory}
      setShowHistory={setShowHistory}
    />
  )
}

export default observer(SammlungFormTitleChooser)
