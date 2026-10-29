import { uniq, sum } from 'es-toolkit'
import { Q } from 'nitromelondb'

export const buildData = async ({
  artId, db,
}: {
  artId: string | undefined
  db: import('nitromelondb').Database | null
}) => {
  let zaehlungsDone: import('../../../../../../dbModel.ts').Zaehlung[] = []
  try {
    zaehlungsDone = (await db
      ?.get<import('../../../../../../dbModel.ts').Zaehlung>('zaehlung')
      .query(
        Q.experimentalJoinTables(['kultur']),
        Q.on('kultur', 'art_id', artId ?? ''),
        Q.where('prognose', false),
        Q.where('datum', Q.notEq(null)),
        Q.experimentalJoinTables(['teilzaehlung']),
        Q.on('teilzaehlung', 'anzahl_pflanzen', Q.notEq(null)),
        Q.where('_deleted', false),
      )
      .fetch()) ?? []
  } catch {}
  let zaehlungsPlannedAll: import('../../../../../../dbModel.ts').Zaehlung[] = []
  try {
    zaehlungsPlannedAll = (await db
      ?.get<import('../../../../../../dbModel.ts').Zaehlung>('zaehlung')
      .query(
        Q.where('prognose', true),
        Q.where('datum', Q.notEq(null)),
        Q.experimentalJoinTables(['kultur']),
        Q.on('kultur', 'art_id', artId ?? ''),
        Q.experimentalJoinTables(['teilzaehlung']),
        Q.on('teilzaehlung', 'anzahl_pflanzen', Q.notEq(null)),
        Q.where('_deleted', false),
      )
      .fetch()) ?? []
  } catch {}
  const zaehlungsPlannedIgnored = zaehlungsPlannedAll.filter(
    (zg) =>
      // check if more recent zaehlungsDone exists
      zaehlungsDone.some(
        (z) =>
          (z.datum ?? '') >= (zg.datum ?? ''),
      ),
  )
  const zaehlungsPlanned = zaehlungsPlannedAll.filter(
    (lg) =>
      !zaehlungsPlannedIgnored
        .map((l) => l.id)
        .includes(lg.id),
  )

  let sammlungsDone: import('../../../../../../dbModel.ts').Sammlung[] = []
  try {
    sammlungsDone = (await db
      ?.get<import('../../../../../../dbModel.ts').Sammlung>('sammlung')
      .query(
        Q.where('art_id', artId ?? ''),
        Q.where('geplant', false),
        Q.where('datum', Q.notEq(null)),
        Q.where('anzahl_pflanzen', Q.notEq(null)),
        Q.where('_deleted', false),
      )
      .fetch()) ?? []
  } catch {}
  let sammlungsPlannedAll: import('../../../../../../dbModel.ts').Sammlung[] = []
  try {
    sammlungsPlannedAll = (await db
      ?.get<import('../../../../../../dbModel.ts').Sammlung>('sammlung')
      .query(
        Q.where('art_id', artId ?? ''),
        Q.where('geplant', true),
        Q.where('datum', Q.notEq(null)),
        Q.where('anzahl_pflanzen', Q.notEq(null)),
        Q.where('_deleted', false),
      )
      .fetch()) ?? []
  } catch {}
  const sammlungsPlannedIgnored = sammlungsPlannedAll.filter(
    (zg) =>
      // check if more recent zaehlungsDone exists
      sammlungsDone.some(
        (z) =>
          (z.datum ?? '') >= (zg.datum ?? ''),
      ),
  )
  const sammlungsPlanned = sammlungsPlannedAll.filter(
    (lg) =>
      !sammlungsPlannedIgnored
        .map((l) => l.id)
        .includes(lg.id),
  )

  let lieferungsDone: import('../../../../../../dbModel.ts').Lieferung[] = []
  try {
    lieferungsDone = (await db
      ?.get<import('../../../../../../dbModel.ts').Lieferung>('lieferung')
      .query(
        Q.where('art_id', artId ?? ''),
        Q.where('nach_ausgepflanzt', true),
        Q.where('geplant', false),
        Q.where('datum', Q.notEq(null)),
        Q.where('anzahl_pflanzen', Q.notEq(null)),
        Q.where('_deleted', false),
      )
      .fetch()) ?? []
  } catch {}
  let lieferungsPlannedAll: import('../../../../../../dbModel.ts').Lieferung[] = []
  try {
    lieferungsPlannedAll = (await db
      ?.get<import('../../../../../../dbModel.ts').Lieferung>('lieferung')
      .query(
        Q.where('art_id', artId ?? ''),
        Q.where('nach_ausgepflanzt', true),
        Q.where('geplant', true),
        Q.where('datum', Q.notEq(null)),
        Q.where('anzahl_pflanzen', Q.notEq(null)),
        Q.where('_deleted', false),
      )
      .fetch()) ?? []
  } catch {}
  const lieferungsPlannedIgnored = lieferungsPlannedAll.filter(
    (zg) =>
      // check if more recent zaehlungsDone exists
      lieferungsDone.some(
        (z) =>
          (z.datum ?? '') >= (zg.datum ?? ''),
      ),
  )
  const lieferungsPlanned = lieferungsPlannedAll.filter(
    (lg) =>
      !lieferungsPlannedIgnored
        .map((l) => l.id)
        .includes(lg.id),
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
    ].map((z) => z.datum ?? ''),
  ).sort()
  // 2. get list of all non deleted kulturs
  //    these are the basis for counting:
  //    at every date the last count is used
  let kultursOfArt: import('../../../../../../dbModel.ts').Kultur[] = []
  try {
    kultursOfArt = (await db
      ?.get<import('../../../../../../dbModel.ts').Kultur>('kultur')
      .query(
        Q.where('_deleted', false),
        Q.where('aktiv', true),
        Q.where('art_id', artId ?? ''),
      )
      .fetch()) ?? []
  } catch {}
  // 3. for every date get:
  //    - sum of last zaehlung
  //    - whether last zahlung includes prognose
  return await Promise.all(
    dates.map(async (date) => {
      const sammlungNow = sum(
        sammlungsDone
          .filter(
            (s) =>
              s.datum === date,
          )
          .map(
            (s) =>
              s.anzahl_pflanzen ?? 0,
          ),
      )
      const sammlungPlannedNow = sum(
        sammlungsPlanned
          .filter(
            (s) =>
              s.datum === date,
          )
          .map(
            (s) =>
              s.anzahl_pflanzen ?? 0,
          ),
      )

      const lieferungNow = -sum(
        lieferungsDone
          .filter(
            (s) =>
              s.datum === date,
          )
          .map(
            (s) =>
              s.anzahl_pflanzen ?? 0,
          ),
      )
      const lieferungPlannedNow = -sum(
        lieferungsPlanned
          .filter(
            (s) =>
              s.datum === date,
          )
          .map(
            (s) =>
              s.anzahl_pflanzen ?? 0,
          ),
      )

      const lastZaehlungsByKultur = await Promise.all(
        kultursOfArt.map(
          async (k: import('../../../../../../dbModel.ts').Kultur) => {
            // for every kultur return
            // last zaehlung and whether it is prognose
            const zaehlungs = await k.zaehlungs.extend(
              Q.experimentalJoinTables(['teilzaehlung']),
              Q.where('_deleted', false),
              Q.where('datum', Q.notEq(null)),
              Q.on('teilzaehlung', Q.where('anzahl_pflanzen', Q.notEq(null))),
            )
              .fetch()
            const lastZaehlungDatum = Math.max(
              ...zaehlungs
                .map((z) => (z.datum ?? '') as string)
                .filter((d) => d <= (date ?? '')) as unknown as number[],
            )
            const lastZaehlungsOfKultur = zaehlungs.filter(
              (z) => z.datum === (lastZaehlungDatum as unknown as string),
            )
            const lastTzAnzahls = await Promise.all(
              lastZaehlungsOfKultur.map(async (z) => {
                let tzs: import('../../../../../../dbModel.ts').Teilzaehlung[] = []
                try {
                  tzs = (await z.teilzaehlungs?.fetch()) ?? []
                } catch {}

                return sum(
                  tzs.map(
                    (tz: import('../../../../../../dbModel.ts').Teilzaehlung) =>
                      tz.anzahl_pflanzen ?? 0,
                  ),
                )
              }),
            )
            return {
              anzahl_pflanzen: sum(lastTzAnzahls),
              prognose: lastZaehlungsOfKultur.some((z) => z.prognose),
            }
          },
        ),
      )
      const lastZaehlungs = {
        anzahl_pflanzen: sum(
          lastZaehlungsByKultur.map((z) => z.anzahl_pflanzen),
        ),
        prognose: lastZaehlungsByKultur.some((z) => z.prognose),
      }

      // need to return old date in case no zaehlung exists
      const lastZaehlungDatum =
        Math.max(
          ...[...zaehlungsDone, ...zaehlungsPlanned]
            .map((z) => z.datum ?? '')
            .filter((d) => !!d)
            .filter((d) => d <= (date ?? '')) as unknown as number[],
        ) || '1900-01-01'
      const sammlungsSinceLastZaehlung = [
        ...sammlungsDone,
        ...sammlungsPlanned,
      ].filter((l) => (l.datum ?? '') > lastZaehlungDatum && (l.datum ?? '') <= date)
      const sammlungsSince = {
        anzahl_pflanzen: sum(
          sammlungsSinceLastZaehlung.map((s) => s.anzahl_pflanzen ?? 0),
        ),
        geplant: !!sammlungsPlanned.filter(
          (l) =>
            (l?.datum ?? '') > lastZaehlungDatum &&
            (l?.datum ?? '') <= (date ?? ''),
        ).length,
      }

      const lieferungsSinceLastZaehlung = [
        ...lieferungsDone,
        ...lieferungsPlanned,
      ].filter((l) => (l.datum ?? '') > lastZaehlungDatum && (l.datum ?? '') <= date)
      const lieferungsSince = {
        anzahl_pflanzen: sum(
          lieferungsSinceLastZaehlung.map((s) => s.anzahl_pflanzen ?? 0),
        ),
        geplant: !!lieferungsPlanned.filter(
          (l) =>
            (l?.datum ?? '') > lastZaehlungDatum &&
            (l?.datum ?? '') <= (date ?? ''),
        ).length,
      }

      const zaehlungsCountNow = [...zaehlungsDone, ...zaehlungsPlanned].filter(
        (s) => s.datum === date,
      ).length
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
        Bedarf:
          lastZaehlungs.prognose ||
          sammlungsSince.geplant ||
          lieferungsSince.geplant
            ? lastZaehlungs.anzahl_pflanzen +
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
