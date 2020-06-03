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
    const events = store.eventsFiltered.filter((e) => e.kultur_id === kulturId)
    const nr = loading && !events.length ? '...' : events.length

    return {
      nodeType: 'folder',
      menuTitle: 'Events',
      id: `${artId}Kultur${kulturId}EventFolder`,
      label: `Events (${nr})`,
      url: ['Arten', artId, 'Kulturen', kulturId, 'Events'],
      sort: [1, artIndex, 2, kulturIndex, 5],
      hasChildren: true,
      childrenCount: nr,
    }
  })
}
