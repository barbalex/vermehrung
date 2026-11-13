import { DateTime } from 'luxon'
import { groupBy } from 'es-toolkit'
import { first as first$ } from 'rxjs/operators'
import { Q } from 'nitromelondb'

import { exists } from '../../../../../../utils/exists.ts'
import { notDeletedQuery } from '../../../../../../utils/notDeletedQuery.ts'
import { artsSortedFromArts } from '../../../../../../utils/artsSortedFromArts.ts'
import { gartensSortedFromGartens } from '../../../../../../utils/gartensSortedFromGartens.ts'
import { kultursSortedFromKulturs } from '../../../../../../utils/kultursSortedFromKulturs.ts'
import { sammlungsSortedFromSammlungs } from '../../../../../../utils/sammlungsSortedFromSammlungs.ts'
import { herkunftSort } from '../../../../../../utils/herkunftSort.ts'
import { lieferungSort } from '../../../../../../utils/lieferungSort.ts'
import { personSort } from '../../../../../../utils/personSort.ts'
import { teilkulturSort } from '../../../../../../utils/teilkulturSort.ts'
import { zaehlungSort } from '../../../../../../utils/zaehlungSort.ts'
import { personLabelFromPerson } from '../../../../../../utils/personLabelFromPerson.ts'
import { herkunftLabelFromHerkunft } from '../../../../../../utils/herkunftLabelFromHerkunft.ts'
import { store, filterTableAtoms } from '../../../../../../store/index.ts'
import { triStateDeletedQuery } from '../../../../../../utils/triStateDeletedQuery.ts'
import { triStateQuery } from '../../../../../../utils/triStateDeletedQuery.ts'
import {
  buildQkMessages,
  labelOf,
  lieferungText,
} from '../../../../../shared/QK/buildQkMessages.ts'

export const createMessageFunctions = async ({
  artId,
  db,
}: {
  artId: string
  db: import('nitromelondb').Database | null
}) => {
  // snapshot of all table filters at call time
  const filter = Object.fromEntries(
    Object.keys(filterTableAtoms).map((table) => [
      table,
      store.get(filterTableAtoms[table]),
    ]),
  )
  const year = DateTime.now().year
  const startYear = `${year}-01-01`
  const startNextYear = `${year + 1}-01-01`
  const today = DateTime.now().toFormat('yyyy-LL-dd')

  let arts: import('../../../../../../dbModel.ts').Art[] = []
  try {
    arts =
      (await db
        ?.get<import('../../../../../../dbModel.ts').Art>('art')
        .query(triStateDeletedQuery(filter.art?._deleted))
        .fetch()) ?? []
  } catch {}
  const artsSorted = await artsSortedFromArts(arts)

  let avs: import('../../../../../../dbModel.ts').Av[] = []
  try {
    avs =
      (await db
        ?.get<import('../../../../../../dbModel.ts').Av>('av')
        .query(notDeletedQuery)
        .fetch()) ?? []
  } catch {}

  let herkunfts: import('../../../../../../dbModel.ts').Herkunft[] = []
  try {
    herkunfts =
      (await db
        ?.get<import('../../../../../../dbModel.ts').Herkunft>('herkunft')
        .query(triStateDeletedQuery(filter.herkunft?._deleted))
        .fetch()) ?? []
  } catch {}
  const herkunftsSorted = herkunfts.sort(herkunftSort)

  let kulturs: import('../../../../../../dbModel.ts').Kultur[] = []
  try {
    kulturs =
      (await db
        ?.get<import('../../../../../../dbModel.ts').Kultur>('kultur')
        .query(
          Q.where('art_id', Q.eq(artId)),
          triStateDeletedQuery(filter.kultur?._deleted),
          triStateQuery('aktiv', filter.kultur?.aktiv),
        )
        .fetch()) ?? []
  } catch {}
  const kultursSorted = await kultursSortedFromKulturs(kulturs)

  let lieferungs: import('../../../../../../dbModel.ts').Lieferung[] = []
  try {
    lieferungs =
      (await db
        ?.get<import('../../../../../../dbModel.ts').Lieferung>('lieferung')
        .query(triStateDeletedQuery(filter.lieferung?._deleted))
        .fetch()) ?? []
  } catch {}
  const lieferungsSorted = lieferungs.sort(lieferungSort)
  const lieferungsOfArt = lieferungsSorted.filter((l) => l.art_id === artId)

  let persons: import('../../../../../../dbModel.ts').Person[] = []
  try {
    persons =
      (await db
        ?.get<import('../../../../../../dbModel.ts').Person>('person')
        .query(
          triStateDeletedQuery(filter.person?._deleted),
          triStateQuery('aktiv', filter.person?.aktiv),
        )
        .fetch()) ?? []
  } catch {}
  const personsSorted = persons.sort(personSort)

  let sammlungsOfArt: import('../../../../../../dbModel.ts').Sammlung[] = []
  try {
    sammlungsOfArt =
      (await db
        ?.get<import('../../../../../../dbModel.ts').Sammlung>('sammlung')
        .query(
          triStateDeletedQuery(filter.sammlung?._deleted),
          Q.on('art', 'id', artId),
        )
        .fetch()) ?? []
  } catch {}
  const sammlungsOfArtSorted =
    await sammlungsSortedFromSammlungs(sammlungsOfArt)

  let zaehlungsOfArt: import('../../../../../../dbModel.ts').Zaehlung[] = []
  try {
    zaehlungsOfArt =
      (await db
        ?.get<import('../../../../../../dbModel.ts').Zaehlung>('zaehlung')
        .query(
          Q.experimentalNestedJoin('kultur', 'art'),
          Q.on('kultur', Q.on('art', 'id', artId)),
          triStateDeletedQuery(filter.zaehlung?._deleted),
        )
        .fetch()) ?? []
  } catch {}
  const zaehlungsOfArtSorted = zaehlungsOfArt.sort(zaehlungSort)

  let teilzaehlungsOfArt: import('../../../../../../dbModel.ts').Teilzaehlung[] =
    []
  try {
    teilzaehlungsOfArt =
      (await db
        ?.get<import('../../../../../../dbModel.ts').Teilzaehlung>(
          'teilzaehlung',
        )
        .query(
          Q.experimentalNestedJoin('zaehlung', 'kultur'),
          Q.experimentalNestedJoin('kultur', 'art'),
          Q.on('zaehlung', Q.on('kultur', Q.on('art', 'id', artId))),
          Q.where('_deleted', false),
        )
        .fetch()) ?? []
  } catch {}

  let teilkultursOfArt: import('../../../../../../dbModel.ts').Teilkultur[] = []
  try {
    teilkultursOfArt =
      (await db
        ?.get<import('../../../../../../dbModel.ts').Teilkultur>('teilkultur')
        .query(
          Q.experimentalNestedJoin('kultur', 'art'),
          Q.on('kultur', Q.on('art', 'id', artId)),
          triStateDeletedQuery(filter.teilkultur?._deleted),
        )
        .fetch()) ?? []
  } catch {}
  const teilkultursOfArtSorted = teilkultursOfArt.sort(teilkulturSort)

  // the zaehlung messages share url and text: one kultur fetch per row
  const zaehlungMessage = async (
    z: import('../../../../../../dbModel.ts').Zaehlung,
  ): Promise<{ url: string[]; text: string }> => {
    let kultur
    try {
      kultur = await z.kultur?.fetch()
    } catch {}
    let kulturLabel
    try {
      kulturLabel = await kultur?.label.pipe(first$()).toPromise()
    } catch {}
    const zaehlungLabel =
      z.datum ?
        `Zählung vom ${DateTime.fromJSDate(new Date(z.datum)).toFormat('yyyy.LL.dd')}`
      : `Zählung-ID: ${z.id}`
    const anzTz = teilzaehlungsOfArt
      .filter(
        (tz: import('../../../../../../dbModel.ts').Teilzaehlung) =>
          tz.zaehlung_id === z.id,
      )
      .filter(
        (tz: import('../../../../../../dbModel.ts').Teilzaehlung) =>
          !tz._deleted,
      ).length
    const teilzaehlung = anzTz > 1 ? ` (${anzTz} Teilzählungen)` : ''
    return {
      url: [
        'Arten',
        artId,
        'Kulturen',
        kultur?.id,
        'Zaehlungen',
        z.id,
        'Zaehlung',
      ] as string[],
      text: `${kulturLabel ?? '(keine Kultur)'}, ${zaehlungLabel}${teilzaehlung}`,
    }
  }

  // zaehlungs whose non-deleted teilzaehlungs miss the given field
  const tzWithout = (field: string) => (z: { id: string }) =>
    !!teilzaehlungsOfArt
      .filter(
        (tz: import('../../../../../../dbModel.ts').Teilzaehlung) =>
          tz.zaehlung_id === z.id,
      )
      .filter(
        (tz: import('../../../../../../dbModel.ts').Teilzaehlung) =>
          !tz._deleted,
      )
      .filter(
        (tz: import('../../../../../../dbModel.ts').Teilzaehlung) =>
          !exists((tz as unknown as Record<string, unknown>)[field]),
      ).length

  return {
    personsWithNonUniqueNr: async () => {
      const pGroupedByNr = groupBy(
        personsSorted.filter(
          (p: import('../../../../../../dbModel.ts').Person) => exists(p.nr),
        ),
        (h) => h.nr ?? '',
      )
      return Object.values(pGroupedByNr)
        .filter((v) => v.length > 1)
        .flatMap((vs) =>
          vs.map((v) => ({
            url: ['Personen', v.id, 'Person'],
            // official label plus the nr - the nr is what this check is
            // about
            text: `${personLabelFromPerson({ person: v })} (Nr. ${v.nr})`,
          })),
        )
    },
    herkunftsWithNonUniqueNr: async () => {
      const hkGroupedByNr = groupBy(herkunftsSorted, (h) => h.nr ?? '')
      return Object.values(hkGroupedByNr)
        .filter((v) => v.length > 1)
        .flatMap((vs) =>
          vs.map((v) => ({
            url: ['Herkuenfte', v.id, 'Herkunft'],
            text: herkunftLabelFromHerkunft({ herkunft: v }),
          })),
        )
    },
    artsOhneAv: async () =>
      await buildQkMessages({
        rows: artsSorted.filter((a) => a.id === artId),
        failsCheck: (a) =>
          !avs
            .filter(
              (av: import('../../../../../../dbModel.ts').Av) =>
                av.art_id === a.id,
            )
            .filter(
              (av: import('../../../../../../dbModel.ts').Av) => !av._deleted,
            ).length,
        buildUrl: (a) => ['Arten', a.id, 'Art'],
        buildText: (a) => labelOf(a),
      }),
    sammlungsWithoutLieferung: async () =>
      await buildQkMessages({
        rows: sammlungsOfArtSorted.filter((s) => s.art_id === artId),
        failsCheck: (s) =>
          !lieferungsSorted.find(
            (l: import('../../../../../../dbModel.ts').Lieferung) =>
              l.von_sammlung_id === s.id,
          ),
        buildUrl: (s) => ['Sammlungen', s.id, 'Sammlung'],
        buildText: (s) => labelOf(s),
      }),
    sammlungsWithNonUniqueNr: async () => {
      const sGroupedByNr = groupBy(
        sammlungsOfArtSorted.filter((s) => s.art_id === artId),
        (h) => h.nr ?? '',
      )
      return await Promise.all(
        Object.values(sGroupedByNr)
          .filter((s) => s.length > 1)
          .flatMap((vs) =>
            vs.map(async (s) => ({
              url: ['Sammlungen', s.id, 'Sammlung'],
              text: await labelOf(s),
            })),
          ),
      )
    },
    sammlungsWithoutNr: async () =>
      await buildQkMessages({
        rows: sammlungsOfArtSorted.filter((s) => s.art_id === artId),
        failsCheck: (s) => !exists(s.nr),
        buildUrl: (s) => ['Arten', artId, 'Sammlungen', s.id, 'Sammlung'],
        buildText: (s) => labelOf(s),
      }),
    sammlungsWithoutHerkunft: async () =>
      await buildQkMessages({
        rows: sammlungsOfArtSorted.filter((s) => s.art_id === artId),
        failsCheck: (s) => !s.herkunft_id,
        buildUrl: (s) => ['Arten', artId, 'Sammlungen', s.id, 'Sammlung'],
        buildText: (s) => labelOf(s),
      }),
    sammlungsWithoutPerson: async () =>
      await buildQkMessages({
        rows: sammlungsOfArtSorted.filter((s) => s.art_id === artId),
        failsCheck: (s) => !s.person_id,
        buildUrl: (s) => ['Arten', artId, 'Sammlungen', s.id, 'Sammlung'],
        buildText: (s) => labelOf(s),
      }),
    sammlungsWithoutDatum: async () =>
      await buildQkMessages({
        rows: sammlungsOfArtSorted.filter((s) => s.art_id === artId),
        failsCheck: (s) => !s.datum,
        buildUrl: (s) => ['Arten', artId, 'Sammlungen', s.id, 'Sammlung'],
        buildText: (s) => labelOf(s),
      }),
    sammlungsWithoutAnzahlPflanzen: async () =>
      await buildQkMessages({
        rows: sammlungsOfArtSorted.filter((s) => s.art_id === artId),
        failsCheck: (s) => !exists(s.anzahl_pflanzen),
        buildUrl: (s) => ['Arten', artId, 'Sammlungen', s.id, 'Sammlung'],
        buildText: (s) => labelOf(s),
      }),
    sammlungsWithoutVonAnzahlIdividuen: async () =>
      await buildQkMessages({
        rows: sammlungsOfArtSorted.filter((s) => s.art_id === artId),
        failsCheck: (s) => !exists(s.von_anzahl_individuen),
        buildUrl: (s) => ['Arten', artId, 'Sammlungen', s.id, 'Sammlung'],
        buildText: (s) => labelOf(s),
      }),
    gartensAllKultursInactive: async () => {
      let kulturs: import('../../../../../../dbModel.ts').Kultur[] = []
      try {
        kulturs =
          (await db
            ?.get<import('../../../../../../dbModel.ts').Kultur>('kultur')
            .query(Q.where('art_id', Q.eq(artId)), Q.where('_deleted', false))
            .fetch()) ?? []
      } catch {}

      const gartenIds = [
        ...new Set(
          kulturs
            .map(
              (k) =>
                (k as unknown as { garten_id?: string | null }).garten_id ?? '',
            )
            .filter(Boolean),
        ),
      ]

      let gartens: import('../../../../../../dbModel.ts').Garten[] = []
      try {
        gartens =
          (await db
            ?.get<import('../../../../../../dbModel.ts').Garten>('garten')
            .query(
              Q.where('_deleted', false),
              Q.where('aktiv', true),
              Q.where('id', Q.oneOf(gartenIds)),
            )
            .fetch()) ?? []
      } catch {}
      const gartensOfArt = await gartensSortedFromGartens(gartens)
      const allKultursInactive = await Promise.all(
        gartensOfArt.map(async (g) => {
          let kulturs: import('../../../../../../dbModel.ts').Kultur[] = []
          try {
            kulturs = await g.kulturs.extend(Q.where('_deleted', false)).fetch()
          } catch {}

          return !!kulturs.length && kulturs.every((k) => !k.aktiv)
        }),
      )
      return await buildQkMessages({
        rows: gartensOfArt.filter((g, i) => allKultursInactive[i] && g.aktiv),
        failsCheck: () => true,
        buildUrl: (g) => ['Gaerten', g.id, 'Garten'],
        buildText: (g) => labelOf(g),
      })
    },
    kultursWithoutVonAnzahlIndividuen: async () =>
      await buildQkMessages({
        rows: kultursSorted,
        failsCheck: (k) => !exists(k.von_anzahl_individuen),
        buildUrl: (k) => ['Arten', artId, 'Kulturen', k.id, 'Kultur'],
        buildText: (k) => labelOf(k),
      }),
    kultursWithoutGarten: async () =>
      await buildQkMessages({
        rows: kultursSorted,
        failsCheck: (k) => !k.garten_id,
        buildUrl: (k) => ['Arten', artId, 'Kulturen', k.id, 'Kultur'],
        buildText: (k) => labelOf(k),
      }),
    kultursWithoutHerkunft: async () =>
      await buildQkMessages({
        rows: kultursSorted,
        failsCheck: (k) => !k.herkunft_id,
        buildUrl: (k) => ['Arten', artId, 'Kulturen', k.id, 'Kultur'],
        buildText: (k) => labelOf(k),
      }),
    kultursWithoutZaehlungThisYear: async () =>
      // NOTE: the original compared z.id === k.zaehlung_id - a column
      // that does not exist on kultur, so no zaehlung ever matched and
      // every kultur was flagged. corrected to match by kultur_id
      await buildQkMessages({
        rows: kultursSorted,
        failsCheck: (k) =>
          zaehlungsOfArt
            .filter(
              (z: import('../../../../../../dbModel.ts').Zaehlung) =>
                z.kultur_id === k.id,
            )
            .filter(
              (z: import('../../../../../../dbModel.ts').Zaehlung) =>
                !z._deleted,
            )
            .filter(
              (z: import('../../../../../../dbModel.ts').Zaehlung) =>
                z.datum && z.datum > startYear && z.datum < startNextYear,
            ).length === 0,
        buildUrl: (k) => ['Arten', artId, 'Kulturen', k.id, 'Kultur'],
        buildText: (k) => labelOf(k),
      }),
    teilkultursWithoutName: async () =>
      await buildQkMessages({
        rows: teilkultursOfArtSorted,
        failsCheck: (tk: import('../../../../../../dbModel.ts').Teilkultur) =>
          !tk.name,
        buildMessage: async (
          tk: import('../../../../../../dbModel.ts').Teilkultur,
        ) => {
          let kultur
          try {
            kultur = await tk.kultur?.fetch()
          } catch {}
          let kulturLabel
          try {
            kulturLabel = await kultur?.label.pipe(first$()).toPromise()
          } catch {}

          return {
            url: [
              'Arten',
              artId,
              'Kulturen',
              kultur?.id,
              'Teilkulturen',
              tk.id,
              'Teilkultur',
            ] as string[],
            text: `${kulturLabel ?? '(keine Kultur)'}, Teilkultur-ID: ${tk.id}`,
          }
        },
      }),
    zaehlungsInFutureNotPrognose: async () =>
      await buildQkMessages({
        rows: zaehlungsOfArtSorted,
        failsCheck: (z) => !!z.datum && z.datum >= today,
        buildMessage: (z) => zaehlungMessage(z),
      }),
    zaehlungsWithoutDatum: async () =>
      await buildQkMessages({
        rows: zaehlungsOfArtSorted,
        failsCheck: (z) => !z.datum,
        buildMessage: (z) => zaehlungMessage(z),
      }),
    zaehlungsWithoutAnzahlPflanzen: async () =>
      await buildQkMessages({
        rows: zaehlungsOfArtSorted,
        failsCheck: tzWithout('anzahl_pflanzen'),
        buildMessage: (z) => zaehlungMessage(z),
      }),
    zaehlungsWithoutAnzahlAuspflanzbereit: async () =>
      await buildQkMessages({
        rows: zaehlungsOfArtSorted,
        failsCheck: tzWithout('anzahl_auspflanzbereit'),
        buildMessage: (z) => zaehlungMessage(z),
      }),
    zaehlungsWithoutAnzahlMutterpflanzen: async () =>
      await buildQkMessages({
        rows: zaehlungsOfArtSorted,
        failsCheck: tzWithout('anzahl_mutterpflanzen'),
        buildMessage: (z) => zaehlungMessage(z),
      }),
    zaehlungsWithTeilzaehlungsWithoutTeilkulturThoughTeilkulturIsChoosen:
      async () => {
        let zaehlungsOfArt: import('../../../../../../dbModel.ts').Zaehlung[] =
          []
        try {
          zaehlungsOfArt =
            (await db
              ?.get<import('../../../../../../dbModel.ts').Zaehlung>('zaehlung')
              .query(
                Q.experimentalNestedJoin('kultur', 'art'),
                Q.on('kultur', Q.on('art', 'id', artId)),
                Q.experimentalNestedJoin('kultur', 'kultur_option'),
                Q.on('kultur', Q.on('kultur_option', 'tk', true)),
                triStateDeletedQuery(filter.zaehlung?._deleted),
              )
              .fetch()) ?? []
        } catch {}
        return await buildQkMessages({
          rows: zaehlungsOfArt.sort(zaehlungSort),
          failsCheck: (z) => {
            const tzs = teilzaehlungsOfArt
              .filter(
                (tz: import('../../../../../../dbModel.ts').Teilzaehlung) =>
                  tz.zaehlung_id === z.id,
              )
              .filter(
                (tz: import('../../../../../../dbModel.ts').Teilzaehlung) =>
                  !tz._deleted,
              )
            return (
              !!tzs.length &&
              !!tzs.filter(
                (tz: import('../../../../../../dbModel.ts').Teilzaehlung) =>
                  !tz.teilkultur_id,
              ).length
            )
          },
          buildMessage: (z) => zaehlungMessage(z),
        })
      },
    lieferungsWithMultipleVon: async () =>
      await buildQkMessages({
        rows: lieferungsOfArt,
        failsCheck: (l) => !!l.von_sammlung_id && !!l.von_kultur_id,
        buildUrl: (l) => ['Lieferungen', l.id, 'Lieferung'],
        buildText: (l) => lieferungText(l),
      }),
    lieferungsWithMultipleNach: async () =>
      await buildQkMessages({
        rows: lieferungsOfArt,
        failsCheck: (l) => !!l.nach_ausgepflanzt && !!l.nach_kultur_id,
        buildUrl: (l) => ['Lieferungen', l.id, 'Lieferung'],
        buildText: (l) => lieferungText(l),
      }),
    lieferungsWithoutAnzahlPflanzen: async () =>
      await buildQkMessages({
        rows: lieferungsOfArt,
        failsCheck: (l) => !exists(l.anzahl_pflanzen),
        buildUrl: (l) => ['Lieferungen', l.id, 'Lieferung'],
        buildText: (l) => lieferungText(l),
      }),
    lieferungsWithoutAnzahlAuspflanzbereit: async () =>
      await buildQkMessages({
        rows: lieferungsOfArt,
        failsCheck: (l) => !exists(l.anzahl_auspflanzbereit),
        buildUrl: (l) => ['Lieferungen', l.id, 'Lieferung'],
        buildText: (l) => lieferungText(l),
      }),
    lieferungsWithoutVonAnzahlIndividuen: async () =>
      await buildQkMessages({
        rows: lieferungsOfArt,
        failsCheck: (l) => !exists(l.von_anzahl_individuen),
        buildUrl: (l) => ['Lieferungen', l.id, 'Lieferung'],
        buildText: (l) => lieferungText(l),
      }),
    lieferungsWithoutVon: async () =>
      await buildQkMessages({
        rows: lieferungsOfArt,
        failsCheck: (l) => !l.von_kultur_id && !l.von_sammlung_id,
        buildUrl: (l) => ['Lieferungen', l.id, 'Lieferung'],
        buildText: (l) => lieferungText(l),
      }),
    lieferungsWithoutNach: async () =>
      await buildQkMessages({
        rows: lieferungsOfArt,
        failsCheck: (l) =>
          (!!l.von_kultur_id || !!l.von_sammlung_id) &&
          !l.nach_kultur_id &&
          !l.nach_ausgepflanzt,
        buildUrl: (l) => ['Lieferungen', l.id, 'Lieferung'],
        buildText: (l) => lieferungText(l),
      }),
    lieferungsWithoutDatum: async () =>
      await buildQkMessages({
        rows: lieferungsOfArt,
        failsCheck: (l) => !l.datum,
        buildUrl: (l) => ['Lieferungen', l.id, 'Lieferung'],
        buildText: (l) => lieferungText(l),
      }),
    lieferungsWithoutPerson: async () =>
      await buildQkMessages({
        rows: lieferungsOfArt,
        failsCheck: (l) => !l.person_id,
        buildUrl: (l) => ['Lieferungen', l.id, 'Lieferung'],
        buildText: (l) => lieferungText(l),
      }),
  }
}
