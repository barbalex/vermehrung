import eventLabelFromEvent from '../../../../../../utils/eventLabelFromEvent.js'

const gartenKulturEventNodes = ({
  event,
  eventIndex,
  kulturId,
  kulturIndex,
  gartenId,
  gartenIndex,
}) => ({
  nodeType: 'table',
  menuTitle: 'Event',
  table: 'event',
  id: `${gartenId}${kulturId}${event.id}`,
  label: eventLabelFromEvent({ event }),
  url: ['Gaerten', gartenId, 'Kulturen', kulturId, 'Events', event.id],
  sort: [4, gartenIndex, 1, kulturIndex, 5, eventIndex],
  hasChildren: false,
})

export default gartenKulturEventNodes
