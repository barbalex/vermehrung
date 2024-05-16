import lieferungLabelFromLieferung from '../../../../../../../utils/lieferungLabelFromLieferung.js'

const personGartenKulturAuslieferungNodes = ({
  lieferung,
  lieferungIndex,
  kulturId,
  kulturIndex,
  gartenId,
  gartenIndex,
  personId,
  personIndex,
}) => ({
  nodeType: 'table',
  menuTitle: 'Aus-Lieferung',
  table: 'lieferung',
  id: `${personId}${gartenId}${kulturId}${lieferung.id}`,
  label: lieferungLabelFromLieferung({ lieferung }),
  url: [
    'Personen',
    personId,
    'Gaerten',
    gartenId,
    'Kulturen',
    kulturId,
    'Aus-Lieferungen',
    lieferung.id,
  ],
  sort: [11, personIndex, 2, gartenIndex, 1, kulturIndex, 4, lieferungIndex],
  hasChildren: false,
  mono: true,
})

export default personGartenKulturAuslieferungNodes
