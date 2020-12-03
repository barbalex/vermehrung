import isEqual from 'lodash/isEqual'

import eventLabelFromEvent from '../../../../utils/eventLabelFromEvent'

const eventNodes = ({ store, events }) => {
  const { visibleOpenNodes, showEvent } = store.tree
  if (!showEvent) return []
  // only show if parent node exists
  if (!visibleOpenNodes.some((node) => isEqual(['Events'], node))) {
    return []
  }

  return events
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
}

export default eventNodes
