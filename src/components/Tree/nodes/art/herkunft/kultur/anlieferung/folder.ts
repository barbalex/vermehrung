export const buildArtHerkunftKulturAnlieferungFolder = ({
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
  menuTitle: 'An-Lieferungen',
  id: `${artId}/${herkunft.id}/${kulturId}/AnLieferungFolder`,
  label: `An-Lieferungen (${count})`,
  url: [
    'Arten',
    artId,
    'Herkuenfte',
    herkunft.id,
    'Kulturen',
    kulturId,
    'An-Lieferungen',
  ],
  sort: [1, artIndex, 1, herkunftIndex, 2, kulturIndex, 3],
  hasChildren: true,
  childrenCount: count,
})
