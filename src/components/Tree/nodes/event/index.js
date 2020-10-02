import isEqual from 'lodash/isEqual'

import eventLabelFromEvent from '../../../../utils/eventLabelFromEvent'

export default ({ store }) => {
  const { visibleOpenNodes, showEvent } = store.tree
  if (!showEvent) return []

  return (
    store.eventsFiltered
      // only show if parent node exists
      .filter(() => visibleOpenNodes.some((node) => isEqual(['Events'], node)))
      .map((el) => ({
        nodeType: 'table',
        menuTitle: 'Event',
        table: 'event',
        id: el.id,
        label: eventLabelFromEvent({ event: el }),
        url: ['Events', el.id],
        hasChildren: false,
      }))
      .map((el, index) => {
        el.sort = [10, index]
        return el
      })
  )
}
