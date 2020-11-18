import { DateTime } from 'luxon'

import exists from './exists'

const zaehlungLabelFromZaehlung = ({ zaehlung, store }) => {
  const { teilzaehlungsSorted } = store
  const ownTz = teilzaehlungsSorted.filter(
    (tz) => tz.zaehlung_id === zaehlung.id,
  )
  console.log('zaehlungLabelFromZaehlung, ownTz', ownTz)
  const datumLabel = zaehlung.datum
    ? DateTime.fromSQL(zaehlung.datum).toFormat('yyyy.LL.dd')
    : 'Kein Datum'

  const anzahlenPfl = ownTz
    .map((tz) => tz.anzahl_pflanzen)
    .filter((a) => exists(a))
  const anzPflanzen = (anzahlenPfl.length
    ? anzahlenPfl.reduce((a, b) => a + b, 0)
    : ''
  )
    .toString()
    .padStart(3, '_')

  const anzahlenAb = ownTz
    .map((tz) => tz.anzahl_auspflanzbereit)
    .filter((a) => exists(a))
  const anzAb = (anzahlenAb.length ? anzahlenAb.reduce((a, b) => a + b, 0) : '')
    .toString()
    .padStart(3, '_')

  const anzahlenMu = ownTz
    .map((tz) => tz.anzahl_mutterpflanzen)
    .filter((a) => exists(a))
  const anzMu = (anzahlenMu.length ? anzahlenMu.reduce((a, b) => a + b, 0) : '')
    .toString()
    .padStart(3, '_')

  const numbers = `${anzPflanzen}/${anzAb}/${anzMu}`

  const prognose = zaehlung.prognose ? 'Prognose' : ''
  const label = [datumLabel, numbers, prognose].filter((e) => !!e).join('; ')

  return label
}

export default zaehlungLabelFromZaehlung
