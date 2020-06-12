export default ({ store }) => {
  const { initialDataQueried } = store
  const { showArt, visibleOpenNodes, art } = store.tree
  if (!showArt) return []

  const parentNodes = visibleOpenNodes.filter(
    (node) => node.length === 2 && node[0] === 'Arten',
  )

  return parentNodes.map((node) => {
    const artId = node[1]
    const artIndex = art.findIndex((a) => a.id === artId)
    const sammlungen = store.sammlungsFiltered.filter((s) => s.art_id === artId)
    const nr =
      !initialDataQueried && !sammlungen.length ? '...' : sammlungen.length

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
