import get from 'lodash/get'
import findIndex from 'lodash/findIndex'
import moment from 'moment'

export default ({ nodes, data, url }) => {
  const personId = url[1]
  const gartenId = url[3]
  const kulturId = url[5]

  const personen = get(data, 'person', [])
  const person = personen.find(p => p.id === personId)
  const gaerten = get(person, 'gartens', [])
  const garten = gaerten.find(a => a.id === gartenId)
  const kulturen = get(garten, 'kulturs', [])
  const kultur = kulturen.find(k => k.id === kulturId)
  const anlieferungen = get(kultur, 'lieferungsByNachKulturId', [])

  const personNodes = nodes.filter(n => n.parentId === 'personFolder')
  const personIndex = findIndex(personNodes, n => n.id === `person${personId}`)
  const gartenNodes = nodes.filter(
    n => n.parentId === `person${personId}GartenFolder`,
  )
  const gartenIndex = findIndex(
    gartenNodes,
    n => n.id === `person${personId}Garten${gartenId}`,
  )
  const kulturNodes = nodes.filter(
    n => n.parentId === `person${personId}Garten${gartenId}KulturFolder`,
  )
  const kulturIndex = findIndex(
    kulturNodes,
    n => n.id === `person${personId}Garten${gartenId}Kultur${kulturId}`,
  )

  return (
    anlieferungen
      // only show if parent node exists
      .filter(() =>
        nodes
          .map(n => n.id)
          .includes(
            `person${personId}Garten${gartenId}Kultur${kulturId}AnLieferungFolder`,
          ),
      )
      .map(el => {
        const nach_datum = el.von_datum
          ? moment(el.nach_datum, 'YYYY-MM-DD').format('YYYY.MM.DD')
          : '(kein nach-Datum)'
        const label = `${nach_datum}: ${get(el, 'person.name') ||
          '(kein Name)'}`

        return {
          nodeType: 'table',
          menuTitle: 'An-Lieferung',
          table: 'lieferung',
          id: `person${personId}Garten${gartenId}Kultur${kulturId}Anlieferung${el.id}`,
          parentId: `person${personId}Garten${gartenId}Kultur${kulturId}AnLieferungFolder`,
          label,
          url: [
            'Personen',
            personId,
            'Gaerten',
            gartenId,
            'Kulturen',
            kulturId,
            'An-Lieferungen',
            el.id,
          ],
          hasChildren: false,
        }
      })
      .map((el, index) => {
        el.sort = [9, personIndex, 1, gartenIndex, 1, kulturIndex, 2, index]
        return el
      })
  )
}
