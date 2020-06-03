export default ({ store }) => {
  const { showArt, visibleOpenNodes, loading, artArt, artKultur } = store.tree
  if (!showArt) return []

  const parentNodes = visibleOpenNodes.filter(
    (node) =>
      node.length === 4 && node[0] === 'Arten' && node[2] === 'Kulturen',
  )

  return parentNodes.map((node) => {
    const artId = node[1]
    const artIndex = artArt.findIndex((a) => a.id === artId)
    const kulturId = node[3]
    const kulturIndex = artKultur.findIndex((a) => a.id === kulturId)

    const zaehlungen = store.zaehlungsFiltered.filter(
      (z) => z.kultur_id === kulturId,
    )
    const nr = loading && !zaehlungen.length ? '...' : zaehlungen.length

    return {
      nodeType: 'folder',
      menuTitle: 'Zählungen',
      id: `${kulturId}ZaehlungFolder`,
      label: `Zählungen (${nr})`,
      url: ['Arten', artId, 'Kulturen', kulturId, 'Zaehlungen'],
      sort: [1, artIndex, 2, kulturIndex, 2],
      hasChildren: true,
      childrenCount: nr,
    }
  })
}
