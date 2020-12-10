const personGartenKulturTeilkulturNodes = ({
  teilkultur,
  teilkulturIndex,
  kulturId,
  kulturIndex,
  gartenId,
  gartenIndex,
  personId,
  personIndex,
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

export default personGartenKulturTeilkulturNodes
