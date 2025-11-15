import { useState, useEffect } from 'react'
import format from 'date-fns/format'

import { personFullname } from '../../../../../utils/personFullname.js'
import { row, datumClass, name, beschreibung, geplant } from './Row.module.css'

export const TeilkulturEventRow = ({ event }) => {
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
    <div
      className={row}
      key={event.id}
    >
      <div className={datumClass}>{datum}</div>
      <div className={geplant}>{event?.geplant ? 'geplant' : ' '}</div>
      <div className={name}>{personName ?? ' '}</div>
      <div className={beschreibung}>{event?.beschreibung ?? ' '}</div>
    </div>
  )
}
