export const buildKulturBedarfFolder = ({ count, kulturIndex, kulturId }) => ({
  nodeType: 'folder',
  menuTitle: 'Bedarf',
  id: `${kulturId}BedarfFolder`,
  label: `Bedarf (${count})`,
  url: ['Kulturen', kulturId, 'Bedarf'],
  sort: [5, kulturIndex, 5],
  hasChildren: true,
  childrenCount: count,
})
