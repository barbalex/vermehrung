import get from 'lodash/get'

import compareLabel from '../compareLabel'
import filterNodes from '../../../../utils/filterNodes'

export default ({ nodes, data, store }) => {
  const personen = filterNodes({
    rows: get(data, 'person', []),
    filter: store.filter,
    table: 'person',
  })

  return (
    personen
      // only show if parent node exists
      .filter(() => nodes.map(n => n.id).includes('personFolder'))
      .map(el => ({
        nodeType: 'table',
        menuTitle: 'Person',
        table: 'person',
        id: `person${el.id}`,
        parentId: 'personFolder',
        label: get(el, 'name') || '(kein Name)',
        url: ['Personen', el.id],
        hasChildren: true,
      }))
      .sort(compareLabel)
      .map((el, index) => {
        el.sort = [5, index]
        return el
      })
  )
}
