export default ({ store }) => {
  const {
    showPerson,
    visibleOpenNodes,
    loading,
    personPerson,
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
    const personIndex = personPerson.findIndex((a) => a.id === personId)
    const gartenId = node[3]
    const gartenIndex = personGarten.findIndex((a) => a.id === gartenId)
    const kulturId = node[3]
    const kulturIndex = personGartenKultur.findIndex((a) => a.id === kulturId)

    const zaehlungen = store.zaehlungsFiltered.filter(
      (z) => z.kultur_id === kulturId,
    )
    const nr = loading && !zaehlungen.length ? '...' : zaehlungen.length

    return {
      nodeType: 'folder',
      menuTitle: 'Zählungen',
      id: `${kulturId}ZaehlungFolder`,
      label: `Zählungen (${nr})`,
      url: [
        'Personen',
        personId,
        'Gaerten',
        gartenId,
        'Kulturen',
        kulturId,
        'Zaehlungen',
      ],
      sort: [11, personIndex, 2, gartenIndex, 1, kulturIndex, 2],
      hasChildren: true,
      childrenCount: nr,
    }
  })
}
