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
      .map((el) => {
        let label = el.name
        if (!label && el.person_id) {
          const person = store.persons.get(el.person_id)
          if (person) label = person?.fullname
        }
        if (!label) label = 'kein Name'

        return {
          nodeType: 'table',
          menuTitle: 'Garten',
          table: 'garten',
          id: `${personId}${el.id}`,
          label,
          url: ['Personen', personId, 'Gaerten', el.id],
          hasChildren: true,
        }
      })
      .map((el, index) => {
        el.sort = [11, personIndex, 2, index]
        return el
      })
  })
}
