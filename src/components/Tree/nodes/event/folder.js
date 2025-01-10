export const buildEventFolder = ({ count }) => [
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
