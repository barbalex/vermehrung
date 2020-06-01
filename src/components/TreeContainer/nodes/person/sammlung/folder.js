import findIndex from 'lodash/findIndex'

export default ({ url, nodes, store, loading }) => {
  const personId = url[1]

  const sammlungen = store.sammlungFiltered.filter(
    (s) => s.person_id === personId,
  )
  const nr = loading && !sammlungen.length ? '...' : sammlungen.length

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
      menuTitle: 'Sammlungen',
      id: `person${personId}SammlungFolder`,
      label: `Sammlungen (${nr})`,
      url: ['Personen', personId, 'Sammlungen'],
      sort: [11, personIndex, 1],
      hasChildren: true,
    },
  ]
}
