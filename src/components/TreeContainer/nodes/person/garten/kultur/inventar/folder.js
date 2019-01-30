import findIndex from 'lodash/findIndex'
import get from 'lodash/get'

export default ({ url, nodes, data, loading }) => {
  const personId = url[1]
  const gartenId = url[3]
  const kulturId = url[5]
  const personen = get(data, 'person', [])
  const person = personen.find(p => p.id === personId)
  const gaerten = get(person, 'gartensBypersonId', [])
  const garten = gaerten.find(a => a.id === gartenId)
  const kulturen = get(garten, 'kultursBygartenId', [])
  const kultur = kulturen.find(k => k.id === kulturId)
  const zaehlungen = get(kultur, 'zaehlungsBykulturId', [])
  const nr = loading && !zaehlungen.length ? '...' : zaehlungen.length

  const personNodes = nodes.filter(n => n.parentId === 'personFolder')
  const personIndex = findIndex(personNodes, n => n.id === `person${personId}`)

  const gartenNodes = nodes.filter(
    n => n.parentId === `person${personId}GartenFolder`,
  )
  const gartenIndex = findIndex(
    gartenNodes,
    n => n.id === `person${personId}Garten${gartenId}`,
  )

  const kulturNodes = nodes.filter(
    n => n.parentId === `person${personId}Garten${gartenId}KulturFolder`,
  )
  const kulturIndex = findIndex(
    kulturNodes,
    n => n.id === `person${personId}Garten${gartenId}Kultur${kulturId}`,
  )

  return [
    {
      nodeType: 'folder',
      menuType: 'personGartenKulturInventarFolder',
      id: `person${personId}Garten${gartenId}Kultur${kulturId}InventarFolder`,
      label: `Inventare (${nr})`,
      url: [
        'Personen',
        personId,
        'Gaerten',
        gartenId,
        'Kulturen',
        kulturId,
        'Inventare',
      ],
      sort: [5, personIndex, 1, gartenIndex, 1, kulturIndex, 5],
      hasChildren: true,
    },
  ]
}
