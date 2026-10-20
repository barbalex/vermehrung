export const buildArtKulturBedarfFolder = ({
  kulturId,
  kulturIndex,
  artId,
  artIndex,
  count,
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
