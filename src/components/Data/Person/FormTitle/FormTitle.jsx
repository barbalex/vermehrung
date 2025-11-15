import { useContext, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useResizeDetector } from 'react-resize-detector'
import { Q } from '@nozbe/watermelondb'

import { MobxStoreContext } from '../../../../mobxStoreContext.js'
import { PersonAddButton as AddButton } from './AddButton.jsx'
import { PersonDeleteButton as DeleteButton } from './DeleteButton.jsx'
import { FilterNumbers } from '../../../shared/FilterNumbers.jsx'
import { Menu } from '../../../shared/Menu.jsx'
import { HistoryButton } from '../../../shared/HistoryButton.jsx'
import { PersonKonto as KontoMenu } from './KontoMenu/index.jsx'
import { PersonFormTitleNavButtons as NavButtons } from './NavButtons.jsx'

import {
  container,
  title,
  symbols,
} from '../../Art/FormTitle/FormTitle.module.css'

export const PersonFormTitle = observer(
  ({ row, totalCount, filteredCount, showHistory, setShowHistory }) => {
    const store = useContext(MobxStoreContext)
    const { user, db } = store

    const { width, ref } = useResizeDetector()

    const [userRole, setUserRole] = useState(undefined)
    useEffect(() => {
      const userRoleObservable = db
        .get('user_role')
        .query(Q.on('person', Q.where('account_id', user.uid ?? 'none')))
        .observeWithColumns(['name'])
      const subscription = userRoleObservable.subscribe(([userRole]) =>
        setUserRole(userRole),
      )

      return () => subscription?.unsubscribe?.()
    }, [db, user])

    if (!userRole) return null

    return (
      <div
        className={container}
        ref={ref}
      >
        <div className={title}>Person</div>
        <div className={symbols}>
          <NavButtons />
          {userRole?.name === 'manager' && (
            <>
              <AddButton />
              <DeleteButton row={row} />
            </>
          )}
          {width < 568 ?
            <Menu white={false}>
              <HistoryButton
                table="person"
                id={row.id}
                showHistory={showHistory}
                setShowHistory={setShowHistory}
                asMenu
              />
              <KontoMenu
                row={row}
                asMenu
              />
              <FilterNumbers
                filteredCount={filteredCount}
                totalCount={totalCount}
                asMenu
              />
            </Menu>
          : <>
              <HistoryButton
                table="person"
                id={row.id}
                showHistory={showHistory}
                setShowHistory={setShowHistory}
              />
              <KontoMenu row={row} />
              <FilterNumbers
                filteredCount={filteredCount}
                totalCount={totalCount}
              />
            </>
          }
        </div>
      </div>
    )
  },
)
