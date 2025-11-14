import { useContext, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'
import { List } from 'react-window'
import { Q } from '@nozbe/watermelondb'
import { combineLatest } from 'rxjs'

import { MobxStoreContext } from '../../../mobxStoreContext.js'
import { FilterTitle } from '../../shared/FilterTitle.jsx'
import { TeilkulturRow as Row } from './Row.jsx'
import { ErrorBoundary } from '../../shared/ErrorBoundary.jsx'
import { FilterNumbers } from '../../shared/FilterNumbers.jsx'
import UpSvg from '../../../svg/to_up.svg?react'
import { tableFilter } from '../../../utils/tableFilter.js'
import { teilkulturSort } from '../../../utils/teilkulturSort.js'
import { constants } from '../../../utils/constants.js'

import {
  container,
  titleContainer,
  title,
  titleSymbols,
  fieldsContainer,
} from '../Arten/index.module.css'

export const Teilkulturen = observer(({ filter: showFilter = false }) => {
  const store = useContext(MobxStoreContext)
  const { insertTeilkulturRev, kulturIdInActiveNodeArray, db, filter } = store
  const { activeNodeArray, setActiveNodeArray, removeOpenNode } = store.tree
  const { teilkultur: teilkulturFilter } = store.filter

  const [dataState, setDataState] = useState({ teilkulturs: [], totalCount: 0 })
  useEffect(() => {
    const hierarchyQuery =
      kulturIdInActiveNodeArray ?
        [
          Q.experimentalJoinTables(['kultur']),
          Q.on('kultur', 'id', kulturIdInActiveNodeArray),
        ]
      : []
    const collection = db.get('teilkultur')
    const teilkulturDelQuery =
      filter.teilkultur._deleted === false ? Q.where('_deleted', false)
      : filter.teilkultur._deleted === true ? Q.where('_deleted', true)
      : Q.or(
          Q.where('_deleted', false),
          Q.where('_deleted', true),
          Q.where('_deleted', null),
        )
    const countObservable = collection
      .query(teilkulturDelQuery, ...hierarchyQuery)
      .observeCount()
    const dataObservable = collection
      .query(
        ...tableFilter({
          table: 'teilkultur',
          store,
        }),
        ...hierarchyQuery,
      )
      .observeWithColumns(['name', 'ort1', 'ort2', 'ort3'])
    const combinedObservables = combineLatest([countObservable, dataObservable])
    const subscription = combinedObservables.subscribe(
      ([totalCount, teilkulturs]) => {
        setDataState({
          teilkulturs: teilkulturs.sort(teilkulturSort),
          totalCount,
        })
      },
    )

    return () => subscription?.unsubscribe?.()
  }, [
    db,
    // need to rerender if any of the values of teilkulturFilter changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ...Object.values(teilkulturFilter),
    teilkulturFilter,
    kulturIdInActiveNodeArray,
    store,
    filter.teilkultur._deleted,
  ])

  const { teilkulturs, totalCount } = dataState
  const filteredCount = teilkulturs.length

  const onClickUp = () => {
    removeOpenNode(activeNodeArray)
    setActiveNodeArray(activeNodeArray.slice(0, -1))
  }

  let upTitle = 'Eine Ebene höher'
  if (activeNodeArray[0] === 'Teilkulturen') {
    upTitle = 'Zu allen Listen'
  }
  if (activeNodeArray[activeNodeArray.length - 3] === 'Kulturen') {
    upTitle = 'Zur Kultur'
  }

  return (
    <ErrorBoundary>
      <div
        className={container}
        style={{ backgroundColor: showFilter ? '#fff3e0' : 'unset' }}
      >
        {showFilter ?
          <FilterTitle
            title="Teilkultur"
            table="teilkultur"
            totalCount={totalCount}
            filteredCount={filteredCount}
          />
        : <div className={titleContainer}>
            <div className={title}>Teilkulturen</div>
            <div className={titleSymbols}>
              <IconButton
                title={upTitle}
                onClick={onClickUp}
                size="large"
              >
                <UpSvg />
              </IconButton>
              <IconButton
                aria-label="neue Teilkultur"
                title="neue Teilkultur"
                onClick={insertTeilkulturRev}
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
            rowCount={teilkulturs.length}
            rowHeight={constants.singleRowHeight}
            rowProps={{ rows: teilkulturs }}
          />
        </div>
      </div>
    </ErrorBoundary>
  )
})
