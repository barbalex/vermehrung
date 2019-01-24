import get from 'lodash/get'

import compareLabel from '../compareLabel'
import allParentNodesExist from '../../allParentNodesExist'

export default ({ nodes: nodesPassed, data }) => {
  const arten = get(data, 'hasura.ae_art', [])

  const nodes = arten
    .map(el => ({
      nodeType: 'table',
      menuType: 'art',
      filterTable: 'art',
      id: `art${el.id}`,
      parentId: 'artFolder',
      urlLabel: el.id,
      label: get(el, 'name', '(keine Art gewählt)'),
      url: ['Arten', el.id],
      hasChildren: true,
    }))
    .filter(n => allParentNodesExist(nodesPassed, n))
    // sort by label
    .sort(compareLabel)
    .map((el, index) => {
      el.sort = [1, index]
      return el
    })

  return nodes
}
