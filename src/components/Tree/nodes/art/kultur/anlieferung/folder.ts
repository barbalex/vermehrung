export const buildArtKulturAnlieferungFolder = ({
  kulturId,
  kulturIndex,
  artId,
  artIndex,
  children,
}) => ({
  nodeType: 'folder',
  menuTitle: 'An-Lieferungen',
  id: `${artId}${kulturId}AnLieferungFolder`,
  label: `An-Lieferungen (${children.length})`,
  url: ['Arten', artId, 'Kulturen', kulturId, 'An-Lieferungen'],
  sort: [1, artIndex, 3, kulturIndex, 3],
  hasChildren: true,
  childrenCount: children.length,
})
