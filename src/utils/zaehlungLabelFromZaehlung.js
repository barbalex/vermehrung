import { DateTime } from 'luxon'

import { exists } from './exists.js'

export const zaehlungLabelFromZaehlung = ({ zaehlung, teilzaehlungs }) => {
  const datumLabel =
    zaehlung.datum ?
      DateTime.fromSQL(zaehlung.datum).toFormat('yyyy.LL.dd')
    : 'Kein Datum'

  const tzs = (teilzaehlungs ?? []).filter(
    (tz) => tz.zaehlung_id === zaehlung.id,
  )

  const anzahlenPfl = tzs
    .map((tz) => tz.anzahl_pflanzen)
    .filter((a) => exists(a))
  const anzPflanzen = (
    anzahlenPfl.length ?
      anzahlenPfl.reduce((a, b) => a + b, 0)
    : '')
    .toString()
    .padStart(3, '_')

  const anzahlenAb = tzs
    .map((tz) => tz.anzahl_auspflanzbereit)
    .filter((a) => exists(a))
  const anzAb = (anzahlenAb.length ? anzahlenAb.reduce((a, b) => a + b, 0) : '')
    .toString()
    .padStart(3, '_')

  const anzahlenMu = tzs
    .map((tz) => tz.anzahl_mutterpflanzen)
    .filter((a) => exists(a))
  const anzMu = (anzahlenMu.length ? anzahlenMu.reduce((a, b) => a + b, 0) : '')
    .toString()
    .padStart(3, '_')

  const numbers = `${anzPflanzen}/${anzAb}/${anzMu}`

  const bedarf = zaehlung.bedarf ? 'Prognose' : ''
  const label = [datumLabel, numbers, bedarf].filter((e) => !!e).join('; ')

  return label
}
