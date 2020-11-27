import { first as first$ } from 'rxjs/operators'
import sortBy from 'lodash/sortBy'

const avsSortByArt = async (avs) => {
  const avsIdLabel = await Promise.all(
    avs.map(async (av) => {
      const label = await av.artLabel.pipe(first$()).toPromise()
      return {
        id: av.id,
        label,
      }
    }),
  )
  return sortBy(avs, (av) => avsIdLabel.find((o) => o.id === av.id).label)
}

export default avsSortByArt
