import personFullname from './personFullname'

// TODO: remove store
const gartenLabelFromGarten = ({ garten, person }) => {
  if (!garten?.id) return 'kein Garten'
  if (garten?.name) return garten.name
  if (person) {
    const fullname = personFullname(person)
    if (fullname) return fullname
  }

  return 'kein Name'
}

export default gartenLabelFromGarten
