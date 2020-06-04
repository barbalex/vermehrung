export default ({ store }) => {
  const { showPerson, visibleOpenNodes, loading, personPerson } = store.tree
  if (!showPerson) return []

  const parentNodes = visibleOpenNodes.filter(
    (node) => node.length === 2 && node[0] === 'Personen',
  )

  return parentNodes.map((node) => {
    const personId = node[1]
    const personIndex = personPerson.findIndex((a) => a.id === personId)

    const sammlungen = store.sammlungsFiltered.filter(
      (s) => s.person_id === personId,
    )
    const nr = loading && !sammlungen.length ? '...' : sammlungen.length

    return {
      nodeType: 'folder',
      menuTitle: 'Sammlungen',
      id: `${personId}SammlungFolder`,
      label: `Sammlungen (${nr})`,
      url: ['Personen', personId, 'Sammlungen'],
      sort: [11, personIndex, 1],
      hasChildren: true,
      childrenCount: nr,
    }
  })
}
