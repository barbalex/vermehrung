export const buildArtHerkunftFolder = ({ count, artIndex, artId }) => ({
  nodeType: 'folder',
  menuTitle: 'Herkünfte',
  id: `${artId}HerkunftFolder`,
  label: `Herkünfte (${count})`,
  url: ['Arten', artId, 'Herkuenfte'],
  sort: [1, artIndex, 1],
  hasChildren: true,
  childrenCount: count,
  hasMenu: false,
  menuExplainerText:
    'Herkünfte können nur in ihrem eigenen Ast des Navigationsbaums neu geschaffen und gelöscht werden',
})
