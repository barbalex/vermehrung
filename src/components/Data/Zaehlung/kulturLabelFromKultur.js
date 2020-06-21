export default (k) => {
  const personName = k?.garten?.person?.fullname ?? '(kein Name)'
  const personOrt = k?.garten?.person?.ort ?? null
  const personLabel = `${personName}${personOrt ? ` (${personOrt})` : ''}`
  const gartenName = k?.garten?.name ?? personLabel
  const artName = k?.art?.art_ae_art?.name ?? '(keine Art)'
  const label = `${gartenName}: ${artName}`

  return label
}
