import { useContext, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'
import { List } from 'react-window'
import { Q } from '@nozbe/watermelondb'
import { combineLatest } from 'rxjs'

import { MobxStoreContext } from '../../../mobxStoreContext.js'
import { FilterTitle } from '../../shared/FilterTitle.jsx'
import { ZaehlungRow as Row } from './Row.jsx'
import { ErrorBoundary } from '../../shared/ErrorBoundary.jsx'
import { FilterNumbers } from '../../shared/FilterNumbers.jsx'
import UpSvg from '../../../svg/to_up.svg?react'
import { tableFilter } from '../../../utils/tableFilter.js'
import { zaehlungSort } from '../../../utils/zaehlungSort.js'
import { constants } from '../../../utils/constants.js'

import artStyles from '../Arten/index.module.css'

export const Zaehlungen = observer(({ filter: showFilter = false }) => {
  const store = useContext(MobxStoreContext)
  const { insertZaehlungRev, kulturIdInActiveNodeArray, db, filter } = store
  const { activeNodeArray, setActiveNodeArray, removeOpenNode } = store.tree
  const { zaehlung: zaehlungFilter } = store.filter

  const [dataState, setDataState] = useState({ zaehlungs: [], totalCount: 0 })
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
    const countObservable = collection
      .query(zaehlungDelQuery, ...hierarchyQuery)
      .observeCount()
    const dataObservable = collection
      .query(
        ...tableFilter({
          table: 'zaehlung',
          store,
        }),
        ...hierarchyQuery,
      )
      .observeWithColumns(['datum', 'anzahl_pflanzen'])

    const combinedObservables = combineLatest([countObservable, dataObservable])
    const subscription = combinedObservables.subscribe(
      ([totalCount, zaehlungs]) => {
        setDataState({
          zaehlungs: zaehlungs.sort(zaehlungSort),
          totalCount,
        })
      },
    )

    return () => subscription?.unsubscribe?.()
  }, [
    db,
    // need to rerender if any of the values of zaehlungFilter changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ...Object.values(zaehlungFilter),
    zaehlungFilter,
    kulturIdInActiveNodeArray,
    store,
    filter.zaehlung._deleted,
  ])

  const { zaehlungs, totalCount } = dataState
  const filteredCount = zaehlungs.length

  const onClickUp = () => {
    removeOpenNode(activeNodeArray)
    setActiveNodeArray(activeNodeArray.slice(0, -1))
  }

  let upTitle = 'Eine Ebene höher'
  if (activeNodeArray[0] === 'Zaehlungen') {
    upTitle = 'Zu allen Listen'
  }
  if (activeNodeArray[activeNodeArray.length - 3] === 'Kulturen') {
    upTitle = 'Zur Kultur'
  }

  return (
    <ErrorBoundary>
      <div
        className={artStyles.container}
        style={{ backgroundColor: showFilter ? '#fff3e0' : 'unset' }}
      >
        {showFilter ?
          <FilterTitle
            title="Zählung"
            table="zaehlung"
            totalCount={totalCount}
            filteredCount={filteredCount}
          />
        : <div className={artStyles.titleContainer}>
            <div className={artStyles.title}>Zählungen</div>
            <div className={artStyles.titleSymbols}>
              <IconButton
                title={upTitle}
                onClick={onClickUp}
                size="large"
              >
                <UpSvg />
              </IconButton>
              <IconButton
                aria-label="neue Zählung"
                title="neue Zählung"
                onClick={insertZaehlungRev}
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
        <div className={artStyles.fieldsContainer}>
          <List
            rowComponent={Row}
            rowCount={zaehlungs.length}
            rowHeight={constants.singleRowHeight}
            rowProps={{ rows: zaehlungs }}
          />
        </div>
      </div>
    </ErrorBoundary>
  )
})
