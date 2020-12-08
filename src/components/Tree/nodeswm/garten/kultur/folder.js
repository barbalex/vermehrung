const gartenKulturFolder = ({ children, gartenIndex, gartenId }) => ({
  nodeType: 'folder',
  menuTitle: 'Kulturen',
  id: `${gartenId}KulturFolder`,
  label: `Kulturen (${children.length})`,
  url: ['Gaerten', gartenId, 'Kulturen'],
  sort: [4, gartenIndex, 1],
  hasChildren: true,
  childrenCount: children.length,
})

export default gartenKulturFolder
