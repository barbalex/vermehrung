import { useState, useEffect, useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Q } from '@nozbe/watermelondb'

import { ErrorBoundary } from '../../../../shared/ErrorBoundary.jsx'
import { eventSort } from '../../../../../utils/eventSort.js'
import { MobxStoreContext } from '../../../../../mobxStoreContext.js'
import { TeilkulturEventRow as Row } from './Row.jsx'

import { titleRow, title, rows } from './index.module.css'

export const TeilkulturEvents = observer(({ teilkultur }) => {
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
      <div className={titleRow}>
        <div className={title}>Events</div>
      </div>
      <div className={rows}>
        {events.map((ev, i) => (
          <Row
            key={ev.id}
            event={ev}
          />
        ))}
      </div>
    </ErrorBoundary>
  )
})
