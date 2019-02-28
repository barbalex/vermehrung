import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

import filterNodes from '../../../../../utils/filterNodes'

export default ({ url, nodes, data, loading, store }) => {
  const personId = url[1]
  const personen = filterNodes({
    rows: get(data, 'person', []),
    filter: store.filter,
    table: 'person',
  })
  const person = personen.find(p => p.id === personId)
  const sammlungen = filterNodes({
    rows: get(person, 'sammlungsBypersonId', []),
    filter: store.filter,
    table: 'sammlung',
  })
  const nr = loading && !sammlungen.length ? '...' : sammlungen.length

  const personNodes = nodes.filter(n => n.parentId === 'personFolder')
  const personIndex = findIndex(personNodes, n => n.id === `person${personId}`)

  // only return if parent exists
  if (!nodes.map(n => n.id).includes(`person${personId}`)) return []

  return [
    {
      nodeType: 'folder',
      menuTitle: 'Sammlungen',
      id: `person${personId}SammlungFolder`,
      label: `Sammlungen (${nr})`,
      url: ['Personen', personId, 'Sammlungen'],
      sort: [5, personIndex, 2],
      hasChildren: true,
    },
  ]
}
