import sortBy from 'lodash/sortBy'
import { first as first$ } from 'rxjs/operators'

import personFullname from './personFullname'

const sammlungsSortedFromSammlungs = async (sammlungs) => {
  const sammlungSorters = await Promise.all(
    sammlungs.map(async (sammlung) => {
      const datum = sammlung.datum ?? ''
      const herkunft = await sammlung.herkunft?.fetch()
      const herkunftNr = herkunft?.nr?.toString()?.toLowerCase()
      const herkunftGemeinde = herkunft?.gemeinde?.toString()?.toLowerCase()
      const herkunftLokalname = herkunft?.lokalname?.toString()?.toLowerCase()
      const person = await sammlung.person?.fetch()
      const fullname = personFullname(person)?.toString()?.toLowerCase()
      const art = await sammlung.art?.fetch()
      const artLabel = await art?.label
        .pipe(first$())
        .toPromise()
        ?.toString()
        ?.toLowerCase()
      const sort = [
        datum,
        herkunftNr,
        herkunftGemeinde,
        herkunftLokalname,
        fullname,
        artLabel,
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
