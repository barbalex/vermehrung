import artLabelFromKultur from './artLabelFromKultur'

const kulturSort = ({ a, b, store }) => {
  const artnameA = artLabelFromKultur({ kultur: a, store })
    .toString()
    ?.toLowerCase()
  const artnameB = artLabelFromKultur({ kultur: b, store })
    .toString()
    ?.toLowerCase()
  if (artnameA < artnameB) return -1
  if (artnameA > artnameB) return 1

  const herkunftA = a?.herkunft_id ? store.herkunfts.get(a.herkunft_id) : {}
  const herkunftB = b?.herkunft_id ? store.herkunfts.get(b.herkunft_id) : {}

  const herkunftNrA = herkunftA?.nr?.toString()?.toLowerCase() ?? ''
  const herkunftNrB = herkunftB?.nr?.toString()?.toLowerCase() ?? ''
  if (herkunftNrA < herkunftNrB) return -1
  if (herkunftNrA > herkunftNrB) return 1

  const herkunftGemeindeA = herkunftA?.gemeinde?.toString()?.toLowerCase() ?? ''
  const herkunftGemeindeB = herkunftB?.gemeinde?.toString()?.toLowerCase() ?? ''
  if (herkunftGemeindeA < herkunftGemeindeB) return -1
  if (herkunftGemeindeA > herkunftGemeindeB) return 1

  const herkunftLokalnameA =
    herkunftA?.lokalname?.toString()?.toLowerCase() ?? ''
  const herkunftLokalnameB =
    herkunftB?.lokalname?.toString()?.toLowerCase() ?? ''
  if (herkunftLokalnameA < herkunftLokalnameB) return -1
  if (herkunftLokalnameA > herkunftLokalnameB) return 1

  const gartenA = a?.garten_id ? store.gartens.get(a.garten_id) : {}
  const gartenB = b?.garten_id ? store.gartens.get(b.garten_id) : {}

  const gartenNameA = gartenA?.name?.toString()?.toLowerCase() ?? ''
  const gartenNameB = gartenB?.name?.toString()?.toLowerCase() ?? ''
  if (gartenNameA < gartenNameB) return -1
  if (gartenNameA > gartenNameB) return 1

  const gartenPersonA = gartenA?.person_id
    ? store.persons.get(gartenA.person_id)
    : {}
  const gartenPersonB = gartenB?.person_id
    ? store.persons.get(gartenB.person_id)
    : {}

  const gartenPersonNameA =
    gartenPersonA?.fullname?.toString()?.toLowerCase() ?? ''
  const gartenPersonNameB =
    gartenPersonB?.fullname?.toString()?.toLowerCase() ?? ''
  if (gartenPersonNameA < gartenPersonNameB) return -1
  if (gartenPersonNameA > gartenPersonNameB) return 1

  if (a?.zwischenlager) return 1

  return 0
}

export default kulturSort
