import lieferungLabelFromLieferung from '../../../../../utils/lieferungLabelFromLieferung'

const sammelLieferungLieferungNodes = ({ store }) => {
  const { showSammelLieferung, visibleOpenNodes, sammelLieferung } = store.tree
  if (!showSammelLieferung) return []

  const parentNodes = visibleOpenNodes.filter(
    (node) =>
      node.length === 3 &&
      node[0] === 'Sammel-Lieferungen' &&
      node[2] === 'Lieferungen',
  )

  if (!parentNodes.length) return []

  return parentNodes.flatMap((node) => {
    const sammelLieferungId = node[1]
    const sammelLieferungIndex = sammelLieferung.findIndex(
      (a) => a.id === sammelLieferungId,
    )

    const lieferungen = store.lieferungsFiltered.filter(
      (l) => l.sammel_lieferung_id === sammelLieferungId,
    )

    return lieferungen
      .map((el) => ({
        nodeType: 'table',
        menuTitle: 'Lieferung',
        table: 'lieferung',
        id: `${sammelLieferungId}${el.id}`,
        label: lieferungLabelFromLieferung({ lieferung: el }),
        url: ['Sammel-Lieferungen', sammelLieferungId, 'Lieferungen', el.id],
        hasChildren: false,
        mono: true,
      }))
      .map((el, index) => {
        el.sort = [9, sammelLieferungIndex, 3, index]
        return el
      })
  })
}

export default sammelLieferungLieferungNodes
