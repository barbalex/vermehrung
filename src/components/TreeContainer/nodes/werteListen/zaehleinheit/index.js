import get from 'lodash/get'
import sortBy from 'lodash/sortBy'

export default ({ nodes, data }) => {
  const werte = sortBy(get(data, 'zaehleinheit_werte', []), ['sort', 'wert'])

  return (
    werte
      // only show if parent node exists
      .filter(() => nodes.map(n => n.id).includes('zaehleinheitenFolder'))
      .map(el => ({
        nodeType: 'table',
        menuTitle: 'Zähleinheit',
        table: 'zaehleinheit_werte',
        id: `zaehleinheit${el.id}`,
        parentId: 'zaehleinheitenFolder',
        label: get(el, 'wert', '(kein Wert)'),
        url: ['Werte-Listen', 'Zaehleinheiten', el.id],
        hasChildren: false,
      }))
      .map((el, index) => {
        el.sort = [8, 2, index]
        return el
      })
  )
}
