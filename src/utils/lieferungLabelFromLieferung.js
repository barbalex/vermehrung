import { DateTime } from 'luxon'

export const lieferungLabelFromLieferung = ({ lieferung }) => {
  const datumLabel =
    lieferung.datum ?
      DateTime.fromSQL(lieferung.datum).toFormat('yyyy.LL.dd')
    : 'Kein Datum'
  const anz = (lieferung.anzahl_pflanzen ?? '').toString().padStart(3, '_')
  const anzAb = (lieferung.anzahl_auspflanzbereit ?? '')
    .toString()
    .padStart(3, '_')
  const numbersLabel = `${anz}/${anzAb}`
  const geplantLabel = lieferung.geplant ? 'geplant' : undefined
  const label = [datumLabel, numbersLabel, geplantLabel]
    .filter((e) => !!e)
    .join('; ')

  return label
}
