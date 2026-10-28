import { lieferungLabelFromLieferung } from '../../../../utils/lieferungLabelFromLieferung.ts'

export const buildLieferung = ({
  lieferung,
  index,
}: {
  lieferung: import('../../../../dbModel.ts').Lieferung
  index: number
}) => ({
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
