export const buildArtHerkunftKulturAuslieferungFolder = ({
  kulturId,
  kulturIndex,
  herkunft,
  herkunftIndex,
  artId,
  artIndex,
  count,
}: {
  kulturId: string
  kulturIndex: number
  herkunft: import('../../../../../../../dbModel.ts').Herkunft
  herkunftIndex: number
  artId: string
  artIndex: number
  count: number
}) => ({
  nodeType: 'folder',
  menuTitle: 'Aus-Lieferungen',
  id: `${artId}/${herkunft.id}/${kulturId}/AusLieferungFolder`,
  label: `Aus-Lieferungen (${count})`,
  url: [
    'Arten',
    artId,
    'Herkuenfte',
    herkunft.id,
    'Kulturen',
    kulturId,
    'Aus-Lieferungen',
  ],
  sort: [1, artIndex, 1, herkunftIndex, 2, kulturIndex, 4],
  hasChildren: true,
  childrenCount: count,
})
