import get from 'lodash/get'

import compareLabel from '../../compareLabel'
import allParentNodesExist from '../../../allParentNodesExist'

export default ({ nodes, data }) => {
  const werte = get(data, 'lieferung_status_werte', [])

  return werte
    .map(el => ({
      nodeType: 'table',
      menuType: 'lieferung_status_werte',
      filterTable: 'lieferung_status_werte',
      id: `lieferungStatus${el.id}`,
      parentId: 'lieferungStatusFolder',
      label: get(el, 'wert', '(kein Wert)'),
      url: ['Werte-Listen', 'Lieferung-Status', el.id],
      hasChildren: false,
    }))
    .filter(n => allParentNodesExist(nodes, n))
    .sort(compareLabel)
    .map((el, index) => {
      el.sort = [6, 4, index]
      return el
    })
}
