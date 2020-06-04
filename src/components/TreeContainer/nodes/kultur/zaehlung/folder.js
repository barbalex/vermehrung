export default ({ store }) => {
  const { showKultur, visibleOpenNodes, loading, kultur } = store.tree
  if (!showKultur) return []

  const parentNodes = visibleOpenNodes.filter(
    (node) => node.length === 2 && node[0] === 'Kulturen',
  )

  return parentNodes.map((node) => {
    const kulturId = node[1]
    const kulturIndex = kultur.findIndex((a) => a.id === kulturId)

    const zaehlungen = store.zaehlungsFiltered.filter(
      (z) => z.kultur_id === kulturId,
    )
    const nr = loading && !zaehlungen.length ? '...' : zaehlungen.length

    return {
      nodeType: 'folder',
      menuTitle: 'Zählungen',
      id: `${kulturId}ZaehlungFolder`,
      label: `Zählungen (${nr})`,
      url: ['Kulturen', kulturId, 'Zaehlungen'],
      sort: [5, kulturIndex, 2],
      hasChildren: true,
      childrenCount: nr,
    }
  })
}
