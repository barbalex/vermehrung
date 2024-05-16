import React, { useContext, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Q } from '@nozbe/watermelondb'
import { combineLatest } from 'rxjs'

import StoreContext from '../../../../../storeContext.js'
import FilterTitle from '../../../../shared/FilterTitle.jsx'
import FormTitle from './FormTitle'
import tableFilter from '../../../../../utils/tableFilter.js'

const LieferungTitleChooser = ({
  row,
  rawRow,
  showFilter,
  showHistory,
  setShowHistory,
}) => {
  const store = useContext(StoreContext)

  const {
    kulturIdInActiveNodeArray,
    personIdInActiveNodeArray,
    sammelLieferungIdInActiveNodeArray,
    sammlungIdInActiveNodeArray,
    db,
    filter,
  } = store
  const { activeNodeArray } = store.tree

  const [countState, setCountState] = useState({
    totalCount: 0,
    filteredCount: 0,
  })
  useEffect(() => {
    const hierarchyQuery =
      kulturIdInActiveNodeArray && activeNodeArray.includes('Aus-Lieferungen')
        ? [Q.where('von_kultur_id', kulturIdInActiveNodeArray)]
        : kulturIdInActiveNodeArray &&
          activeNodeArray.includes('An-Lieferungen')
        ? [Q.where('nach_kultur_id', kulturIdInActiveNodeArray)]
        : sammelLieferungIdInActiveNodeArray && !kulturIdInActiveNodeArray
        ? [
            Q.experimentalJoinTables(['sammel_lieferung']),
            Q.on('sammel_lieferung', 'id', sammelLieferungIdInActiveNodeArray),
          ]
        : personIdInActiveNodeArray && !kulturIdInActiveNodeArray
        ? [
            Q.experimentalJoinTables(['person']),
            Q.on('person', 'id', personIdInActiveNodeArray),
          ]
        : sammlungIdInActiveNodeArray && !kulturIdInActiveNodeArray
        ? [
            Q.experimentalJoinTables(['sammlung']),
            Q.on('sammlung', 'id', sammlungIdInActiveNodeArray),
          ]
        : []
    const collection = db.get('lieferung')
    const lieferungDelQuery =
      filter.lieferung._deleted === false
        ? Q.where('_deleted', false)
        : filter.lieferung._deleted === true
        ? Q.where('_deleted', true)
        : Q.or(
            Q.where('_deleted', false),
            Q.where('_deleted', true),
            Q.where('_deleted', null),
          )
    const totalCountObservable = collection
      .query(lieferungDelQuery, ...hierarchyQuery)
      .observeCount()
    const filteredCountObservable = collection
      .query(...tableFilter({ store, table: 'lieferung' }), ...hierarchyQuery)
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
    kulturIdInActiveNodeArray,
    sammelLieferungIdInActiveNodeArray,
    personIdInActiveNodeArray,
    sammlungIdInActiveNodeArray,
    // need to rerender if any of the values of lieferungFilter changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ...Object.values(store.filter.lieferung),
    store,
    activeNodeArray,
    filter.lieferung._deleted,
  ])

  const { totalCount, filteredCount } = countState

  /*const hierarchyFilter = (e) => {
    if (kulturIdInActiveNodeArray) {
      if (activeNodeArray.includes('Aus-Lieferungen')) {
        return e.von_kultur_id === kulturIdInActiveNodeArray
      }
      if (activeNodeArray.includes('An-Lieferungen')) {
        return e.nach_kultur_id === kulturIdInActiveNodeArray
      }
    }
    if (sammelLieferungIdInActiveNodeArray && !kulturIdInActiveNodeArray) {
      return e.sammel_lieferung_id === sammelLieferungIdInActiveNodeArray
    }
    if (personIdInActiveNodeArray && !kulturIdInActiveNodeArray) {
      return e.person_id === personIdInActiveNodeArray
    }
    if (sammlungIdInActiveNodeArray && !kulturIdInActiveNodeArray) {
      return e.von_sammlung_id === sammlungIdInActiveNodeArray
    }
    return true
  }*/

  if (showFilter) {
    return (
      <FilterTitle
        title="Lieferung"
        table="lieferung"
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

export default observer(LieferungTitleChooser)
