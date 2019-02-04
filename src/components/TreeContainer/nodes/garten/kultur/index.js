import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

import compareLabel from '../../compareLabel'

export default ({ nodes, data, url }) => {
  const gartenId = url[1]
  const gaerten = get(data, 'garten', [])
  const garten = gaerten.find(a => a.id === gartenId)
  const kulturen = get(garten, 'kultursBygartenId', [])

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
        menuTitle: 'kultur',
        filterTable: 'kultur',
        id: `garten${gartenId}Kultur${el.id}`,
        parentId: `garten${gartenId}KulturFolder`,
        label: get(el, 'gartenBygartenId.personBypersonId.name', '(kein Name)'),
        url: ['Gaerten', gartenId, 'Kulturen', el.id],
        hasChildren: true,
      }))
      .sort(compareLabel)
      .map((el, index) => {
        el.sort = [2, gartenIndex, 1, index]
        return el
      })
  )
}
