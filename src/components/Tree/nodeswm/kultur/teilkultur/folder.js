const kulturTeilkulturFolder = ({ children, kulturIndex, kulturId }) => [
  {
    nodeType: 'folder',
    menuTitle: 'Teilkulturen',
    id: `${kulturId}TeilkulturFolder`,
    label: `Teilkulturen (${children.length})`,
    url: ['Kulturen', kulturId, 'Teilkulturen'],
    sort: [5, kulturIndex, 1],
    hasChildren: true,
    childrenCount: children.length,
  },
]

export default kulturTeilkulturFolder
