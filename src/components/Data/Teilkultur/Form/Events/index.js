import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Q } from '@nozbe/watermelondb'

import ErrorBoundary from '../../../../shared/ErrorBoundary'
import eventSort from '../../../../../utils/eventSort'
import Row from './Row'

const TitleRow = styled.div`
  background-color: rgba(237, 230, 244, 1);
  flex-shrink: 0;
  display: flex;
  height: 48px;
  justify-content: space-between;
  margin-left: -10px;
  margin-right: -10px;
  padding: 0 10px;
  user-select: none;
  position: sticky;
  top: -10px;
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
  const [events, setEvents] = useState([])
  useEffect(() => {
    const eventsObservable = teilkultur.events
      .extend(Q.where('_deleted', false))
      .observeWithColumns(['datum', 'beschreibung', 'geplant'])
    const subscription = eventsObservable.subscribe((events) => {
      const eventsSorted = events.sort((a, b) => eventSort({ a, b }))
      setEvents(eventsSorted)
    })
    return () => subscription.unsubscribe()
  }, [teilkultur.events])

  return (
    <ErrorBoundary>
      <TitleRow>
        <Title>Events</Title>
      </TitleRow>
      <Rows>
        {events.map((ev, i) => (
          <Row key={ev.id} event={ev} last={i === events.length - 1} />
        ))}
      </Rows>
    </ErrorBoundary>
  )
}

export default TkEvents