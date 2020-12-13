import sortBy from 'lodash/sortBy'
import { first as first$ } from 'rxjs/operators'

import artLabelFromAeArt from './artLabelFromAeArt'

const kultursSortedFromKulturs = async (kulturs) => {
  const kulturSorters = await Promise.all(
    kulturs.map(async (kultur) => {
      const art = await kultur.art.fetch()
      const ae_art = art ? await art.ae_art.fetch() : undefined
      const aeArtLabel = artLabelFromAeArt({ ae_art })
        ?.toString()
        ?.toLowerCase()
      const herkunft = await kultur.herkunft.fetch()
      const herkunftNr = herkunft?.nr?.toString()?.toLowerCase()
      const herkunftGemeinde = herkunft?.gemeinde?.toString()?.toLowerCase()
      const herkunftLokalname = herkunft?.lokalname?.toString()?.toLowerCase()
      const garten = await kultur.garten.fetch()
      const gartenLabel = await garten.label
        .pipe(first$())
        .toPromise()
        ?.toString()
        ?.toLowerCase()
      const sort = [
        aeArtLabel,
        herkunftNr,
        herkunftGemeinde,
        herkunftLokalname,
        gartenLabel,
      ]
      return { id: kultur.id, sort }
    }),
  )
  const kultursSorted = sortBy(
    kulturs,
    (kultur) => kulturSorters.find((s) => s.id === kultur.id).sort,
  )
  return kultursSorted
}

export default kultursSortedFromKulturs
