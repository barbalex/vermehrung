import lieferungLabelFromLieferung from '../../../../../utils/lieferungLabelFromLieferung'

const sammlungAuslieferungNodes = ({ store }) => {
  const { showSammlung, visibleOpenNodes, sammlung: sammlungNodes } = store.tree
  if (!showSammlung) return []

  const parentNodes = visibleOpenNodes.filter(
    (node) =>
      node.length === 3 &&
      node[0] === 'Sammlungen' &&
      node[2] === 'Aus-Lieferungen',
  )

  if (!parentNodes.length) return []

  return parentNodes.flatMap((node) => {
    const sammlungId = node[1]
    const sammlungIndex = sammlungNodes.findIndex((a) => a.id === sammlungId)

    const lieferungen = store.lieferungsFiltered.filter(
      (l) => l.von_sammlung_id === sammlungId,
    )

    return lieferungen
      .map((el) => ({
        nodeType: 'table',
        menuTitle: 'Aus-Lieferung',
        table: 'lieferung',
        id: `${sammlungId}${el.id}`,
        label: lieferungLabelFromLieferung({ lieferung: el }),
        url: ['Sammlungen', sammlungId, 'Aus-Lieferungen', el.id],
        hasChildren: true,
        mono: true,
      }))
      .map((el, index) => {
        el.sort = [3, sammlungIndex, 3, index]
        return el
      })
  })
}

export default sammlungAuslieferungNodes