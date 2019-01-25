import get from 'lodash/get'

import compareLabel from '../compareLabel'
import allParentNodesExist from '../../allParentNodesExist'

export default ({ nodes, data }) => {
  const herkuenfte = get(data, 'hasura.herkunft', [])

  return (
    herkuenfte
      .map(el => ({
        nodeType: 'table',
        menuType: 'herkunft',
        filterTable: 'herkunft',
        id: `herkunft${el.id}`,
        parentId: 'herkunftFolder',
        label: get(el, 'lokalname', '(keine Herkunft gewählt)'),
        url: ['Herkuenfte', el.id],
        hasChildren: true,
      }))
      .filter(n => allParentNodesExist(nodes, n))
      // sort by label
      .sort(compareLabel)
      .map((el, index) => {
        el.sort = [3, index]
        return el
      })
  )
}
