import { useContext, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'
import { List } from 'react-window'
import UpSvg from '../../../svg/to_up.svg?react'
import { combineLatest } from 'rxjs'
import { Q } from '@nozbe/watermelondb'

import { MobxStoreContext } from '../../../mobxStoreContext.js'
import { FilterTitle } from '../../shared/FilterTitle.jsx'
import { ArtRow as Row } from './Row.jsx'
import { ErrorBoundary } from '../../shared/ErrorBoundary.jsx'
import { FilterNumbers } from '../../shared/FilterNumbers.jsx'
import { tableFilter } from '../../../utils/tableFilter.js'
import { artsSortedFromArts } from '../../../utils/artsSortedFromArts.js'
import { constants } from '../../../utils/constants.js'
import { ApFilter } from '../../shared/ApFilter.jsx'

import {
  container,
  titleContainer,
  title,
  titleSymbols,
  fieldsContainer,
  apFilterContainer,
} from './index.module.css'

export const Arten = observer(({ filter: showFilter }) => {
  const store = useContext(MobxStoreContext)
  const { insertArtRev, db, filter, apFilter } = store
  const { activeNodeArray, setActiveNodeArray, removeOpenNode } = store.tree
  const { art: artFilter } = store.filter

  const [dataState, setDataState] = useState({ arts: [], totalCount: 0 })
  useEffect(() => {
    const collection = db.get('art')
    const delQuery =
      filter.art._deleted === false ? Q.where('_deleted', false)
      : filter.art._deleted === true ? Q.where('_deleted', true)
      : Q.or(
          Q.where('_deleted', false),
          Q.where('_deleted', true),
          Q.where('_deleted', null),
        )
    const totalCountObservable = collection.query(delQuery).observeCount()
    const artsObservable = collection
      .query(...tableFilter({ store, table: 'art', apFilter }))
      .observeWithColumns(['ae_id', 'set', 'apflora_ap', 'apflora_av'])
    const combinedObservables = combineLatest([
      totalCountObservable,
      artsObservable,
    ])
    const subscription = combinedObservables.subscribe(
      async ([totalCount, arts]) => {
        const artsSorted = await artsSortedFromArts(arts)
        setDataState({ arts: artsSorted, totalCount })
      },
    )

    return () => subscription?.unsubscribe?.()
    // need to rerender if any of the values of herkunftFilter changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [db, ...Object.values(artFilter), artFilter, store, apFilter])

  const { arts, totalCount } = dataState
  const filteredCount = arts.length

  const onClickUp = () => {
    removeOpenNode(activeNodeArray)
    setActiveNodeArray(activeNodeArray.slice(0, -1))
  }

  let upTitle = 'Eine Ebene höher'
  if (activeNodeArray[0] === 'Arten') {
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
            title="Art"
            table="art"
            totalCount={totalCount}
            filteredCount={filteredCount}
          />
        : <div className={titleContainer}>
            <div className={title}>Arten</div>
            <div className={titleSymbols}>
              <div className={apFilterContainer}>
                <ApFilter />
              </div>
              <IconButton
                title={upTitle}
                onClick={onClickUp}
                size="large"
              >
                <UpSvg />
              </IconButton>
              <IconButton
                aria-label="neue Art"
                title="neue Art"
                onClick={insertArtRev}
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
            rowCount={arts.length}
            rowHeight={constants.singleRowHeight}
            rowProps={{ rows: arts }}
          />
        </div>
      </div>
    </ErrorBoundary>
  )
})
