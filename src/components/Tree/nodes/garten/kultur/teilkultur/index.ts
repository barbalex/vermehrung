import { teilkulturLabelFromTeilkultur } from '../../../../../../utils/teilkulturLabelFromTeilkultur.ts'

export const buildGartenKulturTeilkultur = ({
  teilkultur,
  teilkulturIndex,
  kulturId,
  kulturIndex,
  gartenId,
  gartenIndex,
}: {
  teilkultur: import('../../../../../../dbModel.ts').Teilkultur
  teilkulturIndex: number
  kulturId: string
  kulturIndex: number
  gartenId: string
  gartenIndex: number
}) => ({
  nodeType: 'table',
  menuTitle: 'Teilkultur',
  table: 'teilkultur',
  id: `${gartenId}${kulturId}${teilkultur.id}`,
  label: teilkulturLabelFromTeilkultur({ teilkultur }),
  url: [
    'Gaerten',
    gartenId,
    'Kulturen',
    kulturId,
    'Teilkulturen',
    teilkultur.id,
  ],
  sort: [4, gartenIndex, 1, kulturIndex, 1, teilkulturIndex],
  hasChildren: false,
})
