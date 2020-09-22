export default ({ store }) => {
  const { showArt, visibleOpenNodes, art } = store.tree
  if (!showArt) return []

  const parentNodes = visibleOpenNodes.filter(
    (node) =>
      node.length === 3 && node[0] === 'Arten' && node[2] === 'Kulturen',
  )

  if (!parentNodes.length) return []

  return parentNodes.flatMap((node) => {
    const artId = node[1]
    const artIndex = art.findIndex((a) => a.id === artId)
    const kulturen = store.kultursFiltered.filter((k) => k.art_id === artId)

    return kulturen
      .map((k) => {
        const garten =
          k?.garten?.name ?? `${k?.garten?.person?.fullname ?? 'kein Name'}`
        const herkunft = k?.herkunft?.nr ?? '(Herkunft ohne Nr)'
        const zwischenlager = k?.zwischenlager ? ', Zwischenlager' : ''
        const label = `von: ${herkunft}, in: ${garten}${zwischenlager}`
        const labelWithZl = `${label}${
          k?.zwischenlager ? '. Zwischenlager' : ''
        }`

        return {
          nodeType: 'table',
          menuTitle: 'Kultur',
          table: 'kultur',
          id: `${artId}${k.id}`,
          label: labelWithZl,
          url: ['Arten', artId, 'Kulturen', k.id],
          hasChildren: true,
        }
      })
      .map((k, index) => {
        k.sort = [1, artIndex, 2, index]
        return k
      })
  })
}
