export default (k) => {
  const personName = k?.garten?.person?.name ?? '(kein Name)'
  const personOrt = k?.garten?.person?.ort ?? null
  const personLabel = `${personName}${personOrt ? ` (${personOrt})` : ''}`
  const label = k?.garten?.name ?? personLabel

  return label
}
