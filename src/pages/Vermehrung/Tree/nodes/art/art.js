// @flow
import get from 'lodash/get'

import compareLabel from '../compareLabel'
import allParentNodesExist from '../../allParentNodesExist'

export default ({ nodes: nodesPassed, data }) => {
  const arten = get(data, 'hasura.ae_art', [])

  // map through all elements and create array of nodes
  const nodes = arten
    .map(el => ({
      nodeType: 'table',
      menuType: 'art',
      filterTable: 'art',
      id: el.id,
      parentId: 1,
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
  console.log('art', { nodes })
  return nodes
}
