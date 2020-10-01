export default ({ lieferung, store }) => {
  if (!lieferung.art_id) return '(keine Art)'
  const art = store.arts.get(lieferung.art_id)
  if (!art?.ae_id) return '(kein Name)'
  const aeArt = store.ae_arts.get(art.ae_id)
  if (!aeArt?.name) return '(kein Name)'
  return aeArt?.name
}
