import get from 'lodash/get'
import sortBy from 'lodash/sortBy'

export default ({ nodes, data }) => {
  const werte = sortBy(get(data, 'lieferung_typ_werte', []), ['sort', 'wert'])

  return (
    werte
      // only show if parent node exists
      .filter(() => nodes.map(n => n.id).includes('lieferungTypFolder'))
      .map(el => ({
        nodeType: 'table',
        menuTitle: 'lieferung_typ_werte',
        filterTable: 'lieferung_typ_werte',
        id: `lieferungTyp${el.id}`,
        parentId: 'lieferungTypFolder',
        label: get(el, 'wert', '(kein Wert)'),
        url: ['Werte-Listen', 'Lieferung-Typ', el.id],
        hasChildren: false,
      }))
      .map((el, index) => {
        el.sort = [8, 3, index]
        return el
      })
  )
}
