import { useState, useEffect } from 'react'
import { useAtomValue } from 'jotai'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'
import { List } from 'react-window'
import { Q } from 'nitromelondb'

import { FilterTitle } from '../../shared/FilterTitle.tsx'
import { PersonRow as Row } from './Row.tsx'
import { ErrorBoundary } from '../../shared/ErrorBoundary.tsx'
import { FilterNumbers } from '../../shared/FilterNumbers.tsx'
import { dbAtom, userAtom } from '../../../store/index.ts'
import { insertPersonRev } from '../../../modules/insertRev.ts'
import { personSort } from '../../../utils/personSort.ts'
import { constants } from '../../../utils/constants.ts'
import { useEntityList } from '../../../utils/useEntityList.ts'
import { triStateQuery } from '../../../utils/triStateDeletedQuery.ts'

import artStyles from '../Arten/index.module.css'

export const Personen = ({ filter: showFilter = false }) => {
  const db = useAtomValue(dbAtom)
  const user = useAtomValue(userAtom)

  const {
    rows: persons,
    totalCount,
    filteredCount,
  } = useEntityList<import('../../../dbModel.ts').Person>({
    table: 'person',
    observeColumns: ['vorname', 'name'],
    sort: (rows) => rows.sort(personSort),
    buildClauses: (filter) => [triStateQuery('aktiv', filter.aktiv)],
  })

  const [userRole, setUserRole] = useState<
    import('../../../dbModel.ts').UserRole | undefined
  >(undefined)
  useEffect(() => {
    const userRoleObservable = db
      ?.get<import('../../../dbModel.ts').UserRole>('user_role')
      .query(Q.on('person', Q.where('account_id', user.uid ?? 'none')))
      .observeWithColumns(['name'])
    const subscription = userRoleObservable?.subscribe?.(([role]) => {
      setUserRole(role)
    })
    return () => subscription?.unsubscribe?.()
  }, [db, user.uid])

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
