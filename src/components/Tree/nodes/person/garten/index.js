import get from 'lodash/get'

import compareLabel from '../compareLabel'
import allParentNodesExist from '../../allParentNodesExist'

export default ({ nodes, data }) => {
  const gaerten = get(data, 'garten', [])

  return gaerten
    .map(el => ({
      nodeType: 'table',
      menuType: 'garten',
      filterTable: 'garten',
      id: `garten${el.id}`,
      parentId: 'gartenFolder',
      label: get(el, 'personBypersonId.name', '(kein Garten gewählt)'),
      url: ['Gaerten', el.id],
      hasChildren: true,
    }))
    .filter(n => allParentNodesExist(nodes, n))
    .sort(compareLabel)
    .map((el, index) => {
      el.sort = [5, index]
      return el
    })
}
