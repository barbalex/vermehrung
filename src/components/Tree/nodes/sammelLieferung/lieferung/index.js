import { lieferungLabelFromLieferung } from '../../../../../utils/lieferungLabelFromLieferung.js'

const sammelLieferungLieferungNodes = ({
  lieferung,
  lieferungIndex,
  sammelLieferungId,
  sammelLieferungIndex,
}) => ({
  nodeType: 'table',
  menuTitle: 'Lieferung',
  table: 'lieferung',
  id: `${sammelLieferungId}${lieferung.id}`,
  label: lieferungLabelFromLieferung({ lieferung }),
  url: ['Sammel-Lieferungen', sammelLieferungId, 'Lieferungen', lieferung.id],
  sort: [9, sammelLieferungIndex, 3, lieferungIndex],
  hasChildren: false,
  mono: true,
})

export default sammelLieferungLieferungNodes
