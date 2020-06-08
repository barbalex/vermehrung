export default ({ store }) => {
  const { showArt, visibleOpenNodes, loading, art, artKultur } = store.tree
  if (!showArt) return []

  const parentNodes = visibleOpenNodes.filter(
    (node) =>
      node.length === 4 && node[0] === 'Arten' && node[2] === 'Kulturen',
  )

  return parentNodes.map((node) => {
    const artId = node[1]
    const artIndex = art.findIndex((a) => a.id === artId)
    const kulturId = node[3]
    const kulturIndex = artKultur.findIndex((a) => a.id === kulturId)

    const anlieferungen = store.lieferungsFiltered.filter(
      (e) => e.nach_kultur_id === kulturId,
    )
    const nr = loading && !anlieferungen.length ? '...' : anlieferungen.length

    return {
      nodeType: 'folder',
      menuTitle: 'An-Lieferungen',
      id: `${artId}${kulturId}AnLieferungFolder`,
      label: `An-Lieferungen (${nr})`,
      url: ['Arten', artId, 'Kulturen', kulturId, 'An-Lieferungen'],
      sort: [1, artIndex, 2, kulturIndex, 3],
      hasChildren: true,
      childrenCount: nr,
    }
  })
}
