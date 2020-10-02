export default ({ kultur, store }) => {
  const garten = kultur?.garten_id
    ? store.gartens.get(kultur.garten_id)
    : undefined

  const person = garten?.person_id
    ? store.persons.get(garten.person_id)
    : undefined
  const personName = person?.fullname ?? '(kein Name)'
  const personOrt = person?.ort ?? undefined
  const personLabel = `${personName}${personOrt ? ` (${personOrt})` : ''}`

  const gartenName = garten?.name ?? personLabel ?? '(kein Name)'

  const art = kultur?.art_id ? store.arts.get(kultur.art_id) : {}
  const aeArt = art?.ae_id ? store.ae_arts.get(art.ae_id) : {}
  const artName = aeArt?.name ?? '(keine Art)'

  const zlLabel = kultur?.zwischenlager ? '. Zwischenlager' : ''

  const label = `${gartenName}: ${artName}${zlLabel}`

  return label
}
