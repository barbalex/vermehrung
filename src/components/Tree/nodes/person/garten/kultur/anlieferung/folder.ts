export const buildPersonGartenKulturAnlieferungFolder = ({
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
  menuTitle: 'An-Lieferungen',
  id: `${personId}${gartenId}${kulturId}AnLieferungFolder`,
  label: `An-Lieferungen (${count})`,
  url: [
    'Personen',
    personId,
    'Gaerten',
    gartenId,
    'Kulturen',
    kulturId,
    'An-Lieferungen',
  ],
  sort: [11, personIndex, 2, gartenIndex, 1, kulturIndex, 3],
  hasChildren: true,
  childrenCount: count,
})
