export default ({ art, store }) => {
  if (!art.ae_id) return '(kein Name)'
  const aeArt = store.ae_arts.get(art.ae_id)
  if (!aeArt?.name) return '(kein Name)'
  return aeArt?.name
}
