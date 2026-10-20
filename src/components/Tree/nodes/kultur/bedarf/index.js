import { bedarfLabelFromBedarf } from '../../../../../utils/bedarfLabelFromBedarf.js'

export const buildKulturBedarf = ({
  bedarf,
  bedarfIndex,
  kulturId,
  kulturIndex,
}) => ({
  nodeType: 'table',
  menuTitle: 'Bedarf',
  table: 'bedarf',
  id: `${kulturId}${bedarf.id}`,
  label: bedarfLabelFromBedarf({ bedarf }),
  url: ['Kulturen', kulturId, 'Bedarf', bedarf.id],
  sort: [5, kulturIndex, 5, bedarfIndex],
  hasChildren: false,
})
