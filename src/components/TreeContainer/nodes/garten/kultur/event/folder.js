import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

import filterNodes from '../../../../../../utils/filterNodes'

export default ({ url, nodes, data, loading, store }) => {
  const gartenId = url[1]
  const kulturId = url[3]
  const gaerten = filterNodes({
    rows: get(data, 'garten', []),
    filter: store.filter,
    table: 'garten',
  })
  const garten = gaerten.find(a => a.id === gartenId)
  const kulturen = filterNodes({
    rows: get(garten, 'kultursBygartenId', []),
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

  const gartenNodes = nodes.filter(n => n.parentId === 'gartenFolder')
  const gartenIndex = findIndex(gartenNodes, n => n.id === `garten${gartenId}`)
  const kulturNodes = nodes.filter(
    n => n.parentId === `garten${gartenId}KulturFolder`,
  )
  const kulturIndex = findIndex(
    kulturNodes,
    n => n.id === `garten${gartenId}Kultur${kulturId}`,
  )

  // only return if parent exists
  if (!nodes.map(n => n.id).includes(`garten${gartenId}Kultur${kulturId}`))
    return []

  return [
    {
      nodeType: 'folder',
      menuTitle: 'Events',
      id: `garten${gartenId}Kultur${kulturId}EventFolder`,
      label: `Events (${nr})`,
      url: ['Gaerten', gartenId, 'Kulturen', kulturId, 'Events'],
      sort: [2, gartenIndex, 1, kulturIndex, 4],
      hasChildren: true,
    },
  ]
}
