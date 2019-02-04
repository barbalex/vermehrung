import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

import compareLabel from '../../../../compareLabel'

export default ({ nodes, data, url }) => {
  const personId = url[1]
  const gartenId = url[3]
  const kulturId = url[5]
  const personen = get(data, 'person', [])
  const person = personen.find(p => p.id === personId)
  const gaerten = get(person, 'gartensBypersonId', [])
  const garten = gaerten.find(a => a.id === gartenId)
  const kulturen = get(garten, 'kultursBygartenId', [])
  const kultur = kulturen.find(k => k.id === kulturId)
  const events = get(kultur, 'kulturEventsBykulturId', [])

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
        const label = `${get(el, 'datum', '(kein Datum)')}: ${get(
          el,
          'event',
          '(kein Event)',
        )}`

        return {
          nodeType: 'table',
          menuTitle: 'Event',
          filterTable: 'event',
          id: `person${personId}Garten${gartenId}Kultur${kulturId}Event${
            el.id
          }`,
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
      .sort(compareLabel)
      .map((el, index) => {
        el.sort = [5, personIndex, 1, gartenIndex, 1, kulturIndex, 4, index]
        return el
      })
  )
}
