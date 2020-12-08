const gartenKulturEventFolder = ({
  kulturId,
  kulturIndex,
  gartenId,
  gartenIndex,
  children,
}) => ({
  nodeType: 'folder',
  menuTitle: 'Events',
  id: `${gartenId}${kulturId}EventFolder`,
  label: `Events (${children.length})`,
  url: ['Gaerten', gartenId, 'Kulturen', kulturId, 'Events'],
  sort: [4, gartenIndex, 1, kulturIndex, 5],
  hasChildren: true,
  childrenCount: children.length,
})

export default gartenKulturEventFolder
