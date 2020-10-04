export default ({ kultur, store }) => {
  let garten
  if (kultur.garten_id) {
    garten = store.gartens.get(kultur.garten_id)
  }
  let gartenName = '(kein Garten)'
  if (garten && garten.name) {
    gartenName = garten.name
  }
  if (!gartenName && garten?.person_id) {
    const person = store.persons.get(garten.person_id)
    if (person && person.fullname) {
      gartenName = person.fullname
    } else {
      gartenName = '(Garten ohne Name)'
    }
  }

  let art
  if (kultur?.art_id) {
    art = store.arts.get(kultur.art_id)
  }
  let aeArt
  if (art?.ae_id) {
    aeArt = store.ae_arts.get(art.ae_id)
  }
  let artName = '(keine Art)'
  if (art && aeArt && aeArt.name) {
    artName = aeArt.name
  }

  let herkunftLabel = '(keine Herkunft)'
  if (kultur.herkunft_id) {
    const herkunft = store.herkunfts.get(kultur.herkunft_id)
    if (herkunft.nr) {
      herkunftLabel = herkunft.nr
    } else {
      herkunftLabel = '(Herkunft ohne Nr)'
    }
  }
  const zwischenlager = kultur?.zwischenlager ? `, Zwischenlager` : ''

  return `${artName}, von: ${herkunftLabel}, in: ${gartenName}${zwischenlager}`
}
