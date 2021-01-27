const personGartenKulturAuslieferungFolder = ({
  kulturId,
  kulturIndex,
  gartenId,
  gartenIndex,
  personId,
  personIndex,
  count,
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

export default personGartenKulturAuslieferungFolder
