const kulturTeilkulturFolder = ({ store }) => {
  const { initialDataQueried } = store
  const { showKultur, visibleOpenNodes, kultur } = store.tree
  if (!showKultur) return []

  const parentNodes = visibleOpenNodes.filter(
    (node) => node.length === 2 && node[0] === 'Kulturen',
  )

  return parentNodes.map((node) => {
    const kulturId = node[1]
    const kulturIndex = kultur.findIndex((a) => a.id === kulturId)

    const kultur_option = store.kultur_options.get(kulturId)
    const tk = kultur_option?.tk
    if (!tk) return []

    const teilkulturs = store.teilkultursFiltered.filter(
      (z) => z.kultur_id === kulturId,
    )
    const nr =
      !initialDataQueried && !teilkulturs.length ? '...' : teilkulturs.length

    return {
      nodeType: 'folder',
      menuTitle: 'Teilkulturen',
      id: `${kulturId}TeilkulturFolder`,
      label: `Teilkulturen (${nr})`,
      url: ['Kulturen', kulturId, 'Teilkulturen'],
      sort: [5, kulturIndex, 1],
      hasChildren: true,
      childrenCount: nr,
    }
  })
}

export default kulturTeilkulturFolder
