const kulturAnlieferungFolder = ({ children, kulturIndex, kulturId }) => [
  {
    nodeType: 'folder',
    menuTitle: 'An-Lieferungen',
    id: `${kulturId}AnLieferungFolder`,
    label: `An-Lieferungen (${children.length})`,
    url: ['Kulturen', kulturId, 'An-Lieferungen'],
    sort: [5, kulturIndex, 3],
    hasChildren: true,
    childrenCount: children.length,
  },
]

export default kulturAnlieferungFolder
