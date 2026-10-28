export const buildArtHerkunftKulturBedarfFolder = ({
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
  menuTitle: 'Bedarf',
  id: `${artId}/${herkunft.id}/${kulturId}/BedarfFolder`,
  label: `Bedarf (${count})`,
  url: [
    'Arten',
    artId,
    'Herkuenfte',
    herkunft.id,
    'Kulturen',
    kulturId,
    'Bedarf',
  ],
  sort: [1, artIndex, 1, herkunftIndex, 2, kulturIndex, 5],
  hasChildren: true,
  childrenCount: count,
})
