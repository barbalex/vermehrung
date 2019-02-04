import get from 'lodash/get'
import findIndex from 'lodash/findIndex'

import compareLabel from '../../../compareLabel'

export default ({ nodes, data, url }) => {
  const gartenId = url[1]
  const kulturId = url[3]
  const gaerten = get(data, 'garten', [])
  const garten = gaerten.find(a => a.id === gartenId)
  const kulturen = get(garten, 'kultursBygartenId', [])
  const kultur = kulturen.find(k => k.id === kulturId)
  const events = get(kultur, 'kulturEventsBykulturId', [])

  const gartenNodes = nodes.filter(n => n.parentId === 'gartenFolder')
  const gartenIndex = findIndex(gartenNodes, n => n.id === `garten${gartenId}`)
  const kulturNodes = nodes.filter(
    n => n.parentId === `garten${gartenId}KulturFolder`,
  )
  const kulturIndex = findIndex(
    kulturNodes,
    n => n.id === `garten${gartenId}Kultur${kulturId}`,
  )

  return (
    events
      // only show if parent node exists
      .filter(() =>
        nodes
          .map(n => n.id)
          .includes(`garten${gartenId}Kultur${kulturId}EventFolder`),
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
          id: `garten${gartenId}Kultur${kulturId}Event${el.id}`,
          parentId: `garten${gartenId}Kultur${kulturId}EventFolder`,
          label,
          url: ['Gaerten', gartenId, 'Kulturen', kulturId, 'Events', el.id],
          hasChildren: false,
        }
      })
      .sort(compareLabel)
      .map((el, index) => {
        el.sort = [2, gartenIndex, 1, kulturIndex, 4, index]
        return el
      })
  )
}
