import herkunftLabelFromHerkunft from '../../../../../utils/herkunftLabelFromHerkunft'

const sammlungHerkunftNodes = ({ herkunft, sammlungId, sammlungIndex }) => ({
  nodeType: 'table_no_menu',
  menuTitle: 'Herkunft',
  table: 'herkunft',
  id: `${sammlungId}${herkunft.id}`,
  label: herkunftLabelFromHerkunft({ herkunft }),
  url: ['Sammlungen', sammlungId, 'Herkuenfte', herkunft.id],
  sort: [3, sammlungIndex, 1, 1],
  hasChildren: false,
})

export default sammlungHerkunftNodes
