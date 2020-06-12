import isEqual from 'lodash/isEqual'
import moment from 'moment'

export default ({ store }) => {
  const { visibleOpenNodes, showEvent } = store.tree
  if (!showEvent) return []

  return (
    store.eventsFiltered
      // only show if parent node exists
      .filter(() => visibleOpenNodes.some((node) => isEqual(['Events'], node)))
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
          id: el.id,
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
