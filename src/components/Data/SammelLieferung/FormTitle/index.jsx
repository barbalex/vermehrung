import React, { useContext, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { combineLatest } from 'rxjs'
import { Q } from '@nozbe/watermelondb'

import { MobxStoreContext } from '../../../../mobxStoreContext.js'
import { FilterTitle } from '../../../shared/FilterTitle.jsx'
import { SammelLieferungFormTitle as FormTitle } from './FormTitle.jsx'
import { tableFilter } from '../../../../utils/tableFilter.js'

export const SammelLieferungFormTitleChooser = observer(
  ({
    lieferung,
    printPreview,
    row,
    rawRow,
    setPrintPreview,
    showFilter,
    showHistory,
    setShowHistory,
  }) => {
    const store = useContext(MobxStoreContext)

    const { filter, db } = store

    const [countState, setCountState] = useState({
      totalCount: 0,
      filteredCount: 0,
    })
    useEffect(() => {
      const collection = db.get('sammel_lieferung')
      const sammelLieferungDelQuery =
        filter.sammel_lieferung._deleted === false ? Q.where('_deleted', false)
        : filter.sammel_lieferung._deleted === true ? Q.where('_deleted', true)
        : Q.or(
            Q.where('_deleted', false),
            Q.where('_deleted', true),
            Q.where('_deleted', null),
          )
      const totalCountObservable = collection
        .query(sammelLieferungDelQuery)
        .observeCount()
      const filteredCountObservable = collection
        .query(...tableFilter({ store, table: 'sammel_lieferung' }))
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
      // need to rerender if any of the values of sammel_lieferungFilter changes
      // eslint-disable-next-line react-hooks/exhaustive-deps
      ...Object.values(store.filter.sammel_lieferung),
      store,
      filter.sammel_lieferung._deleted,
    ])

    const { totalCount, filteredCount } = countState

    if (!row || (!showFilter && filter.show)) return null

    if (showFilter) {
      return (
        <FilterTitle
          title="Sammel-Lieferung"
          table="sammel_lieferung"
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
        showFilter={showFilter}
        lieferung={lieferung}
        printPreview={printPreview}
        setPrintPreview={setPrintPreview}
        showHistory={showHistory}
        setShowHistory={setShowHistory}
      />
    )
  },
)
