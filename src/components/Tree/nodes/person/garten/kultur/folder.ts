export const buildPersonGartenKulturFolder = ({
  gartenId,
  gartenIndex,
  personId,
  personIndex,
  count,
}: {
  gartenId: string
  gartenIndex: number
  personId: string
  personIndex: number
  count: number
}) => ({
  nodeType: 'folder',
  menuTitle: 'Kulturen',
  id: `${personId}${gartenId}KulturFolder`,
  label: `Kulturen (${count})`,
  url: ['Personen', personId, 'Gaerten', gartenId, 'Kulturen'],
  sort: [11, personIndex, 2, gartenIndex, 1],
  hasChildren: true,
  childrenCount: count,
})
