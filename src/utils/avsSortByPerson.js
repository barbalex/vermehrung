import { first as first$ } from 'rxjs/operators'
import sortBy from 'lodash/sortBy'

const avsSortByPerson = async (avs) => {
  const avsIdLabel = await Promise.all(
    avs.map(async (av) => ({
      id: av.id,
      label: await av.personLabel.pipe(first$()).toPromise(),
    })),
  )
  return sortBy(avs, (av) => avsIdLabel.find((o) => o.id === av.id).label)
}

export default avsSortByPerson
