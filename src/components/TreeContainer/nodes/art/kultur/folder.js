export default ({ store }) => {
  const { showArt, visibleOpenNodes, loading, artArt } = store.tree
  if (!showArt) return []

  const parentNodes = visibleOpenNodes.filter(
    (node) => node.length === 2 && node[0] === 'Arten',
  )

  return parentNodes.map((node) => {
    const artId = node[1]
    const artIndex = artArt.findIndex((a) => a.id === artId)
    const kulturen = store.kultursFiltered.filter((k) => k.art_id === artId)
    const nr = loading && !kulturen.length ? '...' : kulturen.length

    return {
      nodeType: 'folder',
      menuTitle: 'Kulturen',
      id: `${artId}KulturFolder`,
      label: `Kulturen (${nr})`,
      url: ['Arten', artId, 'Kulturen'],
      sort: [1, artIndex, 2],
      hasChildren: true,
      childrenCount: nr,
    }
  })
}
