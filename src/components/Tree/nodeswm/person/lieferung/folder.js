const personLieferungFolder = ({ store }) => {
  const { initialDataQueried } = store
  const { showPerson, visibleOpenNodes, person } = store.tree
  if (!showPerson) return []

  const parentNodes = visibleOpenNodes.filter(
    (node) => node.length === 2 && node[0] === 'Personen',
  )

  return parentNodes.map((node) => {
    const personId = node[1]
    const personIndex = person.findIndex((a) => a.id === personId)

    const lieferungen = store.lieferungsFiltered.filter(
      (s) => s.person_id === personId,
    )
    const nr =
      !initialDataQueried && !lieferungen.length ? '...' : lieferungen.length

    return {
      nodeType: 'folder',
      menuTitle: 'Lieferungen',
      id: `${personId}LieferungFolder`,
      label: `Lieferungen (${nr})`,
      url: ['Personen', personId, 'Lieferungen'],
      sort: [11, personIndex, 3],
      hasChildren: true,
      childrenCount: nr,
    }
  })
}

export default personLieferungFolder