import sortBy from 'lodash/sortBy'
import { first as first$ } from 'rxjs/operators'

const gartensSortedFromGartens = async (gartens) => {
  const gartenSorters = await Promise.all(
    gartens.map(async (garten) => {
      let label = ''
      try {
        label = await garten?.label?.pipe(first$()).toPromise()
      } catch {}
      const sort = label?.toString()?.toLowerCase()

      return { id: garten.id, sort }
    }),
  )
  const gartensSorted = sortBy(
    gartens,
    (garten) => gartenSorters.find((s) => s.id === garten.id).sort,
  )
  return gartensSorted
}

export default gartensSortedFromGartens
