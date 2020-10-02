import gartenLabelFromGarten from './gartenLabelFromGarten'

export default ({ kultur, store }) => {
  const garten = kultur?.garten_id ? store.gartens.get(kultur.garten_id) : {}

  if (!garten.id) return '(kein Garten)'

  return gartenLabelFromGarten({ garten, store })
}
