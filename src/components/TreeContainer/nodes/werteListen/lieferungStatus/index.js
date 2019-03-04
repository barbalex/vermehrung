import get from 'lodash/get'
import sortBy from 'lodash/sortBy'

export default ({ nodes, data }) => {
  const werte = sortBy(get(data, 'lieferung_status_werte', []), [
    'sort',
    'wert',
  ])

  return (
    werte
      // only show if parent node exists
      .filter(() => nodes.map(n => n.id).includes('lieferungStatusFolder'))
      .map(el => ({
        nodeType: 'table',
        menuTitle: 'Lieferung: Status',
        table: 'lieferung_status_werte',
        id: `lieferungStatus${el.id}`,
        parentId: 'lieferungStatusFolder',
        label: get(el, 'wert') || '(kein Wert)',
        url: ['Werte-Listen', 'Lieferung-Status', el.id],
        hasChildren: false,
      }))
      .map((el, index) => {
        el.sort = [8, 4, index]
        return el
      })
  )
}
