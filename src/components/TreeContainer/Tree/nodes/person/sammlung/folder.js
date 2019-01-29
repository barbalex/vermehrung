import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

export default ({ url, nodes, data, loading }) => {
  const personId = url[1]
  const personen = get(data, 'person', [])
  const person = personen.find(p => p.id === personId)
  const sammlungen = get(person, 'sammlungsBypersonId', [])
  const nr = loading && !sammlungen.length ? '...' : sammlungen.length

  const personNodes = nodes.filter(n => n.parentId === 'personFolder')
  const personIndex = findIndex(personNodes, n => n.id === `person${personId}`)

  return [
    {
      nodeType: 'folder',
      menuType: 'personSammlungFolder',
      id: `person${personId}SammlungFolder`,
      label: `Sammlungen (${nr})`,
      url: ['Personen', personId, 'Sammlungen'],
      sort: [5, personIndex, 2],
      hasChildren: true,
    },
  ]
}
