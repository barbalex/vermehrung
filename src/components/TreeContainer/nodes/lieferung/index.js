import get from 'lodash/get'
import moment from 'moment'

export default ({ nodes, data }) => {
  const lieferungen = get(data, 'lieferung', [])

  return (
    lieferungen
      // only show if parent node exists
      .filter(() => nodes.map(n => n.id).includes('lieferungFolder'))
      .map(el => {
        const von_datum = el.von_datum
          ? moment(el.von_datum, 'YYYY-MM-DD').format('YYYY.MM.DD')
          : '(kein von-Datum)'

        return {
          nodeType: 'table',
          menuTitle: 'Lieferung',
          table: 'lieferung',
          id: `lieferung${el.id}`,
          parentId: 'lieferungFolder',
          label: `${von_datum}: ${get(el, 'person.name') || '(keine Person)'}`,
          url: ['Lieferungen', el.id],
          hasChildren: false,
        }
      })
      .map((el, index) => {
        el.sort = [8, index]
        return el
      })
  )
}
