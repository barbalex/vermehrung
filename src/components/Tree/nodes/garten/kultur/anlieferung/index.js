import lieferungLabelFromLieferung from '../../../../../../utils/lieferungLabelFromLieferung.js'

const gartenKulturAnlieferungNodes = ({
  lieferung,
  lieferungIndex,
  kulturId,
  kulturIndex,
  gartenId,
  gartenIndex,
}) => ({
  nodeType: 'table',
  menuTitle: 'An-Lieferung',
  table: 'lieferung',
  id: `${gartenId}${kulturId}${lieferung.id}`,
  label: lieferungLabelFromLieferung({ lieferung }),
  url: [
    'Gaerten',
    gartenId,
    'Kulturen',
    kulturId,
    'An-Lieferungen',
    lieferung.id,
  ],
  sort: [4, gartenIndex, 1, kulturIndex, 3, lieferungIndex],
  hasChildren: false,
  mono: true,
})

export default gartenKulturAnlieferungNodes
