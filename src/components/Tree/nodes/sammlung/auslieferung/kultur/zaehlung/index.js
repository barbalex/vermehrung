import zaehlungLabelFromZaehlung from '../../../../../../../utils/zaehlungLabelFromZaehlung'

export default ({ store }) => {
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
      node[6] === 'Zaehlungen',
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

    const zaehlungen = store.zaehlungsFiltered.filter(
      (z) => z.kultur_id === kulturId,
    )

    return zaehlungen
      .map((el) => ({
        nodeType: 'table',
        menuTitle: 'Zählung',
        table: 'artKulturZaehlung',
        id: `${sammlungId}${lieferungId}${kulturId}${el.id}`,
        label: zaehlungLabelFromZaehlung({ zaehlung: el }),
        url: [
          'Sammlungen',
          sammlungId,
          'Aus-Lieferungen',
          lieferungId,
          'Kulturen',
          kulturId,
          'Zaehlungen',
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
          2,
          index,
        ]
        return el
      })
  })
}
