export default ({ store }) => {
  const { showArt, visibleOpenNodes, art, artKultur } = store.tree
  if (!showArt) return []

  const parentNodes = visibleOpenNodes.filter(
    (node) =>
      node.length === 5 &&
      node[0] === 'Arten' &&
      node[2] === 'Kulturen' &&
      node[4] === 'Teilkulturen',
  )

  if (!parentNodes.length) return []

  return parentNodes.flatMap((node) => {
    const artId = node[1]
    const artIndex = art.findIndex((a) => a.id === artId)
    const kulturId = node[3]
    const kulturIndex = artKultur.findIndex((a) => a.id === kulturId)
    const teilkulturen = store.teilkultursFiltered.filter(
      (t) => t.kultur_id === kulturId,
    )

    return teilkulturen
      .map((el) => {
        const label = el.name || '(kein Name)'

        return {
          nodeType: 'table',
          menuTitle: 'Teilkultur',
          table: 'teilkultur',
          id: el.id,
          label,
          url: ['Arten', artId, 'Kulturen', kulturId, 'Teilkulturen', el.id],
          hasChildren: false,
        }
      })
      .map((el, index) => {
        el.sort = [1, artIndex, 2, kulturIndex, 1, index]
        return el
      })
  })
}
