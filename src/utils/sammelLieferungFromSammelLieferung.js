import { DateTime } from 'luxon'

import gartenLabelFromGarten from './gartenLabelFromGarten'
import personLabelFromPerson from './personLabelFromPerson'

export default ({ lieferung, store }) => {
  const vonKultur = lieferung.von_kultur_id
    ? store.sammel_lieferungs.get(lieferung.von_kultur_id)
    : {}
  const vonGarten = vonKultur.garten_id
    ? store.gartens.get(vonKultur.garten_id)
    : {}
  const datum = lieferung.datum
    ? DateTime.fromSQL(lieferung.datum).toFormat('yyyy.LL.dd')
    : `Kein Datum. ID: ${lieferung.id}`
  const gartenLabel = gartenLabelFromGarten({ garten: vonGarten, store })
  const person = lieferung.person_id
    ? store.persons.get(lieferung.person_id)
    : {}
  const von = gartenLabel ? `, von: ${gartenLabel}` : ''
  const personLabel = personLabelFromPerson({ person, store })
  const wer = personLabel ? `, wer: ${personLabel}` : ''

  return `${datum}${von}${wer}`
}
