export default ({ sammlung, store }) => {
  if (!sammlung?.art_id) return '(keine Art)'
  const art = store.arts.get(sammlung.art_id)
  if (!art?.ae_id) return '(kein Name)'
  const aeArt = store.ae_arts.get(art.ae_id)
  if (!aeArt?.name) return '(kein Name)'
  return aeArt?.name
}
