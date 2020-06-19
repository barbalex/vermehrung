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
    const gartenIndex = personGarten.findIndex(
      (a) => a.id === `${personId}${gartenId}`,
    )
    const kulturId = node[5]
    const kulturIndex = personGartenKultur.findIndex(
      (a) => a.id === `${personId}${gartenId}${kulturId}`,
    )

    const anlieferungen = store.lieferungsFiltered.filter(
      (z) => z.nach_kultur_id === kulturId,
    )
    const nr =
      !initialDataQueried && !anlieferungen.length
        ? '...'
        : anlieferungen.length

    return {
      nodeType: 'folder',
      menuTitle: 'An-Lieferungen',
      id: `${personId}${gartenId}${kulturId}AnLieferungFolder`,
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
      childrenCount: nr,
    }
  })
}
