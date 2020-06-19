export default ({ store }) => {
  const { initialDataQueried } = store
  const { showArt, visibleOpenNodes, art, artKultur } = store.tree
  if (!showArt) return []

  const parentNodes = visibleOpenNodes.filter(
    (node) =>
      node.length === 4 && node[0] === 'Arten' && node[2] === 'Kulturen',
  )

  return parentNodes.map((node) => {
    const artId = node[1]
    const artIndex = art.findIndex((a) => a.id === artId)
    const kulturId = node[3]
    const kulturIndex = artKultur.findIndex(
      (a) => a.id === `${artId}${kulturId}`,
    )

    const auslieferungen = store.lieferungsFiltered.filter(
      (e) => e.von_kultur_id === kulturId,
    )
    const nr =
      !initialDataQueried && !auslieferungen.length
        ? '...'
        : auslieferungen.length

    return {
      nodeType: 'folder',
      menuTitle: 'Aus-Lieferungen',
      id: `${artId}${kulturId}AusLieferungFolder`,
      label: `Aus-Lieferungen (${nr})`,
      url: ['Arten', artId, 'Kulturen', kulturId, 'Aus-Lieferungen'],
      sort: [1, artIndex, 2, kulturIndex, 4],
      hasChildren: true,
      childrenCount: nr,
    }
  })
}
