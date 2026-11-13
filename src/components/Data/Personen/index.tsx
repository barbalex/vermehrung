import { useState, useEffect } from 'react'
import { useAtomValue } from 'jotai'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'
import { List } from 'react-window'
import { combineLatest } from 'rxjs'
import { Q } from 'nitromelondb'

import { FilterTitle } from '../../shared/FilterTitle.tsx'
import { PersonRow as Row } from './Row.tsx'
import { ErrorBoundary } from '../../shared/ErrorBoundary.tsx'
import { FilterNumbers } from '../../shared/FilterNumbers.tsx'
import { dbAtom, userAtom, filterPersonAtom } from '../../../store/index.ts'
import { insertPersonRev } from '../../../modules/insertRev.ts'
import { tableFilter } from '../../../utils/tableFilter.ts'
import { personSort } from '../../../utils/personSort.ts'
import { constants } from '../../../utils/constants.ts'

import artStyles from '../Arten/index.module.css'
import { triStateDeletedQuery } from '../../../utils/triStateDeletedQuery.ts'

export const Personen = ({ filter: showFilter = false }) => {
  const db = useAtomValue(dbAtom)
  const user = useAtomValue(userAtom)
  const personFilter = useAtomValue(filterPersonAtom)

  const [dataState, setDataState] = useState<{
    persons: import('../../../dbModel.ts').Person[]
    totalCount: number
    userRole: import('../../../dbModel.ts').UserRole | undefined
  }>({ persons: [], totalCount: 0, userRole: undefined })
  useEffect(() => {
    const collection = db?.get<import('../../../dbModel.ts').Person>('person')
    if (!collection) return
    const personDelQuery = triStateDeletedQuery(personFilter._deleted)
    const personAktivQuery =
      personFilter.aktiv === false ? Q.where('aktiv', false)
      : personFilter.aktiv === true ? Q.where('aktiv', true)
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
      ?.get<import('../../../dbModel.ts').UserRole>('user_role')
      .query(Q.on('person', Q.where('account_id', user.uid ?? 'none')))
      .observeWithColumns(['name'])
    const combinedObservables = combineLatest([
      countObservable,
      dataObservable,
      userRoleObservable,
    ])
    const subscription = (
      combinedObservables as unknown as import('rxjs').Observable<
        [
          number,
          import('../../../dbModel.ts').Person[],
          import('../../../dbModel.ts').UserRole[],
        ]
      >
    ).subscribe(async ([totalCount, persons, [userRole]]) => {
      setDataState({
        persons: [...persons].sort(personSort),
        totalCount,
        userRole,
      })
    })

    return () => subscription?.unsubscribe?.()
    // need to rerender if any of the values of personFilter changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [db, personFilter])

  const { persons, totalCount, userRole } = dataState
  const filteredCount = persons.length
  return (
    <ErrorBoundary>
      <div
        className={artStyles.container}
        style={{ backgroundColor: showFilter ? 'var(--filter-bg)' : 'unset' }}
      >
        {showFilter ?
          <FilterTitle
            title="Person"
            table="person"
            totalCount={totalCount}
            filteredCount={filteredCount}
          />
        : <div className={artStyles.titleContainer}>
            <div className={artStyles.title}>Personen</div>
            <div className={artStyles.titleSymbols}>
              {userRole?.name === 'manager' && (
                <IconButton
                  aria-label="neue Person"
                  title="neue Person"
                  onClick={
                    insertPersonRev as unknown as import('react').MouseEventHandler
                  }
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
        }
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
