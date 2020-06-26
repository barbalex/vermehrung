import sortBy from 'lodash/sortBy'
import uniq from 'lodash/uniq'
import sum from 'lodash/sum'
import max from 'lodash/max'

import exists from '../../../../../utils/exists'
import kulturSort from '../../../../../utils/kulturSort'
import zaehlungSort from '../../../../../utils/zaehlungSort'

export default ({ artId, store }) => {
  const { zaehlungsSorted, sammlungsSorted, lieferungsSorted } = store

  const zaehlungsDone = zaehlungsSorted
    .filter((z) => z?.kultur?.art_id === artId)
    .filter((z) => z.prognose === false)
    .filter((z) => !!z.datum)
    // TODO: need to add here when adding other anzahlen
    .filter((z) =>
      exists(z?.teilzaehlungs_aggregate?.aggregate?.sum?.anzahl_pflanzen),
    )
  const zaehlungsPlannedAll = zaehlungsSorted
    .filter((z) => z?.kultur?.art_id === artId)
    .filter((z) => z.prognose === true)
    .filter((z) => !!z.datum)
    // TODO: need to add here when adding other anzahlen
    .filter((z) =>
      exists(z?.teilzaehlungs_aggregate?.aggregate?.sum?.anzahl_pflanzen),
    )
  const zaehlungsPlannedIgnored = zaehlungsPlannedAll.filter((zg) =>
    // check if more recent zaehlungsDone exists
    zaehlungsDone.some((z) => z.datum >= zg.datum),
  )
  const zaehlungsPlanned = zaehlungsPlannedAll.filter(
    (lg) => !zaehlungsPlannedIgnored.map((l) => l.id).includes(lg.id),
  )

  const sammlungsDone = sammlungsSorted
    .filter((z) => z.art_id === artId)
    .filter((z) => !z.geplant)
    .filter((z) => !!z.datum)
    // TODO: need to add here when adding other anzahlen
    .filter((z) => exists(z.anzahl_pflanzen))
  const sammlungsPlannedAll = sammlungsSorted
    .filter((z) => z.art_id === artId)
    .filter((z) => z.geplant)
    .filter((z) => !!z.datum)
    // TODO: need to add here when adding other anzahlen
    .filter((z) => exists(z.anzahl_pflanzen))
  const sammlungsPlannedIgnored = sammlungsPlannedAll.filter((zg) =>
    // check if more recent zaehlungsDone exists
    sammlungsDone.some((z) => z.datum >= zg.datum),
  )
  const sammlungsPlanned = sammlungsPlannedAll.filter(
    (lg) => !sammlungsPlannedIgnored.map((l) => l.id).includes(lg.id),
  )

  const lieferungsDone = lieferungsSorted
    .filter((z) => z.art_id === artId)
    .filter((z) => z.nach_ausgepflanzt)
    .filter((z) => !z.geplant)
    .filter((z) => !!z.anzahl_pflanzen)
    .filter((z) => !!z.datum)
  const lieferungsPlannedAll = lieferungsSorted
    .filter((z) => z.art_id === artId)
    .filter((z) => z.nach_ausgepflanzt)
    .filter((z) => z.geplant)
    .filter((z) => !!z.anzahl_pflanzen)
    .filter((z) => !!z.datum)
  const lieferungsPlannedIgnored = lieferungsPlannedAll.filter((zg) =>
    // check if more recent zaehlungsDone exists
    lieferungsDone.some((z) => z.datum >= zg.datum),
  )
  const lieferungsPlanned = lieferungsPlannedAll.filter(
    (lg) => !lieferungsPlannedIgnored.map((l) => l.id).includes(lg.id),
  )

  const allDataRaw = sortBy(
    [
      ...zaehlungsDone,
      ...zaehlungsPlanned,
      ...sammlungsDone,
      ...sammlungsPlanned,
      ...lieferungsDone,
      ...lieferungsPlanned,
    ],
    'datum',
  )

  // 1. get list of all dates when something was counted
  const dates = uniq(allDataRaw.map((z) => z.datum))
  // 2. get list of all non deleted kulturs
  //    these are the basis for counting:
  //    at every date the last count is used
  const kultursOfArt = [...store.kulturs.values()]
    .filter((a) => !a._deleted)
    .filter((z) => z.art_id === artId)
    // sorting not needed?
    .sort(kulturSort)
  // 3. for every date get:
  //    - sum of last zaehlung
  //    - whether last zahlung includes prognose

  return dates.map((date) => {
    const sammlungsDoneNow = sammlungsDone.filter((s) => s.datum === date)
    const sammlungsCountNow = sammlungsDoneNow.length
    const sammlungNowSumList = sammlungsDoneNow
      .map((s) => s.anzahl_pflanzen)
      .filter((s) => exists(s))
    const sammlungNow = sammlungNowSumList.length
      ? sum(sammlungNowSumList)
      : undefined
    const sammlungsPlannedNow = sammlungsPlanned.filter((s) => s.datum === date)
    // ensure no value returned of no anzahl exist
    const sammlungPlannedNowSumList = sammlungsPlannedNow
      .map((s) => s?.anzahl_pflanzen)
      .filter((s) => exists(s))
    const sammlungPlannedNow = sammlungPlannedNowSumList.length
      ? sum(sammlungPlannedNowSumList)
      : undefined
    const sammlungNowSum = {
      anzahl_pflanzen: sum(sammlungNowSumList) + sum(sammlungPlannedNowSumList),
      geplant: !!sammlungPlannedNowSumList.length,
    }

    const lieferungsDoneNow = lieferungsDone.filter((s) => s.datum === date)
    const lieferungsCountNow = lieferungsDoneNow.length
    const lieferungNowSumList = lieferungsDoneNow.map((s) => s.anzahl_pflanzen)
    const lieferungNow = lieferungNowSumList.length
      ? -sum(lieferungNowSumList)
      : undefined
    const lieferungsPlannedNow = lieferungsPlanned.filter(
      (s) => s.datum === date,
    )
    const lieferungPlannedNowSumList = lieferungsPlannedNow.map(
      (s) => s.anzahl_pflanzen,
    )
    const lieferungPlannedNow = lieferungPlannedNowSumList.length
      ? -sum(lieferungPlannedNowSumList)
      : undefined
    const lieferungNowSum = {
      anzahl_pflanzen:
        sum(lieferungNowSumList) + sum(lieferungPlannedNowSumList),
      geplant: !!lieferungPlannedNowSumList.length,
    }

    const lastZaehlungen = kultursOfArt.map((k) => {
      // for every kultur return
      // last zaehlung and whether it is prognose
      const lastZaehlungDatum = max(
        k?.zaehlungs
          .map((z) => z.datum)
          .filter((d) => !!d)
          .filter((d) => d <= date),
      )
      const lastZaehlungs = k?.zaehlungs
        .filter((z) => !!z.datum)
        .filter((z) => z.datum === lastZaehlungDatum)
        .filter(
          (z) => !!z?.teilzaehlungs_aggregate?.aggregate?.sum?.anzahl_pflanzen,
        )
      // if no zaehlung exists yet, need to set 0
      const lastZaehlungAnzahlPflanzen = sum(
        lastZaehlungs.map(
          (z) => z.teilzaehlungs_aggregate.aggregate.sum.anzahl_pflanzen,
        ),
      )

      const sammlungsSinceLastZaehlung = k?.lieferungsByNachKulturId
        .filter((l) => !!l.von_sammlung_id)
        .filter((l) => l.art_id === artId)
        .filter((l) => !!l.datum)
        .filter((l) => !!l.anzahl_pflanzen)
        .filter((l) => l.datum > lastZaehlungDatum && l.datum <= date)
      const sammlungsSinceAnzahlPflanzen = sum(
        sammlungsSinceLastZaehlung.map((s) => s.anzahl_pflanzen),
      )

      const lieferungsSinceLastZaehlung = k?.lieferungsByVonKulturId
        .filter((l) => !!l.nach_ausgepflanzt)
        .filter((l) => l.art_id === artId)
        .filter((l) => !!l.datum)
        .filter((l) => !!l.anzahl_pflanzen)
        .filter((l) => l.datum > lastZaehlungDatum && l.datum <= date)
      const lieferungsSinceAnzahlPflanzen = sum(
        lieferungsSinceLastZaehlung.map((s) => s.anzahl_pflanzen),
      )
      const anzahlNow =
        lastZaehlungAnzahlPflanzen +
        sammlungsSinceAnzahlPflanzen -
        lieferungsSinceAnzahlPflanzen

      date === '2021-09-01' &&
        console.log('buildData, lastZaehlungen', {
          lastZaehlungAnzahlPflanzen,
          sammlungsSinceAnzahlPflanzen,
          lieferungsSinceAnzahlPflanzen,
          lastZaehlungDatum,
          anzahlNow,
          lieferungsSinceLastZaehlung,
          sammlungsSinceLastZaehlung,
          lastZaehlungsLength: lastZaehlungs.length,
        })

      return {
        anzahl_pflanzen: anzahlNow,
        geplant: lastZaehlungs.some((z) => z.prognose),
      }
    })
    const lastZaehlungenSum = {
      anzahl_pflanzen: sum(lastZaehlungen.map((z) => z.anzahl_pflanzen)),
      geplant: lastZaehlungen.some((z) => z.geplant),
    }

    const zaehlungsDoneNow = zaehlungsDone.filter((s) => s.datum === date)
    const zaehlungsCountNow = zaehlungsDoneNow.length

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

    const data = {
      datum: date,
      berechnet:
        lastZaehlungenSum.anzahl_pflanzen +
        sammlungNowSum.anzahl_pflanzen -
        lieferungNowSum.anzahl_pflanzen,
      Sammlung: sammlungNow,
      'Sammlung geplant': sammlungPlannedNow,
      Auspflanzung: lieferungNow,
      'Auspflanzung geplant': lieferungPlannedNow,
      title: [zaehlungsTitle, sammlungsTitle, lieferungsTitle]
        .filter((e) => !!e)
        .join(', '),
    }
    date === '2021-09-01' &&
      console.log('buildData', {
        lieferungsDone,
        lieferungPlannedNow,
        lieferungNowSum,
        lastZaehlungenSum,
        sammlungNowSum,
        lieferungNow,
        data,
        lieferungsDoneNow,
      })
    return data
  })
}
