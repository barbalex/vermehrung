import { eventLabelFromEvent } from '../../../../../../utils/eventLabelFromEvent.js'

export const buildArtKulturEvent = ({
  event,
  eventIndex,
  kulturId,
  kulturIndex,
  artId,
  artIndex,
}) => ({
  nodeType: 'table',
  menuTitle: 'Event',
  table: 'event',
  id: `${artId}${kulturId}${event.id}`,
  label: eventLabelFromEvent({ event: event }),
  url: ['Arten', artId, 'Kulturen', kulturId, 'Events', event.id],
  sort: [1, artIndex, 3, kulturIndex, 5, eventIndex],
  hasChildren: false,
})
