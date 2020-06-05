export default ({ store }) => {
  const {
    showPerson,
    visibleOpenNodes,
    personPerson,
    personGarten,
    personGartenKultur,
  } = store.tree
  if (!showPerson) return []

  const parentNodes = visibleOpenNodes.filter(
    (node) =>
      node.length === 7 &&
      node[0] === 'Personen' &&
      node[2] === 'Gaerten' &&
      node[4] === 'Kulturen' &&
      node[6] === 'Teilkulturen',
  )

  if (!parentNodes.length) return []

  return parentNodes.flatMap((node) => {
    const personId = node[1]
    const personIndex = personPerson.findIndex((a) => a.id === personId)
    const gartenId = node[3]
    const gartenIndex = personGarten.findIndex((a) => a.id === gartenId)
    const kulturId = node[5]
    const kulturIndex = personGartenKultur.findIndex((a) => a.id === kulturId)

    const teilkulturen = store.teilkultursFiltered.filter(
      (z) => z.kultur_id === kulturId,
    )

    return teilkulturen
      .map((el) => {
        const label = el.name || '(kein Name)'

        return {
          nodeType: 'table',
          menuTitle: 'Teilkultur',
          table: 'teilkultur',
          id: el.id,
          label,
          url: [
            'Personen',
            personId,
            'Gaerten',
            gartenId,
            'Kulturen',
            kulturId,
            'Teilkulturen',
            el.id,
          ],
          hasChildren: false,
        }
      })
      .map((el, index) => {
        el.sort = [11, personIndex, 2, gartenIndex, 1, kulturIndex, 1, index]
        return el
      })
  })
}
