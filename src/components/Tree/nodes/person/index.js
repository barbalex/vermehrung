import { personLabelFromPerson } from '../../../../utils/personLabelFromPerson.js'

export const buildPerson = ({ person, index }) => ({
  nodeType: 'table',
  menuTitle: 'Person',
  table: 'person',
  id: person.id,
  label: personLabelFromPerson({ person }),
  url: ['Personen', person.id],
  sort: [11, index],
  hasChildren: true,
  aktiv: person.aktiv,
})
