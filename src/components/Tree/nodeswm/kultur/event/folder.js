const kulturEventFolder = ({ children, kulturIndex, kulturId }) => [
  {
    nodeType: 'folder',
    menuTitle: 'Events',
    id: `${kulturId}EventFolder`,
    label: `Events (${children.length})`,
    url: ['Kulturen', kulturId, 'Events'],
    sort: [5, kulturIndex, 5],
    hasChildren: true,
    childrenCount: children.length,
  },
]

export default kulturEventFolder
