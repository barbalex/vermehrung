import { teilkulturLabelFromTeilkultur } from '../../../../../utils/teilkulturLabelFromTeilkultur.js'

export const buildKulturTeilkultur = ({
  teilkultur,
  teilkulturIndex,
  kulturId,
  kulturIndex,
}) => ({
  nodeType: 'table',
  menuTitle: 'Teilkultur',
  table: 'teilkultur',
  id: `${kulturId}${teilkultur.id}`,
  label: teilkulturLabelFromTeilkultur({ teilkultur }),
  url: ['Kulturen', kulturId, 'Teilkulturen', teilkultur.id],
  sort: [5, kulturIndex, 1, teilkulturIndex],
  hasChildren: false,
})
