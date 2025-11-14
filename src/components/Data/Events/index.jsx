import { useContext, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import styled from '@emotion/styled'
import { FaPlus } from 'react-icons/fa'
import IconButton from '@mui/material/IconButton'
import { List } from 'react-window'
import { Q } from '@nozbe/watermelondb'
import { combineLatest } from 'rxjs'

import { MobxStoreContext } from '../../../mobxStoreContext.js'
import { FilterTitle } from '../../shared/FilterTitle.jsx'
import { EventRow as Row } from './Row.jsx'
import { ErrorBoundary } from '../../shared/ErrorBoundary.jsx'
import { FilterNumbers } from '../../shared/FilterNumbers.jsx'
import UpSvg from '../../../svg/to_up.svg?react'
import { eventSort } from '../../../utils/eventSort.js'
import { tableFilter } from '../../../utils/tableFilter.js'
import { constants } from '../../../utils/constants.js'

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`
const TitleContainer = styled.div`
  background-color: rgba(74, 20, 140, 0.1);
  flex-shrink: 0;
  display: flex;
  @media print {
    display: none !important;
  }
  height: 48px;
  justify-content: space-between;
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
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: auto;
  scrollbar-width: thin;
`

export const Events = observer(({ filter: showFilter = false }) => {
  const store = useContext(MobxStoreContext)
  const { insertEventRev, kulturIdInActiveNodeArray, db, filter } = store
  const { activeNodeArray, setActiveNodeArray, removeOpenNode } = store.tree
  const { event: eventFilter } = store.filter

  const [dataState, setDataState] = useState({ events: [], totalCount: 0 })
  useEffect(() => {
    const hierarchyQuery =
      kulturIdInActiveNodeArray ?
        [
          Q.experimentalJoinTables(['kultur']),
          Q.on('kultur', 'id', kulturIdInActiveNodeArray),
        ]
      : []
    const collection = db.get('event')
    const delQuery =
      filter.event._deleted === false ? Q.where('_deleted', false)
      : filter.event._deleted === true ? Q.where('_deleted', true)
      : Q.or(
          Q.where('_deleted', false),
          Q.where('_deleted', true),
          Q.where('_deleted', null),
        )
    const countObservable = collection
      .query(delQuery, ...hierarchyQuery)
      .observeCount()
    const dataObservable = collection
      .query(...tableFilter({ store, table: 'event' }), ...hierarchyQuery)
      .observeWithColumns(['datum', 'beschreibung'])
    const combinedObservables = combineLatest([countObservable, dataObservable])
    const subscription = combinedObservables.subscribe(
      ([totalCount, events]) => {
        setDataState({
          events: events.sort(eventSort),
          totalCount,
        })
      },
    )

    return () => subscription?.unsubscribe?.()
    // need to rerender if any of the values of eventFilter changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    db,
    kulturIdInActiveNodeArray,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    ...Object.values(eventFilter),
    eventFilter,
  ])

  const { events, totalCount } = dataState
  const filteredCount = events.length

  const onClickUp = () => {
    removeOpenNode(activeNodeArray)
    setActiveNodeArray(activeNodeArray.slice(0, -1))
  }

  let upTitle = 'Eine Ebene höher'
  if (activeNodeArray[0] === 'Events') {
    upTitle = 'Zu allen Listen'
  }
  if (activeNodeArray[activeNodeArray.length - 3] === 'Kulturen') {
    upTitle = 'Zur Kultur'
  }

  return (
    <ErrorBoundary>
      <Container style={{ backgroundColor: showFilter ? '#fff3e0' : 'unset' }}>
        {showFilter ?
          <FilterTitle
            title="Event"
            table="event"
            totalCount={totalCount}
            filteredCount={filteredCount}
          />
        : <TitleContainer>
            <Title>Events</Title>
            <TitleSymbols>
              <IconButton
                title={upTitle}
                onClick={onClickUp}
                size="large"
              >
                <UpSvg />
              </IconButton>
              <IconButton
                aria-label="neuer Event"
                title="neuer Event"
                onClick={insertEventRev}
                size="large"
              >
                <FaPlus />
              </IconButton>
              <FilterNumbers
                filteredCount={filteredCount}
                totalCount={totalCount}
              />
            </TitleSymbols>
          </TitleContainer>
        }
        <FieldsContainer>
          <List
            rowComponent={Row}
            rowCount={events.length}
            rowHeight={constants.singleRowHeight}
            rowProps={{ rows: events }}
          />
        </FieldsContainer>
      </Container>
    </ErrorBoundary>
  )
})
