import { first as first$ } from 'rxjs/operators'
import sortBy from 'lodash/sortBy'

const teilzaehlungsSortByZaehlungTk = async (tzs) => {
  const tzsIdLabel = await Promise.all(
    tzs.map(async (tz) => {
      const zaehlung =
        (await tz.zaehlung?.observe().pipe(first$()).toPromise()) ?? {}
      const zaehlungDatum = zaehlung.datum ?? ''
      const label = (await tz.label?.pipe(first$()).toPromise()) ?? ''

      return {
        id: tz.id,
        sort: [zaehlungDatum, label],
      }
    }),
  )
  return sortBy(tzs, (tz) => tzsIdLabel.find((o) => o.id === tz.id).sort)
}

export default teilzaehlungsSortByZaehlungTk
