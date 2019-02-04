import get from 'lodash/get'

import compareLabel from '../compareLabel'

export default ({ nodes, data }) => {
  const lieferungen = get(data, 'lieferung', [])

  return (
    lieferungen
      // only show if parent node exists
      .filter(() => nodes.map(n => n.id).includes('lieferungFolder'))
      .map(el => ({
        nodeType: 'table',
        menuTitle: 'Lieferung',
        filterTable: 'lieferung',
        id: `lieferung${el.id}`,
        parentId: 'lieferungFolder',
        label: `${get(el, 'von_datum', '(kein von-Datum)')}: ${get(
          el,
          'personBypersonId.name',
          '(keine Person)',
        )}`,
        url: ['Lieferungen', el.id],
        hasChildren: false,
      }))
      // sort by label
      .sort(compareLabel)
      .map((el, index) => {
        el.sort = [4, index]
        return el
      })
  )
}
