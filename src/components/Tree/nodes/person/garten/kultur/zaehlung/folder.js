const personGartenKulturZaehlungFolder = ({
  kulturId,
  kulturIndex,
  gartenId,
  gartenIndex,
  personId,
  personIndex,
  count,
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

export default personGartenKulturZaehlungFolder
