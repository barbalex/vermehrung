const personGartenKulturFolder = ({
  gartenId,
  gartenIndex,
  personId,
  personIndex,
  children,
}) => [
  {
    nodeType: 'folder',
    menuTitle: 'Kulturen',
    id: `${personId}${gartenId}KulturFolder`,
    label: `Kulturen (${children.length})`,
    url: ['Personen', personId, 'Gaerten', gartenId, 'Kulturen'],
    sort: [11, personIndex, 2, gartenIndex, 1],
    hasChildren: true,
    childrenCount: children.length,
  },
]

export default personGartenKulturFolder
