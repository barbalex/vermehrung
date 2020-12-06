const artSammlungFolder = ({ children, artIndex, artId }) => ({
  nodeType: 'folder',
  menuTitle: 'Sammlungen',
  id: `${artId}SammlungFolder`,
  label: `Sammlungen (${children.length})`,
  url: ['Arten', artId, 'Sammlungen'],
  sort: [1, artIndex, 1],
  hasChildren: true,
  childrenCount: children.length,
})

export default artSammlungFolder
