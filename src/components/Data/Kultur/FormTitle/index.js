import React, { useContext, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Q } from '@nozbe/watermelondb'
import { combineLatest } from 'rxjs'

import { StoreContext } from '../../../../models/reactUtils'
import FilterTitle from '../../../shared/FilterTitle'
import FormTitle from './FormTitle'
import notDeletedQuery from '../../../../utils/notDeletedQuery'
import tableFilter from '../../../../utils/tableFilter'

const KulturFormTitleChooser = ({
  row,
  rawRow,
  showFilter,
  showHistory,
  setShowHistory,
}) => {
  const store = useContext(StoreContext)
  const { gartenIdInActiveNodeArray, artIdInActiveNodeArray, db } = store

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
    const collection = db.collections.get('garten')
    const totalCountObservable = collection
      .query(notDeletedQuery, ...hierarchyQuery)
      .observeCount()
    const filteredCountObservable = collection
      .query(...tableFilter({ store, table: 'garten' }), ...hierarchyQuery)
      .observeCount()
    const allCollectionsObservable = combineLatest([
      totalCountObservable,
      filteredCountObservable,
    ])
    const allSubscription = allCollectionsObservable.subscribe(
      ([totalCount, filteredCount]) =>
        setCountState({ totalCount, filteredCount }),
    )

    return () => allSubscription.unsubscribe()
  }, [
    db.collections,
    gartenIdInActiveNodeArray,
    artIdInActiveNodeArray,
    // need to rerender if any of the values of gartenFilter changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ...Object.values(store.filter.garten),
    store,
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

export default observer(KulturFormTitleChooser)
