export const buildPersonGartenKulturAuslieferungFolder = ({
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
  menuTitle: 'Aus-Lieferungen',
  id: `${personId}${gartenId}${kulturId}AusLieferungFolder`,
  label: `Aus-Lieferungen (${count})`,
  url: [
    'Personen',
    personId,
    'Gaerten',
    gartenId,
    'Kulturen',
    kulturId,
    'Aus-Lieferungen',
  ],
  sort: [11, personIndex, 2, gartenIndex, 1, kulturIndex, 4],
  hasChildren: true,
  childrenCount: count,
})
