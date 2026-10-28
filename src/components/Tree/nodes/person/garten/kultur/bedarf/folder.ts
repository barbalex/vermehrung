export const buildPersonGartenKulturBedarfFolder = ({
  kulturId,
  kulturIndex,
  gartenId,
  gartenIndex,
  personId,
  personIndex,
  count,
}: {
  kulturId: string
  kulturIndex: number
  gartenId: string
  gartenIndex: number
  personId: string
  personIndex: number
  count: number
}) => ({
  nodeType: 'folder',
  menuTitle: 'Bedarf',
  id: `${personId}${gartenId}${kulturId}BedarfFolder`,
  label: `Bedarf (${count})`,
  url: [
    'Personen',
    personId,
    'Gaerten',
    gartenId,
    'Kulturen',
    kulturId,
    'Bedarf',
  ],
  sort: [11, personIndex, 2, gartenIndex, 1, kulturIndex, 5],
  hasChildren: true,
  childrenCount: count,
})
