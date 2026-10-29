import { useState, useEffect } from 'react'
import { useAtomValue } from 'jotai'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'
import { List } from 'react-window'
import { combineLatest } from 'rxjs'
import { Q } from 'nitromelondb'

import {
  dbAtom,
  filterSammelLieferungAtom,
  activeNodeArrayAtom,
  setActiveNodeArray,
  removeOpenNode,
} from '../../../store/index.ts'
import { insertSammelLieferungRev } from '../../../modules/insertRev.ts'
import { FilterTitle } from '../../shared/FilterTitle.tsx'
import { SammelLieferungRow as Row } from './Row.tsx'
import { ErrorBoundary } from '../../shared/ErrorBoundary.tsx'
import { FilterNumbers } from '../../shared/FilterNumbers.tsx'
import UpSvg from '../../../svg/to_up.svg?react'
import { breadcrumbsEnabled } from '../../../utils/breadcrumbsEnabled.ts'
import { tableFilter } from '../../../utils/tableFilter.ts'
import { lieferungSort } from '../../../utils/lieferungSort.ts'
import { constants } from '../../../utils/constants.ts'

import artStyles from '../Arten/index.module.css'

export const SammelLieferungen = ({ filter: showFilter = false }) => {
  const db = useAtomValue(dbAtom)
  const sammelLieferungFilter = useAtomValue(filterSammelLieferungAtom)
  const activeNodeArray = useAtomValue(activeNodeArrayAtom)

  const [dataState, setDataState] = useState<{
    sammelLieferungs: import('../../../dbModel.ts').SammelLieferung[]
    totalCount: number
  }>({ sammelLieferungs: [], totalCount: 0 })
  useEffect(() => {
    const collection =
      db?.get<import('../../../dbModel.ts').SammelLieferung>('sammel_lieferung')
    if (!collection) return
    const sammelLieferungDelQuery =
      sammelLieferungFilter._deleted === false
        ? Q.where('_deleted', false)
        : sammelLieferungFilter._deleted === true
          ? Q.where('_deleted', true)
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

    sammelLieferungFilter,
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
        className={artStyles.container}
        style={{ backgroundColor: showFilter ? 'var(--filter-bg)' : 'unset' }}
      >
        {showFilter ? (
          <FilterTitle
            title="Sammel-Lieferung"
            table="sammel_lieferung"
            totalCount={totalCount}
            filteredCount={filteredCount}
          />
        ) : (
          <div className={artStyles.titleContainer}>
            <div className={artStyles.title}>Sammel-Lieferungen</div>
            <div className={artStyles.titleSymbols}>
              {!breadcrumbsEnabled && (
                <IconButton title={upTitle} onClick={onClickUp} size="large">
                  <UpSvg />
                </IconButton>
              )}
              <IconButton
                aria-label="neue Sammel-Lieferung"
                title="neue Sammel-Lieferung"
                onClick={
                  insertSammelLieferungRev as unknown as import('react').MouseEventHandler
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
            rowCount={sammelLieferungs.length}
            rowHeight={constants.singleRowHeight}
            rowProps={{ rows: sammelLieferungs }}
          />
        </div>
      </div>
    </ErrorBoundary>
  )
}
