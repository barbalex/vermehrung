// @flow
import get from 'lodash/get'

import compareLabel from '../compareLabel'
import allParentNodesExist from '../../allParentNodesExist'

export default ({ nodes: nodesPassed, data }) => {
  const gaerten = get(data, 'hasura.garten', [])

  const nodes = gaerten
    .map(el => ({
      nodeType: 'table',
      menuType: 'garten',
      filterTable: 'garten',
      id: el.id,
      parentId: 2,
      urlLabel: el.id,
      label: get(el, 'lokalname', '(kein Garten gewählt)'),
      url: ['Gaerten', el.id],
      hasChildren: true,
    }))
    .filter(n => allParentNodesExist(nodesPassed, n))
    // sort by label
    .sort(compareLabel)
    .map((el, index) => {
      el.sort = [2, index]
      return el
    })

  return nodes
}
