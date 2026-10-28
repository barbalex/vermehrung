import { lieferungLabelFromLieferung } from '../../../../../utils/lieferungLabelFromLieferung.ts'

export const buildKulturAnlieferung = ({
  lieferung,
  lieferungIndex,
  kulturId,
  kulturIndex,
}: {
  lieferung: import('../../../../../dbModel.ts').Lieferung
  lieferungIndex: number
  kulturId: string
  kulturIndex: number
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
