import { lieferungLabelFromLieferung } from '../../../../../utils/lieferungLabelFromLieferung.js'

export const buildKulturAnlieferung = ({
  lieferung,
  lieferungIndex,
  kulturId,
  kulturIndex,
}) => ({
  nodeType: 'table',
  menuTitle: 'An-Lieferung',
  table: 'lieferung',
  id: `${kulturId}${lieferung.id}`,
  label: lieferungLabelFromLieferung({ lieferung }),
  url: ['Kulturen', kulturId, 'An-Lieferungen', lieferung.id],
  sort: [5, kulturIndex, 3, lieferungIndex],
  hasChildren: false,
  mono: true,
})
