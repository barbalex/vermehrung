import { bedarfLabelFromBedarf } from '../../../../../../utils/bedarfLabelFromBedarf.js'

export const buildGartenKulturBedarf = ({
  bedarf,
  bedarfIndex,
  kulturId,
  kulturIndex,
  gartenId,
  gartenIndex,
}) => ({
  nodeType: 'table',
  menuTitle: 'Bedarf',
  table: 'bedarf',
  id: `${gartenId}${kulturId}${bedarf.id}`,
  label: bedarfLabelFromBedarf({ bedarf }),
  url: ['Gaerten', gartenId, 'Kulturen', kulturId, 'Bedarf', bedarf.id],
  sort: [4, gartenIndex, 1, kulturIndex, 5, bedarfIndex],
  hasChildren: false,
})
