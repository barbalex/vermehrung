import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

import filterNodes from '../../../../../utils/filterNodes'

export default ({ data, nodes, loading, url, store }) => {
  const personId = url[1]
  const personen = filterNodes({
    rows: get(data, 'person', []),
    filter: store.filter,
    table: 'person',
  })
  const person = personen.find(p => p.id === personId)
  const lieferungen = filterNodes({
    rows: get(person, 'lieferungsBypersonId', []),
    filter: store.filter,
    table: 'lieferung',
  })
  const nr = loading && !lieferungen.length ? '...' : lieferungen.length

  const personNodes = nodes.filter(n => n.parentId === 'personFolder')
  const personIndex = findIndex(personNodes, n => n.id === `person${personId}`)

  // only return if parent exists
  if (!nodes.map(n => n.id).includes(`person${personId}`)) return []

  return [
    {
      nodeType: 'folder',
      menuTitle: 'Lieferungen',
      id: `person${personId}LieferungFolder`,
      label: `Lieferungen (${nr})`,
      url: ['Personen', personId, 'Lieferungen'],
      sort: [5, personIndex, 3],
      hasChildren: true,
    },
  ]
}
