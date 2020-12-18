import sortBy from 'lodash/sortBy'
import { first as first$ } from 'rxjs/operators'

const kultursSortedFromKulturs = async (kulturs) => {
  const kulturSorters = await Promise.all(
    kulturs.map(async (kultur) => {
      console.log({ kultur })
      const art = await kultur?.art?.fetch()
      console.log({ art })
      const artLabel = await art?.label.pipe(first$()).toPromise()
      console.log({ artLabel })
      const herkunft = await kultur?.herkunft?.fetch()
      console.log({ herkunft })
      const herkunftNr = herkunft?.nr?.toString()?.toLowerCase()
      console.log({ herkunftNr })
      const herkunftGemeinde = herkunft?.gemeinde?.toString()?.toLowerCase()
      console.log({ herkunftGemeinde })
      const herkunftLokalname = herkunft?.lokalname?.toString()?.toLowerCase()
      console.log({ herkunftLokalname })
      const garten = await kultur?.garten?.fetch()
      console.log({ garten })
      const gartenLabel =
        (await garten?.label
          .pipe(first$())
          .toPromise()
          ?.toString()
          ?.toLowerCase()) ?? 'kein Garten'
      console.log({ gartenLabel })
      const sort = [
        artLabel,
        herkunftNr,
        herkunftGemeinde,
        herkunftLokalname,
        gartenLabel,
      ]

      return { id: kultur.id, sort }
    }),
  )
  const kultursSorted = sortBy(
    kulturs,
    (kultur) => kulturSorters.find((s) => s.id === kultur.id).sort,
  )
  return kultursSorted
}

export default kultursSortedFromKulturs
