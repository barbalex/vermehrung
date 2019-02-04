import get from 'lodash/get'
import sortBy from 'lodash/sortBy'

export default ({ nodes, data }) => {
  const werte = sortBy(get(data, 'masseinheit_werte', []), ['sort', 'wert'])

  return (
    werte
      // only show if parent node exists
      .filter(() => nodes.map(n => n.id).includes('masseinheitenFolder'))
      .map(el => ({
        nodeType: 'table',
        menuType: 'masseinheit_werte',
        filterTable: 'masseinheit_werte',
        id: `masseinheit${el.id}`,
        parentId: 'masseinheitenFolder',
        label: get(el, 'wert', '(kein Wert)'),
        url: ['Werte-Listen', 'Masseinheiten', el.id],
        hasChildren: false,
      }))
      .map((el, index) => {
        el.sort = [8, 1, index]
        return el
      })
  )
}
