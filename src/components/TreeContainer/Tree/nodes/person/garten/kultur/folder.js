import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

export default ({ url, nodes, data, loading }) => {
  const personId = url[1]
  const gartenId = url[3]
  const personen = get(data, 'person', [])
  const person = personen.find(p => p.id === personId)
  const gaerten = get(person, 'gartensBypersonId', [])
  const garten = gaerten.find(a => a.id === gartenId)
  const kulturen = get(garten, 'kultursBygartenId', [])
  const nr = loading && !kulturen.length ? '...' : kulturen.length

  const personNodes = nodes.filter(n => n.parentId === 'personFolder')
  const personIndex = findIndex(personNodes, n => n.id === `person${personId}`)

  const gartenNodes = nodes.filter(
    n => n.parentId === `person${personId}gartenFolder`,
  )
  const gartenIndex = findIndex(
    gartenNodes,
    n => n.id === `person${personId}garten${gartenId}`,
  )

  return [
    {
      nodeType: 'folder',
      menuType: 'personGartenKulturFolder',
      id: `person${personId}Garten${gartenId}KulturFolder`,
      label: `Kulturen (${nr})`,
      url: ['Personen', personId, 'Gaerten', gartenId, 'Kulturen'],
      sort: [5, personIndex, 1, gartenIndex, 1],
      hasChildren: true,
    },
  ]
}
