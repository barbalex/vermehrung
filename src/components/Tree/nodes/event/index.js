import eventLabelFromEvent from '../../../../utils/eventLabelFromEvent.js'

const eventNodes = ({ event, index }) => ({
  nodeType: 'table',
  menuTitle: 'Event',
  table: 'event',
  id: event.id,
  label: eventLabelFromEvent({ event }),
  url: ['Events', event.id],
  sort: [10, index],
  hasChildren: false,
})
export default eventNodes
