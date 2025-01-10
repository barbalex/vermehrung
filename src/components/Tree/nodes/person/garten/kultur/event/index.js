import { eventLabelFromEvent } from '../../../../../../../utils/eventLabelFromEvent.js'

export const buildPersonGartenKulturEvent = ({
  event,
  eventIndex,
  kulturId,
  kulturIndex,
  gartenId,
  gartenIndex,
  personId,
  personIndex,
}) => ({
  nodeType: 'table',
  menuTitle: 'Event',
  table: 'event',
  id: `${personId}${gartenId}${kulturId}${event.id}`,
  label: eventLabelFromEvent({ event }),
  url: [
    'Personen',
    personId,
    'Gaerten',
    gartenId,
    'Kulturen',
    kulturId,
    'Events',
    event.id,
  ],
  sort: [11, personIndex, 2, gartenIndex, 1, kulturIndex, 5, eventIndex],
  hasChildren: false,
})
