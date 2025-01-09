import React, { useContext, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { combineLatest } from 'rxjs'
import { Q } from '@nozbe/watermelondb'

import { MobxStoreContext } from '../../../../mobxStoreContext.js'
import FilterTitle from '../../../shared/FilterTitle.jsx'
import FormTitle from './FormTitle.jsx'
import tableFilter from '../../../../utils/tableFilter.js'

const ArtFormTitleChooser = ({
  row,
  rawRow,
  showFilter,
  showHistory,
  setShowHistory,
}) => {
  const store = useContext(MobxStoreContext)
  const { db, filter } = store

  const [countState, setCountState] = useState({
    totalCount: 0,
    filteredCount: 0,
  })
  useEffect(() => {
    const collection = db.get('art')
    const delQuery =
      filter.art._deleted === false
        ? Q.where('_deleted', false)
        : filter.art._deleted === true
          ? Q.where('_deleted', true)
          : Q.or(
              Q.where('_deleted', false),
              Q.where('_deleted', true),
              Q.where('_deleted', null),
            )
    const totalCountObservable = collection.query(delQuery).observeCount()
    const filteredCountObservable = collection
      .query(...tableFilter({ store, table: 'art' }))
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
    // need to rerender if any of the values of artFilter changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ...Object.values(store.filter.art),
    store,
    filter.art._deleted,
  ])

  const { totalCount, filteredCount } = countState

  if (showFilter) {
    return (
      <FilterTitle
        title="Art"
        table="art"
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

export default observer(ArtFormTitleChooser)
