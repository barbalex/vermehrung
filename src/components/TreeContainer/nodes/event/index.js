import moment from 'moment'

export default ({ nodes, store }) => {
  const events = store.eventsFiltered

  return (
    events
      // only show if parent node exists
      .filter(() => nodes.map((n) => n.id).includes('eventFolder'))
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
          id: `event${el.id}`,
          parentId: 'eventFolder',
          label,
          url: ['Events', el.id],
          hasChildren: false,
        }
      })
      .map((el, index) => {
        el.sort = [10, index]
        return el
      })
  )
}
