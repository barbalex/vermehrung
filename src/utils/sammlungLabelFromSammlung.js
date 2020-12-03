import { DateTime } from 'luxon'

import personLabelFromPerson from './personLabelFromPerson'

const sammlungLabelFromSammlung = ({
  sammlung,
  store,
  art: artPassed,
  ae_art: aeArtPassed,
  person: personPassed,
  herkunft: herkunftPassed,
}) => {
  const art = store
    ? sammlung?.art_id
      ? store.arts.get(sammlung.art_id)
      : undefined
    : artPassed
  const aeArt = store
    ? art?.ae_id
      ? store.ae_arts.get(art.ae_id)
      : undefined
    : aeArtPassed
  const person = store
    ? sammlung.person_id
      ? store.persons.get(sammlung.person_id)
      : undefined
    : personPassed
  const herkunft = store
    ? sammlung.herkunft_id
      ? store.herkunfts.get(sammlung.herkunft_id)
      : undefined
    : herkunftPassed

  const artLabel = art ? aeArt?.name ?? '(Art ohne Name)' : '(keine Art)'
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
