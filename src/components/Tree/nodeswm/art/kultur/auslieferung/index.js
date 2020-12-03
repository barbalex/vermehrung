import lieferungLabelFromLieferung from '../../../../../../utils/lieferungLabelFromLieferung'

const artKulturAuslieferungNodes = ({ store }) => {
  const { showArt, visibleOpenNodes, art, artKultur } = store.tree
  if (!showArt) return []

  const parentNodes = visibleOpenNodes.filter(
    (node) =>
      node.length === 5 &&
      node[0] === 'Arten' &&
      node[2] === 'Kulturen' &&
      node[4] === 'Aus-Lieferungen',
  )

  if (!parentNodes.length) return []

  return parentNodes.flatMap((node) => {
    const artId = node[1]
    const artIndex = art.findIndex((a) => a.id === artId)
    const kulturId = node[3]
    const kulturIndex = artKultur.findIndex(
      (a) => a.id === `${artId}${kulturId}`,
    )

    const auslieferungen = store.lieferungsFiltered.filter(
      (e) => e.von_kultur_id === kulturId,
    )

    return auslieferungen
      .map((el) => ({
        nodeType: 'table',
        menuTitle: 'Auslieferung',
        table: 'lieferung',
        id: `${artId}${kulturId}${el.id}`,
        label: lieferungLabelFromLieferung({ lieferung: el }),
        url: ['Arten', artId, 'Kulturen', kulturId, 'Aus-Lieferungen', el.id],
        hasChildren: false,
        mono: true,
      }))
      .map((el, index) => {
        el.sort = [1, artIndex, 2, kulturIndex, 4, index]
        return el
      })
  })
}

export default artKulturAuslieferungNodes
