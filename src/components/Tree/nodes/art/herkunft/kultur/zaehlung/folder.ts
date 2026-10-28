export const buildArtHerkunftKulturZaehlungFolder = ({
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
  menuTitle: 'Zählungen',
  id: `${artId}/${herkunft.id}/${kulturId}/ZaehlungFolder`,
  label: `Zählungen (${count})`,
  url: [
    'Arten',
    artId,
    'Herkuenfte',
    herkunft.id,
    'Kulturen',
    kulturId,
    'Zaehlungen',
  ],
  sort: [1, artIndex, 1, herkunftIndex, 2, kulturIndex, 2],
  hasChildren: true,
  childrenCount: count,
})
