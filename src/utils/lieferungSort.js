export default ({ a, b }) => {
  const datumA = a?.datum ? new Date(a.datum) : ''
  const datumB = b?.datum ? new Date(b.datum) : ''
  if (datumA < datumB) return -1
  if (datumA > datumB) return 1

  return 0
}
