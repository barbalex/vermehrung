import { bedarfLabelFromBedarf } from '../../../../../utils/bedarfLabelFromBedarf.ts'

export const buildKulturBedarf = ({
  bedarf,
  bedarfIndex,
  kulturId,
  kulturIndex,
}: {
  bedarf: import('../../../../../dbModel.ts').Bedarf
  bedarfIndex: number
  kulturId: string
  kulturIndex: number
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
