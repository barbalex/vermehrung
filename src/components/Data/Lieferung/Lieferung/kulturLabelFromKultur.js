export default (k) => {
  const personName = k?.garten?.person?.fullname ?? '(kein Name)'
  const personOrt = k?.garten?.person?.ort ?? null
  const personLabel = `${personName}${personOrt ? ` (${personOrt})` : ''}`
  const label = k?.garten?.name ?? personLabel
  const labelWithZl = `${label}${k?.zwischenlager ? '. Zwischenlager' : ''}`

  return labelWithZl
}
