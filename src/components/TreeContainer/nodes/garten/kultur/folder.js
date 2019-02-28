import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

import filterNodes from '../../../../../utils/filterNodes'

export default ({ url, nodes, data, loading, store }) => {
  const gartenId = url[1]
  const gartenNodes = nodes.filter(n => n.parentId === 'gartenFolder')
  const gartenIndex = findIndex(gartenNodes, n => n.id === `garten${gartenId}`)

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
  const nr = loading && !kulturen.length ? '...' : kulturen.length

  // only return if parent exists
  if (!nodes.map(n => n.id).includes(`garten${gartenId}`)) return []

  return [
    {
      nodeType: 'folder',
      menuTitle: 'Kulturen',
      id: `garten${gartenId}KulturFolder`,
      label: `Kulturen (${nr})`,
      url: ['Gaerten', gartenId, 'Kulturen'],
      sort: [2, gartenIndex, 1],
      hasChildren: true,
    },
  ]
}
