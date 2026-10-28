import { sortBy } from 'es-toolkit'
import { first as first$ } from 'rxjs/operators'
import type { Art } from '../dbModel.ts'

export const artsSortedFromArts = async (arts: Art[]) => {
  const artSorters = await Promise.all(
    arts.map(async (art) => {
      let label: unknown = ''
      try {
        label = await art.label.pipe(first$()).toPromise()
      } catch {}

      return { id: art.id, label: String(label ?? '').toLowerCase() }
    }),
  )
  const artsSorted = sortBy(arts, [
    (art) => artSorters.find((s) => s.id === art.id)?.label,
  ])
  return artsSorted
}
