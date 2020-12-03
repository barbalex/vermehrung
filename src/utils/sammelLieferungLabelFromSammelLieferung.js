import { DateTime } from 'luxon'

import gartenLabelFromGarten from './gartenLabelFromGarten'
import personLabelFromPerson from './personLabelFromPerson'

const sammelLieferungLabelFromSammelLieferung = ({
  lieferung,
  store,
  vonKultur: vonKulturPassed,
  vonGarten: vonGartenPassed,
  person: personPassed,
}) => {
  if (!lieferung?.id) return 'keine Lieferung'

  const vonKultur = store
    ? lieferung.von_kultur_id
      ? store.sammel_lieferungs.get(lieferung.von_kultur_id)
      : undefined
    : vonKulturPassed
  const vonGarten = store
    ? vonKultur?.garten_id
      ? store.gartens.get(vonKultur.garten_id)
      : undefined
    : vonGartenPassed
  const datumLabel = lieferung.datum
    ? DateTime.fromSQL(lieferung.datum).toFormat('yyyy.LL.dd')
    : `Kein Datum. ID: ${lieferung.id}`
  const gartenLabel = gartenLabelFromGarten({ garten: vonGarten, store })
  const person = store
    ? lieferung.person_id
      ? store.persons.get(lieferung.person_id)
      : undefined
    : personPassed
  const von = gartenLabel ?? `von: ${gartenLabel}`
  const personLabel = personLabelFromPerson({ person, store })
  const label = [datumLabel, von, personLabel].filter((e) => !!e).join('; ')

  return label
}

export default sammelLieferungLabelFromSammelLieferung
