import lieferungLabelFromLieferung from '../../../../../../utils/lieferungLabelFromLieferung'

const gartenKulturAuslieferungNodes = ({ store }) => {
  const { showGarten, visibleOpenNodes, garten, gartenKultur } = store.tree
  if (!showGarten) return []

  const parentNodes = visibleOpenNodes.filter(
    (node) =>
      node.length === 5 &&
      node[0] === 'Gaerten' &&
      node[2] === 'Kulturen' &&
      node[4] === 'Aus-Lieferungen',
  )

  if (!parentNodes.length) return []

  return parentNodes.flatMap((node) => {
    const gartenId = node[1]
    const gartenIndex = garten.findIndex((a) => a.id === gartenId)
    const kulturId = node[3]
    const kulturIndex = gartenKultur.findIndex(
      (a) => a.id === `${gartenId}${kulturId}`,
    )

    const auslieferungen = store.lieferungsFiltered.filter(
      (t) => t.von_kultur_id === kulturId,
    )

    return auslieferungen
      .map((el) => ({
        nodeType: 'table',
        menuTitle: 'Aus-Lieferung',
        table: 'lieferung',
        id: `${gartenId}${kulturId}${el.id}`,
        label: lieferungLabelFromLieferung({ lieferung: el }),
        url: [
          'Gaerten',
          gartenId,
          'Kulturen',
          kulturId,
          'Aus-Lieferungen',
          el.id,
        ],
        hasChildren: false,
        mono: true,
      }))
      .map((el, index) => {
        el.sort = [4, gartenIndex, 1, kulturIndex, 4, index]
        return el
      })
  })
}

export default gartenKulturAuslieferungNodes
