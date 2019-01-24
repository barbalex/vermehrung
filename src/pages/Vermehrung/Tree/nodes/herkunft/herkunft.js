// @flow
import get from 'lodash/get'

import compareLabel from '../compareLabel'
import allParentNodesExist from '../../allParentNodesExist'

export default ({ nodes: nodesPassed, data }) => {
  const herkuenfte = get(data, 'hasura.herkunft', [])

  const nodes = herkuenfte
    .map(el => ({
      nodeType: 'table',
      menuType: 'herkunft',
      filterTable: 'herkunft',
      id: el.id,
      parentId: 3,
      urlLabel: el.id,
      label: get(el, 'lokalname', '(keine Herkunft gewählt)'),
      url: ['Herkuenfte', el.id],
      hasChildren: true,
    }))
    .filter(n => allParentNodesExist(nodesPassed, n))
    // sort by label
    .sort(compareLabel)
    .map((el, index) => {
      el.sort = [3, index]
      return el
    })

  return nodes
}
