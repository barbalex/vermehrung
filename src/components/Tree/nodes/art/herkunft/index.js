import herkunftLabelFromHerkunft from '../../../../../utils/herkunftLabelFromHerkunft'

const artHerkunftNode = async ({
  herkunft,
  herkunftIndex,
  artId,
  artIndex,
}) => ({
  nodeType: 'table',
  menuTitle: 'Herkunft',
  table: 'herkunft',
  id: `${artId}/${herkunft.id}`,
  label: herkunftLabelFromHerkunft({ herkunft }),
  url: ['Arten', artId, 'Herkuenfte', herkunft.id],
  sort: [1, artIndex, 1, herkunftIndex],
  hasChildren: true,
  hasMenu: false,
  menuExplainerText:
    'Herkünfte können nur in ihrem eigenen Ast des Navigationsbaums neu geschaffen und gelöscht werden',
})

export default artHerkunftNode
