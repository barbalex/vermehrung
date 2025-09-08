import { first as first$ } from 'rxjs/operators'

import { personFullname } from './personFullname.js'

export const sammlungIdsSortedFromSammlungs = async (sammlungs) => {
  const sammlungSorters = await Promise.all(
    sammlungs.map(async (sammlung) => {
      const datum = sammlung?.datum ?? '1000-01-01'
      let herkunft
      try {
        herkunft = await sammlung?.herkunft?.fetch()
      } catch {}
      const herkunftNr = herkunft?.nr
      const herkunftGemeinde = herkunft?.gemeinde
      const herkunftLokalname = herkunft?.lokalname
      let person
      try {
        person = await sammlung?.person?.fetch()
      } catch {}
      const fullname = personFullname(person)
      let art
      try {
        art = await sammlung?.art?.fetch()
      } catch {}
      let artLabel = ''
      try {
        artLabel = await art?.label?.pipe(first$()).toPromise()
      } catch {}

      return {
        id: sammlung.id,
        datum: new Date(datum),
        herkunftNr: herkunftNr ?? 999999,
        herkunftGemeinde:
          herkunftGemeinde?.toString()?.toLowerCase?.() ?? 'zzzz',
        herkunftLokalname:
          herkunftLokalname?.toString()?.toLowerCase?.() ?? 'zzzz',
        fullname: fullname?.toString()?.toLowerCase?.() ?? 'zzzz',
        artLabel: artLabel?.toString()?.toLowerCase?.() ?? 'zzzz',
      }
    }),
  )

  return sammlungSorters
    .sort((a, b) => {
      if (a.datum > b.datum) return -1
      if (a.datum < b.datum) return 1
      if (a.herkunftNr < b.herkunftNr) return -1
      if (a.herkunftNr > b.herkunftNr) return 1
      if (a.herkunftGemeinde < b.herkunftGemeinde) return -1
      if (a.herkunftGemeinde > b.herkunftGemeinde) return 1
      if (a.herkunftLokalname < b.herkunftLokalname) return -1
      if (a.herkunftLokalname > b.herkunftLokalname) return 1
      if (a.fullname < b.fullname) return -1
      if (a.fullname > b.fullname) return 1
      if (a.artLabel < b.artLabel) return -1
      if (a.artLabel > b.artLabel) return 1
      return 0
    })
    .map((s) => s.id)
}
