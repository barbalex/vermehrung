import React, { useState, useEffect, useContext } from 'react'
import styled from '@emotion/styled'
import { Q } from '@nozbe/watermelondb'

import { ErrorBoundary } from '../../../../shared/ErrorBoundary.jsx'
import { eventSort } from '../../../../../utils/eventSort.js'
import { MobxStoreContext } from '../../../../../mobxStoreContext.js'
import Row from './Row.jsx'
import { constants } from '../../../../../utils/constants.js'

const TitleRow = styled.div`
  background-color: rgba(248, 243, 254, 1);
  flex-shrink: 0;
  display: flex;
  height: ${constants.titleRowHeight}px;
  justify-content: space-between;
  margin-left: -10px;
  margin-right: -10px;
  padding: 0 10px;
  user-select: none;
  position: sticky;
  top: 0;
  z-index: 1;
  user-select: none;
`
const Title = styled.div`
  font-weight: bold;
  margin-top: auto;
  margin-bottom: auto;
`
const Rows = styled.div``

const TkEvents = ({ teilkultur }) => {
  const store = useContext(MobxStoreContext)
  const { filter } = store

  const [events, setEvents] = useState([])
  useEffect(() => {
    const eventDelQuery =
      filter.event._deleted === false ? Q.where('_deleted', false)
      : filter.event._deleted === true ? Q.where('_deleted', true)
      : Q.or(
          Q.where('_deleted', false),
          Q.where('_deleted', true),
          Q.where('_deleted', null),
        )
    const eventsObservable = teilkultur.events
      .extend(eventDelQuery)
      .observeWithColumns(['datum', 'beschreibung', 'geplant'])
    const subscription = eventsObservable.subscribe((events) => {
      const eventsSorted = events.sort(eventSort)
      setEvents(eventsSorted)
    })

    return () => subscription?.unsubscribe?.()
  }, [filter.event._deleted, teilkultur.events])

  return (
    <ErrorBoundary>
      <TitleRow>
        <Title>Events</Title>
      </TitleRow>
      <Rows>
        {events.map((ev, i) => (
          <Row
            key={ev.id}
            event={ev}
            last={i === events.length - 1}
          />
        ))}
      </Rows>
    </ErrorBoundary>
  )
}

export default TkEvents
