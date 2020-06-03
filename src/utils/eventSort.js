export default (a, b) => {
  const datumA = new Date(a?.datum ?? null)
  const datumB = new Date(b?.datum ?? null)
  if (datumA < datumB) return -1
  if (datumA > datumB) return 1

  const beschreibungA = a?.beschreibung?.toString()?.toLowerCase()
  const beschreibungB = b?.beschreibung?.toString()?.toLowerCase()
  if (beschreibungA < beschreibungB) return -1
  if (beschreibungA > beschreibungB) return 1

  return 0
}
