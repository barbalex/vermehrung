export default ({ store }) => {
  const { showSammlung, visibleOpenNodes, sammlung: sammlungNodes } = store.tree
  if (!showSammlung) return []

  const parentNodes = visibleOpenNodes.filter(
    (node) =>
      node.length === 3 && node[0] === 'Sammlungen' && node[2] === 'Herkuenfte',
  )

  if (!parentNodes.length) return []

  return parentNodes.flatMap((node) => {
    const sammlungId = node[1]
    const sammlungIndex = sammlungNodes.findIndex((a) => a.id === sammlungId)

    const sammlung = store.sammlungs.get(sammlungId) || {}
    const herkunfts = store.herkunftsFiltered.filter(
      (h) => h.id === sammlung.herkunft_id,
    )

    return (
      herkunfts
        // there were null values causing errors
        .filter((n) => !!n)
        .map((el) => {
          const label = `${el.nr || '(keine Nr)'}: ${
            el.gemeinde || '(keine Gemeinde)'
          }, ${el.lokalname || '(kein Lokalname)'}`

          return {
            nodeType: 'table_no_menu',
            menuTitle: 'Herkunft',
            table: 'herkunft',
            id: el.id,
            label,
            url: ['Sammlungen', sammlungId, 'Herkuenfte', el.id],
            hasChildren: false,
          }
        })
        .map((el, index) => {
          el.sort = [3, sammlungIndex, 1, index]
          return el
        })
    )
  })
}
