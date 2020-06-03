export default (a, b) => {
  const nameA = a?.name?.toString()?.toLowerCase()
  const nameB = b?.name?.toString()?.toLowerCase()
  if (nameA < nameB) return -1
  if (nameA > nameB) return 1

  const personNameA = a?.person?.name?.toString()?.toLowerCase()
  const personNameB = b?.person?.name?.toString()?.toLowerCase()
  if (personNameA < personNameB) return -1
  if (personNameA > personNameB) return 1

  return 0
}
