export const teilkulturSort = <T extends object>(
  a: T | null | undefined,
  b: T | null | undefined,
) => {
  const ra = a as Record<string, unknown> | undefined
  const rb = b as Record<string, unknown> | undefined
  const nameA = String(ra?.name ?? '').toLowerCase()
  const nameB = String(rb?.name ?? '').toLowerCase()
  if (nameA < nameB) return -1
  if (nameA > nameB) return 1

  const ort1A = String(ra?.ort1 ?? '').toLowerCase()
  const ort1B = String(rb?.ort1 ?? '').toLowerCase()
  if (ort1A < ort1B) return -1
  if (ort1A > ort1B) return 1

  const ort2A = String(ra?.ort2 ?? '').toLowerCase()
  const ort2B = String(rb?.ort2 ?? '').toLowerCase()
  if (ort2A < ort2B) return -1
  if (ort2A > ort2B) return 1

  const ort3A = String(ra?.ort3 ?? '').toLowerCase()
  const ort3B = String(rb?.ort3 ?? '').toLowerCase()
  if (ort3A < ort3B) return -1
  if (ort3A > ort3B) return 1

  return 0
}
