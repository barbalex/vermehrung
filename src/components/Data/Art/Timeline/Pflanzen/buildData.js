import sortBy from 'lodash/sortBy'
import uniq from 'lodash/uniq'
import sum from 'lodash/sum'

import exists from '../../../../../utils/exists'

export default ({ artId, store }) => {
  const { zaehlungsSorted, sammlungsSorted, lieferungsSorted } = store

  const now = new Date().getTime()

  const zaehlungsDone = zaehlungsSorted
    .filter((z) => z?.kultur?.art_id === artId)
    .filter((z) => z.prognose === false)
    .filter((z) => !!z.datum)
    // TODO: need to add here when adding other anzahlen
    .filter((z) =>
      exists(z?.teilzaehlungs_aggregate?.aggregate?.sum?.anzahl_pflanzen),
    )
  const zaehlungsPlanned = zaehlungsSorted
    .filter((z) => z?.kultur?.art_id === artId)
    .filter((z) => z.prognose === true)
    .filter((z) => !!z.datum)
    // TODO: need to add here when adding other anzahlen
    .filter((z) =>
      exists(z?.teilzaehlungs_aggregate?.aggregate?.sum?.anzahl_pflanzen),
    )
  const zaehlungsPlannedIgnored = zaehlungsPlanned.filter((zg) =>
    // check if more recent zaehlungsDone exists
    zaehlungsDone.some(
      (z) => new Date(z.datum).getTime() >= new Date(zg.datum).getTime(),
    ),
  )
  const zaehlungsPlannedIncluded = zaehlungsPlanned.filter(
    (lg) => !zaehlungsPlannedIgnored.map((l) => l.id).includes(lg.id),
  )

  const sammlungsDone = sammlungsSorted
    .filter((z) => z.art_id === artId)
    .filter((z) => !z.geplant)
    .filter((z) => !!z.datum)
    .filter((z) => new Date(z.datum).getTime() <= now)
    // TODO: need to add here when adding other anzahlen
    .filter((z) => exists(z.anzahl_pflanzen))
  const sammlungsPlanned = sammlungsSorted
    .filter((z) => z.art_id === artId)
    .filter((z) => z.geplant)
    .filter((z) => !!z.datum)
    // TODO: need to add here when adding other anzahlen
    .filter((z) => exists(z.anzahl_pflanzen))
  const sammlungsPlannedIgnored = sammlungsPlanned.filter((zg) =>
    // check if more recent zaehlungsDone exists
    sammlungsDone.some((z) => z.datum >= zg.datum),
  )
  const sammlungsPlannedIncluded = sammlungsPlanned.filter(
    (lg) => !sammlungsPlannedIgnored.map((l) => l.id).includes(lg.id),
  )

  const lieferungsDone = lieferungsSorted
    .filter((z) => z.art_id === artId)
    .filter((z) => z.nach_ausgepflanzt)
    .filter((z) => !z.geplant)
    .filter((z) => !!z.datum)
    .filter((z) => new Date(z.datum).getTime() <= now)
    // TODO: need to add here when adding other anzahlen
    .filter((z) => exists(z.anzahl_pflanzen))
  const lieferungsPlanned = lieferungsSorted
    .filter((z) => z.art_id === artId)
    .filter((z) => z.nach_ausgepflanzt)
    .filter((z) => z.geplant)
    .filter((z) => !!z.datum)
    // TODO: need to add here when adding other anzahlen
    .filter((z) => exists(z.anzahl_pflanzen))
  const lieferungsPlannedIgnored = lieferungsPlanned.filter((zg) =>
    // check if more recent zaehlungsDone exists
    lieferungsDone.some((z) => z.datum >= zg.datum),
  )
  const lieferungsPlannedIncluded = lieferungsPlanned.filter(
    (lg) => !lieferungsPlannedIgnored.map((l) => l.id).includes(lg.id),
  )

  const allDataRaw = sortBy(
    [
      ...zaehlungsDone,
      ...zaehlungsPlannedIncluded,
      ...sammlungsDone,
      ...sammlungsPlannedIncluded,
      ...lieferungsDone,
      ...lieferungsPlannedIncluded,
    ],
    'datum',
  )

  const dates = uniq(allDataRaw.map((z) => z.datum))
  const datasets = dates.map((date) => {
    const sammlungsDoneNow = sammlungsDone.filter((s) => s.datum === date)
    const sammlungsCountNow = sammlungsDoneNow.length
    const sammlungNowSumList = sammlungsDoneNow
      .map((s) => s.anzahl_pflanzen)
      .filter((s) => exists(s))
    const sammlungNow = sammlungNowSumList.length
      ? sum(sammlungNowSumList)
      : undefined
    const sammlungsPlannedNow = sammlungsPlannedIncluded.filter(
      (s) => s.datum === date,
    )
    // ensure no value returned of no anzahl exist
    const sammlungPlannedNowSumList = sammlungsPlannedNow
      .map((s) => s?.anzahl_pflanzen)
      .filter((s) => exists(s))
    const sammlungPlannedNow = sammlungPlannedNowSumList.length
      ? sum(sammlungPlannedNowSumList)
      : undefined
    const lieferungsDoneNow = lieferungsDone.filter((s) => s.datum === date)
    const lieferungsCountNow = lieferungsDoneNow.length
    const lieferungNowSumList = lieferungsDoneNow.map((s) => s.anzahl_pflanzen)
    const lieferungNow = lieferungNowSumList.length
      ? -sum(lieferungNowSumList)
      : undefined
    const lieferungsPlannedNow = lieferungsPlannedIncluded.filter(
      (s) => s.datum === date,
    )
    const lieferungPlannedNowSumList = lieferungsPlannedNow.map(
      (s) => s.anzahl_pflanzen,
    )
    const lieferungPlannedNow = lieferungPlannedNowSumList.length
      ? -sum(lieferungPlannedNowSumList)
      : undefined

    const zaehlungsDoneNow = zaehlungsDone.filter((s) => s.datum === date)
    const zaehlungsCountNow = zaehlungsDoneNow.length
    const zaehlungNowSumList = zaehlungsDoneNow.map(
      (s) => s.teilzaehlungs_aggregate.aggregate.sum.anzahl_pflanzen,
    )
    const zaehlungNow = zaehlungNowSumList.length
      ? sum(zaehlungNowSumList)
      : undefined
    const zaehlungsPlannedNow = zaehlungsPlannedIncluded.filter(
      (s) => s.datum === date,
    )
    const zaehlungPlannedNowSumList = zaehlungsPlannedNow.map(
      (s) => s?.teilzaehlungs_aggregate?.aggregate?.sum?.anzahl_pflanzen,
    )
    const zaehlungPlannedNow = zaehlungPlannedNowSumList.length
      ? sum(zaehlungPlannedNowSumList)
      : undefined

    let anzahlNow = zaehlungNow ?? zaehlungPlannedNow
    if (anzahlNow === undefined) {
      // it is possible that multiple counts occured at last date
      // 1. get last date
      const lastZaehlungDate = zaehlungsDone
        .filter((z) => new Date(z.datum).getTime() < new Date(date).getTime())
        .slice(-1)[0]?.datum
      // 2. get zahlungs with that date
      const previousZaehlungs = zaehlungsDone.filter(
        (z) => z.datum === lastZaehlungDate,
      )
      // 3. sum them
      const anzahlBefore = sum(
        previousZaehlungs.map(
          (p) => p.teilzaehlungs_aggregate.aggregate.sum.anzahl_pflanzen,
        ),
      )

      const lastZaehlungTime = lastZaehlungDate
        ? new Date(lastZaehlungDate).getTime()
        : 1
      const sammlungsDoneSince = sammlungsDoneNow
        .filter((s) => !!s.datum)
        .filter((s) => {
          const ownTime = new Date(s.datum).getTime()
          return ownTime > lastZaehlungTime && ownTime < now
        })
      const lieferungsDoneSince = lieferungsDoneNow
        .filter((s) => !!s.datum)
        .filter((s) => {
          const ownTime = new Date(s.datum).getTime()
          return ownTime > lastZaehlungTime && ownTime < now
        })
      const anzahlSammlungsDoneSince = sum(
        sammlungsDoneSince.map((s) => s.anzahl_pflanzen),
      )
      const anzahlLieferungsDoneSince = sum(
        lieferungsDoneSince.map((l) => l.anzahl_pflanzen),
      )
      anzahlNow =
        anzahlBefore + anzahlSammlungsDoneSince - anzahlLieferungsDoneSince
    }
    const zaehlungsTitle = zaehlungsCountNow
      ? zaehlungsCountNow === 1
        ? 'Zählung'
        : `${zaehlungsCountNow} Zählungen`
      : undefined
    const sammlungsTitle = sammlungsCountNow
      ? sammlungsCountNow === 1
        ? 'Sammlung'
        : `${sammlungsCountNow} Sammlungen`
      : undefined
    const lieferungsTitle = lieferungsCountNow
      ? lieferungsCountNow === 1
        ? 'Aus-Pflanzung'
        : `${lieferungsCountNow} Aus-Pflanzungen`
      : undefined

    return {
      datum: date,
      berechnet: anzahlNow,
      Sammlung: sammlungNow,
      'Sammlung geplant': sammlungPlannedNow,
      Auspflanzung: lieferungNow,
      'Auspflanzung geplant': lieferungPlannedNow,
      Zählung: zaehlungNow,
      Prognose: zaehlungPlannedNow,
      title: [zaehlungsTitle, sammlungsTitle, lieferungsTitle]
        .filter((e) => !!e)
        .join(', '),
    }
  })
  return datasets
}
