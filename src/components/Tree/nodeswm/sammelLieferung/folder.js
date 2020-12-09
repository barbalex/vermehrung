const sammelLieferungFolder = ({ count }) => [
  {
    nodeType: 'folder',
    menuTitle: 'Sammel-Lieferungen',
    id: 'sammelLieferungFolder',
    label: `Sammel-Lieferungen (${count})`,
    url: ['Sammel-Lieferungen'],
    sort: [9],
    hasChildren: true,
    childrenCount: count,
  },
]

export default sammelLieferungFolder
