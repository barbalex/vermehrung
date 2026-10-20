import { bedarfLabelFromBedarf } from '../../../../../../utils/bedarfLabelFromBedarf.js'

export const buildArtKulturBedarf = ({
  bedarf,
  bedarfIndex,
  kulturId,
  kulturIndex,
  artId,
  artIndex,
}) => ({
  nodeType: 'table',
  menuTitle: 'Bedarf',
  table: 'bedarf',
  id: `${artId}${kulturId}${bedarf.id}`,
  label: bedarfLabelFromBedarf({ bedarf }),
  url: ['Arten', artId, 'Kulturen', kulturId, 'Bedarf', bedarf.id],
  sort: [1, artIndex, 3, kulturIndex, 5, bedarfIndex],
  hasChildren: false,
})
