import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import format from 'date-fns/format'

import { personFullname } from '../../../../../utils/personFullname.js'

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

export const TeilkulturEventRow = ({ event, last }) => {
  const [personName, setPersonName] = useState()
  useEffect(() => {
    let isActive = true
    const run = async () => {
      let person
      try {
        person = event.person.fetch()
      } catch {}
      if (!isActive) return

      setPersonName(personFullname(person))
    }
    run()

    return () => {
      isActive = false
    }
  }, [event.person])

  const datum =
    event.datum ? format(new Date(event.datum), 'yyyy.MM.dd') : 'Kein Datum'

  return (
    <Row
      key={event.id}
      data-last={last}
    >
      <Datum>{datum}</Datum>
      <Geplant>{event?.geplant ? 'geplant' : ' '}</Geplant>
      <Name>{personName ?? ' '}</Name>
      <Beschreibung>{event?.beschreibung ?? ' '}</Beschreibung>
    </Row>
  )
}
