export const buildGartenFolder = ({ count }) => [
  {
    nodeType: 'folder',
    menuTitle: 'Gärten',
    id: 'gartenFolder',
    label: `Gärten (${count})`,
    url: ['Gaerten'],
    sort: [4],
    hasChildren: true,
    childrenCount: count,
  },
]
