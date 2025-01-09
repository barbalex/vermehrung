import { first as first$ } from 'rxjs/operators'
import sortBy from 'lodash/sortBy'

export const gvsSortByPerson = async (gvs) => {
  const gvsIdLabel = await Promise.all(
    gvs.map(async (gv) => {
      let label = ''
      try {
        label = await gv.personLabel.pipe(first$()).toPromise()
      } catch {}

      return {
        id: gv.id,
        label,
      }
    }),
  )
  return sortBy(gvs, (gv) => gvsIdLabel.find((o) => o.id === gv.id).label)
}
