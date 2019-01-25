import get from 'lodash/get'

import compareLabel from '../compareLabel'
import allParentNodesExist from '../../allParentNodesExist'

export default ({ nodes, data }) => {
  const arten = get(data, 'hasura.ae_art', [])

  return arten
    .map(el => ({
      nodeType: 'table',
      menuType: 'art',
      filterTable: 'art',
      id: `art${el.id}`,
      parentId: 'artFolder',
      label: get(el, 'name', '(keine Art gewählt)'),
      url: ['Arten', el.id],
      hasChildren: true,
    }))
    .filter(n => allParentNodesExist(nodes, n))
    .sort(compareLabel)
    .map((el, index) => {
      el.sort = [1, index]
      return el
    })
}
