const kulturZaehlungFolder = ({ count, kulturIndex, kulturId }) => ({
  nodeType: 'folder',
  menuTitle: 'Zählungen',
  id: `${kulturId}ZaehlungFolder`,
  label: `Zählungen (${count})`,
  url: ['Kulturen', kulturId, 'Zaehlungen'],
  sort: [5, kulturIndex, 2],
  hasChildren: true,
  childrenCount: count,
})

export default kulturZaehlungFolder
