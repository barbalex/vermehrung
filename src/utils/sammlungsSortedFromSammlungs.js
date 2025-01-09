import sortBy from 'lodash/sortBy'
import { first as first$ } from 'rxjs/operators'

import { personFullname } from './personFullname.js'

export const sammlungsSortedFromSammlungs = async (sammlungs) => {
  const sammlungSorters = await Promise.all(
    sammlungs.map(async (sammlung) => {
      const datum = sammlung?.datum ?? ''
      let herkunft
      try {
        herkunft = await sammlung?.herkunft?.fetch()
      } catch {}
      const herkunftNr = herkunft?.nr
      const herkunftGemeinde = herkunft?.gemeinde
      const herkunftLokalname = herkunft?.lokalname
      let person
      try {
        person = await sammlung?.person?.fetch()
      } catch {}
      const fullname = personFullname(person)
      let art
      try {
        art = await sammlung?.art?.fetch()
      } catch {}
      let artLabel = ''
      try {
        artLabel = await art?.label?.pipe(first$()).toPromise()
      } catch {}
      const sort = [
        datum,
        herkunftNr?.toString()?.toLowerCase(),
        herkunftGemeinde?.toString()?.toLowerCase(),
        herkunftLokalname?.toString()?.toLowerCase(),
        fullname?.toString()?.toLowerCase(),
        artLabel?.toString()?.toLowerCase(),
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
