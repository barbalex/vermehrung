const artKulturFolder = ({ children, artIndex, artId }) => ({
  nodeType: 'folder',
  menuTitle: 'Kulturen',
  id: `${artId}KulturFolder`,
  label: `Kulturen (${children.length})`,
  url: ['Arten', artId, 'Kulturen'],
  sort: [1, artIndex, 2],
  hasChildren: true,
  childrenCount: children.length,
})

export default artKulturFolder
