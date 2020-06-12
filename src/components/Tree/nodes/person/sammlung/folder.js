export default ({ store }) => {
  const { initialDataQueried } = store
  const { showPerson, visibleOpenNodes, person } = store.tree
  if (!showPerson) return []

  const parentNodes = visibleOpenNodes.filter(
    (node) => node.length === 2 && node[0] === 'Personen',
  )

  return parentNodes.map((node) => {
    const personId = node[1]
    const personIndex = person.findIndex((a) => a.id === personId)

    const sammlungen = store.sammlungsFiltered.filter(
      (s) => s.person_id === personId,
    )
    const nr =
      !initialDataQueried && !sammlungen.length ? '...' : sammlungen.length

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
