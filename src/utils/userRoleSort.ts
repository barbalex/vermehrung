export const userRoleSort = (a, b) => {
  const sortA = a.sort ?? ''
  const sortB = b.sort ?? ''
  if (sortA < sortB) return -1
  if (sortA > sortB) return 1

  const nameA = a?.name?.toString()?.toLowerCase() ?? ''
  const nameB = b?.name?.toString()?.toLowerCase() ?? ''
  if (nameA < nameB) return -1
  if (nameA > nameB) return 1

  return 0
}
