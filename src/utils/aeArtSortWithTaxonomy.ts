// seems not used
const aeArtSortWithTaxonomy = (a, b) => {
  if (a?.taxonomy < b?.taxonomy) return -1
  if (a?.taxonomy > b?.taxonomy) return 1

  const nameA = a?.name?.toLowerCase() ?? ''
  const nameB = b?.name?.toLowerCase() ?? ''
  if (nameA < nameB) return -1
  if (nameA > nameB) return 1

  return 0
}

export default aeArtSortWithTaxonomy
