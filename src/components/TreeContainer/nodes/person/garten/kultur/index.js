import findIndex from 'lodash/findIndex'

export default ({ nodes, store, url }) => {
  const personId = url[1]
  const gartenId = url[3]

  const kulturen = store.kultursFiltered.filter((s) => s.garten_id === gartenId)

  const personNodes = nodes.filter((n) => n.parentId === 'personFolder')
  const personIndex = findIndex(
    personNodes,
    (n) => n.id === `person${personId}`,
  )
  const gartenNodes = nodes.filter(
    (n) => n.parentId === `person${personId}GartenFolder`,
  )
  const gartenIndex = findIndex(
    gartenNodes,
    (n) => n.id === `person${personId}Garten${gartenId}`,
  )

  return (
    kulturen
      // only show if parent node exists
      .filter(() =>
        nodes
          .map((n) => n.id)
          .includes(`person${personId}Garten${gartenId}KulturFolder`),
      )
      .map((el) => {
        const art = el?.art?.art_ae_art?.name ?? '(keine Art)'
        const herkunft = el?.herkunft?.nr ?? '(Herkunft ohne Nr)'
        const label = `${art}, von: ${herkunft}`

        return {
          nodeType: 'table',
          menuTitle: 'Kultur',
          table: 'kultur',
          id: `person${personId}Garten${gartenId}Kultur${el.id}`,
          parentId: `person${personId}Garten${gartenId}KulturFolder`,
          label,
          url: ['Personen', personId, 'Gaerten', gartenId, 'Kulturen', el.id],
          hasChildren: true,
        }
      })
      .map((el, index) => {
        el.sort = [11, personIndex, 2, gartenIndex, 1, index]
        return el
      })
  )
}
