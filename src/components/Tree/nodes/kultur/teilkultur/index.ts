import { teilkulturLabelFromTeilkultur } from '../../../../../utils/teilkulturLabelFromTeilkultur.ts'

export const buildKulturTeilkultur = ({
  teilkultur,
  teilkulturIndex,
  kulturId,
  kulturIndex,
}: {
  teilkultur: import('../../../../../dbModel.ts').Teilkultur
  teilkulturIndex: number
  kulturId: string
  kulturIndex: number
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
