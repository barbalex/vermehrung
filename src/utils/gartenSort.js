const gartenSort = ({ a, b, store }) => {
  const nameA = a?.name?.toString()?.toLowerCase() ?? ''
  const nameB = b?.name?.toString()?.toLowerCase() ?? ''
  if (nameA < nameB) return -1
  if (nameA > nameB) return 1

  const personA = a?.person_id ? store.persons.get(a.person_id) : {}
  const personB = b?.person_id ? store.persons.get(b.person_id) : {}

  const personNameA = personA?.fullname?.toString()?.toLowerCase() ?? ''
  const personNameB = personB?.fullname?.toString()?.toLowerCase() ?? ''
  if (personNameA < personNameB) return -1
  if (personNameA > personNameB) return 1

  return 0
}

export default gartenSort
