export const buildGartenKulturEventFolder = ({
  kulturId,
  kulturIndex,
  gartenId,
  gartenIndex,
  count,
}) => ({
  nodeType: 'folder',
  menuTitle: 'Events',
  id: `${gartenId}${kulturId}EventFolder`,
  label: `Events (${count})`,
  url: ['Gaerten', gartenId, 'Kulturen', kulturId, 'Events'],
  sort: [4, gartenIndex, 1, kulturIndex, 5],
  hasChildren: true,
  childrenCount: count,
})
