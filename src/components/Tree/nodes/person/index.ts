import { personLabelFromPerson } from '../../../../utils/personLabelFromPerson.ts'

export const buildPerson = ({ person, index }: { person: import('../../../../dbModel.ts').Person; index: string }) => ({
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
