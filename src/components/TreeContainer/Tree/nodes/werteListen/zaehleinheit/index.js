import get from 'lodash/get'

import compareLabel from '../../compareLabel'
import allParentNodesExist from '../../../allParentNodesExist'

export default ({ nodes, data }) => {
  const werte = get(data, 'zaehleinheit_werte', [])

  return werte
    .map(el => ({
      nodeType: 'table',
      menuType: 'zaehleinheit_werte',
      filterTable: 'zaehleinheit_werte',
      id: `zaehleinheit${el.id}`,
      parentId: 'zaehleinheitenFolder',
      label: get(el, 'wert', '(kein Wert)'),
      url: ['Werte-Listen', 'Zaehleinheiten', el.id],
      hasChildren: false,
    }))
    .filter(n => allParentNodesExist(nodes, n))
    .sort(compareLabel)
    .map((el, index) => {
      el.sort = [8, 2, index]
      return el
    })
}
