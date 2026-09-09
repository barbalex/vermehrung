import { useState, useEffect } from 'react'
import { useAtomValue } from 'jotai'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'
import { List } from 'react-window'
import { combineLatest } from 'rxjs'
import { Q } from '@nozbe/watermelondb'

import { FilterTitle } from '../../shared/FilterTitle.jsx'
import { PersonRow as Row } from './Row.jsx'
import { ErrorBoundary } from '../../shared/ErrorBoundary.jsx'
import { FilterNumbers } from '../../shared/FilterNumbers.jsx'
import {
  dbAtom,
  userAtom,
  filterPersonAtom,
  activeNodeArrayAtom,
  setActiveNodeArray,
  removeOpenNode,
} from '../../../store/index.js'
import { insertPersonRev } from '../../../modules/insertRev.js'
import UpSvg from '../../../svg/to_up.svg?react'
import { tableFilter } from '../../../utils/tableFilter.js'
import { personSort } from '../../../utils/personSort.js'
import { constants } from '../../../utils/constants.js'

import artStyles from '../Arten/index.module.css'

export const Personen = ({ filter: showFilter = false }) => {
  const db = useAtomValue(dbAtom)
  const user = useAtomValue(userAtom)
  const personFilter = useAtomValue(filterPersonAtom)
  const activeNodeArray = useAtomValue(activeNodeArrayAtom)

  const [dataState, setDataState] = useState({
    persons: [],
    totalCount: 0,
    userRole: undefined,
  })
  useEffect(() => {
    const collection = db.get('person')
    const personDelQuery =
      personFilter._deleted === false
        ? Q.where('_deleted', false)
        : personFilter._deleted === true
          ? Q.where('_deleted', true)
          : Q.or(
              Q.where('_deleted', false),
              Q.where('_deleted', true),
              Q.where('_deleted', null),
            )
    const personAktivQuery =
      personFilter.aktiv === false
        ? Q.where('aktiv', false)
        : personFilter.aktiv === true
          ? Q.where('aktiv', true)
          : Q.or(
              Q.where('aktiv', false),
              Q.where('aktiv', true),
              Q.where('aktiv', null),
            )
    const countObservable = collection
      .query(personDelQuery, personAktivQuery)
      .observeCount()
    const dataObservable = collection
      .query(...tableFilter({ table: 'person' }))
      .observeWithColumns(['vorname', 'name'])
    const userRoleObservable = db
      .get('user_role')
      .query(Q.on('person', Q.where('account_id', user.uid ?? 'none')))
      .observeWithColumns(['name'])
    const combinedObservables = combineLatest([
      countObservable,
      dataObservable,
      userRoleObservable,
    ])
    const subscription = combinedObservables.subscribe(
      async ([totalCount, persons, [userRole]]) => {
        setDataState({
          persons: persons.sort(personSort),
          totalCount,
          userRole,
        })
      },
    )

    return () => subscription?.unsubscribe?.()
    // need to rerender if any of the values of personFilter changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [db, personFilter])

  const { persons, totalCount, userRole } = dataState
  const filteredCount = persons.length

  const onClickUp = () => {
    removeOpenNode(activeNodeArray)
    setActiveNodeArray(activeNodeArray.slice(0, -1))
  }

  let upTitle = 'Eine Ebene höher'
  if (activeNodeArray[0] === 'Personen') {
    upTitle = 'Zu allen Listen'
  }

  return (
    <ErrorBoundary>
      <div
        className={artStyles.container}
        style={{ backgroundColor: showFilter ? '#fff3e0' : 'unset' }}
      >
        {showFilter ? (
          <FilterTitle
            title="Person"
            table="person"
            totalCount={totalCount}
            filteredCount={filteredCount}
          />
        ) : (
          <div className={artStyles.titleContainer}>
            <div className={artStyles.title}>Personen</div>
            <div className={artStyles.titleSymbols}>
              <IconButton title={upTitle} onClick={onClickUp} size="large">
                <UpSvg />
              </IconButton>
              {userRole?.name === 'manager' && (
                <IconButton
                  aria-label="neue Person"
                  title="neue Person"
                  onClick={insertPersonRev}
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
            rowCount={persons.length}
            rowHeight={constants.singleRowHeight}
            rowProps={{ rows: persons }}
          />
        </div>
      </div>
    </ErrorBoundary>
  )
}
