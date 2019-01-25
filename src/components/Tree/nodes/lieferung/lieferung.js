import get from 'lodash/get'

import compareLabel from '../compareLabel'
import allParentNodesExist from '../../allParentNodesExist'

export default ({ nodes, data }) => {
  const lieferungen = get(data, 'hasura.lieferung', [])

  return (
    lieferungen
      .map(el => ({
        nodeType: 'table',
        menuType: 'lieferung',
        filterTable: 'lieferung',
        id: `lieferung${el.id}`,
        parentId: 'lieferungFolder',
        label: `${get(el, 'von_datum', '(kein von-Datum)')}: ${get(
          el,
          'personBypersonId.name',
          '(keine Person)',
        )}`,
        url: ['Lieferungen', el.id],
        hasChildren: true,
      }))
      .filter(n => allParentNodesExist(nodes, n))
      // sort by label
      .sort(compareLabel)
      .map((el, index) => {
        el.sort = [4, index]
        return el
      })
  )
}
