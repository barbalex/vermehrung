export const buildSammlungHerkunftFolder = ({
  count,
  sammlungIndex,
  sammlungId,
}) => ({
  nodeType: 'folder',
  menuTitle: 'Herkünfte',
  id: `${sammlungId}HerkunftFolder`,
  label: `Herkünfte (${count})`,
  url: ['Sammlungen', sammlungId, 'Herkuenfte'],
  sort: [3, sammlungIndex, 1],
  hasChildren: count > 0,
  childrenCount: count,
  hasMenu: false,
  menuExplainerText:
    'Herkünfte können nur in ihrem eigenen Ast des Navigationsbaums neu geschaffen und gelöscht werden',
})
