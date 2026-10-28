import { herkunftLabelFromHerkunft } from '../../../../utils/herkunftLabelFromHerkunft.ts'

export const buildHerkunft = ({
  herkunft,
  index,
}: {
  herkunft: import('../../../../dbModel.ts').Herkunft
  index: number
}) => ({
  nodeType: 'table',
  menuTitle: 'Herkunft',
  table: 'herkunft',
  id: herkunft.id,
  label: herkunftLabelFromHerkunft({ herkunft }),
  url: ['Herkuenfte', herkunft.id],
  sort: [2, index],
  hasChildren: true,
})
