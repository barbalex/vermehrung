import sortBy from 'lodash/sortBy'
import { first as first$ } from 'rxjs/operators'

import personFullname from './personFullname'

const sammlungsSortedFromSammlungs = async (sammlungs) => {
  const sammlungSorters = await Promise.all(
    sammlungs.map(async (sammlung) => {
      const datum = sammlung?.datum ?? ''
      let herkunft
      try {
        herkunft = await sammlung?.herkunft?.fetch()
      } catch (error) {
        // leave herkunft undefined
      }
      const herkunftNr = herkunft?.nr
      const herkunftGemeinde = herkunft?.gemeinde
      const herkunftLokalname = herkunft?.lokalname
      let person
      try {
        person = await sammlung?.person?.fetch()
      } catch (error) {
        // leave person undefined
      }
      const fullname = personFullname(person)
      let art
      try {
        art = await sammlung?.art?.fetch()
      } catch (error) {
        // leave art undefined
      }
      const artLabel = await art?.label?.pipe(first$()).toPromise()
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

export default sammlungsSortedFromSammlungs
