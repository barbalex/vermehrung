export default ({ store }) => {
  const { initialDataQueried } = store
  const { showGarten, visibleOpenNodes, garten, gartenKultur } = store.tree
  if (!showGarten) return []

  const parentNodes = visibleOpenNodes.filter(
    (node) =>
      node.length === 4 && node[0] === 'Gaerten' && node[2] === 'Kulturen',
  )

  return parentNodes.map((node) => {
    const gartenId = node[1]
    const gartenIndex = garten.findIndex((a) => a.id === gartenId)
    const kulturId = node[3]
    const kulturIndex = gartenKultur.findIndex((a) => a.id === kulturId)
    const zaehlungen = store.zaehlungsFiltered.filter(
      (z) => z.kultur_id === kulturId,
    )
    const nr =
      !initialDataQueried && !zaehlungen.length ? '...' : zaehlungen.length

    return {
      nodeType: 'folder',
      menuTitle: 'Zählungen',
      id: `${gartenId}${kulturId}ZaehlungFolder`,
      label: `Zählungen (${nr})`,
      url: ['Gaerten', gartenId, 'Kulturen', kulturId, 'Zaehlungen'],
      sort: [4, gartenIndex, 1, kulturIndex, 2],
      hasChildren: true,
      childrenCount: nr,
    }
  })
}
