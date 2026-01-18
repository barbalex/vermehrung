import { useContext, useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { Q } from '@nozbe/watermelondb'

import { MobxStoreContext } from '../../../../../mobxStoreContext.js'
import { teilzaehlungsSortByZaehlungTk } from '../../../../../utils/teilzaehlungsSortByZaehlungTk.js'
import { ErrorBoundary } from '../../../../shared/ErrorBoundary.jsx'
import { TeilkulturTeilzaehlung as Teilzaehlungen } from './Teilzaehlungen.jsx'

import styles from './index.module.css'

export const TeilkulturZaehlungen = observer(({ teilkultur }) => {
  const store = useContext(MobxStoreContext)
  const { db } = store

  const [teilzaehlungs, setTeilzaehlungs] = useState([])
  useEffect(() => {
    const teilzaehlungsObservable = db
      .get('teilzaehlung')
      .query(
        Q.where('_deleted', false),
        Q.on('zaehlung', Q.where('kultur_id', teilkultur.kultur_id)),
      )
      .observeWithColumns(['datum', 'beschreibung', 'geplant'])
    const subscription = teilzaehlungsObservable.subscribe(
      async (teilzaehlungs) => {
        const teilzaehlungsSorted =
          await teilzaehlungsSortByZaehlungTk(teilzaehlungs)
        setTeilzaehlungs(teilzaehlungsSorted)
      },
    )

    return () => subscription?.unsubscribe?.()
  }, [db, teilkultur.kultur_id, teilkultur.zaehlung])

  return (
    <ErrorBoundary>
      <section
        className={styles.titleRow}
        style={{ ...(teilzaehlungs.length ? { marginBottom: 10 } : {}) }}
      >
        <div className={styles.title}>Zählungen</div>
      </section>
      <div className={styles.listContainer}>
        {teilzaehlungs.map((tz, i) => (
          <Teilzaehlungen
            key={tz.id}
            tz={tz}
            last={i === teilzaehlungs.length - 1}
          />
        ))}
      </div>
    </ErrorBoundary>
  )
})
