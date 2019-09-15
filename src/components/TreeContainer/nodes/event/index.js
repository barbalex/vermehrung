import get from 'lodash/get'
import moment from 'moment'

export default ({ nodes, data }) => {
  const events = get(data, 'event', [])

  return (
    events
      // only show if parent node exists
      .filter(() => nodes.map(n => n.id).includes('eventFolder'))
      .map(el => {
        const datum = el.datum
          ? moment(el.datum, 'YYYY-MM-DD').format('YYYY.MM.DD')
          : '(kein Datum)'
        const label = `${datum}: ${get(el, 'event') || '(nicht beschrieben)'}`
        return {
          nodeType: 'table',
          menuTitle: 'Event',
          table: 'event',
          id: `event${el.id}`,
          parentId: 'eventFolder',
          label,
          url: ['Events', el.id],
          hasChildren: false,
        }
      })
      .map((el, index) => {
        el.sort = [9, index]
        return el
      })
  )
}
