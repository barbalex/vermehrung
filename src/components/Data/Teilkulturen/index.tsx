import { useEffect, useState } from 'react'
import { useAtomValue } from 'jotai'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'
import { List } from 'react-window'
import { Q } from 'nitromelondb'
import { combineLatest } from 'rxjs'

import {
  dbAtom,
  activeNodeArrayAtom,
  filterTeilkulturAtom,
  kulturIdInActiveNodeArrayAtom,
  setActiveNodeArray,
  removeOpenNode,
} from '../../../store/index.ts'
import { insertTeilkulturRev } from '../../../modules/insertRev.ts'
import { FilterTitle } from '../../shared/FilterTitle.tsx'
import { TeilkulturRow as Row } from './Row.tsx'
import { ErrorBoundary } from '../../shared/ErrorBoundary.tsx'
import { FilterNumbers } from '../../shared/FilterNumbers.tsx'
import UpSvg from '../../../svg/to_up.svg?react'
import { breadcrumbsEnabled } from '../../../utils/breadcrumbsEnabled.ts'
import { tableFilter } from '../../../utils/tableFilter.ts'
import { teilkulturSort } from '../../../utils/teilkulturSort.ts'
import { constants } from '../../../utils/constants.ts'

import artStyles from '../Arten/index.module.css'

export const Teilkulturen = ({ filter: showFilter = false }) => {
  const db = useAtomValue(dbAtom)
  const kulturIdInActiveNodeArray = useAtomValue(kulturIdInActiveNodeArrayAtom)
  const activeNodeArray = useAtomValue(activeNodeArrayAtom)
  const teilkulturFilter = useAtomValue(filterTeilkulturAtom)

  const [dataState, setDataState] = useState<{
    teilkulturs: import('../../../dbModel.ts').Teilkultur[]
    totalCount: number
  }>({ teilkulturs: [], totalCount: 0 })
  useEffect(() => {
    const hierarchyQuery = kulturIdInActiveNodeArray
      ? [
          Q.experimentalJoinTables(['kultur']),
          Q.on('kultur', 'id', kulturIdInActiveNodeArray),
        ]
      : []
    const collection =
      db?.get<import('../../../dbModel.ts').Teilkultur>('teilkultur')
    if (!collection) return
    const teilkulturDelQuery =
      teilkulturFilter._deleted === false
        ? Q.where('_deleted', false)
        : teilkulturFilter._deleted === true
          ? Q.where('_deleted', true)
          : Q.or(
              Q.where('_deleted', false),
              Q.where('_deleted', true),
              Q.where('_deleted', null),
            )
    const countObservable = collection
      .query(teilkulturDelQuery, ...hierarchyQuery)
      .observeCount()
    const dataObservable = collection
      .query(...tableFilter({ table: 'teilkultur' }), ...hierarchyQuery)
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
    // need to rerun if any of the values of teilkulturFilter changes
    teilkulturFilter,
    kulturIdInActiveNodeArray,
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
        className={artStyles.container}
        style={{ backgroundColor: showFilter ? 'var(--filter-bg)' : 'unset' }}
      >
        {showFilter ? (
          <FilterTitle
            title="Teilkultur"
            table="teilkultur"
            totalCount={totalCount}
            filteredCount={filteredCount}
          />
        ) : (
          <div className={artStyles.titleContainer}>
            <div className={artStyles.title}>Teilkulturen</div>
            <div className={artStyles.titleSymbols}>
              {!breadcrumbsEnabled && (
                <IconButton title={upTitle} onClick={onClickUp} size="large">
                  <UpSvg />
                </IconButton>
              )}
              <IconButton
                aria-label="neue Teilkultur"
                title="neue Teilkultur"
                onClick={
                  insertTeilkulturRev as unknown as import('react').MouseEventHandler
                }
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
            rowCount={teilkulturs.length}
            rowHeight={constants.singleRowHeight}
            rowProps={{ rows: teilkulturs }}
          />
        </div>
      </div>
    </ErrorBoundary>
  )
}
