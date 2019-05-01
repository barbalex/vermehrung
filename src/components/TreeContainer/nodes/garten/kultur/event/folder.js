import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

export default ({ url, nodes, data, loading }) => {
  const gartenId = url[1]
  const kulturId = url[3]
  const gaerten = get(data, 'garten', [])
  const garten = gaerten.find(a => a.id === gartenId)
  const kulturen = get(garten, 'kulturs', [])
  const kultur = kulturen.find(k => k.id === kulturId)
  const events = get(kultur, 'kultur_events', [])
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
