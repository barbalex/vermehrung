import kulturLabelFromKultur from '../../../../../Data/Lieferung/Lieferung/kulturLabelFromKultur'

export default ({ store }) => {
  const {
    showSammlung,
    visibleOpenNodes,
    sammlung: sammlungNodes,
    sammlungAusLieferung: lieferungNodes,
  } = store.tree
  if (!showSammlung) return []

  const parentNodes = visibleOpenNodes.filter(
    (node) =>
      node.length === 5 &&
      node[0] === 'Sammlungen' &&
      node[2] === 'Aus-Lieferungen' &&
      node[4] === 'Kulturen',
  )

  if (!parentNodes.length) return []

  return parentNodes.flatMap((node) => {
    const sammlungId = node[1]
    const sammlungIndex = sammlungNodes.findIndex((a) => a.id === sammlungId)
    const lieferungId = node[3]
    const lieferungIndex = lieferungNodes.findIndex(
      (a) => a.id === `${sammlungId}${lieferungId}`,
    )

    const lieferung = store.lieferungs.get(lieferungId) || {}
    const kultur = store.kultursFiltered.find(
      (k) => lieferung?.nach_kultur_id === k.id,
    )

    if (!kultur) return []

    return [kultur]
      .map((k) => ({
        nodeType: 'table_without_menu',
        menuTitle: 'Kultur',
        table: 'kultur',
        id: `${sammlungId}${lieferungId}${k.id}`,
        label: kulturLabelFromKultur(k),
        url: [
          'Sammlungen',
          sammlungId,
          'Aus-Lieferungen',
          lieferungId,
          'Kulturen',
          k.id,
        ],
        hasChildren: true,
      }))
      .map((k, index) => {
        k.sort = [3, sammlungIndex, 3, lieferungIndex, 1, index]
        return k
      })
  })
}
