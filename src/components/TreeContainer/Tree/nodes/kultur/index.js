import get from 'lodash/get'

import compareLabel from '../compareLabel'
import allParentNodesExist from '../../allParentNodesExist'

export default ({ nodes, data }) => {
  const kulturen = get(data, 'kultur', [])

  return kulturen
    .map(el => ({
      nodeType: 'table',
      menuType: 'kultur',
      filterTable: 'kultur',
      id: `kultur${el.id}`,
      parentId: 'kulturFolder',
      label: get(el, 'gartenBygartenId.personBypersonId.name', '(kein Name)'),
      url: ['Kulturen', el.id],
      hasChildren: true,
    }))
    .filter(n => allParentNodesExist(nodes, n))
    .sort(compareLabel)
    .map((el, index) => {
      el.sort = [7, index]
      return el
    })
}
