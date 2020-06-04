export default ({ store }) => {
  const { showArt, visibleOpenNodes, artArt } = store.tree
  if (!showArt) return []

  const parentNodes = visibleOpenNodes.filter(
    (node) =>
      node.length === 3 && node[0] === 'Arten' && node[2] === 'Kulturen',
  )

  if (!parentNodes.length) return []

  return parentNodes.flatMap((node) => {
    const artId = node[1]
    const artIndex = artArt.findIndex((a) => a.id === artId)
    const kulturen = store.kultursFiltered.filter((k) => k.art_id === artId)

    return kulturen
      .map((el) => {
        const garten =
          el?.garten?.name ?? `(${el?.garten?.person?.name ?? 'kein Name'})`
        const herkunft = el?.herkunft?.nr ?? '(Herkunft ohne Nr)'
        const label = `von: ${herkunft}, in: ${garten}`

        return {
          nodeType: 'table',
          menuTitle: 'Kultur',
          table: 'kultur',
          id: el.id,
          parentId: `${artId}KulturFolder`,
          label,
          url: ['Arten', artId, 'Kulturen', el.id],
          hasChildren: true,
        }
      })
      .map((el, index) => {
        el.sort = [1, artIndex, 2, index]
        return el
      })
  })
}
