export default ({ store }) => {
  const { initialDataQueried } = store
  const { showArt, visibleOpenNodes, art, artKultur } = store.tree
  if (!showArt) return []

  const parentNodes = visibleOpenNodes.filter(
    (node) =>
      node.length === 4 && node[0] === 'Arten' && node[2] === 'Kulturen',
  )

  return parentNodes.map((node) => {
    const artId = node[1]
    const artIndex = art.findIndex((a) => a.id === artId)
    const kulturId = node[3]
    const kulturIndex = artKultur.findIndex(
      (a) => a.id === `${artId}${kulturId}`,
    )

    const kultur_option = store.kultur_options.get(kulturId)
    const tk = kultur_option?.tk
    if (!tk) return []
    const teilkulturen = store.teilkultursFiltered.filter(
      (t) => t.kultur_id === kulturId,
    )
    const nr =
      !initialDataQueried && !teilkulturen.length ? '...' : teilkulturen.length

    return {
      nodeType: 'folder',
      menuTitle: 'Teilkulturen',
      id: `${artId}${kulturId}TeilkulturFolder`,
      label: `Teilkulturen (${nr})`,
      url: ['Arten', artId, 'Kulturen', kulturId, 'Teilkulturen'],
      sort: [1, artIndex, 2, kulturIndex, 1],
      hasChildren: true,
      childrenCount: nr,
    }
  })
}
