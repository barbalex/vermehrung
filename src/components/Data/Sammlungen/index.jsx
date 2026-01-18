import { useContext, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'
import { List } from 'react-window'
import { Q } from '@nozbe/watermelondb'
import { combineLatest } from 'rxjs'

import { MobxStoreContext } from '../../../mobxStoreContext.js'
import { FilterTitle } from '../../shared/FilterTitle.jsx'
import { SammlungRow as Row } from './Row.jsx'
import { ErrorBoundary } from '../../shared/ErrorBoundary.jsx'
import { FilterNumbers } from '../../shared/FilterNumbers.jsx'
import UpSvg from '../../../svg/to_up.svg?react'
import { tableFilter } from '../../../utils/tableFilter.js'
import { sammlungsSortedFromSammlungs } from '../../../utils/sammlungsSortedFromSammlungs.js'
import { constants } from '../../../utils/constants.js'

import artStyles from '../Arten/index.module.css'

export const Sammlungen = observer(({ filter: showFilter = false }) => {
  const store = useContext(MobxStoreContext)
  const {
    insertSammlungRev,
    artIdInActiveNodeArray,
    herkunftIdInActiveNodeArray,
    personIdInActiveNodeArray,
    db,
    filter,
  } = store
  const { activeNodeArray, setActiveNodeArray, removeOpenNode } = store.tree
  const { sammlung: sammlungFilter } = store.filter

  const [dataState, setDataState] = useState({ sammlungs: [], totalCount: 0 })
  useEffect(() => {
    const hierarchyQuery = []
    if (artIdInActiveNodeArray) {
      hierarchyQuery.push(Q.experimentalJoinTables(['art']))
      hierarchyQuery.push(Q.on('art', 'id', artIdInActiveNodeArray))
    }
    if (herkunftIdInActiveNodeArray) {
      hierarchyQuery.push(Q.experimentalJoinTables(['herkunft']))
      hierarchyQuery.push(Q.on('herkunft', 'id', herkunftIdInActiveNodeArray))
    }
    if (personIdInActiveNodeArray) {
      hierarchyQuery.push(Q.experimentalJoinTables(['person']))
      hierarchyQuery.push(Q.on('person', 'id', personIdInActiveNodeArray))
    }
    const collection = db.get('sammlung')
    const sammlungDelQuery =
      filter.sammlung._deleted === false ? Q.where('_deleted', false)
      : filter.sammlung._deleted === true ? Q.where('_deleted', true)
      : Q.or(
          Q.where('_deleted', false),
          Q.where('_deleted', true),
          Q.where('_deleted', null),
        )
    const countObservable = collection
      .query(sammlungDelQuery, ...hierarchyQuery)
      .observeCount()
    const dataObservable = collection
      .query(
        ...tableFilter({
          table: 'sammlung',
          store,
        }),
        ...hierarchyQuery,
      )
      .observeWithColumns(['gemeinde', 'lokalname', 'nr'])

    // so need to hackly use merge
    const combinedObservables = combineLatest([countObservable, dataObservable])
    const subscription = combinedObservables.subscribe(
      async ([totalCount, sammlungs]) => {
        const sammlungsSorted = await sammlungsSortedFromSammlungs(sammlungs)
        setDataState({
          sammlungs: sammlungsSorted,
          totalCount,
        })
      },
    )

    return () => subscription?.unsubscribe?.()
  }, [
    db,
    // need to rerender if any of the values of sammlungFilter changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ...Object.values(sammlungFilter),

    sammlungFilter,
    artIdInActiveNodeArray,
    herkunftIdInActiveNodeArray,
    personIdInActiveNodeArray,
    store,
    filter.sammlung._deleted,
  ])

  const { sammlungs, totalCount } = dataState
  const filteredCount = sammlungs.length

  const onClickUp = () => {
    removeOpenNode(activeNodeArray)
    setActiveNodeArray(activeNodeArray.slice(0, -1))
  }

  let upTitle = 'Eine Ebene höher'
  if (activeNodeArray[0] === 'Sammlungen') {
    upTitle = 'Zu allen Listen'
  }
  if (activeNodeArray[activeNodeArray.length - 3] === 'Arten') {
    upTitle = 'Zur Art'
  }
  if (activeNodeArray[activeNodeArray.length - 3] === 'Personen') {
    upTitle = 'Zur Person'
  }
  if (activeNodeArray[activeNodeArray.length - 3] === 'Herkuenfte') {
    upTitle = 'Zur Herkunft'
  }

  return (
    <ErrorBoundary>
      <div
        className={artStyles.container}
        style={{ backgroundColor: showFilter ? '#fff3e0' : 'unset' }}
      >
        {showFilter ?
          <FilterTitle
            title="Sammlung"
            table="sammlung"
            totalCount={totalCount}
            filteredCount={filteredCount}
          />
        : <div className={artStyles.titleContainer}>
            <div className={artStyles.title}>Sammlungen</div>
            <div className={artStyles.titleSymbols}>
              <IconButton
                title={upTitle}
                onClick={onClickUp}
                size="large"
              >
                <UpSvg />
              </IconButton>
              <IconButton
                aria-label="neue Sammlung"
                title="neue Sammlung"
                onClick={insertSammlungRev}
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
            rowCount={sammlungs.length}
            rowHeight={constants.singleRowHeight}
            rowProps={{ rows: sammlungs }}
          />
        </div>
      </div>
    </ErrorBoundary>
  )
})
