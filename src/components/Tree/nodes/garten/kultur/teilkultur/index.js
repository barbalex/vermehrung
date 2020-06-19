export default ({ store }) => {
  const { showGarten, visibleOpenNodes, garten, gartenKultur } = store.tree
  if (!showGarten) return []

  const parentNodes = visibleOpenNodes.filter(
    (node) =>
      node.length === 5 &&
      node[0] === 'Gaerten' &&
      node[2] === 'Kulturen' &&
      node[4] === 'Teilkulturen',
  )

  if (!parentNodes.length) return []

  return parentNodes.flatMap((node) => {
    const gartenId = node[1]
    const gartenIndex = garten.findIndex((a) => a.id === gartenId)
    const kulturId = node[3]
    const kulturIndex = gartenKultur.findIndex(
      (a) => a.id === `${gartenId}${kulturId}`,
    )

    const teilkulturen = store.teilkultursFiltered.filter(
      (t) => t.kultur_id === kulturId,
    )

    return teilkulturen
      .map((el) => {
        const label = el.name || '(kein Name)'

        return {
          nodeType: 'table',
          menuTitle: 'Teilkultur',
          table: 'teilkultur',
          id: `${gartenId}${kulturId}${el.id}`,
          label,
          url: [
            'Gaerten',
            gartenId,
            'Kulturen',
            kulturId,
            'Teilkulturen',
            el.id,
          ],
          hasChildren: false,
        }
      })
      .map((el, index) => {
        el.sort = [4, gartenIndex, 1, kulturIndex, 1, index]
        return el
      })
  })
}
