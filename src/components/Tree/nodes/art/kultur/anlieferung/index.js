import { lieferungLabelFromLieferung } from '../../../../../../utils/lieferungLabelFromLieferung.js'

export const buildArtKulturAnlieferung = ({
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
