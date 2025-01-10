export const buildArtSammlungFolder = ({ count, artIndex, artId }) => ({
  nodeType: 'folder',
  menuTitle: 'Sammlungen',
  id: `${artId}SammlungFolder`,
  label: `Sammlungen (${count})`,
  url: ['Arten', artId, 'Sammlungen'],
  sort: [1, artIndex, 2],
  hasChildren: true,
  childrenCount: count,
})
