export default (a, b) => {
  const nrA = a?.nr?.toString()?.toLowerCase()
  const nrB = b?.nr?.toString()?.toLowerCase()
  if (nrA < nrB) return -1
  if (nrA > nrB) return 1

  const datumA = new Date(a?.datum ?? null)
  const datumB = new Date(b?.datum ?? null)
  if (datumA < datumB) return -1
  if (datumA > datumB) return 1

  const herkunftNrA = a?.herkunft?.nr?.toString()?.toLowerCase()
  const herkunftNrB = b?.herkunft?.nr?.toString()?.toLowerCase()
  if (herkunftNrA < herkunftNrB) return -1
  if (herkunftNrA > herkunftNrB) return 1

  const herkunftGemeindeA = a?.herkunft?.gemeinde?.toString()?.toLowerCase()
  const herkunftGemeindeB = b?.herkunft?.gemeinde?.toString()?.toLowerCase()
  if (herkunftGemeindeA < herkunftGemeindeB) return -1
  if (herkunftGemeindeA > herkunftGemeindeB) return 1

  const herkunftLokalnameA = a?.herkunft?.lokalname?.toString()?.toLowerCase()
  const herkunftLokalnameB = b?.herkunft?.lokalname?.toString()?.toLowerCase()
  if (herkunftLokalnameA < herkunftLokalnameB) return -1
  if (herkunftLokalnameA > herkunftLokalnameB) return 1

  const personNameA = a?.person?.name?.toString()?.toLowerCase()
  const personNameB = b?.person?.name?.toString()?.toLowerCase()
  if (personNameA < personNameB) return -1
  if (personNameA > personNameB) return 1

  const artNameA = a?.art?.art_ae_art?.name?.toLowerCase()
  const artNameB = b?.art?.art_ae_art?.name?.toLowerCase()
  if (artNameA < artNameB) return -1
  if (artNameA > artNameB) return 1

  return 0
}
