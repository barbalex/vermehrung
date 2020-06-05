export default ({ store }) => {
  const { showPerson, visibleOpenNodes, person } = store.tree
  if (!showPerson) return []

  const parentNodes = visibleOpenNodes.filter(
    (node) =>
      node.length === 3 && node[0] === 'Personen' && node[2] === 'Gaerten',
  )

  if (!parentNodes.length) return []

  return parentNodes.flatMap((node) => {
    const personId = node[1]
    const personIndex = person.findIndex((a) => a.id === personId)

    const gaerten = store.gartensFiltered.filter(
      (s) => s.person_id === personId,
    )

    return gaerten
      .map((el) => ({
        nodeType: 'table',
        menuTitle: 'Garten',
        table: 'garten',
        id: el.id,
        label: el.name || `(${el?.person?.name ?? 'kein Name'})`,
        url: ['Personen', personId, 'Gaerten', el.id],
        hasChildren: true,
      }))
      .map((el, index) => {
        el.sort = [11, personIndex, 2, index]
        return el
      })
  })
}
