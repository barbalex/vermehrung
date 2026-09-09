import { useEffect, useState } from 'react'
import { useAtomValue } from 'jotai'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'
import { List } from 'react-window'
import { Q } from '@nozbe/watermelondb'
import { combineLatest, last } from 'rxjs'

import {
  dbAtom,
  activeNodeArrayAtom,
  sammlungIdInActiveNodeArrayAtom,
  artIdInActiveNodeArrayAtom,
  filterHerkunftAtom,
  setActiveNodeArray,
  removeOpenNode,
} from '../../../store/index.js'
import { insertHerkunftRev } from '../../../modules/insertRev.js'
import { FilterTitle } from '../../shared/FilterTitle.jsx'
import { HerkunftRow as Row } from './Row.jsx'
import { ErrorBoundary } from '../../shared/ErrorBoundary.jsx'
import { FilterNumbers } from '../../shared/FilterNumbers.jsx'
import UpSvg from '../../../svg/to_up.svg?react'
import { tableFilter } from '../../../utils/tableFilter.js'
import { herkunftSort } from '../../../utils/herkunftSort.js'
import { constants } from '../../../utils/constants.js'

import artStyles from '../Arten/index.module.css'

export const Herkuenfte = ({ filter: showFilter }) => {
  const db = useAtomValue(dbAtom)
  const activeNodeArray = useAtomValue(activeNodeArrayAtom)
  const sammlungIdInActiveNodeArray = useAtomValue(
    sammlungIdInActiveNodeArrayAtom,
  )
  const artIdInActiveNodeArray = useAtomValue(artIdInActiveNodeArrayAtom)
  const herkunftFilter = useAtomValue(filterHerkunftAtom)

  const [dataState, setDataState] = useState({ herkunfts: [], totalCount: 0 })
  useEffect(() => {
    const hierarchyQuery = sammlungIdInActiveNodeArray
      ? [
          Q.experimentalJoinTables(['sammlung']),
          Q.on('sammlung', 'id', sammlungIdInActiveNodeArray),
        ]
      : artIdInActiveNodeArray
        ? [
            Q.experimentalJoinTables(['sammlung']),
            Q.on('sammlung', 'art_id', artIdInActiveNodeArray),
          ]
        : []
    const collection = db.get('herkunft')
    const delQuery =
      herkunftFilter._deleted === false
        ? Q.where('_deleted', false)
        : herkunftFilter._deleted === true
          ? Q.where('_deleted', true)
          : Q.or(
              Q.where('_deleted', false),
              Q.where('_deleted', true),
              Q.where('_deleted', null),
            )
    const countObservable = collection
      .query(delQuery, ...hierarchyQuery)
      .observeCount()
    const herkunftsObservable = collection
      .query(...tableFilter({ table: 'herkunft' }), ...hierarchyQuery)
      .observeWithColumns(['gemeinde', 'lokalname', 'nr'])
    const combinedObservables = combineLatest([
      countObservable,
      herkunftsObservable,
    ])
    const subscription = combinedObservables.subscribe(
      ([totalCount, herkunfts]) =>
        setDataState({ herkunfts: herkunfts.sort(herkunftSort), totalCount }),
    )

    return () => subscription?.unsubscribe?.()
  }, [db, sammlungIdInActiveNodeArray, herkunftFilter, artIdInActiveNodeArray])

  const { herkunfts, totalCount } = dataState
  const filteredCount = herkunfts.length

  const onClickUp = () => {
    removeOpenNode(activeNodeArray)
    setActiveNodeArray(activeNodeArray.slice(0, -1))
  }

  let upTitle = 'Eine Ebene höher'
  if (activeNodeArray[0] === 'Herkuenfte') {
    upTitle = 'Zu allen Listen'
  }

  // herkuenfte is top node
  // never enable adding below that
  const showPlus = activeNodeArray.length < 2

  return (
    <ErrorBoundary>
      <div
        className={artStyles.container}
        style={{ backgroundColor: showFilter ? '#fff3e0' : 'unset' }}
      >
        {showFilter ? (
          <FilterTitle
            title="Herkunft"
            table="herkunft"
            totalCount={totalCount}
            filteredCount={filteredCount}
          />
        ) : (
          <div className={artStyles.titleContainer}>
            <div className={artStyles.title}>Herkünfte</div>
            <div className={artStyles.titleSymbols}>
              <IconButton title={upTitle} onClick={onClickUp} size="large">
                <UpSvg />
              </IconButton>
              {showPlus && (
                <IconButton
                  aria-label="neue Herkunft"
                  title="neue Herkunft"
                  onClick={insertHerkunftRev}
                  size="large"
                >
                  <FaPlus />
                </IconButton>
              )}
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
            rowCount={herkunfts.length}
            rowHeight={constants.singleRowHeight}
            rowProps={{ rows: herkunfts }}
          />
        </div>
      </div>
    </ErrorBoundary>
  )
}
