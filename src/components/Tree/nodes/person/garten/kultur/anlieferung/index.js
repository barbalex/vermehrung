import lieferungLabelFromLieferung from '../../../../../../../utils/lieferungLabelFromLieferung.js'

const personGartenKulturAnlieferungNodes = ({
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
  menuTitle: 'An-Lieferung',
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
    'An-Lieferungen',
    lieferung.id,
  ],
  sort: [11, personIndex, 2, gartenIndex, 1, kulturIndex, 3, lieferungIndex],
  hasChildren: false,
  mono: true,
})

export default personGartenKulturAnlieferungNodes
