const lieferungFolder = ({ count }) => [
  {
    nodeType: 'folder',
    menuTitle: 'Lieferungen',
    id: 'lieferungFolder',
    label: `Lieferungen (${count})`,
    url: ['Lieferungen'],
    sort: [8],
    hasChildren: true,
    childrenCount: count,
  },
]

export default lieferungFolder
