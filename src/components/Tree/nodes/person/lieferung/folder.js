import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

export default ({ data, nodes, loading, url }) => {
  const personId = url[1]
  const personen = get(data, 'person', [])
  const person = personen.find(p => p.id === personId)
  const lieferungen = get(person, 'lieferungsBypersonId', [])
  const nr = loading && !lieferungen.length ? '...' : lieferungen.length

  const personNodes = nodes.filter(n => n.parentId === 'personFolder')
  const personIndex = findIndex(personNodes, n => n.id === `person${personId}`)

  return [
    {
      nodeType: 'folder',
      menuType: 'personLieferungFolder',
      id: `person${personId}LieferungFolder`,
      label: `Lieferungen (${nr})`,
      url: ['Personen', personId, 'Lieferungen'],
      sort: [5, personIndex, 3],
      hasChildren: true,
    },
  ]
}
