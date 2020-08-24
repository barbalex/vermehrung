export default (a, b) => {
  const datumA = new Date(a?.datum ?? '')
  const datumB = new Date(b?.datum ?? '')
  if (datumA < datumB) return -1
  if (datumA > datumB) return 1

  const anzahlPflanzenA = a?.anzahl_pflanzen ?? ''
  const anzahlPflanzenB = b?.anzahl_pflanzen ?? ''
  if (anzahlPflanzenA < anzahlPflanzenB) return -1
  if (anzahlPflanzenA > anzahlPflanzenB) return 1

  return 0
}
