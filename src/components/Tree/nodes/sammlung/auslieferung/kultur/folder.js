const sammlungAuslieferungKulturFolder = ({ store }) => {
  const { initialDataQueried } = store
  const {
    showSammlung,
    visibleOpenNodes,
    sammlung: sammlungNodes,
    sammlungAusLieferung: lieferungNodes,
  } = store.tree
  if (!showSammlung) return []

  const parentNodes = visibleOpenNodes.filter(
    (node) =>
      node.length === 4 &&
      node[0] === 'Sammlungen' &&
      node[2] === 'Aus-Lieferungen',
  )

  return (
    parentNodes
      .map((node) => {
        const sammlungId = node[1]
        const sammlungIndex = sammlungNodes.findIndex(
          (a) => a.id === sammlungId,
        )
        const lieferungId = node[3]
        const lieferungIndex = lieferungNodes.findIndex(
          (a) => a.id === `${sammlungId}${lieferungId}`,
        )

        const lieferung = store.lieferungs.get(lieferungId) || {}
        const kultur = store.kultursFiltered.find(
          (k) => k.id === lieferung.nach_kultur_id,
        )

        if (!kultur) return {}

        const nr = !initialDataQueried ? 0 : 1

        return {
          nodeType: 'folder_without_menu',
          menuTitle: 'Kulturen',
          id: `${sammlungId}${lieferungId}KulturFolder`,
          label: `Kultur (${nr})`,
          url: [
            'Sammlungen',
            sammlungId,
            'Aus-Lieferungen',
            lieferungId,
            'Kulturen',
          ],
          sort: [3, sammlungIndex, 3, lieferungIndex, 1],
          hasChildren: true,
          childrenCount: nr,
        }
      })
      // remove lieferungs without kulturs
      .filter((n) => !!n.id)
  )
}

export default sammlungAuslieferungKulturFolder
