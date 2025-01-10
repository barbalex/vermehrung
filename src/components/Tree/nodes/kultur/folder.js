export const buildKulturFolder = ({ count }) => [
  {
    nodeType: 'folder',
    menuTitle: 'Kulturen',
    id: 'kulturFolder',
    label: `Kulturen (${count})`,
    url: ['Kulturen'],
    sort: [5],
    hasChildren: true,
    childrenCount: count,
  },
]
