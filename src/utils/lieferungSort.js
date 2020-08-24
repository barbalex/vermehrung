export default (a, b) => {
  const datumA = new Date(a?.datum ?? '')
  const datumB = new Date(b?.datum ?? '')
  if (datumA < datumB) return -1
  if (datumA > datumB) return 1

  return 0
}
