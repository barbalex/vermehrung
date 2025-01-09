export const fileSort = (a, b) => {
  const nameA = a?.name?.toString()?.toLowerCase() ?? ''
  const nameB = b?.name?.toString()?.toLowerCase() ?? ''
  if (nameA < nameB) return -1
  if (nameA > nameB) return 1

  return 0
}
