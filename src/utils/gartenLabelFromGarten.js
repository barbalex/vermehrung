import personFullname from './personFullname'

// TODO: remove store
const gartenLabelFromGarten = ({ garten, store, person }) => {
  if (!garten?.id) return 'kein Garten'
  if (garten?.name) return garten.name

  if (store && garten?.person_id) {
    const person = store.persons.get(garten.person_id)

    if (person?.fullname) return person.fullname
  }
  if (person) {
    const fullname = personFullname(person)
    if (fullname) return fullname
  }

  return 'kein Name'
}

export default gartenLabelFromGarten
