import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

import filterNodes from '../../../../../../utils/filterNodes'

export default ({ url, nodes, data, loading, store }) => {
  const personId = url[1]
  const gartenId = url[3]
  const personen = filterNodes({
    rows: get(data, 'person', []),
    filter: store.filter,
    table: 'person',
  })
  const person = personen.find(p => p.id === personId)
  const gaerten = filterNodes({
    rows: get(person, 'gartensBypersonId', []),
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

  const personNodes = nodes.filter(n => n.parentId === 'personFolder')
  const personIndex = findIndex(personNodes, n => n.id === `person${personId}`)

  const gartenNodes = nodes.filter(
    n => n.parentId === `person${personId}GartenFolder`,
  )
  const gartenIndex = findIndex(
    gartenNodes,
    n => n.id === `person${personId}Garten${gartenId}`,
  )

  // only return if parent exists
  if (!nodes.map(n => n.id).includes(`person${personId}Garten${gartenId}`))
    return []

  return [
    {
      nodeType: 'folder',
      menuTitle: 'Kulturen',
      id: `person${personId}Garten${gartenId}KulturFolder`,
      label: `Kulturen (${nr})`,
      url: ['Personen', personId, 'Gaerten', gartenId, 'Kulturen'],
      sort: [5, personIndex, 1, gartenIndex, 1],
      hasChildren: true,
    },
  ]
}
