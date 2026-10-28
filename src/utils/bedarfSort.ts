export const bedarfSort = (a, b) => {
  const jahrA = a?.jahr ?? ''
  const jahrB = b?.jahr ?? ''
  if (jahrA > jahrB) return -1
  if (jahrA < jahrB) return 1

  const beschreibungA = a?.beschreibung ?? ''
  const beschreibungB = b?.beschreibung ?? ''
  if (beschreibungA < beschreibungB) return -1
  if (beschreibungA > beschreibungB) return 1

  return 0
}
