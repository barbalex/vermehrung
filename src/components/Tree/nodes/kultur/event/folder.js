const kulturEventFolder = ({ store }) => {
  const { initialDataQueried } = store
  const { showKultur, visibleOpenNodes, kultur } = store.tree
  if (!showKultur) return []

  const parentNodes = visibleOpenNodes.filter(
    (node) => node.length === 2 && node[0] === 'Kulturen',
  )

  return parentNodes.map((node) => {
    const kulturId = node[1]
    const kulturIndex = kultur.findIndex((a) => a.id === kulturId)

    const events = store.eventsFiltered.filter((z) => z.kultur_id === kulturId)
    const nr = !initialDataQueried && !events.length ? '...' : events.length

    return {
      nodeType: 'folder',
      menuTitle: 'Events',
      id: `${kulturId}EventFolder`,
      label: `Events (${nr})`,
      url: ['Kulturen', kulturId, 'Events'],
      sort: [5, kulturIndex, 5],
      hasChildren: true,
      childrenCount: nr,
    }
  })
}

export default kulturEventFolder
