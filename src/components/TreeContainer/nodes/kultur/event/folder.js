import findIndex from 'lodash/findIndex'

export default ({ url, nodes, store, loading }) => {
  const kulturId = url[1]

  const events = store.eventFiltered.filter((z) => z.kultur_id === kulturId)
  const nr = loading && !events.length ? '...' : events.length

  const kulturNodes = nodes.filter((n) => n.parentId === `kulturFolder`)
  const kulturIndex = findIndex(
    kulturNodes,
    (n) => n.id === `kultur${kulturId}`,
  )

  // only return if parent exists
  if (!nodes.map((n) => n.id).includes(`kultur${kulturId}`)) return []

  return [
    {
      nodeType: 'folder',
      menuTitle: 'Events',
      id: `kultur${kulturId}EventFolder`,
      label: `Events (${nr})`,
      url: ['Kulturen', kulturId, 'Events'],
      sort: [5, kulturIndex, 5],
      hasChildren: true,
    },
  ]
}
