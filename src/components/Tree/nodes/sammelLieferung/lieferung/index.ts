import { lieferungLabelFromLieferung } from '../../../../../utils/lieferungLabelFromLieferung.ts'

export const buildSammelLieferungLieferung = ({
  lieferung,
  lieferungIndex,
  sammelLieferungId,
  sammelLieferungIndex,
}: {
  lieferung: import('../../../../../dbModel.ts').Lieferung
  lieferungIndex: number
  sammelLieferungId: string
  sammelLieferungIndex: number
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
