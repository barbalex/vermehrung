import { first as first$ } from 'rxjs/operators'
import sortBy from 'lodash/sortBy'

export const teilzaehlungsSortByZaehlungTk = async (tzs) => {
  const tzsIdLabel = await Promise.all(
    tzs.map(async (tz) => {
      let zaehlung
      try {
        zaehlung = await tz.zaehlung.observe().pipe(first$()).toPromise()
      } catch {}
      const zaehlungDatum = zaehlung?.datum ?? ''
      let label
      try {
        label = await tz.label?.pipe(first$()).toPromise()
      } catch {}

      return {
        id: tz.id,
        sort: [zaehlungDatum, label ?? ''],
      }
    }),
  )
  return sortBy(tzs, (tz) => tzsIdLabel.find((o) => o.id === tz.id).sort)
}
