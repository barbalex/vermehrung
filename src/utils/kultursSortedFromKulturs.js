import sortBy from 'lodash/sortBy'
import { first as first$ } from 'rxjs/operators'

import gartenLabelFromGarten from './gartenLabelFromGarten.js'

export const kultursSortedFromKulturs = async (kulturs) => {
  const kulturSorters = await Promise.all(
    kulturs.map(async (kultur) => {
      let art
      try {
        art = await kultur?.art?.fetch()
      } catch {}
      let artLabel
      try {
        artLabel = await art?.label.pipe(first$()).toPromise()
      } catch {}
      let herkunft
      try {
        herkunft = await kultur?.herkunft?.fetch()
      } catch {}
      const herkunftNr = herkunft?.nr
      const herkunftGemeinde = herkunft?.gemeinde
      const herkunftLokalname = herkunft?.lokalname
      let garten
      try {
        garten = await kultur?.garten?.fetch()
      } catch {}
      let gartenPerson
      try {
        gartenPerson = await garten?.person?.fetch()
      } catch {}
      const gartenLabel = await gartenLabelFromGarten({
        garten,
        person: gartenPerson,
        kein: 'kein Garten',
      })
      const sort = [
        artLabel?.toString()?.toLowerCase(),
        herkunftNr?.toString()?.toLowerCase(),
        herkunftGemeinde?.toString()?.toLowerCase(),
        herkunftLokalname?.toString()?.toLowerCase(),
        gartenLabel?.toString()?.toLowerCase(),
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
