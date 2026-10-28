import { lieferungLabelFromLieferung } from '../../../../../../../utils/lieferungLabelFromLieferung.ts'

export const buildArtHerkunftKulturAnlieferung = ({
  lieferung,
  lieferungIndex,
  kulturId,
  kulturIndex,
  herkunft,
  herkunftIndex,
  artId,
  artIndex,
}: {
  lieferung: import('../../../../../../../dbModel.ts').Lieferung
  lieferungIndex: number
  kulturId: string
  kulturIndex: number
  herkunft: import('../../../../../../../dbModel.ts').Herkunft
  herkunftIndex: number
  artId: string
  artIndex: number
}) => ({
  nodeType: 'table',
  menuTitle: 'Anlieferung',
  table: 'lieferung',
  id: `${artId}/${herkunft.id}/${kulturId}/${lieferung.id}`,
  label: lieferungLabelFromLieferung({ lieferung }),
  url: [
    'Arten',
    artId,
    'Herkuenfte',
    herkunft.id,
    'Kulturen',
    kulturId,
    'An-Lieferungen',
    lieferung.id,
  ],
  sort: [1, artIndex, 1, herkunftIndex, 2, kulturIndex, 3, lieferungIndex],
  hasChildren: false,
  mono: true,
})
