import { eventLabelFromEvent } from '../../../../utils/eventLabelFromEvent.js'

export const buildEvent = ({ event, index }) => ({
  nodeType: 'table',
  menuTitle: 'Event',
  table: 'event',
  id: event.id,
  label: eventLabelFromEvent({ event }),
  url: ['Events', event.id],
  sort: [10, index],
  hasChildren: false,
})
