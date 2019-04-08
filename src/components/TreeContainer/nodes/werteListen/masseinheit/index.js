import get from 'lodash/get'
import memoizeOne from 'memoize-one'

export default ({ nodes, data }) =>
  memoizeOne(() =>
    get(data, 'masseinheit_werte', [])
      // only show if parent node exists
      .filter(() => nodes.map(n => n.id).includes('masseinheitenFolder'))
      .map(el => ({
        nodeType: 'table',
        menuTitle: 'Masseinheit',
        table: 'masseinheit_werte',
        id: `masseinheit${el.id}`,
        parentId: 'masseinheitenFolder',
        label: get(el, 'wert') || '(kein Wert)',
        url: ['Werte-Listen', 'Masseinheiten', el.id],
        hasChildren: false,
      }))
      .map((el, index) => {
        el.sort = [8, 1, index]
        return el
      }),
  )()
