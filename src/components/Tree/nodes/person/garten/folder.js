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

    const gaerten = store.gartensFiltered.filter(
      (s) => s.person_id === personId,
    )
    const nr = !initialDataQueried && !gaerten.length ? '...' : gaerten.length

    return {
      nodeType: 'folder',
      menuTitle: 'Gärten',
      id: `${personId}GartenFolder`,
      label: `Gärten (${nr})`,
      url: ['Personen', personId, 'Gaerten'],
      sort: [11, personIndex, 2],
      hasChildren: true,
      childrenCount: nr,
    }
  })
}
