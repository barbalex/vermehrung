export const buildArtKulturBedarfFolder = ({
  kulturId,
  kulturIndex,
  artId,
  artIndex,
  count,
}: {
  kulturId: string
  kulturIndex: number
  artId: string
  artIndex: number
  count: number
}) => ({
  nodeType: 'folder',
  menuTitle: 'Bedarf',
  id: `${artId}${kulturId}BedarfFolder`,
  label: `Bedarf (${count})`,
  url: ['Arten', artId, 'Kulturen', kulturId, 'Bedarf'],
  sort: [1, artIndex, 3, kulturIndex, 5],
  hasChildren: true,
  childrenCount: count,
})
