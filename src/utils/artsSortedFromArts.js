import sortBy from 'lodash/sortBy'
import { first as first$ } from 'rxjs/operators'

const artsSortedFromArts = async (arts) => {
  const artSorters = await Promise.all(
    arts.map(async (art) => {
      const label = await art.label.pipe(first$()).toPromise()
      return { id: art.id, label: label?.toString()?.toLowerCase() }
    }),
  )
  const artsSorted = sortBy(
    arts,
    (art) => artSorters.find((s) => s.id === art.id).label,
  )
  return artsSorted
}

export default artsSortedFromArts
