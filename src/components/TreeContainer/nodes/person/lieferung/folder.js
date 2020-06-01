import findIndex from 'lodash/findIndex'

export default ({ store, nodes, loading, url }) => {
  const personId = url[1]

  const lieferungen = store.lieferungFiltered.filter(
    (s) => s.person_id === personId,
  )
  const nr = loading && !lieferungen.length ? '...' : lieferungen.length

  const personNodes = nodes.filter((n) => n.parentId === 'personFolder')
  const personIndex = findIndex(
    personNodes,
    (n) => n.id === `person${personId}`,
  )

  // only return if parent exists
  if (!nodes.map((n) => n.id).includes(`person${personId}`)) return []

  return [
    {
      nodeType: 'folder',
      menuTitle: 'Lieferungen',
      id: `person${personId}LieferungFolder`,
      label: `Lieferungen (${nr})`,
      url: ['Personen', personId, 'Lieferungen'],
      sort: [11, personIndex, 3],
      hasChildren: true,
    },
  ]
}
