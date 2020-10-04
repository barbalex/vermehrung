export default ({ kultur, store }) => {
  if (!kultur) return ''
  const { ae_arts, arts, gartens, herkunfts, persons } = store

  let garten
  if (kultur.garten_id) {
    garten = gartens.get(kultur.garten_id)
  }
  let gartenLabel = '(kein Garten)'
  if (garten?.name) {
    gartenLabel = garten.name
  }
  if (!garten?.name && garten?.person_id) {
    const person = persons.get(garten.person_id)
    if (person && person.fullname) {
      gartenLabel = `${person.fullname}'s Garten`
    } else {
      gartenLabel = '(Garten ohne Name)'
    }
  }

  let art
  if (kultur?.art_id) {
    art = arts.get(kultur.art_id)
  }
  let aeArt
  if (art?.ae_id) {
    aeArt = ae_arts.get(art.ae_id)
  }
  let artName = '(keine Art)'
  if (art && aeArt && aeArt.name) {
    artName = aeArt.name
  }

  let herkunftLabel = '(keine Herkunft)'
  if (kultur.herkunft_id) {
    const herkunft = herkunfts.get(kultur.herkunft_id)
    if (herkunft.nr) {
      herkunftLabel = herkunft.nr
    } else {
      herkunftLabel = '(Herkunft ohne Nr)'
    }
  }
  const zwischenlager = kultur?.zwischenlager ? `, Zwischenlager` : ''

  return `${artName}, von: ${herkunftLabel}, in: ${gartenLabel}${zwischenlager}`
}
