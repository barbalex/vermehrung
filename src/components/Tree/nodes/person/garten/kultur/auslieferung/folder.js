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

    const auslieferungen = store.lieferungsFiltered.filter(
      (z) => z.von_kultur_id === kulturId,
    )
    const nr =
      !initialDataQueried && !auslieferungen.length
        ? '...'
        : auslieferungen.length

    return {
      nodeType: 'folder',
      menuTitle: 'Aus-Lieferungen',
      id: `${personId}${gartenId}${kulturId}AusLieferungFolder`,
      label: `Aus-Lieferungen (${nr})`,
      url: [
        'Personen',
        personId,
        'Gaerten',
        gartenId,
        'Kulturen',
        kulturId,
        'Aus-Lieferungen',
      ],
      sort: [11, personIndex, 2, gartenIndex, 1, kulturIndex, 4],
      hasChildren: true,
      childrenCount: nr,
    }
  })
}
