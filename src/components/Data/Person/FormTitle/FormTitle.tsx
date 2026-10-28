import { useState, useEffect } from 'react'
import { useAtomValue } from 'jotai'
import { useResizeDetector } from 'react-resize-detector'
import { Q } from '@nozbe/watermelondb'

import { dbAtom, userAtom } from '../../../../store/index.ts'
import { PersonAddButton as AddButton } from './AddButton.tsx'
import { PersonDeleteButton as DeleteButton } from './DeleteButton.tsx'
import { FilterNumbers } from '../../../shared/FilterNumbers.tsx'
import { Menu } from '../../../shared/Menu.tsx'
import { HistoryButton } from '../../../shared/HistoryButton.tsx'
import { PersonKonto as KontoMenu } from './KontoMenu/index.tsx'
import { PersonFormTitleNavButtons as NavButtons } from './NavButtons.tsx'

import artStyles from '../../Art/FormTitle/FormTitle.module.css'

export const PersonFormTitle = ({
  row,
  totalCount,
  filteredCount,
  showHistory,
}: {
  row: import('../../../../dbModel.ts').Person | null | undefined
  totalCount: number
  filteredCount: number
  showHistory: boolean
}) => {
  const user = useAtomValue(userAtom)
  const db = useAtomValue(dbAtom)

  const { width, ref } = useResizeDetector()

  const [userRole, setUserRole] = useState(undefined)
  useEffect(() => {
    const userRoleObservable = db
      ?.get<import('../../../../dbModel.ts').UserRole>('user_role')
      .query(Q.on('person', Q.where('account_id', user.uid ?? 'none')))
      .observeWithColumns(['name'])
    const subscription = userRoleObservable?.subscribe(([userRole]) =>
      setUserRole(userRole),
    )

    return () => subscription?.unsubscribe?.()
  }, [db, user])

  if (!userRole) return null

  return (
    <div className={artStyles.container} ref={ref}>
      <div className={artStyles.title}>Person</div>
      <div className={artStyles.symbols}>
        <NavButtons />
        {userRole?.name === 'manager' && (
          <>
            <AddButton />
            <DeleteButton row={row} />
          </>
        )}
        {width < 568 ? (
          <Menu white={false}>
            <HistoryButton
              table="person"
              id={row?.id}
              showHistory={showHistory}
              asMenu
            />
            <KontoMenu row={row} asMenu />
            <FilterNumbers
              filteredCount={filteredCount}
              totalCount={totalCount}
              asMenu
            />
          </Menu>
        ) : (
          <>
            <HistoryButton
              table="person"
              id={row?.id}
              showHistory={showHistory}
            />
            <KontoMenu row={row} />
            <FilterNumbers
              filteredCount={filteredCount}
              totalCount={totalCount}
            />
          </>
        )}
      </div>
    </div>
  )
}
