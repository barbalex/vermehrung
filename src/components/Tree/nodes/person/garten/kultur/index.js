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
    const gartenIndex = personGarten.findIndex((a) => a.id === gartenId)

    const kulturen = store.kultursFiltered.filter(
      (s) => s.garten_id === gartenId,
    )

    return kulturen
      .map((el) => {
        const art = el?.art?.art_ae_art?.name ?? '(keine Art)'
        const herkunft = el?.herkunft?.nr ?? '(Herkunft ohne Nr)'
        const label = `${art}, von: ${herkunft}`

        return {
          nodeType: 'table',
          menuTitle: 'Kultur',
          table: 'kultur',
          id: `${personId}${gartenId}${el.id}`,
          label,
          url: ['Personen', personId, 'Gaerten', gartenId, 'Kulturen', el.id],
          hasChildren: true,
        }
      })
      .map((el, index) => {
        el.sort = [11, personIndex, 2, gartenIndex, 1, index]
        return el
      })
  })
}
