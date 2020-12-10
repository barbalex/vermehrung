const artKulturEventFolder = ({
  kulturId,
  kulturIndex,
  artId,
  artIndex,
  count,
}) => [
  {
    nodeType: 'folder',
    menuTitle: 'Events',
    id: `${artId}${kulturId}EventFolder`,
    label: `Events (${count})`,
    url: ['Arten', artId, 'Kulturen', kulturId, 'Events'],
    sort: [1, artIndex, 2, kulturIndex, 5],
    hasChildren: true,
    childrenCount: count,
  },
]

export default artKulturEventFolder
