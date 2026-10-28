import { personFullname } from './personFullname.ts'

export const personSort = <T extends object>(
  a: T | null | undefined,
  b: T | null | undefined,
) => {
  const nameA = personFullname(a)?.toString()?.toLowerCase() ?? ''
  const nameB = personFullname(b)?.toString()?.toLowerCase() ?? ''
  if (nameA < nameB) return -1
  if (nameA > nameB) return 1

  return 0
}
