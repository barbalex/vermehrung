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
      node[6] === 'Teilkulturen',
  )

  if (!parentNodes.length) return []

  return parentNodes.flatMap((node) => {
    const sammlungId = node[1]
    const sammlungIndex = sammlungNodes.findIndex((a) => a.id === sammlungId)
    const lieferungId = node[3]
    const lieferungIndex = lieferungNodes.findIndex((a) => a.id === lieferungId)
    const kulturId = node[5]
    const kulturIndex = kulturNodes.findIndex((a) => a.id === kulturId)

    const teilkulturen = store.teilkultursFiltered.filter(
      (z) => z.kultur_id === kulturId,
    )

    return teilkulturen
      .map((el) => {
        const label = el.name || '(kein Name)'

        return {
          nodeType: 'table',
          menuTitle: 'Teilkultur',
          table: 'teilkultur',
          id: `${sammlungId}${lieferungId}${kulturId}${el.id}`,
          label,
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
        }
      })
      .map((el, index) => {
        el.sort = [
          3,
          sammlungIndex,
          3,
          lieferungIndex,
          1,
          kulturIndex,
          1,
          index,
        ]
        return el
      })
  })
}
