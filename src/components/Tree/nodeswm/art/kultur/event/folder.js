const artKulturEventFolder = ({
  kulturId,
  kulturIndex,
  artId,
  artIndex,
  children,
}) => ({
  nodeType: 'folder',
  menuTitle: 'Events',
  id: `${artId}${kulturId}EventFolder`,
  label: `Events (${children.length})`,
  url: ['Arten', artId, 'Kulturen', kulturId, 'Events'],
  sort: [1, artIndex, 2, kulturIndex, 5],
  hasChildren: true,
  childrenCount: children.length,
})

export default artKulturEventFolder
