import { useState, useEffect } from 'react'
import { useAtomValue } from 'jotai'
import { Q } from '@nozbe/watermelondb'

import { dbAtom } from '../../../../../store/index.ts'
import { teilzaehlungsSortByZaehlungTk } from '../../../../../utils/teilzaehlungsSortByZaehlungTk.ts'
import { ErrorBoundary } from '../../../../shared/ErrorBoundary.tsx'
import { TeilkulturTeilzaehlung as Teilzaehlungen } from './Teilzaehlungen.tsx'

import styles from './index.module.css'

export const TeilkulturZaehlungen = ({ teilkultur }: { teilkultur: import('../../../../shared/types.ts').WmRow | null | undefined }) => {
  const db = useAtomValue(dbAtom)

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
}
