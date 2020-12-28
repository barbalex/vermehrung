import personFullname from './personFullname'

const personLabelFromPerson = ({ person }) => {
  if (!person) return '(keine Person)'
  const ortLabel = person?.ort ? ` (${person.ort})` : ''
  const fullname = personFullname(person)
  const nameLabel = fullname ? fullname : ortLabel ? 'kein Name' : ''

  return `${nameLabel}${ortLabel}`
}

export default personLabelFromPerson
