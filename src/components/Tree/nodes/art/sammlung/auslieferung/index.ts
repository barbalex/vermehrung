import { lieferungLabelFromLieferung } from '../../../../../../utils/lieferungLabelFromLieferung.ts'

export const buildArtSammlungAuslieferung = ({
  lieferung,
  lieferungIndex,
  sammlungId,
  sammlungIndex,
  artId,
  artIndex,
}: {
  lieferung: import('../../../../../../dbModel.ts').Lieferung
  lieferungIndex: number
  sammlungId: string
  sammlungIndex: number
  artId: string
  artIndex: number
}) => ({
  nodeType: 'table',
  menuTitle: 'Lieferung',
  table: 'lieferung',
  id: `${artId}${sammlungId}${lieferung.id}`,
  label: lieferungLabelFromLieferung({ lieferung }),
  url: [
    'Arten',
    artId,
    'Sammlungen',
    sammlungId,
    'Aus-Lieferungen',
    lieferung.id,
  ],
  sort: [1, artIndex, 2, sammlungIndex, 1, lieferungIndex],
  hasChildren: false,
  mono: true,
})
