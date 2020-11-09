const personLabelFromPerson = ({ person }) => {
  if (!person) return '(keine Person)'
  const ortLabel = person?.ort ? ` (${person.ort})` : ''
  const nameLabel = person?.fullname
    ? person.fullname
    : ortLabel
    ? 'kein Name'
    : ''

  return `${nameLabel}${ortLabel}`
}

export default personLabelFromPerson
