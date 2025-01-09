import { first as first$ } from 'rxjs/operators'
import sortBy from 'lodash/sortBy'

export const avsSortByPerson = async (avs) => {
  const avsIdLabel = await Promise.all(
    avs.map(async (av) => {
      let label = ''
      try {
        label = await av.personLabel.pipe(first$()).toPromise()
      } catch {}

      return {
        id: av.id,
        label,
      }
    }),
  )
  return sortBy(avs, (av) => avsIdLabel.find((o) => o.id === av.id).label)
}
