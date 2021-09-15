import React, { useContext, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { combineLatest } from 'rxjs'
import { Q } from '@nozbe/watermelondb'

import StoreContext from '../../../../storeContext'
import FilterTitle from '../../../shared/FilterTitle'
import FormTitle from './FormTitle'
import tableFilter from '../../../../utils/tableFilter'

const ArtFormTitleChooser = ({
  row,
  rawRow,
  showFilter,
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
    const collection = db.get('art')
    const totalCountObservable = collection
      .query(
        Q.where(
          '_deleted',
          Q.oneOf(
            filter.art._deleted === false
              ? [false]
              : filter.art._deleted === true
              ? [true]
              : [true, false, null],
          ),
        ),
      )
      .observeCount()
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
