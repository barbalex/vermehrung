import artLabelFromKultur from '../../../../../../utils/artLabelFromKultur'

export default ({ store }) => {
  const { showPerson, visibleOpenNodes, person, personGarten } = store.tree
  if (!showPerson) return []

  const parentNodes = visibleOpenNodes.filter(
    (node) =>
      node.length === 5 &&
      node[0] === 'Personen' &&
      node[2] === 'Gaerten' &&
      node[4] === 'Kulturen',
  )

  if (!parentNodes.length) return []

  return parentNodes.flatMap((node) => {
    const personId = node[1]
    const personIndex = person.findIndex((a) => a.id === personId)
    const gartenId = node[3]
    const gartenIndex = personGarten.findIndex(
      (a) => a.id === `${personId}${gartenId}`,
    )

    const kulturen = store.kultursFiltered.filter(
      (s) => s.garten_id === gartenId,
    )

    return kulturen
      .map((k) => {
        const artLabel = artLabelFromKultur({ kultur: k, store })
        const herkunft = k?.herkunft_id
          ? store.herkunfts.get(k.herkunft_id)
          : {}
        const herkunftLabel = herkunft
          ? herkunft?.nr ?? '(Herkunft ohne Nr)'
          : '(keine Herkunft)'
        const zlLabel = k?.zwischenlager ? '. Zwischenlager' : ''
        const label = `${artLabel}, von: ${herkunftLabel}${zlLabel}`

        return {
          nodeType: 'table',
          menuTitle: 'Kultur',
          table: 'kultur',
          id: `${personId}${gartenId}${k.id}`,
          label,
          url: ['Personen', personId, 'Gaerten', gartenId, 'Kulturen', k.id],
          hasChildren: true,
        }
      })
      .map((k, index) => {
        k.sort = [11, personIndex, 2, gartenIndex, 1, index]
        return k
      })
  })
}
