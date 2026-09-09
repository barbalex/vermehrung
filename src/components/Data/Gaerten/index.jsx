import { useEffect, useState } from 'react'
import { useAtomValue } from 'jotai'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'
import { List } from 'react-window'
import { Q } from '@nozbe/watermelondb'
import { combineLatest } from 'rxjs'

import {
  dbAtom,
  activeNodeArrayAtom,
  filterGartenAtom,
  personIdInActiveNodeArrayAtom,
  setActiveNodeArray,
  removeOpenNode,
} from '../../../store/index.js'
import { insertGartenRev } from '../../../modules/insertRev.js'
import { FilterTitle } from '../../shared/FilterTitle.jsx'
import { GartenRow as Row } from './Row.jsx'
import { ErrorBoundary } from '../../shared/ErrorBoundary.jsx'
import { FilterNumbers } from '../../shared/FilterNumbers.jsx'
import UpSvg from '../../../svg/to_up.svg?react'
import { tableFilter } from '../../../utils/tableFilter.js'
import { gartensSortedFromGartens } from '../../../utils/gartensSortedFromGartens.js'
import { constants } from '../../../utils/constants.js'

import artStyles from '../Arten/index.module.css'

export const Gaerten = ({ filter: showFilter = false }) => {
  const db = useAtomValue(dbAtom)
  const personIdInActiveNodeArray = useAtomValue(personIdInActiveNodeArrayAtom)
  const activeNodeArray = useAtomValue(activeNodeArrayAtom)
  const gartenFilter = useAtomValue(filterGartenAtom)

  const [dataState, setDataState] = useState({ gartens: [], totalCount: 0 })
  useEffect(() => {
    const hierarchyQuery = personIdInActiveNodeArray
      ? [
          Q.experimentalJoinTables(['person']),
          Q.on('person', 'id', personIdInActiveNodeArray),
        ]
      : []
    const collection = db.get('garten')
    const delQuery =
      gartenFilter._deleted === false
        ? Q.where('_deleted', false)
        : gartenFilter._deleted === true
          ? Q.where('_deleted', true)
          : Q.or(
              Q.where('_deleted', false),
              Q.where('_deleted', true),
              Q.where('_deleted', null),
            )
    const aktivQuery =
      gartenFilter?.aktiv === true
        ? Q.where('aktiv', true)
        : gartenFilter?.aktiv === false
          ? Q.where('aktiv', false)
          : Q.or(
              Q.where('aktiv', false),
              Q.where('aktiv', true),
              Q.where('aktiv', null),
            )
    const totalCountObservable = collection
      .query(delQuery, aktivQuery, ...hierarchyQuery)
      .observeCount()
    const gartenObservable = collection
      .query(...tableFilter({ table: 'garten' }), ...hierarchyQuery)
      .observeWithColumns(['name', 'person_id'])
    const combinedObservables = combineLatest([
      totalCountObservable,
      gartenObservable,
    ])
    const subscription = combinedObservables.subscribe(
      async ([totalCount, gartens]) => {
        const gartensSorted = await gartensSortedFromGartens(gartens)
        setDataState({
          gartens: gartensSorted,
          totalCount,
        })
      },
    )

    return () => subscription?.unsubscribe?.()
  }, [
    db,
    personIdInActiveNodeArray,
    // need to rerun if any of the values of gartenFilter changes
    gartenFilter,
  ])

  const { gartens, totalCount } = dataState
  const filteredCount = gartens.length

  const onClickUp = () => {
    removeOpenNode(activeNodeArray)
    setActiveNodeArray(activeNodeArray.slice(0, -1))
  }

  let upTitle = 'Eine Ebene höher'
  if (activeNodeArray[0] === 'Gaerten') {
    upTitle = 'Zu allen Listen'
  }
  if (activeNodeArray[activeNodeArray.length - 3] === 'Personen') {
    upTitle = 'Zur Person'
  }

  return (
    <ErrorBoundary>
      <div
        className={artStyles.container}
        style={{ backgroundColor: showFilter ? '#fff3e0' : 'unset' }}
      >
        {showFilter ? (
          <FilterTitle
            title="Garten"
            table="garten"
            totalCount={totalCount}
            filteredCount={filteredCount}
          />
        ) : (
          <div className={artStyles.titleContainer}>
            <div className={artStyles.title}>Gärten</div>
            <div className={artStyles.titleSymbols}>
              <IconButton title={upTitle} onClick={onClickUp} size="large">
                <UpSvg />
              </IconButton>
              <IconButton
                aria-label="neuer Garten"
                title="neuer Garten"
                onClick={insertGartenRev}
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
        )}
        <div className={artStyles.fieldsContainer}>
          <List
            rowComponent={Row}
            rowCount={gartens.length}
            rowHeight={constants.singleRowHeight}
            rowProps={{ rows: gartens }}
          />
        </div>
      </div>
    </ErrorBoundary>
  )
}
