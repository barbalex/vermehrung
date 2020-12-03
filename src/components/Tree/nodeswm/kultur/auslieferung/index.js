import lieferungLabelFromLieferung from '../../../../../utils/lieferungLabelFromLieferung'

const kulturAuslieferungNodes = ({ store }) => {
  const { showKultur, visibleOpenNodes, kultur } = store.tree
  if (!showKultur) return []

  const parentNodes = visibleOpenNodes.filter(
    (node) =>
      node.length === 3 &&
      node[0] === 'Kulturen' &&
      node[2] === 'Aus-Lieferungen',
  )

  if (!parentNodes.length) return []

  return parentNodes.flatMap((node) => {
    const kulturId = node[1]
    const kulturIndex = kultur.findIndex((a) => a.id === kulturId)

    const auslieferungen = store.lieferungsFiltered.filter(
      (z) => z.von_kultur_id === kulturId,
    )

    return auslieferungen
      .map((el) => ({
        nodeType: 'table',
        menuTitle: 'Aus-Lieferung',
        table: 'lieferung',
        id: `${kulturId}${el.id}`,
        label: lieferungLabelFromLieferung({ lieferung: el }),
        url: ['Kulturen', kulturId, 'Aus-Lieferungen', el.id],
        hasChildren: false,
        mono: true,
      }))
      .map((el, index) => {
        el.sort = [5, kulturIndex, 4, index]
        return el
      })
  })
}

export default kulturAuslieferungNodes
