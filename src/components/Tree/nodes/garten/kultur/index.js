export default ({ store }) => {
  const { showGarten, visibleOpenNodes, garten } = store.tree
  if (!showGarten) return []

  const parentNodes = visibleOpenNodes.filter(
    (node) =>
      node.length === 3 && node[0] === 'Gaerten' && node[2] === 'Kulturen',
  )

  if (!parentNodes.length) return []

  return parentNodes.flatMap((node) => {
    const gartenId = node[1]
    const gartenIndex = garten.findIndex((a) => a.id === gartenId)
    const kulturen = store.kultursFiltered.filter(
      (k) => k.garten_id === gartenId,
    )

    return kulturen
      .map((k) => {
        const art = k?.art?.art_ae_art?.name ?? '(keine Art)'
        const herkunft = k?.herkunft?.nr ?? '(Herkunft ohne Nr)'
        const label = `${art}, von: ${herkunft}`
        const labelWithZl = `${label}${
          k?.zwischenlager ? '. Zwischenlager' : ''
        }`

        return {
          nodeType: 'table',
          menuTitle: 'Kultur',
          table: 'kultur',
          id: `${gartenId}${k.id}`,
          label: labelWithZl,
          url: ['Gaerten', gartenId, 'Kulturen', k.id],
          hasChildren: true,
        }
      })
      .map((k, index) => {
        k.sort = [4, gartenIndex, 1, index]
        return k
      })
  })
}
