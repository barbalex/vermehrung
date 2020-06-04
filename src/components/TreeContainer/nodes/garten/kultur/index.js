export default ({ store }) => {
  const { showGarten, visibleOpenNodes, gartenGarten } = store.tree
  if (!showGarten) return []

  const parentNodes = visibleOpenNodes.filter(
    (node) =>
      node.length === 3 && node[0] === 'Gaerten' && node[2] === 'Kulturen',
  )

  if (!parentNodes.length) return []

  return parentNodes.flatMap((node) => {
    const gartenId = node[1]
    const gartenIndex = gartenGarten.findIndex((a) => a.id === gartenId)
    const kulturen = store.kultursFiltered.filter(
      (k) => k.garten_id === gartenId,
    )

    return kulturen
      .map((el) => {
        const art = el?.art?.art_ae_art?.name ?? '(keine Art)'
        const herkunft = el?.herkunft?.nr ?? '(Herkunft ohne Nr)'
        const label = `${art}, von: ${herkunft}`

        return {
          nodeType: 'table',
          menuTitle: 'Kultur',
          table: 'kultur',
          id: el.id,
          label,
          url: ['Gaerten', gartenId, 'Kulturen', el.id],
          hasChildren: true,
        }
      })
      .map((el, index) => {
        el.sort = [4, gartenIndex, 1, index]
        return el
      })
  })
}
