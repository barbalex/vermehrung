import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

import filterNodes from '../../../../../utils/filterNodes'

export default ({ nodes, data, url, store }) => {
  const gartenId = url[1]
  const gaerten = filterNodes({
    rows: get(data, 'garten', []),
    filter: store.filter,
    table: 'garten',
  })
  const garten = gaerten.find(a => a.id === gartenId)
  const kulturen = filterNodes({
    rows: get(garten, 'kultursBygartenId', []),
    filter: store.filter,
    table: 'kultur',
  })

  const gartenNodes = nodes.filter(n => n.parentId === 'gartenFolder')
  const gartenIndex =
    findIndex(gartenNodes, n => n.id === `garten${gartenId}`) || 0

  return (
    kulturen
      // only show if parent node exists
      .filter(() =>
        nodes.map(n => n.id).includes(`garten${gartenId}KulturFolder`),
      )
      .map(el => ({
        nodeType: 'table',
        menuTitle: 'Kultur',
        table: 'kultur',
        id: `garten${gartenId}Kultur${el.id}`,
        parentId: `garten${gartenId}KulturFolder`,
        label: get(el, 'artByartId.art_ae_art.name') || '(keine Art)',
        url: ['Gaerten', gartenId, 'Kulturen', el.id],
        hasChildren: true,
      }))
      .map((el, index) => {
        el.sort = [2, gartenIndex, 1, index]
        return el
      })
  )
}
