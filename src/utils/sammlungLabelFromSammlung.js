import { DateTime } from 'luxon'

export default ({ sammlung, store }) => {
  const art = sammlung?.art_id ? store.arts.get(sammlung.art_id) : {}
  const aeArt = art?.ae_id ? store.ae_arts.get(art.ae_id) : {}
  const person = sammlung.person_id ? store.persons.get(sammlung.person_id) : {}
  const herkunft = sammlung.herkunft_id
    ? store.herkunfts.get(sammlung.herkunft_id)
    : {}

  const artLabel = art ? aeArt?.name ?? '(Art ohne Name)' : '(keine Art)'
  const personLabel = person?.fullname
    ? person.fullname ?? '(Person ohne Name)'
    : ''
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
