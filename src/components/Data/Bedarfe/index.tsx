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
  kulturIdInActiveNodeArrayAtom,
  filterBedarfAtom,
  setActiveNodeArray,
  removeOpenNode,
} from '../../../store/index.ts'
import { insertBedarfRev } from '../../../modules/insertRev.ts'
import { FilterTitle } from '../../shared/FilterTitle.tsx'
import { BedarfRow as Row } from './Row.tsx'
import { ErrorBoundary } from '../../shared/ErrorBoundary.tsx'
import { FilterNumbers } from '../../shared/FilterNumbers.tsx'
import UpSvg from '../../../svg/to_up.svg?react'
import { bedarfSort } from '../../../utils/bedarfSort.ts'
import { tableFilter } from '../../../utils/tableFilter.ts'
import { constants } from '../../../utils/constants.ts'

import artStyles from '../Arten/index.module.css'

const onClickNew = () =>
  insertBedarfRev({ values: { jahr: new Date().getFullYear() } })

export const Bedarfe = ({ filter: showFilter = false }) => {
  const db = useAtomValue(dbAtom)
  const activeNodeArray = useAtomValue(activeNodeArrayAtom)
  const kulturIdInActiveNodeArray = useAtomValue(kulturIdInActiveNodeArrayAtom)
  const bedarfFilter = useAtomValue(filterBedarfAtom)

  const [dataState, setDataState] = useState({ bedarfe: [], totalCount: 0 })
  useEffect(() => {
    const hierarchyQuery = kulturIdInActiveNodeArray
      ? [
          Q.experimentalJoinTables(['kultur']),
          Q.on('kultur', 'id', kulturIdInActiveNodeArray),
        ]
      : []
    const collection = db?.get('bedarf')
    const delQuery =
      bedarfFilter._deleted === false
        ? Q.where('_deleted', false)
        : bedarfFilter._deleted === true
          ? Q.where('_deleted', true)
          : Q.or(
              Q.where('_deleted', false),
              Q.where('_deleted', true),
              Q.where('_deleted', null),
            )
    const countObservable = collection
      .query(delQuery, ...hierarchyQuery)
      .observeCount()
    const dataObservable = collection
      .query(...tableFilter({ table: 'bedarf' }), ...hierarchyQuery)
      .observeWithColumns(['jahr', 'beschreibung'])
    const combinedObservables = combineLatest([countObservable, dataObservable])
    const subscription = combinedObservables.subscribe(
      ([totalCount, bedarfe]) => {
        setDataState({
          bedarfe: bedarfe.sort(bedarfSort),
          totalCount,
        })
      },
    )

    return () => subscription?.unsubscribe?.()
    // need to rerender if any of the values of bedarfFilter changes
     
  }, [db, kulturIdInActiveNodeArray, bedarfFilter])

  const { bedarfe, totalCount } = dataState
  const filteredCount = bedarfe.length

  const onClickUp = () => {
    removeOpenNode(activeNodeArray)
    setActiveNodeArray(activeNodeArray.slice(0, -1))
  }

  let upTitle = 'Eine Ebene höher'
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
            title="Bedarf"
            table="bedarf"
            totalCount={totalCount}
            filteredCount={filteredCount}
          />
        ) : (
          <div className={artStyles.titleContainer}>
            <div className={artStyles.title}>Bedarf</div>
            <div className={artStyles.titleSymbols}>
              <IconButton title={upTitle} onClick={onClickUp} size="large">
                <UpSvg />
              </IconButton>
              <IconButton
                aria-label="Neuer Bedarf"
                title="Neuer Bedarf"
                onClick={onClickNew}
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
            rowCount={bedarfe.length}
            rowHeight={constants.singleRowHeight}
            rowProps={{ rows: bedarfe }}
          />
        </div>
      </div>
    </ErrorBoundary>
  )
}
