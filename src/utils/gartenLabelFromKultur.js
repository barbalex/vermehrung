import gartenLabelFromGarten from './gartenLabelFromGarten'

export default ({ kultur, store }) => {
  if (!kultur?.garten_id) return '(kein Garten)'
  const garten = kultur?.garten_id ? store.gartens.get(kultur.garten_id) : {}

  if (!garten.id) {
    return `(keinen Garten mit ID '${kultur.garten_id}' gefunden)`
  }

  return gartenLabelFromGarten({ garten, store })
}
