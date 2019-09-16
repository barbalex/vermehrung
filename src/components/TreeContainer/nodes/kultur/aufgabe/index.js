import get from 'lodash/get'
import findIndex from 'lodash/findIndex'
import moment from 'moment'

export default ({ nodes, data, url }) => {
  const kulturId = url[1]
  const kulturen = get(data, 'kultur', [])
  const kultur = kulturen.find(k => k.id === kulturId)
  const events = get(kultur, 'events', [])

  const kulturNodes = nodes.filter(n => n.parentId === `kulturFolder`)
  const kulturIndex = findIndex(kulturNodes, n => n.id === `kultur${kulturId}`)

  return (
    events
      // only show if parent node exists
      .filter(() =>
        nodes.map(n => n.id).includes(`kultur${kulturId}EventFolder`),
      )
      .map(el => {
        const datum = el.datum
          ? moment(el.datum, 'YYYY-MM-DD').format('YYYY.MM.DD')
          : '(kein Datum)'
        const label = `${datum}: ${get(el, 'event') || '(nicht beschrieben)'}`

        return {
          nodeType: 'table',
          menuTitle: 'Event',
          table: 'event',
          id: `kultur${kulturId}Event${el.id}`,
          parentId: `kultur${kulturId}EventFolder`,
          label,
          url: ['Kulturen', kulturId, 'Events', el.id],
          hasChildren: false,
        }
      })
      .map((el, index) => {
        el.sort = [5, kulturIndex, 4, index]
        return el
      })
  )
}
