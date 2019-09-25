import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

export default ({ url, nodes, data, loading }) => {
  const personId = url[1]
  const gartenId = url[3]
  const kulturId = url[5]
  const personen = get(data, 'person', [])
  const person = personen.find(p => p.id === personId)
  const gaerten = get(person, 'gartens', [])
  const garten = gaerten.find(a => a.id === gartenId)
  const kulturen = get(garten, 'kulturs', [])
  const kultur = kulturen.find(k => k.id === kulturId)
  const tk = get(kultur, 'kultur_felder.tk')
  if (!tk) return []
  const teilkulturen = get(kultur, 'teilkulturs', [])
  const nr = loading && !teilkulturen.length ? '...' : teilkulturen.length

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

  // only return if parent exists
  if (
    !nodes
      .map(n => n.id)
      .includes(`person${personId}Garten${gartenId}Kultur${kulturId}`)
  )
    return []

  return [
    {
      nodeType: 'folder',
      menuTitle: 'Teilkulturen',
      id: `person${personId}Garten${gartenId}Kultur${kulturId}TeilkulturFolder`,
      label: `Teilkulturen (${nr})`,
      url: [
        'Personen',
        personId,
        'Gaerten',
        gartenId,
        'Kulturen',
        kulturId,
        'Teilkulturen',
      ],
      sort: [10, personIndex, 2, gartenIndex, 1, kulturIndex, 1],
      hasChildren: true,
    },
  ]
}
