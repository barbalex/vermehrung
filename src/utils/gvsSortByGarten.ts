import { first as first$ } from 'rxjs/operators'
import { sortBy } from 'es-toolkit'
import type { Gv } from '../dbModel.ts'

export const gvsSortByGarten = async (gvs: Gv[]) => {
  const gvsIdLabel = await Promise.all(
    gvs.map(async (gv) => {
      let label: unknown = ''
      try {
        label = await gv.gartenLabel.pipe(first$()).toPromise()
      } catch {}

      return {
        id: gv.id,
        label,
      }
    }),
  )
  return sortBy(gvs, [(gv) => gvsIdLabel.find((o) => o.id === gv.id)?.label])
}
