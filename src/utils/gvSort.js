export default ({ a, b, store }) => {
  const gartenA = a.garten_id ? store.gartens.get(a.garten_id) : {}
  const gartenB = b.garten_id ? store.gartens.get(b.garten_id) : {}

  const nameA = gartenA?.name?.toString()?.toLowerCase() ?? ''
  const nameB = gartenB?.name?.toString()?.toLowerCase() ?? ''
  if (nameA < nameB) return -1
  if (nameA > nameB) return 1

  const personA = gartenA?.person_id ? store.gartens.get(gartenA.person_id) : {}
  const personB = gartenB?.person_id ? store.gartens.get(gartenB.person_id) : {}

  const personNameA = personA?.fullname?.toString()?.toLowerCase() ?? ''
  const personNameB = personB?.fullname?.toString()?.toLowerCase() ?? ''
  if (personNameA < personNameB) return -1
  if (personNameA > personNameB) return 1

  return 0
}
