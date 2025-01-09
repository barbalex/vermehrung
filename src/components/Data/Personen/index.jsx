import React, { useContext, useCallback, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import styled from '@emotion/styled'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'
import { FixedSizeList } from 'react-window'
import { useResizeDetector } from 'react-resize-detector'
import { combineLatest } from 'rxjs'
import { Q } from '@nozbe/watermelondb'

import { FilterTitle } from '../../shared/FilterTitle.jsx'
import Row from './Row.jsx'
import { ErrorBoundary } from '../../shared/ErrorBoundary.jsx'
import { FilterNumbers } from '../../shared/FilterNumbers.jsx'
import { MobxStoreContext } from '../../../mobxStoreContext.js'
import UpSvg from '../../../svg/to_up.svg?react'
import { tableFilter } from '../../../utils/tableFilter.js'
import { personSort } from '../../../utils/personSort.js'
import { constants } from '../../../utils/constants.js'

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => (props.showfilter ? '#fff3e0' : 'unset')};
`

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
const FieldsContainer = styled.div`
  height: 100%;
`

const Personen = ({ filter: showFilter = false }) => {
  const store = useContext(MobxStoreContext)
  const { insertPersonRev, db, user, filter } = store
  const { activeNodeArray, setActiveNodeArray, removeOpenNode } = store.tree
  const { person: personFilter } = store.filter

  const { width, height, ref } = useResizeDetector()

  const [dataState, setDataState] = useState({
    persons: [],
    totalCount: 0,
    userRole: undefined,
  })
  useEffect(() => {
    const collection = db.get('person')
    const personDelQuery =
      filter.person._deleted === false ? Q.where('_deleted', false)
      : filter.person._deleted === true ? Q.where('_deleted', true)
      : Q.or(
          Q.where('_deleted', false),
          Q.where('_deleted', true),
          Q.where('_deleted', null),
        )
    const personAktivQuery =
      filter.person.aktiv === false ? Q.where('aktiv', false)
      : filter.person.aktiv === true ? Q.where('aktiv', true)
      : Q.or(
          Q.where('aktiv', false),
          Q.where('aktiv', true),
          Q.where('aktiv', null),
        )
    const countObservable = collection
      .query(personDelQuery, personAktivQuery)
      .observeCount()
    const dataObservable = collection
      .query(...tableFilter({ table: 'person', store }))
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
  }, [db, ...Object.values(personFilter), personFilter, store])

  const { persons, totalCount, userRole } = dataState
  const filteredCount = persons.length

  const add = useCallback(() => {
    insertPersonRev()
  }, [insertPersonRev])

  const onClickUp = useCallback(() => {
    removeOpenNode(activeNodeArray)
    setActiveNodeArray(activeNodeArray.slice(0, -1))
  }, [activeNodeArray, removeOpenNode, setActiveNodeArray])
  let upTitle = 'Eine Ebene höher'
  if (activeNodeArray[0] === 'Personen') {
    upTitle = 'Zu allen Listen'
  }

  return (
    <ErrorBoundary>
      <Container
        showfilter={showFilter}
        ref={ref}
      >
        {showFilter ?
          <FilterTitle
            title="Person"
            table="person"
            totalCount={totalCount}
            filteredCount={filteredCount}
          />
        : <TitleContainer>
            <Title>Personen</Title>
            <TitleSymbols>
              <IconButton
                title={upTitle}
                onClick={onClickUp}
                size="large"
              >
                <UpSvg />
              </IconButton>
              {userRole?.name === 'manager' && (
                <IconButton
                  aria-label="neue Person"
                  title="neue Person"
                  onClick={add}
                  size="large"
                >
                  <FaPlus />
                </IconButton>
              )}
              <FilterNumbers
                filteredCount={filteredCount}
                totalCount={totalCount}
              />
            </TitleSymbols>
          </TitleContainer>
        }
        <FieldsContainer>
          {!!width && (
            <FixedSizeList
              height={height - constants.titleRowHeight}
              itemCount={persons.length}
              itemSize={constants.singleRowHeight}
              width={width}
            >
              {({ index, style }) => (
                <Row
                  key={index}
                  style={style}
                  index={index}
                  row={persons[index]}
                  last={index === persons.length - 1}
                />
              )}
            </FixedSizeList>
          )}
        </FieldsContainer>
      </Container>
    </ErrorBoundary>
  )
}

export default observer(Personen)
