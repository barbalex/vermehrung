import artLabelFromSammlung from './artLabelFromSammlung'

export default ({ a, b, store }) => {
  const nrA = a?.nr?.toString()?.toLowerCase() ?? ''
  const nrB = b?.nr?.toString()?.toLowerCase() ?? ''
  if (nrA < nrB) return -1
  if (nrA > nrB) return 1

  const datumA = a?.datum ? new Date(a.datum) : ''
  const datumB = b?.datum ? new Date(b.datum) : ''
  if (datumA < datumB) return -1
  if (datumA > datumB) return 1

  const herkunftA = a.herkunft_id ? store.herkunfts.get(a.herkunft_id) : {}
  const herkunftB = b.herkunft_id ? store.herkunfts.get(b.herkunft_id) : {}

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

  const personA = a.person_id ? store.persons.get(a.person_id) : {}
  const personB = b.person_id ? store.persons.get(b.person_id) : {}

  const personNameA = personA?.fullname?.toString()?.toLowerCase() ?? ''
  const personNameB = personB?.fullname?.toString()?.toLowerCase() ?? ''
  if (personNameA < personNameB) return -1
  if (personNameA > personNameB) return 1

  const artNameA = artLabelFromSammlung({ sammlung: a, store })
  const artNameB = artLabelFromSammlung({ sammlung: b, store })
  if (artNameA < artNameB) return -1
  if (artNameA > artNameB) return 1

  return 0
}
