import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

export default ({ url, nodes, data, loading }) => {
  const kulturId = url[1]
  const kulturen = get(data, 'kultur', [])
  const kultur = kulturen.find(k => k.id === kulturId)
  const events = get(kultur, 'kultur_events', [])
  const nr = loading && !events.length ? '...' : events.length

  const kulturNodes = nodes.filter(n => n.parentId === `kulturFolder`)
  const kulturIndex = findIndex(kulturNodes, n => n.id === `kultur${kulturId}`)

  // only return if parent exists
  if (!nodes.map(n => n.id).includes(`kultur${kulturId}`)) return []

  return [
    {
      nodeType: 'folder',
      menuTitle: 'Events',
      id: `kultur${kulturId}EventFolder`,
      label: `Events (${nr})`,
      url: ['Kulturen', kulturId, 'Events'],
      sort: [5, kulturIndex, 4],
      hasChildren: true,
    },
  ]
}
