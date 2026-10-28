import { sortBy } from 'es-toolkit'
import { first as first$ } from 'rxjs/operators'
import type { Garten } from '../dbModel.ts'

export const gartensSortedFromGartens = async (gartens: Garten[]) => {
  const gartenSorters = await Promise.all(
    gartens.map(async (garten) => {
      let label: unknown = ''
      try {
        label = await garten?.label?.pipe(first$()).toPromise()
      } catch {}
      const sort = String(label ?? '').toLowerCase()

      return { id: garten.id, sort }
    }),
  )
  const gartensSorted = sortBy(gartens, [
    (garten) => gartenSorters.find((s) => s.id === garten.id)?.sort,
  ])
  return gartensSorted
}
