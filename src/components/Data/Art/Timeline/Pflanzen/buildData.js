import sortBy from 'lodash/sortBy'
import uniq from 'lodash/uniq'
import sum from 'lodash/sum'
import max from 'lodash/max'

import exists from '../../../../../utils/exists'
import kulturSort from '../../../../../utils/kulturSort'

export default ({ artId, store }) => {
  const { zaehlungsSorted, sammlungsSorted, lieferungsSorted } = store

  const zaehlungsDone = zaehlungsSorted
    .filter((z) => z?.kultur?.art_id === artId)
    .filter((z) => z.prognose === false)
    .filter((z) => !!z.datum)
    .filter((z) =>
      exists(z?.teilzaehlungs_aggregate?.aggregate?.sum?.anzahl_pflanzen),
    )
  const zaehlungsPlannedAll = zaehlungsSorted
    .filter((z) => z?.kultur?.art_id === artId)
    .filter((z) => z.prognose === true)
    .filter((z) => !!z.datum)
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
    .filter((z) => exists(z.anzahl_pflanzen))
  const sammlungsPlannedAll = sammlungsSorted
    .filter((z) => z.art_id === artId)
    .filter((z) => z.geplant)
    .filter((z) => !!z.datum)
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

    const lieferungsNow = lieferungsDone.filter((s) => s.datum === date)
    const lieferungNowSumList = lieferungsNow.map((s) => s.anzahl_pflanzen)
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

    const lastZaehlungsByKultur = kultursOfArt.map((k) => {
      // for every kultur return
      // last zaehlung and whether it is prognose
      const lastZaehlungDatum = max(
        k?.zaehlungs
          .map((z) => z.datum)
          .filter((d) => !!d)
          .filter((d) => d <= date),
      )
      const lastZaehlungsOfKultur = k?.zaehlungs
        .filter((z) => !!z.datum)
        .filter((z) => z.datum === lastZaehlungDatum)
        .filter(
          (z) => !!z?.teilzaehlungs_aggregate?.aggregate?.sum?.anzahl_pflanzen,
        )
      // if no zaehlung exists yet, need to set 0
      const lastZaehlungAnzahlPflanzen = sum(
        lastZaehlungsOfKultur.map(
          (z) => z.teilzaehlungs_aggregate.aggregate.sum.anzahl_pflanzen,
        ),
      )

      return {
        anzahl_pflanzen: lastZaehlungAnzahlPflanzen,
        geplant: lastZaehlungsOfKultur.some((z) => z.prognose),
      }
    })
    const lastZaehlungs = {
      anzahl_pflanzen: sum(lastZaehlungsByKultur.map((z) => z.anzahl_pflanzen)),
      geplant: lastZaehlungsByKultur.some((z) => z.geplant),
    }

    const lastZaehlungDatum =
      max(
        [...zaehlungsDone, ...zaehlungsPlanned]
          .map((z) => z.datum)
          .filter((d) => !!d)
          .filter((d) => d <= date),
      ) || '1900-01-01'
    const sammlungsSinceLastZaehlung = [
      ...sammlungsDone,
      ...sammlungsPlanned,
    ].filter((l) => l.datum > lastZaehlungDatum && l.datum <= date)
    const sammlungsSince = {
      anzahl_pflanzen: sum(
        sammlungsSinceLastZaehlung.map((s) => s.anzahl_pflanzen),
      ),
      geplant: !!sammlungsPlanned.filter(
        (l) => l.datum > lastZaehlungDatum && l.datum <= date,
      ).length,
    }

    const lieferungsSinceLastZaehlung = [
      ...lieferungsDone,
      ...lieferungsPlanned,
    ].filter((l) => l.datum > lastZaehlungDatum && l.datum <= date)
    const lieferungsSince = {
      anzahl_pflanzen: sum(
        lieferungsSinceLastZaehlung.map((s) => s.anzahl_pflanzen),
      ),
      geplant: !!lieferungsPlanned.filter(
        (l) => l.datum > lastZaehlungDatum && l.datum <= date,
      ).length,
    }

    const zaehlungsNow = [...zaehlungsDone, ...zaehlungsPlanned].filter(
      (s) => s.datum === date,
    )
    const zaehlungsCountNow = zaehlungsNow.length

    const zaehlungsTitle = zaehlungsCountNow
      ? zaehlungsCountNow === 1
        ? `${zaehlungsCountNow} Zählung`
        : `${zaehlungsCountNow} Zählungen`
      : undefined
    const sCount = [...sammlungsDone, ...sammlungsPlanned].filter(
      (s) => s.datum === date,
    ).length
    const sammlungsTitle = sCount
      ? sCount === 1
        ? `${sCount} Sammlung`
        : `${sCount} Sammlungen`
      : undefined
    const lfCount = [...lieferungsDone, ...lieferungsPlanned].filter(
      (s) => s.datum === date,
    ).length
    const lieferungsTitle = lfCount
      ? lfCount === 1
        ? `${lfCount} Auspflanzung`
        : `${lfCount} Auspflanzungen`
      : undefined

    const data = {
      datum: date,
      'Anzahl berechnet':
        lastZaehlungs.anzahl_pflanzen +
        sammlungsSince.anzahl_pflanzen -
        lieferungsSince.anzahl_pflanzen,
      Zählung:
        lastZaehlungs.prognose ||
        sammlungsSince.geplant ||
        lieferungsSince.geplant
          ? undefined
          : lastZaehlungs.anzahl_pflanzen +
            sammlungsSince.anzahl_pflanzen -
            lieferungsSince.anzahl_pflanzen,
      Prognose:
        lastZaehlungs.prognose ||
        sammlungsSince.geplant ||
        lieferungsSince.geplant
          ? lastZaehlungs.anzahl_pflanzen +
            sammlungsSince.anzahl_pflanzen -
            lieferungsSince.anzahl_pflanzen
          : undefined,
      Sammlung: sammlungNow,
      'Sammlung geplant': sammlungPlannedNow,
      Auspflanzung: lieferungNow,
      'Auspflanzung geplant': lieferungPlannedNow,
      title: [zaehlungsTitle, sammlungsTitle, lieferungsTitle]
        .filter((e) => !!e)
        .join(', '),
    }
    return data
  })
}
