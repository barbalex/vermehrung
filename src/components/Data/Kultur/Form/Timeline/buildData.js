import groupBy from 'lodash/groupBy'
import sortBy from 'lodash/sortBy'
import sumBy from 'lodash/sumBy'
import { Q } from '@nozbe/watermelondb'
import format from 'date-fns/format'

import exists from '../../../../../utils/exists'

const buildData = async ({ row, store }) => {
  const { lieferungsSorted, zaehlungsSorted, teilzaehlungsSorted } = store

  const zaehlungenDone = zaehlungsSorted
    .filter((z) => z.kultur_id === row.id)
    .filter((z) => z.prognose === false)
    .filter((z) => !!z.datum)
    .filter((z) => new Date(z.datum).getTime() <= new Date().getTime())
  const lastZaehlungDone = zaehlungenDone.slice(-1)[0] ?? {}
  const zaehlungenPlanned = zaehlungsSorted
    .filter((z) => z.kultur_id === row.id)
    .filter((z) => z.prognose === true)
    .filter((z) => !!z.datum)

  const zaehlungenPlannedIgnored = zaehlungenPlanned.filter((zg) =>
    // check if more recent zaehlungenDone exists
    zaehlungenDone.some((z) => z.datum >= zg.datum),
  )

  let zaehlungenPlannedIncluded = zaehlungenPlanned.filter(
    (lg) => !zaehlungenPlannedIgnored.map((l) => l.id).includes(lg.id),
  )
  if (zaehlungenPlannedIncluded.length) {
    // need to add last zaehlung to zaehlungenPlannedIncluded to connect lines
    zaehlungenPlannedIncluded = [lastZaehlungDone, ...zaehlungenPlannedIncluded]
  }

  const zaehlungenForLine = sortBy(
    [...zaehlungenDone, ...zaehlungenPlannedIncluded],
    'datum',
  )
  const zaehlungenForLineReversed = [...zaehlungenForLine].reverse()
  const zaehlungenDoneData = zaehlungenDone.map((z) => {
    const teilzaehlungs = [...store.teilzaehlungs.values()]
      .filter((tz) => tz.zaehlung_id === z.id)
      .filter((tz) => !tz._deleted)
    const anzahlenPflanzen = teilzaehlungs
      .map((tz) => tz.anzahl_pflanzen)
      .filter((a) => exists(a))
    const anzPflanzen = anzahlenPflanzen.length
      ? anzahlenPflanzen.reduce((a, b) => a + b, 0)
      : undefined
    const anzahlenAuspflanzbereit = teilzaehlungs
      .map((tz) => tz.anzahl_auspflanzbereit)
      .filter((a) => exists(a))
    const anzAuspflanzbereit = anzahlenAuspflanzbereit.length
      ? anzahlenAuspflanzbereit.reduce((a, b) => a + b, 0)
      : undefined
    const anzahlenMutterPflanzen = teilzaehlungs
      .map((tz) => tz.anzahl_mutterpflanzen)
      .filter((a) => exists(a))
    const anzMutterPflanzen = anzahlenMutterPflanzen.length
      ? anzahlenMutterPflanzen.reduce((a, b) => a + b, 0)
      : undefined
    const datum = new Date(z.datum).getTime()

    return {
      datum: datum,
      'Zählung Pflanzen': anzPflanzen,
      'Zählung Pflanzen auspflanzbereit': anzAuspflanzbereit,
      'Zählung Mutterpflanzen': anzMutterPflanzen,
      'Zählung andere Mengen': teilzaehlungs
        .map((t) => t.andere_menge)
        .join(', '),
      'Zählung Beschreibung auspflanzbereite Pflanzen': teilzaehlungs
        .map((t) => t.auspflanzbereit_beschreibung)
        .join(', '),
      'Zählung Bemerkungen': teilzaehlungs.map((t) => t.bemerkungen).join(', '),
      ereignis: 'Zählung',
    }
  })
  const zaehlungenPlannedIncludedData = zaehlungenPlannedIncluded.map((z) => {
    const teilzaehlungs = [...store.teilzaehlungs.values()]
      .filter((tz) => tz.zaehlung_id === z.id)
      .filter((tz) => !tz._deleted)
    const anzahlenPflanzen = teilzaehlungs
      .map((tz) => tz.anzahl_pflanzen)
      .filter((a) => exists(a))
    const anzPflanzen = anzahlenPflanzen.length
      ? anzahlenPflanzen.reduce((a, b) => a + b, 0)
      : undefined
    const anzahlenAuspflanzbereit = teilzaehlungs
      .map((tz) => tz.anzahl_auspflanzbereit)
      .filter((a) => exists(a))
    const anzAuspflanzbereit = anzahlenAuspflanzbereit.length
      ? anzahlenAuspflanzbereit.reduce((a, b) => a + b, 0)
      : undefined
    const anzahlenMutterPflanzen = teilzaehlungs
      .map((tz) => tz.anzahl_mutterpflanzen)
      .filter((a) => exists(a))
    const anzMutterPflanzen = anzahlenMutterPflanzen.length
      ? anzahlenMutterPflanzen.reduce((a, b) => a + b, 0)
      : undefined

    return {
      datum: new Date(z.datum).getTime(),
      'Zählung Pflanzen Prognose': anzPflanzen,
      'Zählung Pflanzen auspflanzbereit Prognose': anzAuspflanzbereit,
      'Zählung Mutterpflanzen Prognose': anzMutterPflanzen,
      'Zählung Prognose': teilzaehlungs
        .map((t) => (t.prognose ? 'ja' : 'nein'))
        .join(', '),
      'Zählung andere Mengen': teilzaehlungs
        .map((t) => t.andere_menge)
        .join(', '),
      'Zählung Beschreibung auspflanzbereite Pflanzen': teilzaehlungs
        .map((t) => t.auspflanzbereit_beschreibung)
        .join(', '),
      'Zählung Bemerkungen': teilzaehlungs.map((t) => t.bemerkungen).join(', '),
      ereignis: 'Zählung',
    }
  })
  const zaehlungenPlannedIgnoredData = zaehlungenPlannedIgnored.map((z) => {
    const teilzaehlungs = [...store.teilzaehlungs.values()]
      .filter((tz) => tz.zaehlung_id === z.id)
      .filter((tz) => !tz._deleted)
    const anzahlenPflanzen = teilzaehlungs
      .map((tz) => tz.anzahl_pflanzen)
      .filter((a) => exists(a))
    const anzPflanzen = anzahlenPflanzen.length
      ? anzahlenPflanzen.reduce((a, b) => a + b, 0)
      : undefined
    const anzahlenAuspflanzbereit = teilzaehlungs
      .map((tz) => tz.anzahl_auspflanzbereit)
      .filter((a) => exists(a))
    const anzAuspflanzbereit = anzahlenAuspflanzbereit.length
      ? anzahlenAuspflanzbereit.reduce((a, b) => a + b, 0)
      : undefined
    const anzahlenMutterPflanzen = teilzaehlungs
      .map((tz) => tz.anzahl_mutterpflanzen)
      .filter((a) => exists(a))
    const anzMutterPflanzen = anzahlenMutterPflanzen.length
      ? anzahlenMutterPflanzen.reduce((a, b) => a + b, 0)
      : undefined

    return {
      datum: new Date(z.datum).getTime(),
      'Zählung Pflanzen Prognose, ignoriert': anzPflanzen,
      'Zählung Pflanzen auspflanzbereit Prognose, ignoriert': anzAuspflanzbereit,
      'Zählung Mutterpflanzen Prognose, ignoriert': anzMutterPflanzen,
      'Zählung Prognose': teilzaehlungs
        .map((t) => (t.prognose ? 'ja' : 'nein'))
        .join(', '),
      'Zählung andere Mengen': teilzaehlungs
        .map((t) => t.andere_menge)
        .join(', '),
      'Zählung Beschreibung auspflanzbereite Pflanzen': teilzaehlungs
        .map((t) => t.auspflanzbereit_beschreibung)
        .join(', '),
      'Zählung Bemerkungen': teilzaehlungs.map((t) => t.bemerkungen).join(', '),
      ereignis: 'Zählung',
    }
  })
  const zaehlungenDataGroupedByDatum = groupBy(
    [...zaehlungenDoneData, ...zaehlungenPlannedIncludedData],
    'datum',
  )
  const zaehlungenData = Object.entries(
    zaehlungenDataGroupedByDatum,
    // eslint-disable-next-line no-unused-vars
  ).map(([key, value]) => Object.assign({}, ...value))

  const anLieferungenDone = lieferungsSorted
    .filter((l) => l.nach_kultur_id === row.id)
    .filter((l) => l.geplant === false)
    .filter((l) => !!l.datum)
    .filter((l) => l.datum <= format(new Date(), 'yyyy-mm-dd'))
  const anLieferungenPlanned = lieferungsSorted
    .filter((l) => l.nach_kultur_id === row.id)
    .filter((l) => l.geplant === true)
    .filter((l) => !!l.datum)
  const anLieferungenPlannedIgnored = anLieferungenPlanned.filter((lg) =>
    // check if more recent anLieferungenDone exists
    anLieferungenDone.some((lu) => lu.datum >= lg.datum),
  )
  const anLieferungenPlannedIncluded = anLieferungenPlanned.filter(
    (lg) => !anLieferungenPlannedIgnored.map((l) => l.id).includes(lg.id),
  )
  const anLieferungenForLine = sortBy(
    [...anLieferungenDone, ...anLieferungenPlannedIncluded],
    'datum',
  )
  const ausLieferungenDone = lieferungsSorted
    .filter((l) => l.von_kultur_id === row.id)
    .filter((l) => l.geplant === false)
    .filter((l) => !!l.datum)
    .filter((l) => l.datum <= format(new Date(), 'yyyy-mm-dd'))
  const ausLieferungenPlanned = lieferungsSorted
    .filter((l) => l.von_kultur_id === row.id)
    .filter((l) => l.geplant === true)
    .filter((l) => !!l.datum)
  const ausLieferungenPlannedIgnored = ausLieferungenPlanned.filter((lg) =>
    // check if more recent ausLieferungenDone exists
    ausLieferungenDone.some((l) => l.datum >= lg.datum),
  )
  const ausLieferungenPlannedIncluded = ausLieferungenPlanned.filter(
    (lg) => !ausLieferungenPlannedIgnored.map((l) => l.id).includes(lg.id),
  )
  const ausLieferungenForLine = sortBy(
    [...ausLieferungenDone, ...ausLieferungenPlannedIncluded],
    'datum',
  )
  const anLieferungenDoneData = anLieferungenDone.map((l) => {
    // 1. previous Zaehlung is basis
    // If none, pretend this is first zaehlung
    const previousZaehlung = zaehlungenForLineReversed.find(
      (z) => z.datum < l.datum,
    ) || {
      datum: '1900.01.01',
      anzahl_pflanzen: 0,
      anzahl_auspflanzbereit: 0,
    }
    // 2. Summ all Lieferungen since
    const anLieferungenSince = anLieferungenForLine.filter(
      (a) => a.datum > previousZaehlung.datum && a.datum < l.datum,
    )
    const ausLieferungenSince = ausLieferungenForLine.filter(
      (a) => a.datum > previousZaehlung.datum && a.datum < l.datum,
    )

    const anzahlenPflanzen = teilzaehlungsSorted
      .filter((tz) => tz.zaehlung_id === previousZaehlung.id)
      .map((tz) => tz.anzahl_pflanzen)
      .filter((a) => exists(a))
    const anzPflanzen = anzahlenPflanzen.reduce((a, b) => a + b, 0)
    const anzahlenAuspflanzbereit = teilzaehlungsSorted
      .filter((tz) => tz.zaehlung_id === previousZaehlung.id)
      .map((tz) => tz.anzahl_auspflanzbereit)
      .filter((a) => exists(a))
    const anzAuspflanzbereit = anzahlenAuspflanzbereit.reduce(
      (a, b) => a + b,
      0,
    )

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
      'Lieferung Pflanzen': l.anzahl_pflanzen || undefined,
      'Lieferung Pflanzen auspflanzbereit':
        l.anzahl_auspflanzbereit || undefined,
      'Lieferung andere Mengen': l.andere_menge,
      'Lieferung Gramm Samen': l.gramm_samen,
      'Lieferung von Anzahl Individuen': l.von_anzahl_individuen,
      'Lieferung Bemerkungen': l.bemerkungen,
      'Zählung Pflanzen': sumAnzahlPflanzen + l.anzahl_pflanzen ?? undefined,
      'Zählung Pflanzen auspflanzbereit':
        sumAnzahlAuspflanzbereit + l.anzahl_auspflanzbereit ?? undefined,
      ereignis: 'Lieferung',
    }
  })
  const ausLieferungenDoneData = ausLieferungenDone.map((l) => {
    // 1. previous Zaehlung is basis. If none, take 0
    const previousZaehlung = zaehlungenForLineReversed.find(
      (z) => z.datum < l.datum,
    ) || {
      datum: '1900.01.01',
      anzahl_pflanzen: 0,
      anzahl_auspflanzbereit: 0,
    }
    // 2. Summ all Lieferungen since
    const anLieferungenSince = anLieferungenForLine.filter(
      (a) => a.datum > previousZaehlung.datum && a.datum < l.datum,
    )
    const ausLieferungenSince = ausLieferungenForLine.filter(
      (a) => a.datum > previousZaehlung.datum && a.datum < l.datum,
    )
    const anzahlenPflanzen = teilzaehlungsSorted
      .filter((tz) => tz.zaehlung_id === previousZaehlung.id)
      .map((tz) => tz.anzahl_pflanzen)
      .filter((a) => exists(a))
    const anzPflanzen = anzahlenPflanzen.reduce((a, b) => a + b, 0)
    const anzahlenAuspflanzbereit = teilzaehlungsSorted
      .filter((tz) => tz.zaehlung_id === previousZaehlung.id)
      .map((tz) => tz.anzahl_auspflanzbereit)
      .filter((a) => exists(a))
    const anzAuspflanzbereit = anzahlenAuspflanzbereit.reduce(
      (a, b) => a + b,
      0,
    )
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
      'Lieferung Pflanzen': -l.anzahl_pflanzen || undefined,
      'Lieferung Pflanzen auspflanzbereit':
        -l.anzahl_auspflanzbereit || undefined,
      'Lieferung andere Mengen': l.andere_menge,
      'Lieferung Gramm Samen': l.gramm_samen,
      'Lieferung von Anzahl Individuen': l.von_anzahl_individuen,
      'Lieferung Bemerkungen': l.bemerkungen,
      'Zählung Pflanzen': sumAnzahlPflanzen - l.anzahl_pflanzen ?? undefined,
      'Zählung Pflanzen auspflanzbereit':
        sumAnzahlAuspflanzbereit - l.anzahl_auspflanzbereit ?? undefined,
      ereignis: 'Lieferung',
    }
  })
  const anLieferungenPlannedData = anLieferungenPlannedIncluded.map((l) => {
    // 1. previous Zaehlung is basis
    // If none, pretend this is first zaehlung
    const previousZaehlung = zaehlungenForLineReversed.find(
      (z) => z.datum < l.datum,
    ) || {
      datum: '1900.01.01',
      anzahl_pflanzen: 0,
      anzahl_auspflanzbereit: 0,
    }
    // 2. Summ all Lieferungen since
    const anLieferungenSince = anLieferungenPlannedIncluded.filter(
      (a) => a.datum > previousZaehlung.datum && a.datum < l.datum,
    )
    const ausLieferungenSince = ausLieferungenPlannedIncluded.filter(
      (a) => a.datum > previousZaehlung.datum && a.datum < l.datum,
    )
    const anzahlenPflanzen = teilzaehlungsSorted
      .filter((tz) => tz.zaehlung_id === previousZaehlung.id)
      .map((tz) => tz.anzahl_pflanzen)
      .filter((a) => exists(a))
    const anzPflanzen = anzahlenPflanzen.reduce((a, b) => a + b, 0)
    const anzahlenAuspflanzbereit = teilzaehlungsSorted
      .filter((tz) => tz.zaehlung_id === previousZaehlung.id)
      .map((tz) => tz.anzahl_auspflanzbereit)
      .filter((a) => exists(a))
    const anzAuspflanzbereit = anzahlenAuspflanzbereit.reduce(
      (a, b) => a + b,
      0,
    )
    const sumAnzahlPflanzen =
      anzPflanzen +
      (sumBy(anLieferungenSince, 'anzahl_pflanzen') || 0) -
      (sumBy(ausLieferungenSince, 'anzahl_pflanzen') || 0)
    const sumAnzahlAuspflanzbereit =
      anzAuspflanzbereit +
      (sumBy(anLieferungenSince, 'anzahl_auspflanzbereit') || 0) -
      (sumBy(ausLieferungenSince, 'anzahl_auspflanzbereit') || 0)

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
        sumAnzahlPflanzen + l.anzahl_pflanzen ?? undefined
      data['Zählung Pflanzen auspflanzbereit'] =
        sumAnzahlAuspflanzbereit + l.anzahl_auspflanzbereit ?? undefined
    } else {
      data['Zählung Pflanzen Prognose'] =
        sumAnzahlPflanzen + l.anzahl_pflanzen ?? undefined
      data['Zählung Pflanzen auspflanzbereit Prognose'] =
        sumAnzahlAuspflanzbereit + l.anzahl_auspflanzbereit ?? undefined
    }
    return data
  })
  const anLieferungenPlannedIgnoredData = anLieferungenPlannedIgnored.map(
    (l) => ({
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
  const ausLieferungenPlannedData = ausLieferungenPlannedIncluded.map((l) => {
    // 1. previous Zaehlung is basis
    // If none, pretend this is first zaehlung
    const previousZaehlung = zaehlungenForLineReversed.find(
      (z) => z.datum < l.datum,
    ) || {
      datum: '1900.01.01',
      anzahl_pflanzen: 0,
      anzahl_auspflanzbereit: 0,
    }
    // 2. Summ all Lieferungen since
    const anLieferungenSince = anLieferungenPlannedIncluded.filter(
      (a) => a.datum > previousZaehlung.datum && a.datum < l.datum,
    )
    const ausLieferungenSince = ausLieferungenPlannedIncluded.filter(
      (a) => a.datum > previousZaehlung.datum && a.datum < l.datum,
    )
    const anzahlenPflanzen = teilzaehlungsSorted
      .filter((tz) => tz.zaehlung_id === previousZaehlung.id)
      .map((tz) => tz.anzahl_pflanzen)
      .filter((a) => exists(a))
    const anzPflanzen = anzahlenPflanzen.reduce((a, b) => a + b, 0)
    const anzahlenAuspflanzbereit = teilzaehlungsSorted
      .filter((tz) => tz.zaehlung_id === previousZaehlung.id)
      .map((tz) => tz.anzahl_auspflanzbereit)
      .filter((a) => exists(a))
    const anzAuspflanzbereit = anzahlenAuspflanzbereit.reduce(
      (a, b) => a + b,
      0,
    )
    const sumAnzahlPflanzen =
      anzPflanzen +
      (sumBy(anLieferungenSince, 'anzahl_pflanzen') || 0) -
      (sumBy(ausLieferungenSince, 'anzahl_pflanzen') || 0)
    const sumAnzahlAuspflanzbereit =
      anzAuspflanzbereit +
      (sumBy(anLieferungenSince, 'anzahl_auspflanzbereit') || 0) -
      (sumBy(ausLieferungenSince, 'anzahl_auspflanzbereit') || 0)

    const data = {
      datum: new Date(l.datum).getTime(),
      'Lieferung Pflanzen geplant': -l.anzahl_pflanzen || undefined,
      'Lieferung Pflanzen auspflanzbereit geplant':
        -l.anzahl_auspflanzbereit || undefined,
      'Lieferung andere Mengen': l.andere_menge,
      'Lieferung Gramm Samen': l.gramm_samen,
      'Lieferung von Anzahl Individuen': l.von_anzahl_individuen,
      'Lieferung Bemerkungen': l.bemerkungen,
      ereignis: 'Lieferung',
    }
    if (data.datum < new Date(lastZaehlungDone.datum).getTime()) {
      data['Zählung Pflanzen'] =
        sumAnzahlPflanzen - l.anzahl_pflanzen ?? undefined
      data['Zählung Pflanzen auspflanzbereit'] =
        sumAnzahlAuspflanzbereit - l.anzahl_auspflanzbereit ?? undefined
    } else {
      data['Zählung Pflanzen Prognose'] =
        sumAnzahlPflanzen - l.anzahl_pflanzen ?? undefined
      data['Zählung Pflanzen auspflanzbereit Prognose'] =
        sumAnzahlAuspflanzbereit - l.anzahl_auspflanzbereit ?? undefined
    }
    return data
  })
  const ausLieferungenPlannedIgnoredData = ausLieferungenPlannedIgnored.map(
    (l) => ({
      datum: new Date(l.datum).getTime(),
      'Lieferung Pflanzen geplant, ignoriert': -l.anzahl_pflanzen || undefined,
      'Lieferung Pflanzen auspflanzbereit geplant, ignoriert':
        -l.anzahl_auspflanzbereit || undefined,
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
    'datum',
  )

  return allData
}

export default buildData
