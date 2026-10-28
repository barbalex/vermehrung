import { bedarfLabelFromBedarf } from '../../../../../../utils/bedarfLabelFromBedarf.ts'

export const buildGartenKulturBedarf = ({
  bedarf,
  bedarfIndex,
  kulturId,
  kulturIndex,
  gartenId,
  gartenIndex,
}: {
  bedarf: import('../../../../../../dbModel.ts').Bedarf
  bedarfIndex: number
  kulturId: string
  kulturIndex: number
  gartenId: string
  gartenIndex: number
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
