export default ({ store }) => {
  const { initialDataQueried } = store
  const {
    showPerson,
    visibleOpenNodes,
    person,
    personGarten,
    personGartenKultur,
  } = store.tree
  if (!showPerson) return []

  const parentNodes = visibleOpenNodes.filter(
    (node) =>
      node.length === 6 &&
      node[0] === 'Personen' &&
      node[2] === 'Gaerten' &&
      node[4] === 'Kulturen',
  )

  return parentNodes.map((node) => {
    const personId = node[1]
    const personIndex = person.findIndex((a) => a.id === personId)
    const gartenId = node[3]
    const gartenIndex = personGarten.findIndex((a) => a.id === gartenId)
    const kulturId = node[5]
    const kulturIndex = personGartenKultur.findIndex((a) => a.id === kulturId)

    const kultur_option = store.kultur_options.get(kulturId)
    const tk = kultur_option?.tk
    if (!tk) return []
    const teilkulturen = store.teilkultursFiltered.filter(
      (z) => z.kultur_id === kulturId,
    )
    const nr =
      !initialDataQueried && !teilkulturen.length ? '...' : teilkulturen.length

    return {
      nodeType: 'folder',
      menuTitle: 'Teilkulturen',
      id: `${personId}${gartenId}${kulturId}TeilkulturFolder`,
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
      sort: [11, personIndex, 2, gartenIndex, 1, kulturIndex, 1],
      hasChildren: true,
      childrenCount: nr,
    }
  })
}
