import { useContext, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Q } from '@nozbe/watermelondb'
import { combineLatest } from 'rxjs'

import { MobxStoreContext } from '../../../../mobxStoreContext.js'
import { FilterTitle } from '../../../shared/FilterTitle.jsx'
import { KulturFormTitle as FormTitle } from './FormTitle.jsx'
import { tableFilter } from '../../../../utils/tableFilter.js'

export const KulturFormTitleChooser = observer( ({
  row,
  rawRow,
  showFilter,
  showHistory,
  setShowHistory,
}) => {
  const store = useContext(MobxStoreContext)
  const { artIdInActiveNodeArray, db, filter, gartenIdInActiveNodeArray } =
    store

  const [countState, setCountState] = useState({
    totalCount: 0,
    filteredCount: 0,
  })

  useEffect(() => {
    const hierarchyQuery =
      gartenIdInActiveNodeArray ?
        [
          Q.experimentalJoinTables(['garten']),
          Q.on('garten', 'id', gartenIdInActiveNodeArray),
        ]
      : artIdInActiveNodeArray ?
        [
          Q.experimentalJoinTables(['art']),
          Q.on('art', 'id', artIdInActiveNodeArray),
        ]
      : []
    const collection = db.get('kultur')
    const kulturDelQuery =
      filter.kultur._deleted === false ? Q.where('_deleted', false)
      : filter.kultur._deleted === true ? Q.where('_deleted', true)
      : Q.or(
          Q.where('_deleted', false),
          Q.where('_deleted', true),
          Q.where('_deleted', null),
        )
    const kulturAktivQuery =
      filter.kultur.aktiv === false ? Q.where('aktiv', false)
      : filter.kultur.aktiv === true ? Q.where('aktiv', true)
      : Q.or(
          Q.where('aktiv', false),
          Q.where('aktiv', true),
          Q.where('aktiv', null),
        )
    const totalCountObservable = collection
      .query(kulturDelQuery, kulturAktivQuery, ...hierarchyQuery)
      .observeCount()
    const filteredCountObservable = collection
      .query(...tableFilter({ store, table: 'kultur' }), ...hierarchyQuery)
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
    gartenIdInActiveNodeArray,
    artIdInActiveNodeArray,
    // need to rerender if any of the values of kulturFilter changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ...Object.values(store.filter.kultur),
    store,
    filter.kultur._deleted,
    filter.kultur.aktiv,
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
)
