import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import format from 'date-fns/format'
import { Q } from '@nozbe/watermelondb'

import { StoreContext } from '../../../../models/reactUtils'
import ErrorBoundary from '../../../shared/ErrorBoundary'
import eventSort from '../../../../utils/eventSort'

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
const Row = styled.div`
  ${(props) =>
    !props['data-last'] && 'border-bottom: thin solid rgba(74, 20, 140, 0.1);'}
  border-collapse: collapse;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  &:hover {
    background-color: rgba(74, 20, 140, 0.03);
  }
`
const Datum = styled.div`
  flex-basis: 85px;
  flex-shrink: 0;
  flex-grow: 0;
  margin-right: 10px;
`
const Name = styled.div`
  flex-basis: 150px;
  flex-shrink: 1;
  flex-grow: 1;
  margin-right: 10px;
`
const Beschreibung = styled.div`
  flex-basis: 170px;
  flex-shrink: 5;
  flex-grow: 5;
  margin-right: 10px;
`
const Geplant = styled.div`
  flex-basis: 60px;
  flex-shrink: 0;
  flex-grow: 0;
  margin-right: 10px;
`

const TkEvents = ({ teilkultur }) => {
  const store = useContext(StoreContext)

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
        {events.map((ev, i) => {
          const person = ev.person_id ? store.persons.get(ev.person_id) : {}
          const datum = ev.datum
            ? format(new Date(ev.datum), 'yyyy.MM.dd')
            : 'Kein Datum'

          return (
            <Row key={ev.id} data-last={i === events.length - 1}>
              <Datum>{datum}</Datum>
              <Geplant>{ev?.geplant ? 'geplant' : ' '}</Geplant>
              <Name>{person?.fullname ?? ' '}</Name>
              <Beschreibung>{ev?.beschreibung ?? ' '}</Beschreibung>
            </Row>
          )
        })}
      </Rows>
    </ErrorBoundary>
  )
}

export default TkEvents
