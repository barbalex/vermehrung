import { lieferungLabelFromLieferung } from '../../../../../utils/lieferungLabelFromLieferung.ts'

export const buildSammlungAuslieferung = ({
  lieferung,
  lieferungIndex,
  sammlungId,
  sammlungIndex,
}: {
  lieferung: import('../../../../../dbModel.ts').Lieferung
  lieferungIndex: number
  sammlungId: string
  sammlungIndex: number
}) => ({
  nodeType: 'table',
  menuTitle: 'Aus-Lieferung',
  table: 'lieferung',
  id: `${sammlungId}${lieferung.id}`,
  label: lieferungLabelFromLieferung({ lieferung: lieferung }),
  url: ['Sammlungen', sammlungId, 'Aus-Lieferungen', lieferung.id],
  sort: [3, sammlungIndex, 3, lieferungIndex],
  hasChildren: false,
  mono: true,
})
