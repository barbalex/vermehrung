export const userRoleSort = <T extends object>(
  a: T | null | undefined,
  b: T | null | undefined,
) => {
  const ra = a as Record<string, unknown> | undefined
  const rb = b as Record<string, unknown> | undefined
  const sortA = String(ra?.sort ?? '')
  const sortB = String(rb?.sort ?? '')
  if (sortA < sortB) return -1
  if (sortA > sortB) return 1

  const nameA = String(ra?.name ?? '').toLowerCase()
  const nameB = String(rb?.name ?? '').toLowerCase()
  if (nameA < nameB) return -1
  if (nameA > nameB) return 1

  return 0
}
