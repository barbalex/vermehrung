export default (a, b) => {
  const nameA = a?.art?.art_ae_art?.name?.toLowerCase()
  const nameB = b?.art?.art_ae_art?.name?.toLowerCase()
  if (nameA < nameB) return -1
  if (nameA > nameB) return 1

  return 0
}
