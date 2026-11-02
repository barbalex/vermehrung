import { personFullname } from './personFullname.ts'
import type { PersonRow } from './rowTypes.ts'

export const personLabelFromPerson = ({ person }: { person: PersonRow }) => {
  if (!person) return '(keine Person)'
  const ortLabel = person?.ort ? ` (${person.ort})` : ''
  const fullname = personFullname(person)
  const nameLabel =
    fullname ? fullname
    : ortLabel ? 'kein Name'
    : ''

  return `${nameLabel}${ortLabel}`
}
