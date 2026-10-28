export const buildKulturFolder = ({ count }: { count: number }) => [
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
