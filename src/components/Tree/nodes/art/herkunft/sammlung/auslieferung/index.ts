import { lieferungLabelFromLieferung } from '../../../../../../../utils/lieferungLabelFromLieferung.ts'

export const buildArtHerkunftSammlungAuslieferung = ({
  lieferung,
  lieferungIndex,
  sammlung,
  sammlungIndex,
  herkunft,
  herkunftIndex,
  artId,
  artIndex,
}: {
  lieferung: import('../../../../../../../dbModel.ts').Lieferung
  lieferungIndex: number
  sammlung: import('../../../../../../../dbModel.ts').Sammlung
  sammlungIndex: number
  herkunft: import('../../../../../../../dbModel.ts').Herkunft
  herkunftIndex: number
  artId: string
  artIndex: number
}) => ({
  nodeType: 'table',
  menuTitle: 'Lieferung',
  table: 'lieferung',
  id: `${artId}${sammlung.id}${lieferung.id}`,
  label: lieferungLabelFromLieferung({ lieferung }),
  url: [
    'Arten',
    artId,
    'Herkuenfte',
    herkunft.id,
    'Sammlungen',
    sammlung.id,
    'Aus-Lieferungen',
    lieferung.id,
  ],
  sort: [1, artIndex, 1, herkunftIndex, 1, sammlungIndex, 1, lieferungIndex],
  hasChildren: false,
  mono: true,
})
