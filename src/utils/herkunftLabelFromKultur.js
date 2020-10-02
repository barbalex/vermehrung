import herkunftLabelFromHerkunft from './herkunftLabelFromHerkunft'

export default ({ kultur, store }) => {
  const herkunft = kultur?.herkunft_id
    ? store.herkunfts.get(kultur.herkunft_id)
    : {}

  if (!herkunft.id) return '(keine Herkunft)'

  return herkunftLabelFromHerkunft({ herkunft, store })
}
