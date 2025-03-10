import React, { useContext, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Q } from '@nozbe/watermelondb'
import { combineLatest } from 'rxjs'

import { MobxStoreContext } from '../../../../mobxStoreContext.js'
import { FilterTitle } from '../../../shared/FilterTitle.jsx'
import { ZaehlungFormTitle as FormTitle } from './FormTitle.jsx'
import { tableFilter } from '../../../../utils/tableFilter.js'

export const ZaehlungFormTitleChooser = observer(
  ({ row, rawRow, showFilter, showHistory, setShowHistory }) => {
    const store = useContext(MobxStoreContext)
    const { kulturIdInActiveNodeArray, db, filter } = store

    const [countState, setCountState] = useState({
      totalCount: 0,
      filteredCount: 0,
    })
    useEffect(() => {
      const hierarchyQuery =
        kulturIdInActiveNodeArray ?
          [
            Q.experimentalJoinTables(['kultur']),
            Q.on('kultur', 'id', kulturIdInActiveNodeArray),
          ]
        : []
      const collection = db.get('zaehlung')
      const zaehlungDelQuery =
        filter.zaehlung._deleted === false ? Q.where('_deleted', false)
        : filter.zaehlung._deleted === true ? Q.where('_deleted', true)
        : Q.or(
            Q.where('_deleted', false),
            Q.where('_deleted', true),
            Q.where('_deleted', null),
          )
      const totalCountObservable = collection
        .query(zaehlungDelQuery, ...hierarchyQuery)
        .observeCount()
      const filteredCountObservable = collection
        .query(...tableFilter({ store, table: 'zaehlung' }), ...hierarchyQuery)
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
      // need to rerender if any of the values of zaehlungFilter changes
      // eslint-disable-next-line react-hooks/exhaustive-deps
      ...Object.values(store.filter.zaehlung),
      store,
      filter.zaehlung._deleted,
    ])

    const { totalCount, filteredCount } = countState

    if (showFilter) {
      return (
        <FilterTitle
          title="Zählung"
          table="zaehlung"
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
  },
)
