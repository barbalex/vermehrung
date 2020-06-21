export default (a, b) => {
  const artnameA = a?.art?.art_ae_art?.name?.toString()?.toLowerCase()
  const artnameB = b?.art?.art_ae_art?.name?.toString()?.toLowerCase()
  if (artnameA < artnameB) return -1
  if (artnameA > artnameB) return 1

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

  const gartenNameA = a?.garten?.name?.toString()?.toLowerCase()
  const gartenNameB = b?.garten?.name?.toString()?.toLowerCase()
  if (gartenNameA < gartenNameB) return -1
  if (gartenNameA > gartenNameB) return 1

  const gartenPersonNameA = a?.garten?.person?.fullname
    ?.toString()
    ?.toLowerCase()
  const gartenPersonNameB = b?.garten?.person?.fullname
    ?.toString()
    ?.toLowerCase()
  if (gartenPersonNameA < gartenPersonNameB) return -1
  if (gartenPersonNameA > gartenPersonNameB) return 1

  return 0
}
