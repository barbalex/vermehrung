import { lieferungLabelFromLieferung } from '../../../../../../utils/lieferungLabelFromLieferung.ts'

export const buildArtKulturAuslieferung = ({
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
  menuTitle: 'Auslieferung',
  table: 'lieferung',
  id: `${artId}${kulturId}${lieferung.id}`,
  label: lieferungLabelFromLieferung({ lieferung }),
  url: ['Arten', artId, 'Kulturen', kulturId, 'Aus-Lieferungen', lieferung.id],
  sort: [1, artIndex, 3, kulturIndex, 4, lieferungIndex],
  hasChildren: false,
  mono: true,
})
