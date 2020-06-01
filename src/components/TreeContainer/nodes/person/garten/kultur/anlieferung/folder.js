import findIndex from 'lodash/findIndex'

export default ({ url, nodes, store, loading }) => {
  const personId = url[1]
  const gartenId = url[3]
  const kulturId = url[5]

  const anlieferungen = store.lieferungsFiltered.filter(
    (z) => z.nach_kultur_id === kulturId,
  )
  const nr = loading && !anlieferungen.length ? '...' : anlieferungen.length

  const personNodes = nodes.filter((n) => n.parentId === 'personFolder')
  const personIndex = findIndex(
    personNodes,
    (n) => n.id === `person${personId}`,
  )

  const gartenNodes = nodes.filter(
    (n) => n.parentId === `person${personId}GartenFolder`,
  )
  const gartenIndex = findIndex(
    gartenNodes,
    (n) => n.id === `person${personId}Garten${gartenId}`,
  )

  const kulturNodes = nodes.filter(
    (n) => n.parentId === `person${personId}Garten${gartenId}KulturFolder`,
  )
  const kulturIndex = findIndex(
    kulturNodes,
    (n) => n.id === `person${personId}Garten${gartenId}Kultur${kulturId}`,
  )

  // only return if parent exists
  if (
    !nodes
      .map((n) => n.id)
      .includes(`person${personId}Garten${gartenId}Kultur${kulturId}`)
  )
    return []

  return [
    {
      nodeType: 'folder',
      menuTitle: 'An-Lieferungen',
      id: `person${personId}Garten${gartenId}Kultur${kulturId}AnLieferungFolder`,
      label: `An-Lieferungen (${nr})`,
      url: [
        'Personen',
        personId,
        'Gaerten',
        gartenId,
        'Kulturen',
        kulturId,
        'An-Lieferungen',
      ],
      sort: [11, personIndex, 2, gartenIndex, 1, kulturIndex, 3],
      hasChildren: true,
    },
  ]
}
