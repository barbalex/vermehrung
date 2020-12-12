import React, { useContext, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Q } from '@nozbe/watermelondb'
import { combineLatest } from 'rxjs'

import { StoreContext } from '../../../../models/reactUtils'
import FilterTitle from '../../../shared/FilterTitle'
import FormTitle from './FormTitle'
import notDeletedQuery from '../../../../utils/notDeletedQuery'
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
  const { sammlungIdInActiveNodeArray, db } = store

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
    const collection = db.collections.get('herkunft')
    const totalCountObservable = collection
      .query(notDeletedQuery, ...hierarchyQuery)
      .observeCount(false)
    const filteredCountObservable = collection
      .query(...tableFilter({ store, table: 'herkunft' }), ...hierarchyQuery)
      .observeCount(false)
    const allCollectionsObservable = combineLatest([
      totalCountObservable,
      filteredCountObservable,
    ])
    const allSubscription = allCollectionsObservable.subscribe(
      ([totalCount, filteredCount]) => {
        console.log('Herkunft, FormTitle', { totalCount, filteredCount })
        setCountState({ totalCount, filteredCount })
      },
    )

    return () => allSubscription.unsubscribe()
  }, [
    db.collections,
    sammlungIdInActiveNodeArray,
    // need to rerender if any of the values of herkunftFilter changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ...Object.values(store.filter.herkunft),
    store,
  ])

  const { totalCount, filteredCount } = countState

  if (showFilter) {
    return (
      <FilterTitle
        title="Herkunft"
        table="herkunft"
        totalNr={totalCount}
        filteredNr={filteredCount}
      />
    )
  }

  return (
    <FormTitle
      row={row}
      rawRow={rawRow}
      totalNr={totalCount}
      filteredNr={filteredCount}
      showHistory={showHistory}
      setShowHistory={setShowHistory}
      activeConflict={activeConflict}
    />
  )
}

export default observer(HerkunftFormTitleChooser)
