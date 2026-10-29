import { useEffect, useState } from 'react'
import { useAtomValue } from 'jotai'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'
import { List } from 'react-window'
import { Q } from '@nozbe/watermelondb'
import { combineLatest } from 'rxjs'

import {
  activeNodeArrayAtom,
  dbAtom,
  filterZaehlungAtom,
  kulturIdInActiveNodeArrayAtom,
  removeOpenNode,
  setActiveNodeArray,
} from '../../../store/index.ts'
import { insertZaehlungRev } from '../../../modules/insertRev.ts'
import { FilterTitle } from '../../shared/FilterTitle.tsx'
import { ZaehlungRow as Row } from './Row.tsx'
import { ErrorBoundary } from '../../shared/ErrorBoundary.tsx'
import { FilterNumbers } from '../../shared/FilterNumbers.tsx'
import UpSvg from '../../../svg/to_up.svg?react'
import { breadcrumbsEnabled } from '../../../utils/breadcrumbsEnabled.ts'
import { tableFilter } from '../../../utils/tableFilter.ts'
import { zaehlungSort } from '../../../utils/zaehlungSort.ts'
import { constants } from '../../../utils/constants.ts'

import artStyles from '../Arten/index.module.css'

export const Zaehlungen = ({ filter: showFilter = false }) => {
  const db = useAtomValue(dbAtom)
  const kulturIdInActiveNodeArray = useAtomValue(kulturIdInActiveNodeArrayAtom)
  const activeNodeArray = useAtomValue(activeNodeArrayAtom)
  const zaehlungFilter = useAtomValue(filterZaehlungAtom)

  const [dataState, setDataState] = useState<{
    zaehlungs: import('../../../dbModel.ts').Zaehlung[]
    totalCount: number
  }>({ zaehlungs: [], totalCount: 0 })
  useEffect(() => {
    const hierarchyQuery = kulturIdInActiveNodeArray
      ? [
          Q.experimentalJoinTables(['kultur']),
          Q.on('kultur', 'id', kulturIdInActiveNodeArray),
        ]
      : []
    const collection =
      db?.get<import('../../../dbModel.ts').Zaehlung>('zaehlung')
    if (!collection) return
    const zaehlungDelQuery =
      zaehlungFilter._deleted === false
        ? Q.where('_deleted', false)
        : zaehlungFilter._deleted === true
          ? Q.where('_deleted', true)
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
    // need to rerun if any of the values of zaehlungFilter changes
    zaehlungFilter,
    kulturIdInActiveNodeArray,
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
        style={{ backgroundColor: showFilter ? 'var(--filter-bg)' : 'unset' }}
      >
        {showFilter ? (
          <FilterTitle
            title="Zählung"
            table="zaehlung"
            totalCount={totalCount}
            filteredCount={filteredCount}
          />
        ) : (
          <div className={artStyles.titleContainer}>
            <div className={artStyles.title}>Zählungen</div>
            <div className={artStyles.titleSymbols}>
              {!breadcrumbsEnabled && (
                <IconButton title={upTitle} onClick={onClickUp} size="large">
                  <UpSvg />
                </IconButton>
              )}
              <IconButton
                aria-label="neue Zählung"
                title="neue Zählung"
                onClick={
                  insertZaehlungRev as unknown as import('react').MouseEventHandler
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
            rowCount={zaehlungs.length}
            rowHeight={constants.singleRowHeight}
            rowProps={{ rows: zaehlungs }}
          />
        </div>
      </div>
    </ErrorBoundary>
  )
}
