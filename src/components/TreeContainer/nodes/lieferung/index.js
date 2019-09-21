import get from 'lodash/get'
import moment from 'moment'

export default ({ nodes, data }) => {
  const lieferungen = get(data, 'lieferung', [])

  return (
    lieferungen
      // only show if parent node exists
      .filter(() => nodes.map(n => n.id).includes('lieferungFolder'))
      .map(el => {
        const datum = el.datum
          ? moment(el.datum, 'YYYY-MM-DD').format('YYYY.MM.DD')
          : '(kein Datum)'

        return {
          nodeType: 'table',
          menuTitle: 'Lieferung',
          table: 'lieferung',
          id: `lieferung${el.id}`,
          parentId: 'lieferungFolder',
          label: `${datum}: ${get(el, 'person.name') || '(keine Person)'}`,
          url: ['Lieferungen', el.id],
          hasChildren: false,
        }
      })
      .map((el, index) => {
        el.sort = [10, index]
        return el
      })
  )
}
