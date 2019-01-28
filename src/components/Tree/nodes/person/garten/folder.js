import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

export default ({ data, loading, url, nodes }) => {
  const personId = url[1]
  const personen = get(data, 'person', [])
  const person = personen.find(p => p.id === personId)
  const gaerten = get(person, 'gartensBypersonId', [])
  const nr = loading ? '...' : gaerten.length

  const personNodes = nodes.filter(n => n.parentId === 'personFolder')
  const personIndex = findIndex(personNodes, n => n.id === `person${personId}`)

  return [
    {
      nodeType: 'folder',
      menuType: 'personGartenFolder',
      id: `person${personId}gartenFolder`,
      label: `Gärten (${nr})`,
      url: ['Personen', personId, 'Gaerten'],
      sort: [5, personIndex, 1],
      hasChildren: true,
    },
  ]
}
