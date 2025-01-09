import { eventLabelFromEvent } from '../../../../../../../utils/eventLabelFromEvent.js'

const artHerkunftKulturEventNodes = ({
  event,
  eventIndex,
  kulturId,
  kulturIndex,
  herkunft,
  herkunftIndex,
  artId,
  artIndex,
}) => ({
  nodeType: 'table',
  menuTitle: 'Event',
  table: 'event',
  id: `${artId}/${herkunft.id}/${kulturId}/${event.id}`,
  label: eventLabelFromEvent({ event: event }),
  url: [
    'Arten',
    artId,
    'Herkuenfte',
    herkunft.id,
    'Kulturen',
    kulturId,
    'Events',
    event.id,
  ],
  sort: [1, artIndex, 1, herkunftIndex, 2, kulturIndex, 5, eventIndex],
  hasChildren: false,
})

export default artHerkunftKulturEventNodes
