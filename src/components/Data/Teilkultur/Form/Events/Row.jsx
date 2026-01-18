import { useState, useEffect } from 'react'
import format from 'date-fns/format'

import { personFullname } from '../../../../../utils/personFullname.js'
import styles from './Row.module.css'

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
      className={styles.row}
      key={event.id}
    >
      <div className={styles.datumClass}>{datum}</div>
      <div className={styles.geplant}>{event?.geplant ? 'geplant' : ' '}</div>
      <div className={styles.name}>{personName ?? ' '}</div>
      <div className={styles.beschreibung}>{event?.beschreibung ?? ' '}</div>
    </div>
  )
}
