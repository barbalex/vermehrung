import personFullname from './personFullname.js'

const kulturLabelFromKultur = ({
  kultur,
  garten,
  gartenPerson,
  art,
  aeArt,
  herkunft,
}) => {
  if (!kultur) return ''

  let gartenLabel = 'in: kein Garten'
  if (kultur.garten_id) {
    gartenLabel = 'in: Garten ohne Name'
  }
  if (garten?.name) {
    gartenLabel = `in: ${garten.name}`
  }
  if (!garten?.name && garten?.person_id) {
    const person = gartenPerson
    const fullname = personFullname(person)
    if (person && fullname) {
      gartenLabel = `in: ${fullname}'s Garten`
    }
  }

  let artLabel = 'keine Art'
  if (art && aeArt && aeArt.name) {
    artLabel = aeArt.name
  }

  let herkunftLabel = 'von: keine Herkunft'
  if (kultur.herkunft_id) {
    if (herkunft?.nr) {
      herkunftLabel = `von: ${herkunft.nr}`
    } else {
      herkunftLabel = 'von: (Herkunft ohne Nr)'
    }
  }
  const zwischenlagerLabel = kultur?.zwischenlager ? 'Zwischenlager' : undefined
  const label = [artLabel, herkunftLabel, gartenLabel, zwischenlagerLabel]
    .filter((e) => !!e)
    .join('; ')

  return label ?? '(Kultur ohne Art, Herkunft und Garten)'
}

export default kulturLabelFromKultur
