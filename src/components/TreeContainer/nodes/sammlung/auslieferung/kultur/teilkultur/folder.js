export default ({ store }) => {
  const {
    showSammlung,
    visibleOpenNodes,
    loading,
    sammlung: sammlungNodes,
    sammlungAusLieferung: lieferungNodes,
    sammlungAusLieferungKultur: kulturNodes,
  } = store.tree
  if (!showSammlung) return []

  const parentNodes = visibleOpenNodes.filter(
    (node) =>
      node.length === 6 &&
      node[0] === 'Sammlungen' &&
      node[2] === 'Aus-Lieferungen' &&
      node[4] === 'Kulturen',
  )

  return parentNodes.map((node) => {
    const sammlungId = node[1]
    const sammlungIndex = sammlungNodes.findIndex((a) => a.id === sammlungId)
    const lieferungId = node[3]
    const lieferungIndex = lieferungNodes.findIndex((a) => a.id === lieferungId)
    const kulturId = node[5]
    const kulturIndex = kulturNodes.findIndex((a) => a.id === kulturId)

    const kultur_option = store.kultur_options.get(kulturId)
    const tk = kultur_option?.tk
    if (!tk) return []

    const teilkulturen = store.teilkultursFiltered.filter(
      (z) => z.kultur_id === kulturId,
    )
    const nr = loading && !teilkulturen.length ? '...' : teilkulturen.length

    return {
      nodeType: 'folder',
      menuTitle: 'Teilkulturen',
      id: `${kulturId}TeilkulturFolder`,
      label: `Teilkulturen (${nr})`,
      url: [
        'Sammlungen',
        sammlungId,
        'Aus-Lieferungen',
        lieferungId,
        'Kulturen',
        kulturId,
        'Teilkulturen',
      ],
      sort: [3, sammlungIndex, 3, lieferungIndex, 1, kulturIndex, 1],
      hasChildren: true,
      childrenCount: nr,
    }
  })
}
