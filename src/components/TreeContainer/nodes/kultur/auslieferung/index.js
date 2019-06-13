import get from 'lodash/get'
import findIndex from 'lodash/findIndex'
import moment from 'moment'

export default ({ nodes, data, url }) => {
  const kulturId = url[1]
  const kulturen = get(data, 'kultur', [])
  const kultur = kulturen.find(k => k.id === kulturId)
  const auslieferungen = get(kultur, 'lieferungsByVonKulturId', [])

  const kulturNodes = nodes.filter(n => n.parentId === `kulturFolder`)
  const kulturIndex = findIndex(kulturNodes, n => n.id === `kultur${kulturId}`)

  return (
    auslieferungen
      // only show if parent node exists
      .filter(() =>
        nodes.map(n => n.id).includes(`kultur${kulturId}AusLieferungFolder`),
      )
      .map(el => {
        const von_datum = el.von_datum
          ? moment(el.von_datum, 'YYYY-MM-DD').format('YYYY.MM.DD')
          : '(kein von-Datum)'

        const label = `${von_datum}: ${get(el, 'person.name') || '(kein Name)'}`

        return {
          nodeType: 'table',
          menuTitle: 'Aus-Lieferung',
          table: 'lieferung',
          id: `kultur${kulturId}Lieferung${el.id}`,
          parentId: `kultur${kulturId}AusLieferungFolder`,
          label,
          url: ['Kulturen', kulturId, 'Aus-Lieferungen', el.id],
          hasChildren: false,
        }
      })
      .map((el, index) => {
        el.sort = [7, kulturIndex, 3, index]
        return el
      })
  )
}
