export const buildArtKulturTeilkulturFolder = ({
  kulturId,
  kulturIndex,
  artId,
  artIndex,
  children,
}: {
  kulturId: string
  kulturIndex: number
  artId: string
  artIndex: number
  children: unknown[]
}) => ({
  nodeType: 'folder',
  menuTitle: 'Teilkulturen',
  id: `${artId}${kulturId}TeilkulturFolder`,
  label: `Teilkulturen (${children.length})`,
  url: ['Arten', artId, 'Kulturen', kulturId, 'Teilkulturen'],
  sort: [1, artIndex, 3, kulturIndex, 1],
  hasChildren: true,
  childrenCount: children.length,
})
