const sammlungFolder = ({ count }) => [
  {
    nodeType: 'folder',
    menuTitle: 'Sammlungen',
    id: 'sammlungFolder',
    label: `Sammlungen (${count})`,
    url: ['Sammlungen'],
    sort: [3],
    hasChildren: true,
    childrenCount: count,
  },
]

export default sammlungFolder
