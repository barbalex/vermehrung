export const buildPersonFolder = ({ count }) => [
  {
    nodeType: 'folder',
    menuTitle: 'Personen',
    id: 'personFolder',
    label: `Personen (${count})`,
    url: ['Personen'],
    sort: [11],
    hasChildren: true,
    childrenCount: count,
  },
]
