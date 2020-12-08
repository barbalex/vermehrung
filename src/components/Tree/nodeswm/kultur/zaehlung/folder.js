const kulturZaehlungFolder = ({ children, kulturIndex, kulturId }) => [
  {
    nodeType: 'folder',
    menuTitle: 'Zählungen',
    id: `${kulturId}ZaehlungFolder`,
    label: `Zählungen (${children.length})`,
    url: ['Kulturen', kulturId, 'Zaehlungen'],
    sort: [5, kulturIndex, 2],
    hasChildren: true,
    childrenCount: children.length,
  },
]

export default kulturZaehlungFolder
