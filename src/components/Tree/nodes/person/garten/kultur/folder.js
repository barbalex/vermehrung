export default ({ store }) => {
  const { initialDataQueried } = store
  const { showPerson, visibleOpenNodes, person, personGarten } = store.tree
  if (!showPerson) return []

  const parentNodes = visibleOpenNodes.filter(
    (node) =>
      node.length === 4 && node[0] === 'Personen' && node[2] === 'Gaerten',
  )

  return parentNodes.map((node) => {
    const personId = node[1]
    const personIndex = person.findIndex((a) => a.id === personId)
    const gartenId = node[3]
    const gartenIndex = personGarten.findIndex(
      (a) => a.id === `${personId}${gartenId}`,
    )

    const kulturen = store.kultursFiltered.filter(
      (s) => s.garten_id === gartenId,
    )
    const nr = !initialDataQueried && !kulturen.length ? '...' : kulturen.length

    return {
      nodeType: 'folder',
      menuTitle: 'Kulturen',
      id: `${personId}${gartenId}KulturFolder`,
      label: `Kulturen (${nr})`,
      url: ['Personen', personId, 'Gaerten', gartenId, 'Kulturen'],
      sort: [11, personIndex, 2, gartenIndex, 1],
      hasChildren: true,
      childrenCount: nr,
    }
  })
}
