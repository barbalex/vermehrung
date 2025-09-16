import { uniq } from 'es-toolkit'
import sum from 'lodash/sum'
import max from 'lodash/max'
import { Q } from '@nozbe/watermelondb'

export const buildData = async ({ artId, db }) => {
  let zaehlungsDone = []
  try {
    zaehlungsDone = await db
      .get('zaehlung')
      .query(
        Q.experimentalJoinTables(['kultur']),
        Q.on('kultur', 'art_id', artId),
        Q.where('prognose', false),
        Q.where('datum', Q.notEq(null)),
        Q.experimentalJoinTables(['teilzaehlung']),
        Q.on('teilzaehlung', 'anzahl_pflanzen', Q.notEq(null)),
        Q.where('_deleted', false),
      )
      .fetch()
  } catch {}
  let zaehlungsPlannedAll = []
  try {
    zaehlungsPlannedAll = await db
      .get('zaehlung')
      .query(
        Q.where('prognose', true),
        Q.where('datum', Q.notEq(null)),
        Q.experimentalJoinTables(['kultur']),
        Q.on('kultur', 'art_id', artId),
        Q.experimentalJoinTables(['teilzaehlung']),
        Q.on('teilzaehlung', 'anzahl_pflanzen', Q.notEq(null)),
        Q.where('_deleted', false),
      )
      .fetch()
  } catch {}
  const zaehlungsPlannedIgnored = zaehlungsPlannedAll.filter((zg) =>
    // check if more recent zaehlungsDone exists
    zaehlungsDone.some((z) => z.datum >= zg.datum),
  )
  const zaehlungsPlanned = zaehlungsPlannedAll.filter(
    (lg) => !zaehlungsPlannedIgnored.map((l) => l.id).includes(lg.id),
  )

  let sammlungsDone = []
  try {
    sammlungsDone = await db
      .get('sammlung')
      .query(
        Q.where('art_id', artId),
        Q.where('geplant', false),
        Q.where('datum', Q.notEq(null)),
        Q.where('anzahl_pflanzen', Q.notEq(null)),
        Q.where('_deleted', false),
      )
      .fetch()
  } catch {}
  let sammlungsPlannedAll = []
  try {
    sammlungsPlannedAll = await db
      .get('sammlung')
      .query(
        Q.where('art_id', artId),
        Q.where('geplant', true),
        Q.where('datum', Q.notEq(null)),
        Q.where('anzahl_pflanzen', Q.notEq(null)),
        Q.where('_deleted', false),
      )
      .fetch()
  } catch {}
  const sammlungsPlannedIgnored = sammlungsPlannedAll.filter((zg) =>
    // check if more recent zaehlungsDone exists
    sammlungsDone.some((z) => z.datum >= zg.datum),
  )
  const sammlungsPlanned = sammlungsPlannedAll.filter(
    (lg) => !sammlungsPlannedIgnored.map((l) => l.id).includes(lg.id),
  )

  let lieferungsDone = []
  try {
    lieferungsDone = await db
      .get('lieferung')
      .query(
        Q.where('art_id', artId),
        Q.where('nach_ausgepflanzt', true),
        Q.where('geplant', false),
        Q.where('datum', Q.notEq(null)),
        Q.where('anzahl_pflanzen', Q.notEq(null)),
        Q.where('_deleted', false),
      )
      .fetch()
  } catch {}
  let lieferungsPlannedAll = []
  try {
    lieferungsPlannedAll = await db
      .get('lieferung')
      .query(
        Q.where('art_id', artId),
        Q.where('nach_ausgepflanzt', true),
        Q.where('geplant', true),
        Q.where('datum', Q.notEq(null)),
        Q.where('anzahl_pflanzen', Q.notEq(null)),
        Q.where('_deleted', false),
      )
      .fetch()
  } catch {}
  const lieferungsPlannedIgnored = lieferungsPlannedAll.filter((zg) =>
    // check if more recent zaehlungsDone exists
    lieferungsDone.some((z) => z.datum >= zg.datum),
  )
  const lieferungsPlanned = lieferungsPlannedAll.filter(
    (lg) => !lieferungsPlannedIgnored.map((l) => l.id).includes(lg.id),
  )

  // 1. get list of all dates when something was counted
  const dates = uniq(
    [
      ...zaehlungsDone,
      ...zaehlungsPlanned,
      ...sammlungsDone,
      ...sammlungsPlanned,
      ...lieferungsDone,
      ...lieferungsPlanned,
    ].map((z) => z.datum),
  ).sort()
  // 2. get list of all non deleted kulturs
  //    these are the basis for counting:
  //    at every date the last count is used
  let kultursOfArt = []
  try {
    kultursOfArt = await db
      .get('kultur')
      .query(
        Q.where('_deleted', false),
        Q.where('aktiv', true),
        Q.where('art_id', artId),
      )
      .fetch()
  } catch {}
  // 3. for every date get:
  //    - sum of last zaehlung
  //    - whether last zahlung includes prognose
  return await Promise.all(
    dates.map(async (date) => {
      const sammlungNow = sum(
        sammlungsDone
          .filter((s) => s.datum === date)
          .map((s) => s.anzahl_pflanzen),
      )
      const sammlungPlannedNow = sum(
        sammlungsPlanned
          .filter((s) => s.datum === date)
          .map((s) => s.anzahl_pflanzen),
      )

      const lieferungNow = -sum(
        lieferungsDone
          .filter((s) => s.datum === date)
          .map((s) => s.anzahl_pflanzen),
      )
      const lieferungPlannedNow = -sum(
        lieferungsPlanned
          .filter((s) => s.datum === date)
          .map((s) => s.anzahl_pflanzen),
      )

      const lastZaehlungsByKultur = await Promise.all(
        kultursOfArt.map(async (k) => {
          // for every kultur return
          // last zaehlung and whether it is prognose
          const zaehlungs = await k.zaehlungs.fetch(
            Q.experimentalJoinTables(['teilzaehlung']),
            Q.where('_deleted', false),
            Q.where('datum', Q.notEq(null)),
            Q.on('teilzaehlung', Q.where('anzahl_pflanzen', Q.notEq(null))),
          )
          const lastZaehlungDatum = max(
            zaehlungs.map((z) => z.datum).filter((d) => d <= date),
          )
          const lastZaehlungsOfKultur = await Promise.all(
            zaehlungs.filter((z) => z.datum === lastZaehlungDatum),
          )
          const lastTzAnzahls = await Promise.all(
            lastZaehlungsOfKultur.map(async (z) => {
              let tzs = []
              try {
                tzs = (await z.teilzaehlungs?.fetch()) ?? []
              } catch {}

              return sum(tzs.map((tz) => tz.anzahl_pflanzen))
            }),
          )
          return {
            anzahl_pflanzen: sum(lastTzAnzahls),
            prognose: lastZaehlungsOfKultur.some((z) => z.prognose),
          }
        }),
      )
      const lastZaehlungs = {
        anzahl_pflanzen: sum(
          lastZaehlungsByKultur.map((z) => z.anzahl_pflanzen),
        ),
        prognose: lastZaehlungsByKultur.some((z) => z.prognose),
      }

      // need to return old date in case no zaehlung exists
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

      const zaehlungsCountNow = [...zaehlungsDone, ...zaehlungsPlanned].filter(
        (s) => s.datum === date,
      ).length
      const zaehlungsTitle =
        zaehlungsCountNow ?
          zaehlungsCountNow === 1 ?
            `${zaehlungsCountNow} Zählung`
          : `${zaehlungsCountNow} Zählungen`
        : undefined

      const sCount = [...sammlungsDone, ...sammlungsPlanned].filter(
        (s) => s.datum === date,
      ).length
      const sammlungsTitle =
        sCount ?
          sCount === 1 ?
            `${sCount} Sammlung`
          : `${sCount} Sammlungen`
        : undefined

      const lfCount = [...lieferungsDone, ...lieferungsPlanned].filter(
        (s) => s.datum === date,
      ).length
      const lieferungsTitle =
        lfCount ?
          lfCount === 1 ?
            `${lfCount} Auspflanzung`
          : `${lfCount} Auspflanzungen`
        : undefined

      const data = {
        datum: date,
        'Anzahl berechnet':
          lastZaehlungs.anzahl_pflanzen +
          sammlungsSince.anzahl_pflanzen -
          lieferungsSince.anzahl_pflanzen,
        Zählung:
          (
            lastZaehlungs.prognose ||
            sammlungsSince.geplant ||
            lieferungsSince.geplant
          ) ?
            undefined
          : lastZaehlungs.anzahl_pflanzen +
            sammlungsSince.anzahl_pflanzen -
            lieferungsSince.anzahl_pflanzen,
        Bedarf:
          (
            lastZaehlungs.prognose ||
            sammlungsSince.geplant ||
            lieferungsSince.geplant
          ) ?
            lastZaehlungs.anzahl_pflanzen +
            sammlungsSince.anzahl_pflanzen -
            lieferungsSince.anzahl_pflanzen
          : undefined,
        Sammlung: sammlungNow || undefined,
        'Sammlung geplant': sammlungPlannedNow || undefined,
        Auspflanzung: lieferungNow || undefined,
        'Auspflanzung geplant': lieferungPlannedNow || undefined,
        title: [zaehlungsTitle, sammlungsTitle, lieferungsTitle]
          .filter((e) => !!e)
          .join(', '),
      }

      return data
    }),
  )
}
