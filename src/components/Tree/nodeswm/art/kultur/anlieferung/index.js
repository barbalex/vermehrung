import lieferungLabelFromLieferung from '../../../../../../utils/lieferungLabelFromLieferung'

const artKulturAnlieferungNodes = ({ store }) => {
  const { showArt, visibleOpenNodes, art, artKultur } = store.tree
  if (!showArt) return []

  const parentNodes = visibleOpenNodes.filter(
    (node) =>
      node.length === 5 &&
      node[0] === 'Arten' &&
      node[2] === 'Kulturen' &&
      node[4] === 'An-Lieferungen',
  )

  if (!parentNodes.length) return []

  return parentNodes.flatMap((node) => {
    const artId = node[1]
    const artIndex = art.findIndex((a) => a.id === artId)
    const kulturId = node[3]
    const kulturIndex = artKultur.findIndex(
      (a) => a.id === `${artId}${kulturId}`,
    )

    const anlieferungen = store.lieferungsFiltered.filter(
      (e) => e.nach_kultur_id === kulturId,
    )

    return anlieferungen
      .map((el) => ({
        nodeType: 'table',
        menuTitle: 'Anlieferung',
        table: 'lieferung',
        id: `${artId}${kulturId}${el.id}`,
        label: lieferungLabelFromLieferung({ lieferung: el }),
        url: ['Arten', artId, 'Kulturen', kulturId, 'An-Lieferungen', el.id],
        hasChildren: false,
        mono: true,
      }))
      .map((el, index) => {
        el.sort = [1, artIndex, 2, kulturIndex, 3, index]
        return el
      })
  })
}

export default artKulturAnlieferungNodes