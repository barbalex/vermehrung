import { first as first$ } from 'rxjs/operators'
import { sortBy } from 'es-toolkit'

export const gvsSortByGarten = async (gvs) => {
  const gvsIdLabel = await Promise.all(
    gvs.map(async (gv) => {
      let label = ''
      try {
        label = await gv.gartenLabel.pipe(first$()).toPromise()
      } catch {}

      return {
        id: gv.id,
        label,
      }
    }),
  )
  return sortBy(gvs, [(gv) => gvsIdLabel.find((o) => o.id === gv.id).label])
}
