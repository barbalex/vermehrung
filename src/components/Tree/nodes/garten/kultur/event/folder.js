const gartenKulturEventFolder = ({ store }) => {
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
    const kulturIndex = gartenKultur.findIndex(
      (a) => a.id === `${gartenId}${kulturId}`,
    )
    const events = store.eventsFiltered.filter((t) => t.kultur_id === kulturId)
    const nr = !initialDataQueried && !events.length ? '...' : events.length

    return {
      nodeType: 'folder',
      menuTitle: 'Events',
      id: `${gartenId}${kulturId}EventFolder`,
      label: `Events (${nr})`,
      url: ['Gaerten', gartenId, 'Kulturen', kulturId, 'Events'],
      sort: [4, gartenIndex, 1, kulturIndex, 5],
      hasChildren: true,
      childrenCount: nr,
    }
  })
}

export default gartenKulturEventFolder
