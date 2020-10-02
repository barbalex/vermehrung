import { DateTime } from 'luxon'

export default ({ zaehlung }) => {
  const datum = zaehlung.datum
    ? DateTime.fromSQL(zaehlung.datum).toFormat('yyyy.LL.dd')
    : 'kein Datum'
  const anz =
    zaehlung?.teilzaehlungs_aggregate?.aggregate?.sum?.anzahl_pflanzen ?? '-'
  const anzAb =
    zaehlung?.teilzaehlungs_aggregate?.aggregate?.sum?.anzahl_auspflanzbereit ??
    '-'
  const anzMu =
    zaehlung?.teilzaehlungs_aggregate?.aggregate?.sum?.anzahl_mutterpflanzen ??
    '-'
  const numbers = `${anz
    .toString()
    .padStart(3, '\u00A0')}/${anzAb
    .toString()
    .padStart(3, '\u00A0')}/${anzMu.toString().padStart(3, '\u00A0')}`
  const prognose = zaehlung.prognose ? ' (Prognose)' : ''

  return `${datum}: ${numbers}${prognose}`
}
