import { first as first$ } from 'rxjs/operators'
import sortBy from 'lodash/sortBy'

const tzsSortByTk = async (tzs) => {
  const tzsIdLabel = await Promise.all(
    tzs.map(async (tz) => {
      const label = await tz.tzLabel.pipe(first$()).toPromise()
      return {
        id: tz.id,
        label,
      }
    }),
  )
  return sortBy(tzs, (tz) => tzsIdLabel.find((o) => o.id === tz.id).label)
}

export default tzsSortByTk
