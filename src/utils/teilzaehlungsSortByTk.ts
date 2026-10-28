import { first as first$ } from 'rxjs/operators'
import { sortBy } from 'es-toolkit'
import type { Teilzaehlung } from '../dbModel.ts'

export const teilzaehlungsSortByTk = async (tzs: Teilzaehlung[]) => {
  const tzsIdLabel = await Promise.all(
    tzs.map(async (tz) => {
      let label: unknown = ''
      try {
        label = await tz.label?.pipe(first$()).toPromise()
      } catch {}

      return {
        id: tz.id,
        label,
      }
    }),
  )
  return sortBy(tzs, [(tz) => tzsIdLabel.find((o) => o.id === tz.id)?.label])
}
