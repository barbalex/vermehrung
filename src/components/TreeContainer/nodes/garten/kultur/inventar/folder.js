import findIndex from 'lodash/findIndex'
import get from 'lodash/get'

export default ({ url, nodes, data, loading }) => {
  const gartenId = url[1]
  const kulturId = url[3]
  const gaerten = get(data, 'garten', [])
  const garten = gaerten.find(a => a.id === gartenId)
  const kulturen = get(garten, 'kulturs', [])
  const kultur = kulturen.find(k => k.id === kulturId)
  const inventare = get(kultur, 'kultur_inventars', [])
  const nr = loading && !inventare.length ? '...' : inventare.length

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
      menuTitle: 'Inventare',
      id: `garten${gartenId}Kultur${kulturId}InventarFolder`,
      label: `Inventare (${nr})`,
      url: ['Gaerten', gartenId, 'Kulturen', kulturId, 'Inventare'],
      sort: [2, gartenIndex, 1, kulturIndex, 5],
      hasChildren: true,
    },
  ]
}
