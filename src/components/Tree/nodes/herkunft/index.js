import { herkunftLabelFromHerkunft } from '../../../../utils/herkunftLabelFromHerkunft.js'

const herkunftNodes = ({ herkunft, index }) => ({
  nodeType: 'table',
  menuTitle: 'Herkunft',
  table: 'herkunft',
  id: herkunft.id,
  label: herkunftLabelFromHerkunft({ herkunft }),
  url: ['Herkuenfte', herkunft.id],
  sort: [2, index],
  hasChildren: true,
})

export default herkunftNodes
