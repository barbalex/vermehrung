import personLabelFromPerson from '../../../../utils/personLabelFromPerson'

const personNodes = ({ person, index }) => ({
  nodeType: 'table',
  menuTitle: 'Person',
  table: 'person',
  id: person.id,
  label: personLabelFromPerson({ person }),
  url: ['Personen', person.id],
  sort: [11, index],
  hasChildren: true,
})

export default personNodes
