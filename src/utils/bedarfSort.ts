export const bedarfSort = <T extends object>(
  a: T | null | undefined,
  b: T | null | undefined,
) => {
  const ra = a as Record<string, unknown> | undefined
  const rb = b as Record<string, unknown> | undefined
  const jahrA = String(ra?.jahr ?? '')
  const jahrB = String(rb?.jahr ?? '')
  if (jahrA > jahrB) return -1
  if (jahrA < jahrB) return 1

  const beschreibungA = String(ra?.beschreibung ?? '')
  const beschreibungB = String(rb?.beschreibung ?? '')
  if (beschreibungA < beschreibungB) return -1
  if (beschreibungA > beschreibungB) return 1

  return 0
}
