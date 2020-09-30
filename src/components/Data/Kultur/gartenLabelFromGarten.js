export default ({ garten, store }) => {
  if (garten?.name) return garten.name
  if (garten?.person_id) {
    const person = store.persons.get(garten.person_id)
    if (person?.fullname) return person.fullname
  }
  return '(kein Name)'
}
