import { teilkulturLabelFromTeilkultur } from '../../../../../../utils/teilkulturLabelFromTeilkultur.js'

const artKulturTeilkulturNodes = ({
  teilkultur,
  teilkulturIndex,
  kulturId,
  kulturIndex,
  artId,
  artIndex,
}) => ({
  nodeType: 'table',
  menuTitle: 'Teilkultur',
  table: 'teilkultur',
  id: `${artId}${kulturId}${teilkultur.id}`,
  label: teilkulturLabelFromTeilkultur({ teilkultur }),
  url: ['Arten', artId, 'Kulturen', kulturId, 'Teilkulturen', teilkultur.id],
  sort: [1, artIndex, 3, kulturIndex, 1, teilkulturIndex],
  hasChildren: false,
})

export default artKulturTeilkulturNodes
