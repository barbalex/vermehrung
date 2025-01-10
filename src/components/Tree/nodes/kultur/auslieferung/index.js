import { lieferungLabelFromLieferung } from '../../../../../utils/lieferungLabelFromLieferung.js'

export const buildKulturAuslieferung = ({
  lieferung,
  lieferungIndex,
  kulturId,
  kulturIndex,
}) => ({
  nodeType: 'table',
  menuTitle: 'Aus-Lieferung',
  table: 'lieferung',
  id: `${kulturId}${lieferung.id}`,
  label: lieferungLabelFromLieferung({ lieferung }),
  url: ['Kulturen', kulturId, 'Aus-Lieferungen', lieferung.id],
  sort: [5, kulturIndex, 4, lieferungIndex],
  hasChildren: false,
  mono: true,
})
