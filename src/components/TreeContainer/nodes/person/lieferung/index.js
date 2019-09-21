import get from 'lodash/get'
import findIndex from 'lodash/findIndex'
import moment from 'moment'

export default ({ nodes, data, url }) => {
  const personId = url[1]
  const personen = get(data, 'person', [])
  const person = personen.find(p => p.id === personId)
  const lieferungen = get(person, 'lieferungs', [])

  const personNodes = nodes.filter(n => n.parentId === 'personFolder')
  const personIndex = findIndex(personNodes, n => n.id === `person${personId}`)

  return (
    lieferungen
      // only show if parent node exists
      .filter(() =>
        nodes.map(n => n.id).includes(`person${personId}LieferungFolder`),
      )
      .map(el => {
        const nach_datum = el.nach_datum
          ? moment(el.nach_datum, 'YYYY-MM-DD').format('YYYY.MM.DD')
          : '(kein von-Datum)'
        const label = `${nach_datum}: ${get(el, 'person.name') ||
          '(kein Name)'}`

        return {
          nodeType: 'table',
          menuTitle: 'Lieferung',
          table: 'lieferung',
          id: `person${personId}Lieferung${el.id}`,
          parentId: `person${personId}LieferungFolder`,
          label,
          url: ['Personen', personId, 'Lieferungen', el.id],
          hasChildren: false,
        }
      })
      .map((el, index) => {
        el.sort = [11, personIndex, 3, index]
        return el
      })
  )
}
