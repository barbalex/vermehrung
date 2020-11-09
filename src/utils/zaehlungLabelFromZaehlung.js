import { DateTime } from 'luxon'

const zaehlungLabelFromZaehlung = ({ zaehlung }) => {
  const datumLabel = zaehlung.datum
    ? DateTime.fromSQL(zaehlung.datum).toFormat('yyyy.LL.dd')
    : 'Kein Datum'

  const anz = (
    zaehlung?.teilzaehlungs_aggregate?.aggregate?.sum?.anzahl_pflanzen ?? ''
  )
    .toString()
    .padStart(3, '_')
  const anzAb = (
    zaehlung?.teilzaehlungs_aggregate?.aggregate?.sum?.anzahl_auspflanzbereit ??
    ''
  )
    .toString()
    .padStart(3, '_')
  const anzMu = (
    zaehlung?.teilzaehlungs_aggregate?.aggregate?.sum?.anzahl_mutterpflanzen ??
    ''
  )
    .toString()
    .padStart(3, '_')
  const numbers = `${anz}/${anzAb}/${anzMu}`

  const prognose = zaehlung.prognose ? 'Prognose' : ''
  const label = [datumLabel, numbers, prognose].filter((e) => !!e).join('; ')

  return label
}

export default zaehlungLabelFromZaehlung
