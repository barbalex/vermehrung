import { DateTime } from 'luxon'

import personLabelFromPerson from './personLabelFromPerson'

const sammlungLabelFromSammlung = ({
  sammlung,
  art,
  ae_art,
  person,
  herkunft,
}) => {
  const artLabel = art ? ae_art?.name ?? '(Art ohne Name)' : '(keine Art)'
  const personLabel = personLabelFromPerson({ person })
  const herkunftLabel = herkunft?.id
    ? `von ${herkunft?.nr}` ?? '(Herkunft ohne Nr)'
    : '(keine Herkunft)'
  const datumLabel = sammlung?.datum
    ? DateTime.fromSQL(sammlung?.datum).toFormat('yyyy.LL.dd')
    : 'Kein Datum'
  const geplantLabel = sammlung?.geplant ? 'geplant' : undefined
  const label = [datumLabel, herkunftLabel, artLabel, personLabel, geplantLabel]
    .filter((e) => !!e)
    .join('; ')

  return label
}

export default sammlungLabelFromSammlung
