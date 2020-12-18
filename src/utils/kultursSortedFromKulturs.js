import sortBy from 'lodash/sortBy'
import { first as first$ } from 'rxjs/operators'

import gartenLabelFromGarten from './gartenLabelFromGarten'

const kultursSortedFromKulturs = async (kulturs) => {
  const kulturSorters = await Promise.all(
    kulturs.map(async (kultur) => {
      const art = await kultur?.art?.fetch()
      const artLabel = await art?.label.pipe(first$()).toPromise()
      const herkunft = await kultur?.herkunft?.fetch()
      const herkunftNr = herkunft?.nr
      const herkunftGemeinde = herkunft?.gemeinde
      const herkunftLokalname = herkunft?.lokalname
      const garten = await kultur?.garten?.fetch()
      const gartenPerson = await garten?.person?.fetch()
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

export default kultursSortedFromKulturs
