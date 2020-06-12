export default ({ store }) => {
  const { initialDataQueried } = store
  const { showArt, visibleOpenNodes, art, artSammlung } = store.tree
  if (!showArt) return []

  const parentNodes = visibleOpenNodes.filter(
    (node) =>
      node.length === 4 && node[0] === 'Arten' && node[2] === 'Sammlungen',
  )

  return parentNodes.map((node) => {
    const artId = node[1]
    const sammlungId = node[3]
    const artIndex = art.findIndex((a) => a.id === artId)
    const sammlungIndex = artSammlung.findIndex((s) => s.id === sammlungId)
    const lieferungen = store.lieferungsFiltered.filter(
      (l) => l.von_sammlung_id === sammlungId,
    )
    const nr =
      !initialDataQueried && !lieferungen.length ? '...' : lieferungen.length

    return {
      nodeType: 'folder',
      menuTitle: 'Lieferungen',
      id: `${artId}${sammlungId}LieferungFolder`,
      label: `Aus-Lieferungen (${nr})`,
      url: ['Arten', artId, 'Sammlungen', sammlungId, 'Aus-Lieferungen'],
      sort: [1, artIndex, 1, sammlungIndex, 1],
      hasChildren: true,
      childrenCount: nr,
    }
  })
}
