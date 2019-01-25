import get from 'lodash/get'

import compareLabel from '../compareLabel'
import allParentNodesExist from '../../allParentNodesExist'

export default ({ nodes, data }) => {
  const werte = get(data, 'hasura.lieferung_zwischenlager_werte', [])

  return werte
    .map(el => ({
      nodeType: 'table',
      menuType: 'lieferung_zwischenlager_werte',
      filterTable: 'lieferung_zwischenlager_werte',
      id: `lieferungZwischenlager${el.id}`,
      parentId: 'lieferungZwischenlagerFolder',
      label: get(el, 'wert', '(kein Wert)'),
      url: ['Werte-Listen', 'Lieferung-Zwischenlager', el.id],
      hasChildren: false,
    }))
    .filter(n => allParentNodesExist(nodes, n))
    .sort(compareLabel)
    .map((el, index) => {
      el.sort = [6, 5, index]
      return el
    })
}
