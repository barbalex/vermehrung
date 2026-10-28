import { lieferungLabelFromLieferung } from '../../../../../../utils/lieferungLabelFromLieferung.ts'

export const buildHerkunftSammlungAuslieferung = ({
  lieferung,
  lieferungIndex,
  sammlungId,
  sammlungIndex,
  herkunftId,
  herkunftIndex,
}: {
  lieferung: import('../../../../../../dbModel.ts').Lieferung
  lieferungIndex: number
  sammlungId: string
  sammlungIndex: number
  herkunftId: string
  herkunftIndex: number
}) => ({
  nodeType: 'table',
  menuTitle: 'Aus-Lieferung',
  table: 'lieferung',
  id: `${herkunftId}${sammlungId}${lieferung.id}`,
  label: lieferungLabelFromLieferung({ lieferung }),
  url: [
    'Herkuenfte',
    herkunftId,
    'Sammlungen',
    sammlungId,
    'Aus-Lieferungen',
    lieferung.id,
  ],
  sort: [2, herkunftIndex, 2, sammlungIndex, 1, lieferungIndex],
  hasChildren: false,
})
