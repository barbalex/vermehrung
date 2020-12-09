const personLieferungFolder = ({ children, personIndex, personId }) => [
  {
    nodeType: 'folder',
    menuTitle: 'Lieferungen',
    id: `${personId}LieferungFolder`,
    label: `Lieferungen (${children.length})`,
    url: ['Personen', personId, 'Lieferungen'],
    sort: [11, personIndex, 3],
    hasChildren: true,
    childrenCount: children.length,
  },
]

export default personLieferungFolder
