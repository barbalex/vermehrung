export const buildPersonGartenKulturZaehlungFolder = ({
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
  menuTitle: 'Zählungen',
  id: `${personId}${gartenId}${kulturId}ZaehlungFolder`,
  label: `Zählungen (${count})`,
  url: [
    'Personen',
    personId,
    'Gaerten',
    gartenId,
    'Kulturen',
    kulturId,
    'Zaehlungen',
  ],
  sort: [11, personIndex, 2, gartenIndex, 1, kulturIndex, 2],
  hasChildren: true,
  childrenCount: count,
})
