const personFolder = ({ count }) => [
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

export default personFolder
