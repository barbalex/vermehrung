import { DateTime } from 'luxon'

export default ({ lieferung }) => {
  const datum = lieferung.datum
    ? DateTime.fromSQL(lieferung.datum).toFormat('yyyy.LL.dd')
    : 'kein Datum'
  const anz = lieferung.anzahl_pflanzen ?? '_'
  const anzAb = lieferung.anzahl_auspflanzbereit ?? '_'
  const numbers = `${anz
    .toString()
    .padStart(3, '_')}/${anzAb.toString().padStart(3, '_')}`
  const geplant = lieferung.geplant ? ' (geplant)' : ''

  return `${datum}: ${numbers}${geplant}`
}
