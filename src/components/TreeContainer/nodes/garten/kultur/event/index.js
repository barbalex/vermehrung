import findIndex from 'lodash/findIndex'
import moment from 'moment'

export default ({ nodes, store, url }) => {
  const gartenId = url[1]
  const kulturId = url[3]
  const events = store.eventFiltered.filter((t) => t.kultur_id === kulturId)

  const gartenNodes = nodes.filter((n) => n.parentId === 'gartenFolder')
  const gartenIndex = findIndex(
    gartenNodes,
    (n) => n.id === `garten${gartenId}`,
  )
  const kulturNodes = nodes.filter(
    (n) => n.parentId === `garten${gartenId}KulturFolder`,
  )
  const kulturIndex = findIndex(
    kulturNodes,
    (n) => n.id === `garten${gartenId}Kultur${kulturId}`,
  )

  return (
    events
      // only show if parent node exists
      .filter(() =>
        nodes
          .map((n) => n.id)
          .includes(`garten${gartenId}Kultur${kulturId}EventFolder`),
      )
      .map((el) => {
        const datum = el.datum
          ? moment(el.datum, 'YYYY-MM-DD').format('YYYY.MM.DD')
          : null
        const geplant = el.geplant ? ' (geplant)' : ''
        const event = `${el?.beschreibung ?? '(nicht beschrieben)'}${geplant}`
        const label = `${datum || '(kein Datum)'}: ${event}`

        return {
          nodeType: 'table',
          menuTitle: 'Event',
          table: 'event',
          id: `garten${gartenId}Kultur${kulturId}Event${el.id}`,
          parentId: `garten${gartenId}Kultur${kulturId}EventFolder`,
          label,
          url: ['Gaerten', gartenId, 'Kulturen', kulturId, 'Events', el.id],
          hasChildren: false,
        }
      })
      .map((el, index) => {
        el.sort = [4, gartenIndex, 1, kulturIndex, 5, index]
        return el
      })
  )
}
