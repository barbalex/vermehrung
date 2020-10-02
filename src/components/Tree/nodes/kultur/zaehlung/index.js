import zaehlungLabelFromZaehlung from '../../../../../utils/zaehlungLabelFromZaehlung'

export default ({ store }) => {
  const { showKultur, visibleOpenNodes, kultur } = store.tree
  if (!showKultur) return []

  const parentNodes = visibleOpenNodes.filter(
    (node) =>
      node.length === 3 && node[0] === 'Kulturen' && node[2] === 'Zaehlungen',
  )

  if (!parentNodes.length) return []

  return parentNodes.flatMap((node) => {
    const kulturId = node[1]
    const kulturIndex = kultur.findIndex((a) => a.id === kulturId)

    const zaehlungen = store.zaehlungsFiltered.filter(
      (z) => z.kultur_id === kulturId,
    )

    return zaehlungen
      .map((el) => ({
        nodeType: 'table',
        menuTitle: 'Zählung',
        table: 'zaehlung',
        id: `${kulturId}${el.id}`,
        label: zaehlungLabelFromZaehlung({ zaehlung: el }),
        url: ['Kulturen', kulturId, 'Zaehlungen', el.id],
        hasChildren: false,
        mono: true,
      }))
      .map((el, index) => {
        el.sort = [5, kulturIndex, 2, index]
        return el
      })
  })
}
