import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

import filterNodes from '../../../../../utils/filterNodes'

export default ({ url, nodes, data, loading, store }) => {
  const kulturId = url[1]
  const kulturen = filterNodes({
    rows: get(data, 'kultur', []),
    filter: store.filter,
    table: 'kultur',
  })
  const kultur = kulturen.find(k => k.id === kulturId)
  const events = filterNodes({
    rows: get(kultur, 'kulturEventsBykulturId', []),
    filter: store.filter,
    table: 'event',
  })
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
      sort: [7, kulturIndex, 4],
      hasChildren: true,
    },
  ]
}
