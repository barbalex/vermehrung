import { useState, useEffect } from 'react'
import format from 'date-fns/format'

import { exists } from '../../../../../utils/exists.js'

import styles from './Teilzaehlungen.module.css'

export const TeilkulturTeilzaehlung = ({ tz }) => {
  const [zaehlung, setZaehlung] = useState([])

  useEffect(() => {
    const zaehlungObservable = tz.zaehlung.observe()
    const subscription = zaehlungObservable.subscribe((zaehlung) =>
      setZaehlung(zaehlung),
    )

    return () => subscription?.unsubscribe?.()
  }, [tz.zaehlung])

  const datum =
    zaehlung?.datum ?
      format(new Date(zaehlung?.datum), 'yyyy.MM.dd')
    : 'Kein Datum'

  return (
    <div className={styles.row}>
      <div className={styles.datumClass}>{datum}</div>
      <div className={styles.prognose}>
        {zaehlung.prognose ? 'Bedarf' : ' '}
      </div>
      <div className={styles.pflanzen}>
        {exists(tz.anzahl_pflanzen) ? `${tz.anzahl_pflanzen} Pflanzen` : ''}
      </div>
      <div className={styles.auspflanzbereit}>
        {exists(tz.anzahl_auspflanzbereit) ?
          `${tz.anzahl_auspflanzbereit} auspflanzbereit`
        : ''}
      </div>
      <div className={styles.auspflanzbereit}>
        {exists(tz.anzahl_mutterpflanzen) ?
          `${tz.anzahl_mutterpflanzen} Mutterpflanzen`
        : ''}
      </div>
      <div className={styles.auspflanzbereit}>
        {exists(tz.andere_menge) ? tz.andere_menge : ''}
      </div>
      <div className={styles.other}>
        {exists(tz.auspflanzebereit_beschreibung) ?
          tz.auspflanzebereit_beschreibung
        : ''}
      </div>
      <div className={styles.other}>{tz.bemerkungen ? tz.bemerkungen : ''}</div>
    </div>
  )
}
