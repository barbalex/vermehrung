export const buildPersonGartenKulturTeilkultur = ({
  teilkultur,
  teilkulturIndex,
  kulturId,
  kulturIndex,
  gartenId,
  gartenIndex,
  personId,
  personIndex,
}: {
  teilkultur: import('../../../../../../../dbModel.ts').Teilkultur
  teilkulturIndex: number
  kulturId: string
  kulturIndex: number
  gartenId: string
  gartenIndex: number
  personId: string
  personIndex: number
}) => ({
  nodeType: 'table',
  menuTitle: 'Teilkultur',
  table: 'teilkultur',
  id: `${personId}${gartenId}${kulturId}${teilkultur.id}`,
  label: teilkultur.name || '(kein Name)',
  url: [
    'Personen',
    personId,
    'Gaerten',
    gartenId,
    'Kulturen',
    kulturId,
    'Teilkulturen',
    teilkultur.id,
  ],
  sort: [11, personIndex, 2, gartenIndex, 1, kulturIndex, 1, teilkulturIndex],
  hasChildren: false,
})
