export default ({ a, b, store }) => {
  const nameA = a?.garten?.name?.toString()?.toLowerCase() ?? ''
  const nameB = b?.garten?.name?.toString()?.toLowerCase() ?? ''
  if (nameA < nameB) return -1
  if (nameA > nameB) return 1

  const personNameA =
    a?.garten?.person?.fullname?.toString()?.toLowerCase() ?? ''
  const personNameB =
    b?.garten?.person?.fullname?.toString()?.toLowerCase() ?? ''
  if (personNameA < personNameB) return -1
  if (personNameA > personNameB) return 1

  return 0
}
