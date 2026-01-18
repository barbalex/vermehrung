import { useContext, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'
import { List } from 'react-window'
import { Q } from '@nozbe/watermelondb'
import { combineLatest } from 'rxjs'

import { MobxStoreContext } from '../../../mobxStoreContext.js'
import { FilterTitle } from '../../shared/FilterTitle.jsx'
import { KulturRow as Row } from './Row.jsx'
import { ErrorBoundary } from '../../shared/ErrorBoundary.jsx'
import { FilterNumbers } from '../../shared/FilterNumbers.jsx'
import UpSvg from '../../../svg/to_up.svg?react'
import { tableFilter } from '../../../utils/tableFilter.js'
import { kultursSortedFromKulturs } from '../../../utils/kultursSortedFromKulturs.js'
import { constants } from '../../../utils/constants.js'

import artStyles from '../Arten/index.module.css'

export const Kulturen = observer(({ filter: showFilter = false }) => {
  const store = useContext(MobxStoreContext)
  const {
    artIdInActiveNodeArray,
    db,
    filter,
    gartenIdInActiveNodeArray,
    herkunftIdInActiveNodeArray,
    insertKulturRev,
  } = store
  const { activeNodeArray, setActiveNodeArray, removeOpenNode } = store.tree
  const { kultur: kulturFilter } = store.filter

  const [dataState, setDataState] = useState({ kulturs: [], totalCount: 0 })
  useEffect(() => {
    const hierarchyQuery = []
    if (gartenIdInActiveNodeArray) {
      hierarchyQuery.push(Q.experimentalJoinTables(['garten']))
      hierarchyQuery.push(Q.on('garten', 'id', gartenIdInActiveNodeArray))
    }
    if (artIdInActiveNodeArray) {
      hierarchyQuery.push(Q.experimentalJoinTables(['art']))
      hierarchyQuery.push(Q.on('art', 'id', artIdInActiveNodeArray))
    }
    if (herkunftIdInActiveNodeArray) {
      hierarchyQuery.push(Q.experimentalJoinTables(['herkunft']))
      hierarchyQuery.push(Q.on('herkunft', 'id', herkunftIdInActiveNodeArray))
    }
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
    const countObservable = collection
      .query(kulturDelQuery, kulturAktivQuery, ...hierarchyQuery)
      .observeCount()
    const dataObservable = collection
      .query(...tableFilter({ table: 'kultur', store }), ...hierarchyQuery)
      .observeWithColumns([
        'art_id',
        'herkunft_id',
        'garten_id',
        'zwischenlager',
      ])
    const combinedObservables = combineLatest([countObservable, dataObservable])
    const subscription = combinedObservables.subscribe(
      async ([totalCount, kulturs]) => {
        const kultursSorted = await kultursSortedFromKulturs(kulturs)
        setDataState({
          kulturs: kultursSorted,
          totalCount,
        })
      },
    )

    return () => subscription?.unsubscribe?.()
  }, [
    db,
    kulturFilter,
    gartenIdInActiveNodeArray,
    artIdInActiveNodeArray,
    store,
    filter.kultur._deleted,
    filter.kultur.aktiv,
    herkunftIdInActiveNodeArray,
  ])

  const { kulturs, totalCount } = dataState
  const filteredCount = kulturs.length

  const onClickUp = () => {
    removeOpenNode(activeNodeArray)
    setActiveNodeArray(activeNodeArray.slice(0, -1))
  }

  let upTitle = 'Eine Ebene höher'
  if (activeNodeArray[0] === 'Kulturen') {
    upTitle = 'Zu allen Listen'
  }
  if (activeNodeArray[activeNodeArray.length - 3] === 'Arten') {
    upTitle = 'Zur Art'
  }
  if (activeNodeArray[activeNodeArray.length - 3] === 'Gaerten') {
    upTitle = 'Zum Garten'
  }

  return (
    <ErrorBoundary>
      <div
        className={artStyles.container}
        style={{ backgroundColor: showFilter ? '#fff3e0' : 'unset' }}
      >
        {showFilter ?
          <FilterTitle
            title="Kultur"
            table="kultur"
            totalCount={totalCount}
            filteredCount={filteredCount}
          />
        : <div className={artStyles.titleContainer}>
            <div className={artStyles.title}>Kulturen</div>
            <div className={artStyles.titleSymbols}>
              <IconButton
                title={upTitle}
                onClick={onClickUp}
                size="large"
              >
                <UpSvg />
              </IconButton>
              <IconButton
                aria-label="neue Kultur"
                title="neue Kultur"
                onClick={insertKulturRev}
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
            rowCount={kulturs.length}
            rowHeight={constants.singleRowHeight}
            rowProps={{ rows: kulturs }}
          />
        </div>
      </div>
    </ErrorBoundary>
  )
})
