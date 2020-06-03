export default ({ store }) => {
  const { showArt, openNodes, loading, artArt } = store.tree
  if (!showArt) return []

  const parentNodes = openNodes.filter(
    (node) => node.length === 2 && node[0] === 'Arten',
  )

  return parentNodes.map((node) => {
    const artId = node[1]
    const artIndex = artArt.findIndex((a) => a.id === artId)
    const sammlungen = store.sammlungsFiltered.filter((s) => s.art_id === artId)
    const nr = loading && !sammlungen.length ? '...' : sammlungen.length

    return {
      nodeType: 'folder',
      menuTitle: 'Sammlungen',
      id: `${artId}SammlungFolder`,
      label: `Sammlungen (${nr})`,
      url: ['Arten', artId, 'Sammlungen'],
      sort: [1, artIndex, 1],
      hasChildren: true,
      childrenCount: nr,
    }
  })
}
