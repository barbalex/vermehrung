const gartenKulturTeilkulturFolder = ({ store }) => {
  const { initialDataQueried } = store
  const { showGarten, visibleOpenNodes, garten, gartenKultur } = store.tree
  if (!showGarten) return []

  const parentNodes = visibleOpenNodes.filter(
    (node) =>
      node.length === 4 && node[0] === 'Gaerten' && node[2] === 'Kulturen',
  )

  return parentNodes.map((node) => {
    const gartenId = node[1]
    const gartenIndex = garten.findIndex((a) => a.id === gartenId)
    const kulturId = node[3]
    const kulturIndex = gartenKultur.findIndex(
      (a) => a.id === `${gartenId}${kulturId}`,
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
      id: `${gartenId}${kulturId}TeilkulturFolder`,
      label: `Teilkulturen (${nr})`,
      url: ['Gaerten', gartenId, 'Kulturen', kulturId, 'Teilkulturen'],
      sort: [4, gartenIndex, 1, kulturIndex, 1],
      hasChildren: true,
      childrenCount: nr,
    }
  })
}

export default gartenKulturTeilkulturFolder
