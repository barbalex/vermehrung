const eventFolder = ({ count }) => [
  {
    nodeType: 'folder',
    menuTitle: 'Events',
    id: 'eventFolder',
    label: `Events (${count})`,
    url: ['Events'],
    sort: [10],
    hasChildren: true,
    childrenCount: count,
  },
]

export default eventFolder
