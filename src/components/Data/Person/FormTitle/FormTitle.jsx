import React, { useContext, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import styled from '@emotion/styled'
import { useResizeDetector } from 'react-resize-detector'
import { Q } from '@nozbe/watermelondb'

import { MobxStoreContext } from '../../../../mobxStoreContext.js'
import AddButton from './AddButton.jsx'
import DeleteButton from './DeleteButton.jsx'
import { FilterNumbers } from '../../../shared/FilterNumbers.jsx'
import { Menu } from '../../../shared/Menu.jsx'
import { HistoryButton } from '../../../shared/HistoryButton.jsx'
import KontoMenu from './KontoMenu/index.jsx'
import NavButtons from './NavButtons.jsx'
import { constants } from '../../../../utils/constants.js'

const TitleContainer = styled.div`
  background-color: rgba(74, 20, 140, 0.1);
  flex-shrink: 0;
  display: flex;
  @media print {
    display: none !important;
  }
  height: ${constants.titleRowHeight}px;
  justify-content: space-between;
  padding 0 10px;
`
const Title = styled.div`
  font-weight: bold;
  margin-top: auto;
  margin-bottom: auto;
  margin-left: 10px;
`
const TitleSymbols = styled.div`
  display: flex;
  margin-top: auto;
  margin-bottom: auto;
`

const PersonFormTitle = ({
  row,
  totalCount,
  filteredCount,
  showHistory,
  setShowHistory,
}) => {
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
    <TitleContainer ref={ref}>
      <Title>Person</Title>
      <TitleSymbols>
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
      </TitleSymbols>
    </TitleContainer>
  )
}

export default observer(PersonFormTitle)
