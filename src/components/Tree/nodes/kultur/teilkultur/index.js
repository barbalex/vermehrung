const kulturTeilkulturNodes = ({ store }) => {
  const { showKultur, visibleOpenNodes, kultur } = store.tree
  if (!showKultur) return []

  const parentNodes = visibleOpenNodes.filter(
    (node) =>
      node.length === 3 && node[0] === 'Kulturen' && node[2] === 'Teilkulturen',
  )

  if (!parentNodes.length) return []

  return parentNodes.flatMap((node) => {
    const kulturId = node[1]
    const kulturIndex = kultur.findIndex((a) => a.id === kulturId)

    const teilkulturs = store.teilkultursFiltered.filter(
      (z) => z.kultur_id === kulturId,
    )

    return teilkulturs
      .map((el) => {
        const label = el.name ?? '(kein Name)'

        return {
          nodeType: 'table',
          menuTitle: 'Teilkultur',
          table: 'teilkultur',
          id: `${kulturId}${el.id}`,
          label,
          url: ['Kulturen', kulturId, 'Teilkulturen', el.id],
          hasChildren: false,
        }
      })
      .map((el, index) => {
        el.sort = [5, kulturIndex, 1, index]
        return el
      })
  })
}

export default kulturTeilkulturNodes
