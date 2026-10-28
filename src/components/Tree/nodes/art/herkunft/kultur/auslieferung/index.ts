import { lieferungLabelFromLieferung } from '../../../../../../../utils/lieferungLabelFromLieferung.ts'

export const buildArtHerkunftKulturAuslieferung = ({
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
  menuTitle: 'Auslieferung',
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
    'Aus-Lieferungen',
    lieferung.id,
  ],
  sort: [1, artIndex, 1, herkunftIndex, 2, kulturIndex, 4, lieferungIndex],
  hasChildren: false,
  mono: true,
})
