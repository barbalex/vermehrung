export const buildKulturEventFolder = ({ count, kulturIndex, kulturId }) => ({
  nodeType: 'folder',
  menuTitle: 'Events',
  id: `${kulturId}EventFolder`,
  label: `Events (${count})`,
  url: ['Kulturen', kulturId, 'Events'],
  sort: [5, kulturIndex, 5],
  hasChildren: true,
  childrenCount: count,
})
