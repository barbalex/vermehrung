export const buildArtFolder = ({ count }) => [
  {
    nodeType: 'folder',
    menuTitle: 'Arten',
    id: 'artFolder',
    label: `Arten (${count})`,
    url: ['Arten'],
    sort: [1],
    hasChildren: true,
    childrenCount: count,
  },
]
