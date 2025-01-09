import { lieferungLabelFromLieferung } from '../../../../../../utils/lieferungLabelFromLieferung.js'

const artKulturAnlieferungNodes = ({
  lieferung,
  lieferungIndex,
  kulturId,
  kulturIndex,
  artId,
  artIndex,
}) => ({
  nodeType: 'table',
  menuTitle: 'Anlieferung',
  table: 'lieferung',
  id: `${artId}${kulturId}${lieferung.id}`,
  label: lieferungLabelFromLieferung({ lieferung }),
  url: ['Arten', artId, 'Kulturen', kulturId, 'An-Lieferungen', lieferung.id],
  sort: [1, artIndex, 3, kulturIndex, 3, lieferungIndex],
  hasChildren: false,
  mono: true,
})

export default artKulturAnlieferungNodes
