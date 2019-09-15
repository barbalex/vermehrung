import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

export default ({ data, loading, url, nodes }) => {
  const personId = url[1]
  const personen = get(data, 'person', [])
  const person = personen.find(p => p.id === personId)
  const gaerten = get(person, 'gartens', [])
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
      sort: [8, personIndex, 1],
      hasChildren: true,
    },
  ]
}
