export const herkunftSort = (a, b) => {
  const gemeindeA = a?.gemeinde?.toString()?.toLowerCase() ?? ''
  const gemeindeB = b?.gemeinde?.toString()?.toLowerCase() ?? ''
  if (gemeindeA < gemeindeB) return -1
  if (gemeindeA > gemeindeB) return 1

  const lokalnameA = a?.lokalname?.toString()?.toLowerCase() ?? ''
  const lokalnameB = b?.lokalname?.toString()?.toLowerCase() ?? ''
  if (lokalnameA < lokalnameB) return -1
  if (lokalnameA > lokalnameB) return 1

  const nrA = a?.nr?.toString()?.toLowerCase() ?? ''
  const nrB = b?.nr?.toString()?.toLowerCase() ?? ''
  if (nrA < nrB) return -1
  if (nrA > nrB) return 1

  return 0
}
