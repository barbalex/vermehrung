export const herkunftSort = <T extends object>(
  a: T | null | undefined,
  b: T | null | undefined,
) => {
  const ra = a as Record<string, unknown> | undefined
  const rb = b as Record<string, unknown> | undefined
  const gemeindeA = String(ra?.gemeinde ?? '').toLowerCase()
  const gemeindeB = String(rb?.gemeinde ?? '').toLowerCase()
  if (gemeindeA < gemeindeB) return -1
  if (gemeindeA > gemeindeB) return 1

  const lokalnameA = String(ra?.lokalname ?? '').toLowerCase()
  const lokalnameB = String(rb?.lokalname ?? '').toLowerCase()
  if (lokalnameA < lokalnameB) return -1
  if (lokalnameA > lokalnameB) return 1

  const nrA = String(ra?.nr ?? '').toLowerCase()
  const nrB = String(rb?.nr ?? '').toLowerCase()
  if (nrA < nrB) return -1
  if (nrA > nrB) return 1

  return 0
}
