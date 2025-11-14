import { useContext, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'
import { List } from 'react-window'
import { combineLatest } from 'rxjs'
import { Q } from '@nozbe/watermelondb'

import { MobxStoreContext } from '../../../mobxStoreContext.js'
import { FilterTitle } from '../../shared/FilterTitle.jsx'
import { SammelLieferungRow as Row } from './Row.jsx'
import { ErrorBoundary } from '../../shared/ErrorBoundary.jsx'
import { FilterNumbers } from '../../shared/FilterNumbers.jsx'
import UpSvg from '../../../svg/to_up.svg?react'
import { tableFilter } from '../../../utils/tableFilter.js'
import { lieferungSort } from '../../../utils/lieferungSort.js'
import { constants } from '../../../utils/constants.js'

import {
  container,
  titleContainer,
  title,
  titleSymbols,
  fieldsContainer,
} from '../Arten/index.module.css'

export const SammelLieferungen = observer(({ filter: showFilter = false }) => {
  const store = useContext(MobxStoreContext)
  const { insertSammelLieferungRev, db, filter } = store
  const { activeNodeArray, setActiveNodeArray, removeOpenNode } = store.tree
  const { sammel_lieferung: sammelLieferungFilter } = store.filter

  const [dataState, setDataState] = useState({
    sammelLieferungs: [],
    totalCount: 0,
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
    const countObservable = collection
      .query(sammelLieferungDelQuery)
      .observeCount()
    const dataObservable = collection
      .query(
        ...tableFilter({
          table: 'sammel_lieferung',
          store,
        }),
      )
      .observeWithColumns(['gemeinde', 'lokalname', 'nr'])
    const combinedObservables = combineLatest([countObservable, dataObservable])
    const subscription = combinedObservables.subscribe(
      ([totalCount, sammelLieferungs]) => {
        setDataState({
          sammelLieferungs: sammelLieferungs.sort(lieferungSort),
          totalCount,
        })
      },
    )

    return () => subscription?.unsubscribe?.()
  }, [
    db,
    // need to rerender if any of the values of sammelLieferungFilter changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ...Object.values(sammelLieferungFilter),
    sammelLieferungFilter,
    store,
    filter.sammel_lieferung._deleted,
  ])

  const { sammelLieferungs, totalCount } = dataState
  const filteredCount = sammelLieferungs.length

  const onClickUp = () => {
    removeOpenNode(activeNodeArray)
    setActiveNodeArray(activeNodeArray.slice(0, -1))
  }

  let upTitle = 'Eine Ebene höher'
  if (activeNodeArray[0] === 'Sammel-Lieferungen') {
    upTitle = 'Zu allen Listen'
  }

  return (
    <ErrorBoundary>
      <div
        className={container}
        style={{ backgroundColor: showFilter ? '#fff3e0' : 'unset' }}
      >
        {showFilter ?
          <FilterTitle
            title="Sammel-Lieferung"
            table="sammel_lieferung"
            totalCount={totalCount}
            filteredCount={filteredCount}
          />
        : <div className={titleContainer}>
            <div className={title}>Sammel-Lieferungen</div>
            <div className={titleSymbols}>
              <IconButton
                title={upTitle}
                onClick={onClickUp}
                size="large"
              >
                <UpSvg />
              </IconButton>
              <IconButton
                aria-label="neue Sammel-Lieferung"
                title="neue Sammel-Lieferung"
                onClick={insertSammelLieferungRev}
                size="large"
              >
                <FaPlus />
              </IconButton>
              <FilterNumbers
                filteredCount={filteredCount}
                totalCount={totalCount}
              />
            </div>
          </div>
        }
        <div className={fieldsContainer}>
          <List
            rowComponent={Row}
            rowCount={sammelLieferungs.length}
            rowHeight={constants.singleRowHeight}
            rowProps={{ rows: sammelLieferungs }}
          />
        </div>
      </div>
    </ErrorBoundary>
  )
})
