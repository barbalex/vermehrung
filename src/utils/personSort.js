export default (a, b) => {
  const nameA = a?.fullname?.toString()?.toLowerCase()
  const nameB = b?.fullname?.toString()?.toLowerCase()
  if (nameA < nameB) return -1
  if (nameA > nameB) return 1

  return 0
}
