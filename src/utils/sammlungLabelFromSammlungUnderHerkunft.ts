import { DateTime } from 'luxon'

import { personLabelFromPerson } from './personLabelFromPerson.ts'
import type { AeArtRow, PersonRow, SammlungRow } from './rowTypes.ts'

export const sammlungLabelFromSammlungUnderHerkunft = ({
  sammlung,
  art,
  ae_art,
  person,
}: {
  sammlung: SammlungRow
  art: unknown
  ae_art: AeArtRow
  person: PersonRow
}) => {
  const artLabel = art ? (ae_art?.name ?? '(Art ohne Name)') : '(keine Art)'
  const personLabel = personLabelFromPerson({ person })
  const datumLabel = sammlung?.datum
    ? DateTime.fromSQL(sammlung?.datum).toFormat('yyyy.LL.dd')
    : 'Kein Datum'
  const geplantLabel = sammlung?.geplant ? 'geplant' : undefined
  const label = [datumLabel, artLabel, personLabel, geplantLabel]
    .filter((e) => !!e)
    .join('; ')

  return label
}
