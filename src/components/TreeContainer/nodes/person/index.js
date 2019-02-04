import get from 'lodash/get'

import compareLabel from '../compareLabel'

export default ({ nodes, data }) => {
  const personen = get(data, 'person', [])

  return (
    personen
      // only show if parent node exists
      .filter(() => nodes.map(n => n.id).includes('personFolder'))
      .map(el => ({
        nodeType: 'table',
        menuTitle: 'Person',
        filterTable: 'person',
        id: `person${el.id}`,
        parentId: 'personFolder',
        label: get(el, 'name', '(kein Name)'),
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
