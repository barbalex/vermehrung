import get from 'lodash/get'
import findIndex from 'lodash/findIndex'
import moment from 'moment'

export default ({ nodes, data, url }) => {
  const personId = url[1]
  const gartenId = url[3]
  const kulturId = url[5]
  const personen = get(data, 'person') || []
  const person = personen.find(p => p.id === personId)
  const gaerten = get(person, 'gartens') || []
  const garten = gaerten.find(a => a.id === gartenId)
  const kulturen = get(garten, 'kulturs') || []
  const kultur = kulturen.find(k => k.id === kulturId)
  const events = get(kultur, 'events') || []

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
    events
      // only show if parent node exists
      .filter(() =>
        nodes
          .map(n => n.id)
          .includes(
            `person${personId}Garten${gartenId}Kultur${kulturId}EventFolder`,
          ),
      )
      .map(el => {
        const datum = el.datum
          ? moment(el.datum, 'YYYY-MM-DD').format('YYYY.MM.DD')
          : 'kein Datum'
        const geplant = el.geplant ? ' (geplant)' : ''
        const label = `${datum}: ${get(el, 'beschreibung') ||
          '(nicht beschrieben)'}${geplant}`

        return {
          nodeType: 'table',
          menuTitle: 'Event',
          table: 'event',
          id: `person${personId}Garten${gartenId}Kultur${kulturId}Event${el.id}`,
          parentId: `person${personId}Garten${gartenId}Kultur${kulturId}EventFolder`,
          label,
          url: [
            'Personen',
            personId,
            'Gaerten',
            gartenId,
            'Kulturen',
            kulturId,
            'Events',
            el.id,
          ],
          hasChildren: false,
        }
      })
      .map((el, index) => {
        el.sort = [11, personIndex, 2, gartenIndex, 1, kulturIndex, 5, index]
        return el
      })
  )
}
