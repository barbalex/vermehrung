export const buildArtKulturFolder = ({ count, artIndex, artId }) => ({
  nodeType: 'folder',
  menuTitle: 'Kulturen',
  id: `${artId}KulturFolder`,
  label: `Kulturen (${count})`,
  url: ['Arten', artId, 'Kulturen'],
  sort: [1, artIndex, 3],
  hasChildren: true,
  childrenCount: count,
})
