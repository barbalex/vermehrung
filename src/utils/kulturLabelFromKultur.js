const kulturLabelFromKultur = ({ kultur, store }) => {
  if (!kultur) return ''
  const { ae_arts, arts, gartens, herkunfts, persons } = store

  let garten
  let gartenLabel = 'in: kein Garten'
  if (kultur.garten_id) {
    garten = gartens.get(kultur.garten_id)
    gartenLabel = 'in: Garten ohne Name'
  }
  if (garten?.name) {
    gartenLabel = `in: ${garten.name}`
  }
  if (!garten?.name && garten?.person_id) {
    const person = persons.get(garten.person_id)
    if (person && person.fullname) {
      gartenLabel = `in: ${person.fullname}'s Garten`
    }
  }

  let art
  let artLabel = 'keine Art'
  if (kultur?.art_id) {
    art = arts.get(kultur.art_id)
  }
  let aeArt
  if (art?.ae_id) {
    aeArt = ae_arts.get(art.ae_id)
  }
  if (art && aeArt && aeArt.name) {
    artLabel = aeArt.name
  }

  let herkunftLabel = 'von: keine Herkunft'
  if (kultur.herkunft_id) {
    const herkunft = herkunfts.get(kultur.herkunft_id)
    if (herkunft.nr) {
      herkunftLabel = `von: ${herkunft.nr}`
    } else {
      herkunftLabel = 'von: (Herkunft ohne Nr)'
    }
  }
  const zwischenlagerLabel = kultur?.zwischenlager ? 'Zwischenlager' : undefined
  const label = [artLabel, herkunftLabel, gartenLabel, zwischenlagerLabel]
    .filter((e) => !!e)
    .join('; ')

  return label
}

export default kulturLabelFromKultur
