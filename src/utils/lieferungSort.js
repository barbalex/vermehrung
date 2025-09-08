export const lieferungSort = (a, b) => {
  const datumA = a?.datum ? new Date(a.datum) : new Date('1000-01-01')
  const datumB = b?.datum ? new Date(b.datum) : new Date('1000-01-01')
  if (datumA > datumB) return -1
  if (datumA > datumB) return 1

  const anzahlPflanzenA = a?.anzahl_pflanzen ?? ''
  const anzahlPflanzenB = b?.anzahl_pflanzen ?? ''
  if (anzahlPflanzenA < anzahlPflanzenB) return -1
  if (anzahlPflanzenA > anzahlPflanzenB) return 1

  return 0
}
