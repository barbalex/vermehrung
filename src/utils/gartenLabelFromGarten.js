import personFullname from './personFullname.js'

// TODO: remove store
const gartenLabelFromGarten = ({ garten, person, kein }) => {
  if (!garten?.id) return 'kein Garten'
  if (garten?.name) return garten.name
  if (person) {
    const fullname = personFullname(person)
    if (fullname) return fullname
  }

  return kein ?? 'kein Name'
}

export default gartenLabelFromGarten
