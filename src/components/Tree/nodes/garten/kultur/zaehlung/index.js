import zaehlungLabelFromZaehlung from '../../../../../../utils/zaehlungLabelFromZaehlung'

const gartenKulturZaehlungNodes = ({ store }) => {
  const { showGarten, visibleOpenNodes, garten, gartenKultur } = store.tree
  if (!showGarten) return []

  const parentNodes = visibleOpenNodes.filter(
    (node) =>
      node.length === 5 &&
      node[0] === 'Gaerten' &&
      node[2] === 'Kulturen' &&
      node[4] === 'Zaehlungen',
  )

  if (!parentNodes.length) return []

  return parentNodes.flatMap((node) => {
    const gartenId = node[1]
    const gartenIndex = garten.findIndex((a) => a.id === gartenId)
    const kulturId = node[3]
    const kulturIndex = gartenKultur.findIndex(
      (a) => a.id === `${gartenId}${kulturId}`,
    )
    const zaehlungen = store.zaehlungsFiltered.filter(
      (z) => z.kultur_id === kulturId,
    )

    return zaehlungen
      .map((el) => ({
        nodeType: 'table',
        menuTitle: 'Zählung',
        table: 'zaehlung',
        id: `${gartenId}${kulturId}${el.id}`,
        label: zaehlungLabelFromZaehlung({ zaehlung: el }),
        url: ['Gaerten', gartenId, 'Kulturen', kulturId, 'Zaehlungen', el.id],
        hasChildren: false,
        mono: true,
      }))
      .map((el, index) => {
        el.sort = [4, gartenIndex, 1, kulturIndex, 2, index]
        return el
      })
  })
}

export default gartenKulturZaehlungNodes
