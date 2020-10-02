import lieferungLabelFromLieferung from '../../../../../utils/lieferungLabelFromLieferung'

export default ({ store }) => {
  const { showPerson, visibleOpenNodes, person } = store.tree
  if (!showPerson) return []

  const parentNodes = visibleOpenNodes.filter(
    (node) =>
      node.length === 3 && node[0] === 'Personen' && node[2] === 'Lieferungen',
  )

  if (!parentNodes.length) return []

  return parentNodes.flatMap((node) => {
    const personId = node[1]
    const personIndex = person.findIndex((a) => a.id === personId)

    const lieferungen = store.lieferungsFiltered.filter(
      (s) => s.person_id === personId,
    )

    return lieferungen
      .map((el) => ({
        nodeType: 'table',
        menuTitle: 'Lieferung',
        table: 'lieferung',
        id: `${personId}${el.id}`,
        label: lieferungLabelFromLieferung({ lieferung: el }),
        url: ['Personen', personId, 'Lieferungen', el.id],
        hasChildren: false,
        mono: true,
      }))
      .map((el, index) => {
        el.sort = [11, personIndex, 3, index]
        return el
      })
  })
}
