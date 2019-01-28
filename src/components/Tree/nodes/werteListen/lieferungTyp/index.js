import get from 'lodash/get'

import compareLabel from '../../compareLabel'
import allParentNodesExist from '../../../allParentNodesExist'

export default ({ nodes, data }) => {
  const werte = get(data, 'lieferung_typ_werte', [])

  return werte
    .map(el => ({
      nodeType: 'table',
      menuType: 'lieferung_typ_werte',
      filterTable: 'lieferung_typ_werte',
      id: `lieferungTyp${el.id}`,
      parentId: 'lieferungTypFolder',
      label: get(el, 'wert', '(kein Wert)'),
      url: ['Werte-Listen', 'Lieferung-Typ', el.id],
      hasChildren: false,
    }))
    .filter(n => allParentNodesExist(nodes, n))
    .sort(compareLabel)
    .map((el, index) => {
      el.sort = [8, 3, index]
      return el
    })
}
