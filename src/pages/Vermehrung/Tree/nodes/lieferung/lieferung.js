// @flow
import get from 'lodash/get'

import compareLabel from '../compareLabel'
import allParentNodesExist from '../../allParentNodesExist'

export default ({ nodes: nodesPassed, data }) => {
  const lieferungen = get(data, 'hasura.lieferung', [])

  const nodes = lieferungen
    .map(el => ({
      nodeType: 'table',
      menuType: 'lieferung',
      filterTable: 'lieferung',
      id: el.id,
      parentId: 4,
      urlLabel: el.id,
      label: `${get(el, 'von_datum', '(kein von-Datum)')}: ${get(
        el,
        'personBypersonId.name',
        '(keine Person)',
      )}`,
      url: ['Lieferungen', el.id],
      hasChildren: true,
    }))
    .filter(n => allParentNodesExist(nodesPassed, n))
    // sort by label
    .sort(compareLabel)
    .map((el, index) => {
      el.sort = [4, index]
      return el
    })

  return nodes
}
