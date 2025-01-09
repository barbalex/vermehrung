import { lieferungLabelFromLieferung } from '../../../../utils/lieferungLabelFromLieferung.js'

const lieferungNodes = ({ lieferung, index }) => ({
  nodeType: 'table',
  menuTitle: 'Lieferung',
  table: 'lieferung',
  id: lieferung.id,
  label: lieferungLabelFromLieferung({ lieferung }),
  url: ['Lieferungen', lieferung.id],
  sort: [8, index],
  hasChildren: false,
  mono: true,
})

export default lieferungNodes
