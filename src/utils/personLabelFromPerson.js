export default ({ person }) => {
  if (!person) return '(keine Person)'
  const ortLabel = person?.ort ? ` (${person.ort})` : ''
  const nameLabel = person?.fullname ?? '(kein Name)'

  return `${nameLabel}${ortLabel}`
}