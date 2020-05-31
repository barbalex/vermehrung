import findIndex from 'lodash/findIndex'

export default ({ url, nodes, store, loading }) => {
  const artId = url[1]
  const kulturId = url[3]
  const events = store.eventFiltered.filter((e) => e.kultur_id === kulturId)
  const nr = loading && !events.length ? '...' : events.length

  const artNodes = nodes.filter((n) => n.parentId === 'artFolder')
  const artIndex = findIndex(artNodes, (n) => n.id === `art${artId}`)
  const kulturNodes = nodes.filter(
    (n) => n.parentId === `art${artId}KulturFolder`,
  )
  const kulturIndex = findIndex(
    kulturNodes,
    (n) => n.id === `art${artId}Kultur${kulturId}`,
  )

  // only return if parent exists
  if (!nodes.map((n) => n.id).includes(`art${artId}Kultur${kulturId}`))
    return []

  return [
    {
      nodeType: 'folder',
      menuTitle: 'Events',
      id: `art${artId}Kultur${kulturId}EventFolder`,
      label: `Events (${nr})`,
      url: ['Arten', artId, 'Kulturen', kulturId, 'Events'],
      sort: [1, artIndex, 2, kulturIndex, 5],
      hasChildren: true,
    },
  ]
}
