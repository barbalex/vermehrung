import zaehlungLabelFromZaehlung from '../../../../../../utils/zaehlungLabelFromZaehlung'

const artKulturZaehlungNodes = ({ store }) => {
  const { showArt, visibleOpenNodes, art, artKultur } = store.tree
  if (!showArt) return []

  const parentNodes = visibleOpenNodes.filter(
    (node) =>
      node.length === 5 &&
      node[0] === 'Arten' &&
      node[2] === 'Kulturen' &&
      node[4] === 'Zaehlungen',
  )

  if (!parentNodes.length) return []

  return parentNodes.flatMap((node) => {
    const artId = node[1]
    const artIndex = art.findIndex((a) => a.id === artId)
    const kulturId = node[3]
    const kulturIndex = artKultur.findIndex(
      (a) => a.id === `${artId}${kulturId}`,
    )

    const zaehlungen = store.zaehlungsFiltered.filter(
      (z) => z.kultur_id === kulturId,
    )

    return zaehlungen
      .map((el) => ({
        nodeType: 'table',
        menuTitle: 'Zählung',
        table: 'zaehlung',
        id: `${artId}${kulturId}${el.id}`,
        label: zaehlungLabelFromZaehlung({ zaehlung: el }),
        url: ['Arten', artId, 'Kulturen', kulturId, 'Zaehlungen', el.id],
        hasChildren: false,
        mono: true,
      }))
      .map((el, index) => {
        el.sort = [1, artIndex, 2, kulturIndex, 2, index]
        return el
      })
  })
}

export default artKulturZaehlungNodes
