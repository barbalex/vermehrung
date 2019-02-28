import findIndex from 'lodash/findIndex'
import get from 'lodash/get'

import filterNodes from '../../../../../../../utils/filterNodes'

export default ({ url, nodes, data, loading, store }) => {
  const personId = url[1]
  const gartenId = url[3]
  const kulturId = url[5]
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
  const garten = gaerten.find(a => a.id === gartenId)
  const kulturen = filterNodes({
    rows: get(garten, 'kultursBygartenId', []),
    filter: store.filter,
    table: 'kultur',
  })
  const kultur = kulturen.find(k => k.id === kulturId)
  const inventare = filterNodes({
    rows: get(kultur, 'kulturInventarsBykulturId', []),
    filter: store.filter,
    table: 'inventar',
  })
  const nr = loading && !inventare.length ? '...' : inventare.length

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
      menuTitle: 'Inventare',
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
