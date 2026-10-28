export const lieferungSort = <T extends object>(
  a: T | null | undefined,
  b: T | null | undefined,
) => {
  const ra = a as Record<string, unknown> | undefined
  const rb = b as Record<string, unknown> | undefined
  const datumA = ra?.datum ? new Date(ra.datum as string) : new Date('1000-01-01')
  const datumB = rb?.datum ? new Date(rb.datum as string) : new Date('1000-01-01')
  if (datumA > datumB) return -1
  if (datumA < datumB) return 1

  const anzahlPflanzenA = String(ra?.anzahl_pflanzen ?? '')
  const anzahlPflanzenB = String(rb?.anzahl_pflanzen ?? '')
  if (anzahlPflanzenA < anzahlPflanzenB) return -1
  if (anzahlPflanzenA > anzahlPflanzenB) return 1

  return 0
}
