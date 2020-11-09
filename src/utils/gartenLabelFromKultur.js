import gartenLabelFromGarten from './gartenLabelFromGarten'

const gartenLabelFromKultur = ({ kultur, store }) => {
  if (!kultur?.garten_id) return '(kein Garten)'
  const garten = kultur?.garten_id ? store.gartens.get(kultur.garten_id) : {}

  if (!garten.id) {
    return `(keinen Garten mit ID '${kultur.garten_id}' gefunden)`
  }

  return gartenLabelFromGarten({ garten, store })
}

export default gartenLabelFromKultur
