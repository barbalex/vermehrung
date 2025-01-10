export const buildGartenKulturZaehlungFolder = ({
  kulturId,
  kulturIndex,
  gartenId,
  gartenIndex,
  children,
}) => ({
  nodeType: 'folder',
  menuTitle: 'Zählungen',
  id: `${gartenId}${kulturId}ZaehlungFolder`,
  label: `Zählungen (${children.length})`,
  url: ['Gaerten', gartenId, 'Kulturen', kulturId, 'Zaehlungen'],
  sort: [4, gartenIndex, 1, kulturIndex, 2],
  hasChildren: true,
  childrenCount: children.length,
})
