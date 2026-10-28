import { first as first$ } from 'rxjs/operators'
import { sortBy } from 'es-toolkit'
import type { Gv } from '../dbModel.ts'

export const gvsSortByPerson = async (gvs: Gv[]) => {
  const gvsIdLabel = await Promise.all(
    gvs.map(async (gv) => {
      let label: unknown = ''
      try {
        label = await gv.personLabel.pipe(first$()).toPromise()
      } catch {}

      return {
        id: gv.id,
        label,
      }
    }),
  )
  return sortBy(gvs, [(gv) => gvsIdLabel.find((o) => o.id === gv.id)?.label])
}
