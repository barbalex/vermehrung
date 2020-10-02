import lieferungLabelFromLieferung from '../../../../../utils/lieferungLabelFromLieferung'

export default ({ store }) => {
  const { showKultur, visibleOpenNodes, kultur } = store.tree
  if (!showKultur) return []

  const parentNodes = visibleOpenNodes.filter(
    (node) =>
      node.length === 3 &&
      node[0] === 'Kulturen' &&
      node[2] === 'An-Lieferungen',
  )

  if (!parentNodes.length) return []

  return parentNodes.flatMap((node) => {
    const kulturId = node[1]
    const kulturIndex = kultur.findIndex((a) => a.id === kulturId)

    const anlieferungen = store.lieferungsFiltered.filter(
      (z) => z.nach_kultur_id === kulturId,
    )

    return anlieferungen
      .map((el) => ({
        nodeType: 'table',
        menuTitle: 'An-Lieferung',
        table: 'lieferung',
        id: `${kulturId}${el.id}`,
        label: lieferungLabelFromLieferung({ lieferung: el }),
        url: ['Kulturen', kulturId, 'An-Lieferungen', el.id],
        hasChildren: false,
        mono: true,
      }))
      .map((el, index) => {
        el.sort = [5, kulturIndex, 3, index]
        return el
      })
  })
}
