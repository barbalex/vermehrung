import { herkunftLabelFromHerkunft } from '../../../../../utils/herkunftLabelFromHerkunft.ts'

export const buildSammlungHerkunft = ({
  herkunft,
  sammlungId,
  sammlungIndex,
}: {
  herkunft: import('../../../../../dbModel.ts').Herkunft
  sammlungId: string
  sammlungIndex: number
}) => ({
  nodeType: 'table',
  menuTitle: 'Herkunft',
  table: 'herkunft',
  id: `${sammlungId}${herkunft.id}`,
  label: herkunftLabelFromHerkunft({ herkunft }),
  url: ['Sammlungen', sammlungId, 'Herkuenfte', herkunft.id],
  sort: [3, sammlungIndex, 1, 1],
  hasChildren: false,
  hasMenu: false,
  menuExplainerText:
    'Herkünfte können nur in ihrem eigenen Ast des Navigationsbaums neu geschaffen und gelöscht werden',
})
