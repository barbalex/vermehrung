import { sortBy, sumBy, groupBy } from 'es-toolkit'
import { Q } from '@nozbe/watermelondb'
import { of as $of } from 'rxjs'
import { format } from 'date-fns/format'

import { exists } from '../../../../../utils/exists.ts'

export const buildKulturTimelineData = async ({ row }) => {
  let zaehlungenDone = []
  try {
    zaehlungenDone = await row.zaehlungs
      .extend(
        Q.experimentalJoinTables(['teilzaehlung']),
        Q.where('prognose', false),
        Q.where('datum', Q.notEq(null)),
        Q.where('datum', Q.lte(format(new Date(), 'yyyy-mm-dd'))),
        Q.where('_deleted', false),
        // following was not included before refactoring but seems a good idea
        //Q.on('teilzaehlung', Q.where('anzahl_pflanzen', Q.notEq(null))),
        Q.sortBy('datum', Q.asc),
      )
      .fetch()
  } catch {}
  const lastZaehlungDone = zaehlungenDone.slice(-1)[0] ?? {}

  let zaehlungenPlanned = []
  try {
    zaehlungenPlanned = await row.zaehlungs
      .extend(
        Q.experimentalJoinTables(['teilzaehlung']),
        Q.where('prognose', true),
        Q.where('datum', Q.notEq(null)),
        Q.where('_deleted', false),
        //Q.on('teilzaehlung', Q.where('anzahl_pflanzen', Q.notEq(null))),
      )
      .fetch()
  } catch {}
  const zaehlungenPlannedIgnored = zaehlungenPlanned.filter((zg: import('../../../../../dbModel.ts').Zaehlung) =>
    // check if more recent zaehlungenDone exists
    zaehlungenDone.some((z: import('../../../../../dbModel.ts').Zaehlung) => (z.datum ?? '') >= (zg.datum ?? '')),
  )

  let zaehlungenPlannedIncluded = zaehlungenPlanned.filter(
    (lg) => !zaehlungenPlannedIgnored.map((l: import('../../../../../dbModel.ts').Lieferung) => l.id).includes(lg.id),
  )
  if (zaehlungenPlannedIncluded.length) {
    // need to add last zaehlung to zaehlungenPlannedIncluded to connect lines
    zaehlungenPlannedIncluded = [lastZaehlungDone, ...zaehlungenPlannedIncluded]
  }

  const zaehlungenForLine = sortBy(
    [...zaehlungenDone, ...zaehlungenPlannedIncluded],
    ['datum'],
  )
  const zaehlungenForLineReversed = [...zaehlungenForLine].reverse()
  const zaehlungenDoneData = await Promise.all(
    zaehlungenDone.map(async (z: import('../../../../../dbModel.ts').Zaehlung) => {
      const teilzaehlungs = z.teilzaehlungs
      ? ((await z.teilzaehlungs.extend(Q.where('_deleted', false))) as unknown as import('../../../../../dbModel.ts').Teilzaehlung[])
      : $of<import('../../../../../dbModel.ts').Teilzaehlung[]>([])
      const anzahlenPflanzen = teilzaehlungs
        .map((tz: import('../../../../../dbModel.ts').Teilzaehlung) => tz.anzahl_pflanzen)
        .filter((a: number | null) => exists(a))
      const anzPflanzen =
        anzahlenPflanzen.length ?
          anzahlenPflanzen.reduce((a: number, b: number) => a + b, 0)
        : undefined
      const anzahlenAuspflanzbereit = teilzaehlungs
        .map((tz: import('../../../../../dbModel.ts').Teilzaehlung) => tz.anzahl_auspflanzbereit)
        .filter((a: number | null) => exists(a))
      const anzAuspflanzbereit =
        anzahlenAuspflanzbereit.length ?
          anzahlenAuspflanzbereit.reduce((a: number, b: number) => a + b, 0)
        : undefined
      const anzahlenMutterPflanzen = teilzaehlungs
        .map((tz: import('../../../../../dbModel.ts').Teilzaehlung) => tz.anzahl_mutterpflanzen)
        .filter((a: number | null) => exists(a))
      const anzMutterPflanzen =
        anzahlenMutterPflanzen.length ?
          anzahlenMutterPflanzen.reduce((a: number, b: number) => a + b, 0)
        : undefined
      const datum = new Date(z.datum).getTime()

      return {
        datum: datum,
        'Zählung Pflanzen': anzPflanzen,
        'Zählung Pflanzen auspflanzbereit': anzAuspflanzbereit,
        'Zählung Mutterpflanzen': anzMutterPflanzen,
        'Zählung andere Mengen': teilzaehlungs
          .map((t: Record<string, unknown>) => t.andere_menge)
          .join(', '),
        'Zählung Beschreibung auspflanzbereite Pflanzen': teilzaehlungs
          .map((t: Record<string, unknown>) => t.auspflanzbereit_beschreibung)
          .join(', '),
        'Zählung Bemerkungen': teilzaehlungs
          .map((t: Record<string, unknown>) => t.bemerkungen)
          .join(', '),
        ereignis: 'Zählung',
      }
    }),
  )
  const zaehlungenPlannedIncludedData = await Promise.all(
    zaehlungenPlannedIncluded.map(async (z: import('../../../../../dbModel.ts').Zaehlung) => {
      const teilzaehlungs =
        z.teilzaehlungs ?
          await z.teilzaehlungs.extend(Q.where('_deleted', false))
        : []
      const anzahlenPflanzen = teilzaehlungs
        .map((tz: import('../../../../../dbModel.ts').Teilzaehlung) => tz.anzahl_pflanzen)
        .filter((a: number | null) => exists(a))
      const anzPflanzen =
        anzahlenPflanzen.length ?
          anzahlenPflanzen.reduce((a: number, b: number) => a + b, 0)
        : undefined
      const anzahlenAuspflanzbereit = teilzaehlungs
        .map((tz: import('../../../../../dbModel.ts').Teilzaehlung) => tz.anzahl_auspflanzbereit)
        .filter((a: number | null) => exists(a))
      const anzAuspflanzbereit =
        anzahlenAuspflanzbereit.length ?
          anzahlenAuspflanzbereit.reduce((a: number, b: number) => a + b, 0)
        : undefined
      const anzahlenMutterPflanzen = teilzaehlungs
        .map((tz: import('../../../../../dbModel.ts').Teilzaehlung) => tz.anzahl_mutterpflanzen)
        .filter((a: number | null) => exists(a))
      const anzMutterPflanzen =
        anzahlenMutterPflanzen.length ?
          anzahlenMutterPflanzen.reduce((a: number, b: number) => a + b, 0)
        : undefined

      return {
        datum: new Date(z.datum).getTime(),
        'Zählung Pflanzen Bedarf': anzPflanzen,
        'Zählung Pflanzen auspflanzbereit Bedarf': anzAuspflanzbereit,
        'Zählung Mutterpflanzen Bedarf': anzMutterPflanzen,
        'Zählung Bedarf': teilzaehlungs
          .map((t) => (t.prognose ? 'ja' : 'nein'))
          .join(', '),
        'Zählung andere Mengen': teilzaehlungs
          .map((t: Record<string, unknown>) => t.andere_menge)
          .join(', '),
        'Zählung Beschreibung auspflanzbereite Pflanzen': teilzaehlungs
          .map((t: Record<string, unknown>) => t.auspflanzbereit_beschreibung)
          .join(', '),
        'Zählung Bemerkungen': teilzaehlungs
          .map((t: Record<string, unknown>) => t.bemerkungen)
          .join(', '),
        ereignis: 'Zählung',
      }
    }),
  )
  const zaehlungenPlannedIgnoredData = await Promise.all(
    zaehlungenPlannedIgnored.map(async (z: import('../../../../../dbModel.ts').Zaehlung) => {
      const teilzaehlungs =
        z.teilzaehlungs ?
          await z.teilzaehlungs.extend(Q.where('_deleted', false))
        : []
      const anzahlenPflanzen = teilzaehlungs
        .map((tz: import('../../../../../dbModel.ts').Teilzaehlung) => tz.anzahl_pflanzen)
        .filter((a: number | null) => exists(a))
      const anzPflanzen =
        anzahlenPflanzen.length ?
          anzahlenPflanzen.reduce((a: number, b: number) => a + b, 0)
        : undefined
      const anzahlenAuspflanzbereit = teilzaehlungs
        .map((tz: import('../../../../../dbModel.ts').Teilzaehlung) => tz.anzahl_auspflanzbereit)
        .filter((a: number | null) => exists(a))
      const anzAuspflanzbereit =
        anzahlenAuspflanzbereit.length ?
          anzahlenAuspflanzbereit.reduce((a: number, b: number) => a + b, 0)
        : undefined
      const anzahlenMutterPflanzen = teilzaehlungs
        .map((tz: import('../../../../../dbModel.ts').Teilzaehlung) => tz.anzahl_mutterpflanzen)
        .filter((a: number | null) => exists(a))
      const anzMutterPflanzen =
        anzahlenMutterPflanzen.length ?
          anzahlenMutterPflanzen.reduce((a: number, b: number) => a + b, 0)
        : undefined

      return {
        datum: new Date(z.datum).getTime(),
        'Pflanzen Bedarf, ignoriert': anzPflanzen,
        'Pflanzen auspflanzbereit Bedarf, ignoriert': anzAuspflanzbereit,
        'Mutterpflanzen Bedarf, ignoriert': anzMutterPflanzen,
        Bedarf: teilzaehlungs
          .map((t) => (t.prognose ? 'ja' : 'nein'))
          .join(', '),
        'Zählung andere Mengen': teilzaehlungs
          .map((t: Record<string, unknown>) => t.andere_menge)
          .join(', '),
        'Zählung Beschreibung auspflanzbereite Pflanzen': teilzaehlungs
          .map((t: Record<string, unknown>) => t.auspflanzbereit_beschreibung)
          .join(', '),
        'Zählung Bemerkungen': teilzaehlungs
          .map((t: Record<string, unknown>) => t.bemerkungen)
          .join(', '),
        ereignis: 'Zählung',
      }
    }),
  )
  const zaehlungenDataGroupedByDatum = groupBy(
    [...zaehlungenDoneData, ...zaehlungenPlannedIncludedData],
    (e) => e.datum,
  )
  const zaehlungenData = Object.entries(zaehlungenDataGroupedByDatum).map(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ([key, value]) => Object.assign({}, ...value),
  )

  let anLieferungenDone = []
  try {
    anLieferungenDone = await row.anlieferungs
      .extend(
        Q.where('geplant', false),
        Q.where('datum', Q.notEq(null)),
        Q.where('datum', Q.lte(format(new Date(), 'yyyy-mm-dd'))),
        Q.where('_deleted', false),
      )
      .fetch()
  } catch {}
  let anLieferungenPlanned = []
  try {
    anLieferungenPlanned = await row.anlieferungs
      .extend(
        Q.where('geplant', true),
        Q.where('datum', Q.notEq(null)),
        Q.where('_deleted', false),
      )
      .fetch()
  } catch {}
  const anLieferungenPlannedIgnored = anLieferungenPlanned.filter((lg) =>
    // check if more recent anLieferungenDone exists
    anLieferungenDone.some((lu) => (lu.datum ?? '') >= (lg.datum ?? '')),
  )
  const anLieferungenPlannedIncluded = anLieferungenPlanned.filter(
    (lg) => !anLieferungenPlannedIgnored.map((l: import('../../../../../dbModel.ts').Lieferung) => l.id).includes(lg.id),
  )
  const anLieferungenForLine = sortBy(
    [...anLieferungenDone, ...anLieferungenPlannedIncluded],
    ['datum'],
  )

  let ausLieferungenDone = []
  try {
    ausLieferungenDone = await row.auslieferungs
      .extend(
        Q.where('geplant', false),
        Q.where('datum', Q.notEq(null)),
        Q.where('datum', Q.lte(format(new Date(), 'yyyy-mm-dd'))),
        Q.where('_deleted', false),
      )
      .fetch()
  } catch {}
  let ausLieferungenPlanned = []
  try {
    ausLieferungenPlanned = await row.auslieferungs
      .extend(
        Q.where('geplant', true),
        Q.where('datum', Q.notEq(null)),
        Q.where('_deleted', false),
      )
      .fetch()
  } catch {}
  const ausLieferungenPlannedIgnored = ausLieferungenPlanned.filter((lg) =>
    // check if more recent ausLieferungenDone exists
    ausLieferungenDone.some((l: import('../../../../../dbModel.ts').Lieferung) => (l.datum ?? '') >= (lg.datum ?? '')),
  )
  const ausLieferungenPlannedIncluded = ausLieferungenPlanned.filter(
    (lg) => !ausLieferungenPlannedIgnored.map((l: import('../../../../../dbModel.ts').Lieferung) => l.id).includes(lg.id),
  )
  const ausLieferungenForLine = sortBy(
    [...ausLieferungenDone, ...ausLieferungenPlannedIncluded],
    ['datum'],
  )
  const anLieferungenDoneData = await Promise.all(
    anLieferungenDone.map(async (l: import('../../../../../dbModel.ts').Lieferung) => {
      // 1. previous Zaehlung is basis
      // If none, pretend this is first zaehlung
      const previousZaehlung = zaehlungenForLineReversed.find(
        (z) => (z.datum ?? '') < (l.datum ?? ''),
      )
      // 2. Summ all Lieferungen since
      const anLieferungenSince = anLieferungenForLine.filter(
        (a) =>
          a.datum > (previousZaehlung?.datum ?? '1900.01.01') &&
          (a.datum ?? '') < (l.datum ?? ''),
      )
      const ausLieferungenSince = ausLieferungenForLine.filter(
        (a) =>
          a.datum > (previousZaehlung?.datum ?? '1900.01.01') &&
          (a.datum ?? '') < (l.datum ?? ''),
      )

      let previousZaehlungTzs = []
      try {
        previousZaehlungTzs =
          previousZaehlung.teilzaehlungs ?
            await previousZaehlung.teilzaehlungs
              .extend(Q.where('_deleted', false))
              ?.fetch()
          : []
      } catch {}
      const anzahlenPflanzenOfPreviousZaehlung = previousZaehlungTzs
        .map((tz: import('../../../../../dbModel.ts').Teilzaehlung) => tz.anzahl_pflanzen)
        .filter((a: number | null) => exists(a))
      const anzPflanzen = anzahlenPflanzenOfPreviousZaehlung.reduce(
        (a: number, b: number) => a + b,
        0,
      )
      const anzahlenAuspflanzbereitOfPreviousZaehlung = previousZaehlungTzs
        .map((tz: import('../../../../../dbModel.ts').Teilzaehlung) => tz.anzahl_auspflanzbereit)
        .filter((a: number | null) => exists(a))
      const anzAuspflanzbereit =
        anzahlenAuspflanzbereitOfPreviousZaehlung.reduce((a: number, b: number) => a + b, 0)

      const sumAnzahlPflanzen =
        anzPflanzen +
        (sumBy(anLieferungenSince, (e) => e.anzahl_pflanzen) || 0) -
        (sumBy(ausLieferungenSince, (e) => e.anzahl_pflanzen) || 0)
      const sumAnzahlAuspflanzbereit =
        anzAuspflanzbereit +
        (sumBy(anLieferungenSince, (e) => e.anzahl_auspflanzbereit) || 0) -
        (sumBy(ausLieferungenSince, (e) => e.anzahl_auspflanzbereit) || 0)

      return {
        datum: new Date(l.datum).getTime(),
        'Lieferung Pflanzen': l.anzahl_pflanzen || undefined,
        'Lieferung Pflanzen auspflanzbereit':
          l.anzahl_auspflanzbereit || undefined,
        'Lieferung andere Mengen': l.andere_menge,
        'Lieferung Gramm Samen': l.gramm_samen,
        'Lieferung von Anzahl Individuen': l.von_anzahl_individuen,
        'Lieferung Bemerkungen': l.bemerkungen,
        'Zählung Pflanzen': sumAnzahlPflanzen + l?.anzahl_pflanzen,
        'Zählung Pflanzen auspflanzbereit':
          sumAnzahlAuspflanzbereit + l?.anzahl_auspflanzbereit,
        ereignis: 'Lieferung',
      }
    }),
  )
  const ausLieferungenDoneData = await Promise.all(
    ausLieferungenDone.map(async (l: import('../../../../../dbModel.ts').Lieferung) => {
      // 1. previous Zaehlung is basis. If none, take 0
      const previousZaehlung = zaehlungenForLineReversed.find(
        (z) => (z.datum ?? '') < (l.datum ?? ''),
      )
      // 2. Summ all Lieferungen since
      const anLieferungenSince = anLieferungenForLine.filter(
        (a) =>
          a.datum > (previousZaehlung?.datum ?? '1900.01.01') &&
          (a.datum ?? '') < (l.datum ?? ''),
      )
      const ausLieferungenSince = ausLieferungenForLine.filter(
        (a) =>
          a.datum > (previousZaehlung?.datum ?? '1900.01.01') &&
          (a.datum ?? '') < (l.datum ?? ''),
      )
      let previousZaehlungTzs = []
      try {
        previousZaehlungTzs =
          previousZaehlung.teilzaehlungs ?
            await previousZaehlung.teilzaehlungs
              .extend(Q.where('_deleted', false))
              ?.fetch()
          : []
      } catch {}
      const anzahlenPflanzenOfPreviousZaehlung = previousZaehlungTzs
        .map((tz: import('../../../../../dbModel.ts').Teilzaehlung) => tz.anzahl_pflanzen)
        .filter((a: number | null) => exists(a))
      const anzPflanzen = anzahlenPflanzenOfPreviousZaehlung.reduce(
        (a: number, b: number) => a + b,
        0,
      )
      const anzahlenAuspflanzbereitOfPreviousZaehlung = previousZaehlungTzs
        .map((tz: import('../../../../../dbModel.ts').Teilzaehlung) => tz.anzahl_auspflanzbereit)
        .filter((a: number | null) => exists(a))
      const anzAuspflanzbereit =
        anzahlenAuspflanzbereitOfPreviousZaehlung.reduce((a: number, b: number) => a + b, 0)
      const sumAnzahlPflanzen =
        anzPflanzen +
        (sumBy(anLieferungenSince, 'anzahl_pflanzen') || 0) -
        (sumBy(ausLieferungenSince, 'anzahl_pflanzen') || 0)
      const sumAnzahlAuspflanzbereit =
        anzAuspflanzbereit +
        (sumBy(anLieferungenSince, 'anzahl_auspflanzbereit') || 0) -
        (sumBy(ausLieferungenSince, 'anzahl_auspflanzbereit') || 0)

      return {
        datum: new Date(l.datum).getTime(),
        'Lieferung Pflanzen': -l?.anzahl_pflanzen || undefined,
        'Lieferung Pflanzen auspflanzbereit':
          -l?.anzahl_auspflanzbereit || undefined,
        'Lieferung andere Mengen': l.andere_menge,
        'Lieferung Gramm Samen': l.gramm_samen,
        'Lieferung von Anzahl Individuen': l.von_anzahl_individuen,
        'Lieferung Bemerkungen': l.bemerkungen,
        'Zählung Pflanzen': sumAnzahlPflanzen - l?.anzahl_pflanzen,
        'Zählung Pflanzen auspflanzbereit':
          sumAnzahlAuspflanzbereit - l?.anzahl_auspflanzbereit,
        ereignis: 'Lieferung',
      }
    }),
  )
  const anLieferungenPlannedData = await Promise.all(
    anLieferungenPlannedIncluded.map(async (l: import('../../../../../dbModel.ts').Lieferung) => {
      // 1. previous Zaehlung is basis
      // If none, pretend this is first zaehlung
      const previousZaehlung = zaehlungenForLineReversed.find(
        (z) => (z.datum ?? '') < (l.datum ?? ''),
      )
      // 2. Summ all Lieferungen since
      const anLieferungenSince = anLieferungenPlannedIncluded.filter(
        (a: import('../../../../../dbModel.ts').Art) =>
          a.datum > (previousZaehlung?.datum ?? '1900.01.01') &&
          (a.datum ?? '') < (l.datum ?? ''),
      )
      const ausLieferungenSince = ausLieferungenPlannedIncluded.filter(
        (a: import('../../../../../dbModel.ts').Art) =>
          a.datum > (previousZaehlung?.datum ?? '1900.01.01') &&
          (a.datum ?? '') < (l.datum ?? ''),
      )

      let previousZaehlungTzs = []
      try {
        previousZaehlungTzs =
          previousZaehlung.teilzaehlungs ?
            await previousZaehlung.teilzaehlungs
              .extend(Q.where('_deleted', false))
              ?.fetch()
          : []
      } catch {}
      const anzahlenPflanzenOfPrevoiusZaehlung = previousZaehlungTzs
        .map((tz: import('../../../../../dbModel.ts').Teilzaehlung) => tz.anzahl_pflanzen)
        .filter((a: number | null) => exists(a))
      const anzPflanzen = anzahlenPflanzenOfPrevoiusZaehlung.reduce(
        (a: number, b: number) => a + b,
        0,
      )
      const anzahlenAuspflanzbereitOfPreviousZaehlung = previousZaehlungTzs
        .map((tz: import('../../../../../dbModel.ts').Teilzaehlung) => tz.anzahl_auspflanzbereit)
        .filter((a: number | null) => exists(a))
      const anzAuspflanzbereit =
        anzahlenAuspflanzbereitOfPreviousZaehlung.reduce((a: number, b: number) => a + b, 0)
      const sumAnzahlPflanzen =
        anzPflanzen +
        (sumBy(anLieferungenSince, (e) => e.anzahl_pflanzen) || 0) -
        (sumBy(ausLieferungenSince, (e) => e.anzahl_pflanzen) || 0)
      const sumAnzahlAuspflanzbereit =
        anzAuspflanzbereit +
        (sumBy(anLieferungenSince, (e) => e.anzahl_auspflanzbereit) || 0) -
        (sumBy(ausLieferungenSince, (e) => e.anzahl_auspflanzbereit) || 0)

      const data = {
        datum: new Date(l.datum).getTime(),
        'Lieferung Pflanzen geplant': l.anzahl_pflanzen || undefined,
        'Lieferung Pflanzen auspflanzbereit geplant':
          l.anzahl_auspflanzbereit || undefined,
        'Lieferung andere Mengen': l.andere_menge,
        'Lieferung Gramm Samen': l.gramm_samen,
        'Lieferung von Anzahl Individuen': l.von_anzahl_individuen,
        'Lieferung Bemerkungen': l.bemerkungen,
        ereignis: 'Lieferung',
      }
      if (data.datum < new Date(lastZaehlungDone.datum).getTime()) {
        data['Zählung Pflanzen'] =
          sumAnzahlPflanzen + l?.anzahl_pflanzen
        data['Zählung Pflanzen auspflanzbereit'] =
          sumAnzahlAuspflanzbereit + l?.anzahl_auspflanzbereit
      } else {
        data['Pflanzen Bedarf'] =
          sumAnzahlPflanzen + l?.anzahl_pflanzen
        data['Pflanzen auspflanzbereit Bedarf'] =
          sumAnzahlAuspflanzbereit + l?.anzahl_auspflanzbereit
      }
      return data
    }),
  )
  const anLieferungenPlannedIgnoredData = anLieferungenPlannedIgnored.map(
    (l: import('../../../../../dbModel.ts').Lieferung) => ({
      datum: new Date(l.datum).getTime(),
      'Lieferung Pflanzen geplant, ignoriert': l.anzahl_pflanzen || undefined,
      'Lieferung Pflanzen auspflanzbereit geplant, ignoriert':
        l.anzahl_auspflanzbereit || undefined,
      'Lieferung andere Mengen': l.andere_menge,
      'Lieferung Gramm Samen': l.gramm_samen,
      'Lieferung von Anzahl Individuen': l.von_anzahl_individuen,
      'Lieferung Bemerkungen': l.bemerkungen,
      ereignis: 'Lieferung',
    }),
  )
  const ausLieferungenPlannedData = await Promise.all(
    ausLieferungenPlannedIncluded.map(async (l: import('../../../../../dbModel.ts').Lieferung) => {
      // 1. previous Zaehlung is basis
      // If none, pretend this is first zaehlung
      const previousZaehlung = zaehlungenForLineReversed.find(
        (z) => (z.datum ?? '') < (l.datum ?? ''),
      )
      // 2. Summ all Lieferungen since
      const anLieferungenSince = anLieferungenPlannedIncluded.filter(
        (a: import('../../../../../dbModel.ts').Art) =>
          a.datum > (previousZaehlung?.datum ?? '1900.01.01') &&
          (a.datum ?? '') < (l.datum ?? ''),
      )
      const ausLieferungenSince = ausLieferungenPlannedIncluded.filter(
        (a: import('../../../../../dbModel.ts').Art) =>
          a.datum > (previousZaehlung?.datum ?? '1900.01.01') &&
          (a.datum ?? '') < (l.datum ?? ''),
      )

      let previousZaehlungTzs = []
      try {
        previousZaehlungTzs =
          previousZaehlung.teilzaehlungs ?
            await previousZaehlung.teilzaehlungs
              .extend(Q.where('_deleted', false))
              ?.fetch()
          : []
      } catch {}
      const anzahlenPflanzenOfPreviousZaehlung = previousZaehlungTzs
        .map((tz: import('../../../../../dbModel.ts').Teilzaehlung) => tz.anzahl_pflanzen)
        .filter((a: number | null) => exists(a))
      const anzPflanzen = anzahlenPflanzenOfPreviousZaehlung.reduce(
        (a: number, b: number) => a + b,
        0,
      )
      const anzahlenAuspflanzbereitOfPreviousZaehlung = previousZaehlungTzs
        .map((tz: import('../../../../../dbModel.ts').Teilzaehlung) => tz.anzahl_auspflanzbereit)
        .filter((a: number | null) => exists(a))
      const anzAuspflanzbereit =
        anzahlenAuspflanzbereitOfPreviousZaehlung.reduce((a: number, b: number) => a + b, 0)
      const sumAnzahlPflanzen =
        anzPflanzen +
        (sumBy(anLieferungenSince, (e) => e.anzahl_pflanzen) || 0) -
        (sumBy(ausLieferungenSince, (e) => e.anzahl_pflanzen) || 0)
      const sumAnzahlAuspflanzbereit =
        anzAuspflanzbereit +
        (sumBy(anLieferungenSince, (e) => e.anzahl_auspflanzbereit) || 0) -
        (sumBy(ausLieferungenSince, (e) => e.anzahl_auspflanzbereit) || 0)

      const data = {
        datum: new Date(l.datum).getTime(),
        'Lieferung Pflanzen geplant': -l?.anzahl_pflanzen || undefined,
        'Lieferung Pflanzen auspflanzbereit geplant':
          -l?.anzahl_auspflanzbereit || undefined,
        'Lieferung andere Mengen': l.andere_menge,
        'Lieferung Gramm Samen': l.gramm_samen,
        'Lieferung von Anzahl Individuen': l.von_anzahl_individuen,
        'Lieferung Bemerkungen': l.bemerkungen,
        ereignis: 'Lieferung',
      }
      if (data.datum < new Date(lastZaehlungDone.datum).getTime()) {
        data['Zählung Pflanzen'] =
          sumAnzahlPflanzen - l?.anzahl_pflanzen
        data['Zählung Pflanzen auspflanzbereit'] =
          sumAnzahlAuspflanzbereit - l?.anzahl_auspflanzbereit
      } else {
        data['Pflanzen Bedarf'] =
          sumAnzahlPflanzen - l?.anzahl_pflanzen
        data['Pflanzen auspflanzbereit Bedarf'] =
          sumAnzahlAuspflanzbereit - l?.anzahl_auspflanzbereit
      }
      return data
    }),
  )
  const ausLieferungenPlannedIgnoredData = ausLieferungenPlannedIgnored.map(
    (l: import('../../../../../dbModel.ts').Lieferung) => ({
      datum: new Date(l.datum).getTime(),
      'Lieferung Pflanzen geplant, ignoriert': -l?.anzahl_pflanzen || undefined,
      'Lieferung Pflanzen auspflanzbereit geplant, ignoriert':
        -l?.anzahl_auspflanzbereit || undefined,
      'Lieferung andere Mengen': l.andere_menge,
      'Lieferung Gramm Samen': l.gramm_samen,
      'Lieferung von Anzahl Individuen': l.von_anzahl_individuen,
      'Lieferung Bemerkungen': l.bemerkungen,
      ereignis: 'Lieferung',
    }),
  )

  const allData = sortBy(
    [
      ...anLieferungenDoneData,
      ...anLieferungenPlannedData,
      ...anLieferungenPlannedIgnoredData,
      ...ausLieferungenDoneData,
      ...ausLieferungenPlannedData,
      ...ausLieferungenPlannedIgnoredData,
      ...zaehlungenData,
      ...zaehlungenPlannedIgnoredData,
    ],
    ['datum'],
  )

  return allData
}
