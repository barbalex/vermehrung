// seems not in use
const qkSort = (a, b) => {
  const sortA = a?.sort ?? ''
  const sortB = b?.sort ?? ''
  if (sortA < sortB) return -1
  if (sortA > sortB) return 1

  const titelA = a?.titel?.toString()?.toLowerCase() ?? ''
  const titelB = b?.titel?.toString()?.toLowerCase() ?? ''
  if (titelA < titelB) return -1
  if (titelA > titelB) return 1

  const nameA = a?.name?.toString()?.toLowerCase() ?? ''
  const nameB = b?.name?.toString()?.toLowerCase() ?? ''
  if (nameA < nameB) return -1
  if (nameA > nameB) return 1

  return 0
}

export default qkSort
