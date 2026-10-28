export const buildArtHerkunftKulturTeilkulturFolder = ({
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
  menuTitle: 'Teilkulturen',
  id: `${artId}/${herkunft.id}/${kulturId}/TeilkulturFolder`,
  label: `Teilkulturen (${count})`,
  url: [
    'Arten',
    artId,
    'Herkuenfte',
    herkunft.id,
    'Kulturen',
    kulturId,
    'Teilkulturen',
  ],
  sort: [1, artIndex, 1, herkunftIndex, 2, kulturIndex, 1],
  hasChildren: true,
  childrenCount: count,
})
