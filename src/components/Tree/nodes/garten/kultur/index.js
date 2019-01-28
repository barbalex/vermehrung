import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

import compareLabel from '../../compareLabel'
import allParentNodesExist from '../../../allParentNodesExist'

export default ({ nodes, data, url }) => {
  const gaerten = get(data, 'garten', [])
  const garten = gaerten.find(a => a.id === url[1])
  const kulturen = get(garten, 'kultursBygartenId', [])
  const gartenNodes = nodes.filter(n => n.parentId === 'gartenFolder')
  const gartenIndex =
    findIndex(gartenNodes, n => n.id === `garten${url[1]}`) || 0

  return kulturen
    .map(el => ({
      nodeType: 'table',
      menuType: 'kultur',
      filterTable: 'kultur',
      id: `kultur${el.id}`,
      parentId: `garten${url[1]}KulturFolder`,
      label: get(el, 'gartenBygartenId.personBypersonId.name', '(kein Name)'),
      url: ['Arten', url[1], 'Kulturen', el.id],
      hasChildren: true,
    }))
    .filter(n => allParentNodesExist(nodes, n))
    .sort(compareLabel)
    .map((el, index) => {
      el.sort = [1, gartenIndex, 1, index]
      return el
    })
}
