import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

import filterNodes from '../../../../../utils/filterNodes'

export default ({ data, loading, url, nodes, store }) => {
  const personId = url[1]
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
  const nr = loading && !gaerten.length ? '...' : gaerten.length

  const personNodes = nodes.filter(n => n.parentId === 'personFolder')
  const personIndex = findIndex(personNodes, n => n.id === `person${personId}`)

  // only return if parent exists
  if (!nodes.map(n => n.id).includes(`person${personId}`)) return []

  return [
    {
      nodeType: 'folder',
      menuTitle: 'Gärten',
      id: `person${personId}GartenFolder`,
      label: `Gärten (${nr})`,
      url: ['Personen', personId, 'Gaerten'],
      sort: [5, personIndex, 1],
      hasChildren: true,
    },
  ]
}
