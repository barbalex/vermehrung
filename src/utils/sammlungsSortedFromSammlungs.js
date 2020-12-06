import sortBy from 'lodash/sortBy'

import personFullname from './personFullname'
import artLabelFromAeArt from './artLabelFromAeArt'

const sammlungsSortedFromSammlungs = async (sammlungs) => {
  const sammlungSorters = await Promise.all(
    sammlungs.map(async (sammlung) => {
      const datum = sammlung.datum ?? ''
      const herkunft = await sammlung.herkunft.fetch()
      const herkunftNr = herkunft?.nr?.toString()?.toLowerCase()
      const herkunftGemeinde = herkunft?.gemeinde?.toString()?.toLowerCase()
      const herkunftLokalname = herkunft?.lokalname?.toString()?.toLowerCase()
      const person = await sammlung.person.fetch()
      const fullname = personFullname(person)?.toString()?.toLowerCase()
      const art = await sammlung.art.fetch()
      const ae_art = art ? await art.ae_art.fetch() : undefined
      const aeArtLabel = artLabelFromAeArt({ ae_art })
        ?.toString()
        ?.toLowerCase()
      const sort = [
        datum,
        herkunftNr,
        herkunftGemeinde,
        herkunftLokalname,
        fullname,
        aeArtLabel,
      ]

      return { id: sammlung.id, sort }
    }),
  )
  const sammlungsSorted = sortBy(
    sammlungs,
    (sammlung) => sammlungSorters.find((s) => s.id === sammlung.id).sort,
  )
  return sammlungsSorted
}

export default sammlungsSortedFromSammlungs
