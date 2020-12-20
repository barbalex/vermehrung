const aeArtSort = (a, b) => {
  const nameA = a?.name?.toLowerCase() ?? ''
  const nameB = b?.name?.toLowerCase() ?? ''
  if (nameA < nameB) return -1
  if (nameA > nameB) return 1

  return 0
}

export default aeArtSort
