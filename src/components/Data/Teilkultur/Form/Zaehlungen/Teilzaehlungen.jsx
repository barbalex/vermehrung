import { useState, useEffect } from 'react'
import format from 'date-fns/format'

import { exists } from '../../../../../utils/exists.js'
import {
  row,
  datumClass,
  pflanzen,
  auspflanzbereit,
  prognose,
  other,
} from './Teilzaehlungen.module.css'

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
    <div className={row}>
      <div className={datumClass}>{datum}</div>
      <div className={prognose}>{zaehlung.prognose ? 'Bedarf' : ' '}</div>
      <div className={pflanzen}>
        {exists(tz.anzahl_pflanzen) ? `${tz.anzahl_pflanzen} Pflanzen` : ''}
      </div>
      <div className={auspflanzbereit}>
        {exists(tz.anzahl_auspflanzbereit) ?
          `${tz.anzahl_auspflanzbereit} auspflanzbereit`
        : ''}
      </div>
      <div className={auspflanzbereit}>
        {exists(tz.anzahl_mutterpflanzen) ?
          `${tz.anzahl_mutterpflanzen} Mutterpflanzen`
        : ''}
      </div>
      <div className={auspflanzbereit}>
        {exists(tz.andere_menge) ? tz.andere_menge : ''}
      </div>
      <div className={other}>
        {exists(tz.auspflanzebereit_beschreibung) ?
          tz.auspflanzebereit_beschreibung
        : ''}
      </div>
      <div className={other}>{tz.bemerkungen ? tz.bemerkungen : ''}</div>
    </div>
  )
}
