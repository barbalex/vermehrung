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

  const artName = kultur?.art?.art_ae_art?.name ?? '(keine Art)'

  const label = `${gartenName}: ${artName}`
  const labelWithZl = `${label}${
    kultur?.zwischenlager ? '. Zwischenlager' : ''
  }`

  return labelWithZl
}
