export const buildGartenKulturBedarfFolder = ({
  kulturId,
  kulturIndex,
  gartenId,
  gartenIndex,
  count,
}) => ({
  nodeType: 'folder',
  menuTitle: 'Bedarf',
  id: `${gartenId}${kulturId}BedarfFolder`,
  label: `Bedarf (${count})`,
  url: ['Gaerten', gartenId, 'Kulturen', kulturId, 'Bedarf'],
  sort: [4, gartenIndex, 1, kulturIndex, 5],
  hasChildren: true,
  childrenCount: count,
})
