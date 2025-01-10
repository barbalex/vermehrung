import { lieferungLabelFromLieferung } from '../../../../../utils/lieferungLabelFromLieferung.js'

export const buildPersonLieferung = ({
  lieferung,
  index,
  personId,
  personIndex,
}) => ({
  nodeType: 'table',
  menuTitle: 'Lieferung',
  table: 'lieferung',
  id: `${personId}${lieferung.id}`,
  label: lieferungLabelFromLieferung({ lieferung }),
  url: ['Personen', personId, 'Lieferungen', lieferung.id],
  sort: [11, personIndex, 3, index],
  hasChildren: false,
  mono: true,
})
