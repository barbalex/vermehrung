import { bedarfLabelFromBedarf } from '../../../../../../../utils/bedarfLabelFromBedarf.ts'

export const buildPersonGartenKulturBedarf = ({
  bedarf,
  bedarfIndex,
  kulturId,
  kulturIndex,
  gartenId,
  gartenIndex,
  personId,
  personIndex,
}: {
  bedarf: import('../../../../../../../dbModel.ts').Bedarf
  bedarfIndex: number
  kulturId: string
  kulturIndex: number
  gartenId: string
  gartenIndex: number
  personId: string
  personIndex: number
}) => ({
  nodeType: 'table',
  menuTitle: 'Bedarf',
  table: 'bedarf',
  id: `${personId}${gartenId}${kulturId}${bedarf.id}`,
  label: bedarfLabelFromBedarf({ bedarf }),
  url: [
    'Personen',
    personId,
    'Gaerten',
    gartenId,
    'Kulturen',
    kulturId,
    'Bedarf',
    bedarf.id,
  ],
  sort: [11, personIndex, 2, gartenIndex, 1, kulturIndex, 5, bedarfIndex],
  hasChildren: false,
})
