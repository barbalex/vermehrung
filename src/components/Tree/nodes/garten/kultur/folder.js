export const buildGartenKulturFolder = ({ count, gartenIndex, gartenId }) => ({
  nodeType: 'folder',
  menuTitle: 'Kulturen',
  id: `${gartenId}KulturFolder`,
  label: `Kulturen (${count})`,
  url: ['Gaerten', gartenId, 'Kulturen'],
  sort: [4, gartenIndex, 1],
  hasChildren: true,
  childrenCount: count,
})
