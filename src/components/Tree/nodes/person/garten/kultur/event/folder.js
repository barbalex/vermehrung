const personGartenKulturEventFolder = ({
  kulturId,
  kulturIndex,
  gartenId,
  gartenIndex,
  personId,
  personIndex,
  count,
}) => ({
  nodeType: 'folder',
  menuTitle: 'Events',
  id: `${personId}${gartenId}${kulturId}EventFolder`,
  label: `Events (${count})`,
  url: [
    'Personen',
    personId,
    'Gaerten',
    gartenId,
    'Kulturen',
    kulturId,
    'Events',
  ],
  sort: [11, personIndex, 2, gartenIndex, 1, kulturIndex, 5],
  hasChildren: true,
  childrenCount: count,
})

export default personGartenKulturEventFolder
