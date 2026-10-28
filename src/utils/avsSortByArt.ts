import { first as first$ } from 'rxjs/operators'
import { sortBy } from 'es-toolkit'
import type { Av } from '../dbModel.ts'

export const avsSortByArt = async (avs: Av[]) => {
  const avsIdLabel = await Promise.all(
    avs.map(async (av) => {
      let label: unknown = ''
      try {
        label = await av.artLabel.pipe(first$()).toPromise()
      } catch {}

      return {
        id: av.id,
        label,
      }
    }),
  )
  return sortBy(avs, [(av) => avsIdLabel.find((o) => o.id === av.id)?.label])
}
