import { lieferungLabelFromLieferung } from '../../../../../../utils/lieferungLabelFromLieferung.ts'

export const buildArtKulturAnlieferung = ({
  lieferung,
  lieferungIndex,
  kulturId,
  kulturIndex,
  artId,
  artIndex,
}: {
  lieferung: import('../../../../../../dbModel.ts').Lieferung
  lieferungIndex: number
  kulturId: string
  kulturIndex: number
  artId: string
  artIndex: number
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
