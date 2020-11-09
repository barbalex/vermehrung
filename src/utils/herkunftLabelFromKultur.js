import herkunftLabelFromHerkunft from './herkunftLabelFromHerkunft'

const herkunftLabelFromKultur = ({ kultur, store }) => {
  const herkunft = kultur?.herkunft_id
    ? store.herkunfts.get(kultur.herkunft_id)
    : {}

  if (!herkunft.id) return '(keine Herkunft)'

  return herkunftLabelFromHerkunft({ herkunft, store })
}

export default herkunftLabelFromKultur
