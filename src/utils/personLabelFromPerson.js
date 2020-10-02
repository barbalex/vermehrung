export default ({ person }) => {
  if (!person) return '(keine Person)'
  return person?.fullname ?? '(kein Name)'
}
