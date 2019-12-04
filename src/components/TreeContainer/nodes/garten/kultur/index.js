import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

export default ({ nodes, data, url }) => {
  const gartenId = url[1]
  const gaerten = get(data, 'garten') || []
  const garten = gaerten.find(a => a.id === gartenId)
  const kulturen = get(garten, 'kulturs') || []

  const gartenNodes = nodes.filter(n => n.parentId === 'gartenFolder')
  const gartenIndex =
    findIndex(gartenNodes, n => n.id === `garten${gartenId}`) || 0

  return (
    kulturen
      // only show if parent node exists
      .filter(() =>
        nodes.map(n => n.id).includes(`garten${gartenId}KulturFolder`),
      )
      .map(el => {
        const art = get(el, 'art.art_ae_art.name') || '(keine Art)'
        const herkunft = get(el, 'herkunft.nr') || '(Herkunft ohne Nr)'
        const label = `${art}, von: ${herkunft}`

        return {
          nodeType: 'table',
          menuTitle: 'Kultur',
          table: 'kultur',
          id: `garten${gartenId}Kultur${el.id}`,
          parentId: `garten${gartenId}KulturFolder`,
          label,
          url: ['Gaerten', gartenId, 'Kulturen', el.id],
          hasChildren: true,
        }
      })
      .map((el, index) => {
        el.sort = [4, gartenIndex, 1, index]
        return el
      })
  )
}
