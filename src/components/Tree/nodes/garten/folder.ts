export const buildGartenFolder = ({ count }: { count: number }) => [
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
