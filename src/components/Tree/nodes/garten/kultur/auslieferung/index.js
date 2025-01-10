import { lieferungLabelFromLieferung } from '../../../../../../utils/lieferungLabelFromLieferung.js'

export const buildGartenKulturAuslieferung = ({
  lieferung,
  lieferungIndex,
  kulturId,
  kulturIndex,
  gartenId,
  gartenIndex,
}) => ({
  nodeType: 'table',
  menuTitle: 'Aus-Lieferung',
  table: 'lieferung',
  id: `${gartenId}${kulturId}${lieferung.id}`,
  label: lieferungLabelFromLieferung({ lieferung }),
  url: [
    'Gaerten',
    gartenId,
    'Kulturen',
    kulturId,
    'Aus-Lieferungen',
    lieferung.id,
  ],
  sort: [4, gartenIndex, 1, kulturIndex, 4, lieferungIndex],
  hasChildren: false,
  mono: true,
})
