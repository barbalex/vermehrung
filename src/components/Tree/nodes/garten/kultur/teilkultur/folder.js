export const buildGartenKulturTeilkulturFolder = ({
  kulturId,
  kulturIndex,
  gartenId,
  gartenIndex,
  children,
}) => ({
  nodeType: 'folder',
  menuTitle: 'Teilkulturen',
  id: `${gartenId}${kulturId}TeilkulturFolder`,
  label: `Teilkulturen (${children.length})`,
  url: ['Gaerten', gartenId, 'Kulturen', kulturId, 'Teilkulturen'],
  sort: [4, gartenIndex, 1, kulturIndex, 1],
  hasChildren: true,
  childrenCount: children.length,
})
