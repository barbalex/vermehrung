import { useState, useEffect } from 'react'
import { useAtomValue } from 'jotai'
import { Q } from '@nozbe/watermelondb'

import { ErrorBoundary } from '../../../../shared/ErrorBoundary.jsx'
import { eventSort } from '../../../../../utils/eventSort.js'
import { filterEventAtom } from '../../../../../store/index.js'
import { TeilkulturEventRow as Row } from './Row.jsx'

import styles from './index.module.css'

export const TeilkulturEvents = ({ teilkultur }) => {
  const eventFilter = useAtomValue(filterEventAtom)

  const [events, setEvents] = useState([])
  useEffect(() => {
    const eventDelQuery =
      eventFilter._deleted === false
        ? Q.where('_deleted', false)
        : eventFilter._deleted === true
          ? Q.where('_deleted', true)
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
  }, [eventFilter._deleted, teilkultur.events])

  return (
    <ErrorBoundary>
      <section className={styles.titleRow}>
        <div className={styles.title}>Events</div>
      </section>
      <div className={styles.rows}>
        {events.map((ev, i) => (
          <Row key={ev.id} event={ev} />
        ))}
      </div>
    </ErrorBoundary>
  )
}
