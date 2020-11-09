import lieferungLabelFromLieferung from '../../../../../../../utils/lieferungLabelFromLieferung'

const sammlungAuslieferungKulturAuslieferungNodes = ({ store }) => {
  const {
    showSammlung,
    visibleOpenNodes,
    sammlung: sammlungNodes,
    sammlungAusLieferung: lieferungNodes,
    sammlungAusLieferungKultur: kulturNodes,
  } = store.tree
  if (!showSammlung) return []

  const parentNodes = visibleOpenNodes.filter(
    (node) =>
      node.length === 7 &&
      node[0] === 'Sammlungen' &&
      node[2] === 'Aus-Lieferungen' &&
      node[4] === 'Kulturen' &&
      node[6] === 'Aus-Lieferungen',
  )

  if (!parentNodes.length) return []

  return parentNodes.flatMap((node) => {
    const sammlungId = node[1]
    const sammlungIndex = sammlungNodes.findIndex((a) => a.id === sammlungId)
    const lieferungId = node[3]
    const lieferungIndex = lieferungNodes.findIndex(
      (a) => a.id === `${sammlungId}${lieferungId}`,
    )
    const kulturId = node[5]
    const kulturIndex = kulturNodes.findIndex(
      (a) => a.id === `${sammlungId}${lieferungId}${kulturId}`,
    )

    const auslieferungen = store.lieferungsFiltered.filter(
      (z) => z.von_kultur_id === kulturId,
    )

    return auslieferungen
      .map((el) => ({
        nodeType: 'table',
        menuTitle: 'Aus-Lieferung',
        table: 'lieferung',
        id: `${sammlungId}${lieferungId}${kulturId}${el.id}`,
        label: lieferungLabelFromLieferung({ lieferung: el }),
        url: [
          'Sammlungen',
          sammlungId,
          'Aus-Lieferungen',
          lieferungId,
          'Kulturen',
          kulturId,
          'Aus-Lieferungen',
          el.id,
        ],
        hasChildren: false,
        mono: true,
      }))
      .map((el, index) => {
        el.sort = [
          3,
          sammlungIndex,
          3,
          lieferungIndex,
          1,
          kulturIndex,
          4,
          index,
        ]
        return el
      })
  })
}

export default sammlungAuslieferungKulturAuslieferungNodes
