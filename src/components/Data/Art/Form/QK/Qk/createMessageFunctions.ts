import { format } from 'date-fns/format'
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
import { personFullname } from '../../../../../../utils/personFullname.ts'
import { store, filterTableAtoms } from '../../../../../../store/index.ts'

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
  const year = +format(new Date(), 'yyyy')
  const startYear = `${year}-01-01`
  const startNextYear = `${year + 1}-01-01`

  let arts: import('../../../../../../dbModel.ts').Art[] = []
  try {
    const delQuery =
      filter.art?._deleted === false
        ? Q.where('_deleted', false)
        : filter.art?._deleted === true
          ? Q.where('_deleted', true)
          : Q.or(
              Q.where('_deleted', false),
              Q.where('_deleted', true),
              Q.where('_deleted', null),
            )
    arts = (await db
      ?.get<import('../../../../../../dbModel.ts').Art>('art').query(delQuery).fetch()) ?? []
  } catch {}
  const artsSorted = await artsSortedFromArts(arts)

  let avs: import('../../../../../../dbModel.ts').Av[] = []
  try {
    avs = (await db
      ?.get<import('../../../../../../dbModel.ts').Av>('av').query(notDeletedQuery).fetch()) ?? []
  } catch {}

  let herkunfts: import('../../../../../../dbModel.ts').Herkunft[] = []
  try {
    const delQuery =
      filter.herkunft?._deleted === false
        ? Q.where('_deleted', false)
        : filter.herkunft?._deleted === true
          ? Q.where('_deleted', true)
          : Q.or(
              Q.where('_deleted', false),
              Q.where('_deleted', true),
              Q.where('_deleted', null),
            )
    herkunfts = (await db
      ?.get<import('../../../../../../dbModel.ts').Herkunft>('herkunft').query(delQuery).fetch()) ?? []
  } catch {}
  const herkunftsSorted = herkunfts.sort(herkunftSort)

  let kulturs: import('../../../../../../dbModel.ts').Kultur[] = []
  try {
    const delQuery =
      filter.kultur?._deleted === false
        ? Q.where('_deleted', false)
        : filter.kultur?._deleted === true
          ? Q.where('_deleted', true)
          : Q.or(
              Q.where('_deleted', false),
              Q.where('_deleted', true),
              Q.where('_deleted', null),
            )
    const aktivQuery =
      filter.kultur?.aktiv === false
        ? Q.where('aktiv', false)
        : filter.kultur?.aktiv === true
          ? Q.where('aktiv', true)
          : Q.or(
              Q.where('aktiv', false),
              Q.where('aktiv', true),
              Q.where('aktiv', null),
            )
    kulturs = (await db
      ?.get<import('../../../../../../dbModel.ts').Kultur>('kultur')
      .query(Q.where('art_id', Q.eq(artId)), delQuery, aktivQuery)
      .fetch()) ?? []
  } catch {}
  const kultursSorted = await kultursSortedFromKulturs(kulturs)

  let lieferungs: import('../../../../../../dbModel.ts').Lieferung[] = []
  try {
    const delQuery =
      filter.lieferung?._deleted === false
        ? Q.where('_deleted', false)
        : filter.lieferung?._deleted === true
          ? Q.where('_deleted', true)
          : Q.or(
              Q.where('_deleted', false),
              Q.where('_deleted', true),
              Q.where('_deleted', null),
            )
    lieferungs = (await db
      ?.get<import('../../../../../../dbModel.ts').Lieferung>('lieferung').query(delQuery).fetch()) ?? []
  } catch {}
  const lieferungsSorted = lieferungs.sort(lieferungSort)

  let persons: import('../../../../../../dbModel.ts').Person[] = []
  try {
    const delQuery =
      filter.person?._deleted === false
        ? Q.where('_deleted', false)
        : filter.person?._deleted === true
          ? Q.where('_deleted', true)
          : Q.or(
              Q.where('_deleted', false),
              Q.where('_deleted', true),
              Q.where('_deleted', null),
            )
    const aktivQuery =
      filter.person?.aktiv === false
        ? Q.where('aktiv', false)
        : filter.person?.aktiv === true
          ? Q.where('aktiv', true)
          : Q.or(
              Q.where('aktiv', false),
              Q.where('aktiv', true),
              Q.where('aktiv', null),
            )
    persons = (await db
      ?.get<import('../../../../../../dbModel.ts').Person>('person').query(delQuery, aktivQuery).fetch()) ?? []
  } catch {}
  const personsSorted = persons.sort(personSort)

  let sammlungsOfArt: import('../../../../../../dbModel.ts').Sammlung[] = []
  try {
    const delQuery =
      filter.sammlung?._deleted === false
        ? Q.where('_deleted', false)
        : filter.sammlung?._deleted === true
          ? Q.where('_deleted', true)
          : Q.or(
              Q.where('_deleted', false),
              Q.where('_deleted', true),
              Q.where('_deleted', null),
            )
    sammlungsOfArt = (await db
      ?.get<import('../../../../../../dbModel.ts').Sammlung>('sammlung')
      .query(delQuery, Q.on('art', 'id', artId))
      .fetch()) ?? []
  } catch {}
  const sammlungsOfArtSorted =
    await sammlungsSortedFromSammlungs(sammlungsOfArt)

  let zaehlungsOfArt: import('../../../../../../dbModel.ts').Zaehlung[] = []
  try {
    const delQuery =
      filter.zaehlung?._deleted === false
        ? Q.where('_deleted', false)
        : filter.zaehlung?._deleted === true
          ? Q.where('_deleted', true)
          : Q.or(
              Q.where('_deleted', false),
              Q.where('_deleted', true),
              Q.where('_deleted', null),
            )
    zaehlungsOfArt = (await db
      ?.get<import('../../../../../../dbModel.ts').Zaehlung>('zaehlung')
      .query(
        Q.experimentalNestedJoin('kultur', 'art'),
        Q.on('kultur', Q.on('art', 'id', artId)),
        delQuery,
      )
      .fetch()) ?? []
  } catch {}
  const zaehlungsOfArtSorted = zaehlungsOfArt.sort(zaehlungSort)

  let teilzaehlungsOfArt: import('../../../../../../dbModel.ts').Teilzaehlung[] = []
  try {
    teilzaehlungsOfArt = (await db
      ?.get<import('../../../../../../dbModel.ts').Teilzaehlung>('teilzaehlung')
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
    const delQuery =
      filter.teilkultur?._deleted === false
        ? Q.where('_deleted', false)
        : filter.teilkultur?._deleted === true
          ? Q.where('_deleted', true)
          : Q.or(
              Q.where('_deleted', false),
              Q.where('_deleted', true),
              Q.where('_deleted', null),
            )
    teilkultursOfArt = (await db
      ?.get<import('../../../../../../dbModel.ts').Teilkultur>('teilkultur')
      .query(
        Q.experimentalNestedJoin('kultur', 'art'),
        Q.on('kultur', Q.on('art', 'id', artId)),
        delQuery,
      )
      .fetch()) ?? []
  } catch {}
  const teilkultursOfArtSorted = teilkultursOfArt.sort(teilkulturSort)

  // TODO: check if some of this could be optimized using watermelon queries
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
          vs.map((v) => {
            const fullname = personFullname(v)

            return {
              url: ['Personen', v.id],
              text: `${v.nr}${fullname ? `, ${fullname}` : ''}`,
            }
          }),
        )
    },
    herkunftsWithNonUniqueNr: async () => {
      const hkGroupedByNr = groupBy(herkunftsSorted, (h) => h.nr ?? '')
      return Object.values(hkGroupedByNr)
        .filter((v) => v.length > 1)
        .flatMap((vs) =>
          vs.map((v) => ({
            url: ['Herkuenfte', v.id],
            text: `${v.nr}${v.lokalname ? `, ${v.lokalname}` : ''}${
              v.gemeinde ? `, ${v.gemeinde}` : ''
            }`,
          })),
        )
    },
    artsOhneAv: async () =>
      await Promise.all(
        artsSorted
          .filter((a) => a.id === artId)
          .filter(
            (a) =>
              !avs
                .filter(
                  (av: import('../../../../../../dbModel.ts').Av) =>
                    av.art_id === a.id,
                )
                .filter(
                  (av: import('../../../../../../dbModel.ts').Av) =>
                    !av._deleted,
                ).length,
          )
          .map(async (a) => {
            let text
            try {
              text = await a.label.pipe(first$()).toPromise()
            } catch {}

            return {
              url: ['Arten', a.id],
              text,
            }
          }),
      ),
    sammlungsWithoutLieferung: async () =>
      await Promise.all(
        sammlungsOfArtSorted
          .filter((s) => s.art_id === artId)
          .filter(
            (s) =>
              !lieferungsSorted.find(
                (l: import('../../../../../../dbModel.ts').Lieferung) =>
                  l.von_sammlung_id === s.id,
              ),
          )
          .map(async (s) => {
            let text
            try {
              text = await s.label.pipe(first$()).toPromise()
            } catch {}

            return {
              url: ['Sammlungen', s.id],
              text,
            }
          }),
      ),
    sammlungsWithNonUniqueNr: async () => {
      const sGroupedByNr = groupBy(
        sammlungsOfArtSorted.filter((s) => s.art_id === artId),
        (h) => h.nr ?? '',
      )
      return await Promise.all(
        Object.values(sGroupedByNr)
          .filter((s) => s.length > 1)
          .flatMap((vs) =>
            vs.map(async (s) => {
              let text
              try {
                text = await s.label.pipe(first$()).toPromise()
              } catch {}

              return {
                url: ['Sammlungen', s.id],
                text,
              }
            }),
          ),
      )
    },
    sammlungsWithoutNr: async () =>
      await Promise.all(
        sammlungsOfArtSorted
          .filter((s) => s.art_id === artId)
          .filter((s) => !exists(s.nr))
          .map(async (s) => {
            let text
            try {
              text = await s.label.pipe(first$()).toPromise()
            } catch {}

            return {
              url: ['Arten', artId, 'Sammlungen', s.id],
              text,
            }
          }),
      ),
    sammlungsWithoutHerkunft: async () =>
      await Promise.all(
        sammlungsOfArtSorted
          .filter((s) => s.art_id === artId)
          .filter((s) => !s.herkunft_id)
          .map(async (s) => {
            let text
            try {
              text = await s.label.pipe(first$()).toPromise()
            } catch {}

            return {
              url: ['Arten', artId, 'Sammlungen', s.id],
              text,
            }
          }),
      ),
    sammlungsWithoutPerson: async () =>
      await Promise.all(
        sammlungsOfArtSorted
          .filter((s) => s.art_id === artId)
          .filter((s) => !s.person_id)
          .map(async (s) => {
            let text
            try {
              text = await s.label.pipe(first$()).toPromise()
            } catch {}

            return {
              url: ['Arten', artId, 'Sammlungen', s.id],
              text,
            }
          }),
      ),
    sammlungsWithoutDatum: async () =>
      await Promise.all(
        sammlungsOfArtSorted
          .filter((s) => s.art_id === artId)
          .filter((s) => !s.datum)
          .map(async (s) => {
            let text
            try {
              text = await s.label.pipe(first$()).toPromise()
            } catch {}

            return {
              url: ['Arten', artId, 'Sammlungen', s.id],
              text,
            }
          }),
      ),
    sammlungsWithoutAnzahlPflanzen: async () =>
      await Promise.all(
        sammlungsOfArtSorted
          .filter((s) => s.art_id === artId)
          .filter((s) => !exists(s.anzahl_pflanzen))
          .map(async (s) => {
            let text
            try {
              text = await s.label.pipe(first$()).toPromise()
            } catch {}

            return {
              url: ['Arten', artId, 'Sammlungen', s.id],
              text,
            }
          }),
      ),
    sammlungsWithoutVonAnzahlIdividuen: async () =>
      await Promise.all(
        sammlungsOfArtSorted
          .filter((s) => s.art_id === artId)
          .filter((s) => !exists(s.von_anzahl_individuen))
          .map(async (s) => {
            let text
            try {
              text = await s.label.pipe(first$()).toPromise()
            } catch {}

            return {
              url: ['Arten', artId, 'Sammlungen', s.id],
              text,
            }
          }),
      ),
    gartensAllKultursInactive: async () => {
      let kulturs: import('../../../../../../dbModel.ts').Kultur[] = []
      try {
        kulturs = (await db
          ?.get<import('../../../../../../dbModel.ts').Kultur>('kultur')
          .query(Q.where('art_id', Q.eq(artId)), Q.where('_deleted', false))
          .fetch()) ?? []
      } catch {}

      const gartenIds = kulturs
        .filter(
          (s) => !!(s as unknown as { garten_id?: string | null }).garten_id,
        )
        .map((k) => (k as unknown as { garten_id?: string | null }).garten_id ?? '')
      const uniqueGartenIds = [...new Set(gartenIds.filter(Boolean))]

      let gartens: import('../../../../../../dbModel.ts').Garten[] = []
      try {
        gartens = (await db
          ?.get<import('../../../../../../dbModel.ts').Garten>('garten')
          .query(
            Q.where('_deleted', false),
            Q.where('aktiv', true),
            Q.where('id', Q.oneOf(uniqueGartenIds)),
          )
          .fetch()) ?? []
      } catch {}
      const gartensOfArt = await gartensSortedFromGartens(gartens)
      const filterPromiseArray = await Promise.all(
        gartensOfArt.map(async (g) => {
          let kulturs: import('../../../../../../dbModel.ts').Kultur[] = []
          try {
            kulturs = await g.kulturs.extend(Q.where('_deleted', false)).fetch()
          } catch {}

          return !!kulturs.length && kulturs.every((k) => !k.aktiv)
        }),
      )
      const gartensFiltered = gartensOfArt.filter(
        (g, i) => filterPromiseArray[i] && g.aktiv,
      )
      return await Promise.all(
        gartensFiltered.map(async (g) => {
          let text
          try {
            text = await g.label.pipe(first$()).toPromise()
          } catch {}

          return {
            url: ['Gaerten', g.id],
            text,
          }
        }),
      )
    },
    kultursWithoutVonAnzahlIndividuen: async () =>
      await Promise.all(
        kultursSorted
          .filter((s) => !exists(s.von_anzahl_individuen))
          .map(async (k) => {
            let text
            try {
              text = await k.label.pipe(first$()).toPromise()
            } catch {}

            return {
              url: ['Arten', artId, 'Kulturen', k.id],
              text,
            }
          }),
      ),
    kultursWithoutGarten: async () =>
      await Promise.all(
        kultursSorted
          .filter((s) => !s.garten_id)
          .map(async (k) => {
            let text
            try {
              text = await k.label.pipe(first$()).toPromise()
            } catch {}

            return {
              url: ['Arten', artId, 'Kulturen', k.id],
              text,
            }
          }),
      ),
    kultursWithoutHerkunft: async () =>
      await Promise.all(
        kultursSorted
          .filter((s) => !s.herkunft_id)
          .map(async (k) => {
            let text
            try {
              text = await k.label.pipe(first$()).toPromise()
            } catch {}

            return {
              url: ['Arten', artId, 'Kulturen', k.id],
              text,
            }
          }),
      ),
    kultursWithoutZaehlungThisYear: async () =>
      await Promise.all(
        kultursSorted
          .filter(
            (k) =>
              zaehlungsOfArt
                .filter(
                  (z: import('../../../../../../dbModel.ts').Zaehlung) =>
                    z.id ===
                      (k as unknown as { zaehlung_id?: string | null })
                        .zaehlung_id,
                )
                .filter(
                  (z: import('../../../../../../dbModel.ts').Zaehlung) =>
                    !z._deleted,
                )
                .filter(
                  (z: import('../../../../../../dbModel.ts').Zaehlung) =>
                    z.datum && z.datum > startYear && z.datum < startNextYear,
                ).length === 0,
          )
          .map(async (k) => {
            let text
            try {
              text = await k.label.pipe(first$()).toPromise()
            } catch {}

            return {
              url: ['Arten', artId, 'Kulturen', k.id],
              text,
            }
          }),
      ),
    teilkultursWithoutName: async () =>
      await Promise.all(
        teilkultursOfArtSorted
          .filter(
            (tk: import('../../../../../../dbModel.ts').Teilkultur) => !tk.name,
          )
          .map(
            async (tk: import('../../../../../../dbModel.ts').Teilkultur) => {
              let kultur
              try {
                kultur = await tk.kultur?.fetch()
              } catch {}
              let kulturLabel
              try {
                kulturLabel = await kultur?.label.pipe(first$()).toPromise()
              } catch {}
              const text = `${kulturLabel ?? '(keine Kultur)'}, Teilkultur-ID: ${
                tk.id
              }`

              return {
                url: [
                  'Arten',
                  artId,
                  'Kulturen',
                  kultur?.id,
                  'Teilkulturen',
                  tk.id,
                ],
                text,
              }
            },
          ),
      ),
    zaehlungsInFutureNotPrognose: async () => {
      const delQuery =
        filter.zaehlung?._deleted === false
          ? Q.where('_deleted', false)
          : filter.zaehlung?._deleted === true
            ? Q.where('_deleted', true)
            : Q.or(
                Q.where('_deleted', false),
                Q.where('_deleted', true),
                Q.where('_deleted', null),
              )
      const zaehlungs = await db
        ?.get<import('../../../../../../dbModel.ts').Zaehlung>('zaehlung')
        .query(
          Q.experimentalNestedJoin('kultur', 'art'),
          Q.on('kultur', Q.on('art', 'id', artId)),
          delQuery,
          Q.where('datum', Q.notEq(null)),
          Q.where('datum', Q.gte(format(new Date(), 'yyyy-mm-dd'))),
        )
        .fetch()

      return await Promise.all(
        (zaehlungs ?? []).map(async (z) => {
            let kultur
            try {
              kultur = await z.kultur?.fetch()
            } catch {}
            let kulturLabel
            try {
              kulturLabel = await kultur?.label.pipe(first$()).toPromise()
            } catch {}
            const text = `${kulturLabel ?? '(keine kultur)'}, Zählung-ID: ${z.id}`

            return {
              url: ['Arten', artId, 'Kulturen', z.id, 'Zaehlungen', z.id],
              text,
            }
          },
        ),
      )
    },
    zaehlungsWithoutDatum: async () => {
      let zaehlungs: import('../../../../../../dbModel.ts').Zaehlung[] = []
      try {
        const delQuery =
          filter.zaehlung?._deleted === false
            ? Q.where('_deleted', false)
            : filter.zaehlung?._deleted === true
              ? Q.where('_deleted', true)
              : Q.or(
                  Q.where('_deleted', false),
                  Q.where('_deleted', true),
                  Q.where('_deleted', null),
                )
        zaehlungs = (await db
          ?.get<import('../../../../../../dbModel.ts').Zaehlung>('zaehlung')
          .query(
            Q.experimentalNestedJoin('kultur', 'art'),
            Q.on('kultur', Q.on('art', 'id', artId)),
            delQuery,
            Q.where('datum', Q.notEq(null)),
          )
          .fetch()) ?? []
      } catch {}

      return await Promise.all(
        zaehlungs.map(
          async (z: import('../../../../../../dbModel.ts').Zaehlung) => {
            let kultur
            try {
              kultur = await z.kultur?.fetch()
            } catch {}
            let kulturLabel
            try {
              kulturLabel = await kultur?.label.pipe(first$()).toPromise()
            } catch {}
            const text = `${kulturLabel ?? '(keine Kultur)'}, Zählung-ID: ${z.id}`

            return {
              url: ['Arten', artId, 'Kulturen', z.id, 'Zaehlungen', z.id],
              text,
            }
          },
        ),
      )
    },
    zaehlungsWithoutAnzahlPflanzen: async () =>
      await Promise.all(
        zaehlungsOfArtSorted
          .filter(
            (z: import('../../../../../../dbModel.ts').Zaehlung) =>
              teilzaehlungsOfArt
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
                    !exists(tz.anzahl_pflanzen),
                ).length,
          )
          .map(async (z: import('../../../../../../dbModel.ts').Zaehlung) => {
            let kultur
            try {
              kultur = await z.kultur?.fetch()
            } catch {}
            let kulturLabel
            try {
              kulturLabel = await kultur?.label.pipe(first$()).toPromise()
            } catch {}
            const zaehlung = z.datum
              ? `Zählung vom ${format(new Date(z.datum), 'yyyy.MM.dd')}`
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
            const text = `${
              kulturLabel ?? '(keine Kultur)'
            }, ${zaehlung}${teilzaehlung}`

            return {
              url: ['Arten', artId, 'Kulturen', kultur?.id, 'Zaehlungen', z.id],
              text,
            }
          }),
      ),
    zaehlungsWithoutAnzahlAuspflanzbereit: async () =>
      await Promise.all(
        zaehlungsOfArtSorted
          .filter(
            (z: import('../../../../../../dbModel.ts').Zaehlung) =>
              teilzaehlungsOfArt
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
                    !exists(tz.anzahl_auspflanzbereit),
                ).length,
          )
          .map(async (z: import('../../../../../../dbModel.ts').Zaehlung) => {
            let kultur
            try {
              kultur = await z.kultur.fetch()
            } catch {}
            let kulturLabel
            try {
              kulturLabel = await kultur?.label.pipe(first$()).toPromise()
            } catch {}
            const zaehlung = z.datum
              ? `Zählung vom ${format(new Date(z.datum), 'yyyy.MM.dd')}`
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
            const text = `${
              kulturLabel ?? '(keine Kultur)'
            }, ${zaehlung}${teilzaehlung}`

            return {
              url: ['Arten', artId, 'Kulturen', kultur?.id, 'Zaehlungen', z.id],
              text,
            }
          }),
      ),
    zaehlungsWithoutAnzahlMutterpflanzen: async () =>
      await Promise.all(
        zaehlungsOfArtSorted
          .filter(
            (z: import('../../../../../../dbModel.ts').Zaehlung) =>
              teilzaehlungsOfArt
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
                    !exists(tz.anzahl_mutterpflanzen),
                ).length,
          )
          .map(async (z: import('../../../../../../dbModel.ts').Zaehlung) => {
            let kultur
            try {
              kultur = await z.kultur?.fetch()
            } catch {}
            let kulturLabel
            try {
              kulturLabel = await kultur?.label.pipe(first$()).toPromise()
            } catch {}
            const zaehlung = z.datum
              ? `Zählung vom ${format(new Date(z.datum), 'yyyy.MM.dd')}`
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
            const text = `${
              kulturLabel ?? '(keine Kultur)'
            }, ${zaehlung}${teilzaehlung}`

            return {
              url: ['Arten', artId, 'Kulturen', kultur?.id, 'Zaehlungen', z.id],
              text,
            }
          }),
      ),
    zaehlungsWithTeilzaehlungsWithoutTeilkulturThoughTeilkulturIsChoosen:
      async () => {
        let zaehlungsOfArt: import('../../../../../../dbModel.ts').Zaehlung[] = []
        try {
          const delQuery =
            filter.zaehlung?._deleted === false
              ? Q.where('_deleted', false)
              : filter.zaehlung?._deleted === true
                ? Q.where('_deleted', true)
                : Q.or(
                    Q.where('_deleted', false),
                    Q.where('_deleted', true),
                    Q.where('_deleted', null),
                  )
          zaehlungsOfArt = (await db
            ?.get<import('../../../../../../dbModel.ts').Zaehlung>('zaehlung')
            .query(
              Q.experimentalNestedJoin('kultur', 'art'),
              Q.on('kultur', Q.on('art', 'id', artId)),
              Q.experimentalNestedJoin('kultur', 'kultur_option'),
              Q.on('kultur', Q.on('kultur_option', 'tk', true)),
              delQuery,
            )
            .fetch()) ?? []
        } catch {}
        const zaehlungsOfArtSorted = zaehlungsOfArt.sort(zaehlungSort)
        return await Promise.all(
          zaehlungsOfArtSorted
            .filter((z: import('../../../../../../dbModel.ts').Zaehlung) => {
              const tz = teilzaehlungsOfArt
                .filter(
                  (tz: import('../../../../../../dbModel.ts').Teilzaehlung) =>
                    tz.zaehlung_id === z.id,
                )
                .filter(
                  (tz: import('../../../../../../dbModel.ts').Teilzaehlung) =>
                    !tz._deleted,
                )
              return (
                tz.length &&
                tz.filter(
                  (tz: import('../../../../../../dbModel.ts').Teilzaehlung) =>
                    !tz.teilkultur_id,
                ).length
              )
            })
            .map(async (z: import('../../../../../../dbModel.ts').Zaehlung) => {
              let kultur
              try {
                kultur = await z.kultur?.fetch()
              } catch {}
              let kulturLabel
              try {
                kulturLabel = await kultur?.label.pipe(first$()).toPromise()
              } catch {}
              const zaehlung = z.datum
                ? `Zählung vom ${format(new Date(z.datum), 'yyyy.MM.dd')}`
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
              const text = `${
                kulturLabel ?? '(keine Kultur)'
              }, ${zaehlung}${teilzaehlung}`

              return {
                url: [
                  'Arten',
                  artId,
                  'Kulturen',
                  kultur?.id,
                  'Zaehlungen',
                  z.id,
                ],
                text,
              }
            }),
        )
      },
    lieferungsWithMultipleVon: async () =>
      lieferungsSorted
        .filter(
          (l: import('../../../../../../dbModel.ts').Lieferung) =>
            l.art_id === artId,
        )
        .filter(
          (l: import('../../../../../../dbModel.ts').Lieferung) =>
            !!l.von_sammlung_id,
        )
        .filter(
          (l: import('../../../../../../dbModel.ts').Lieferung) =>
            !!l.von_kultur_id,
        )
        .map((l: import('../../../../../../dbModel.ts').Lieferung) => {
          const datum = l.datum
            ? format(new Date(l.datum), 'yyyy.MM.dd')
            : `kein Datum`
          const geplant = l.geplant ? ', (geplant)' : ''
          const text = `${datum}, ID: ${l.id}${geplant}`

          return {
            url: ['Lieferungen', l.id],
            text,
          }
        }),
    lieferungsWithMultipleNach: async () =>
      lieferungsSorted
        .filter(
          (l: import('../../../../../../dbModel.ts').Lieferung) =>
            l.art_id === artId,
        )
        .filter(
          (l: import('../../../../../../dbModel.ts').Lieferung) =>
            l.nach_ausgepflanzt,
        )
        .filter(
          (l: import('../../../../../../dbModel.ts').Lieferung) =>
            !!l.nach_kultur_id,
        )
        .map((l: import('../../../../../../dbModel.ts').Lieferung) => {
          const datum = l.datum
            ? format(new Date(l.datum), 'yyyy.MM.dd')
            : `kein Datum`
          const geplant = l.geplant ? ', (geplant)' : ''
          const text = `${datum}, ID: ${l.id}${geplant}`

          return {
            url: ['Lieferungen', l.id],
            text,
          }
        }),
    lieferungsWithoutAnzahlPflanzen: async () =>
      lieferungsSorted
        .filter(
          (l: import('../../../../../../dbModel.ts').Lieferung) =>
            l.art_id === artId,
        )
        .filter(
          (l: import('../../../../../../dbModel.ts').Lieferung) =>
            !exists(l.anzahl_pflanzen),
        )
        .map((l: import('../../../../../../dbModel.ts').Lieferung) => {
          const datum = l.datum
            ? format(new Date(l.datum), 'yyyy.MM.dd')
            : `kein Datum`
          const geplant = l.geplant ? ', (geplant)' : ''
          const text = `${datum}, ID: ${l.id}${geplant}`

          return {
            url: ['Lieferungen', l.id],
            text,
          }
        }),
    lieferungsWithoutAnzahlAuspflanzbereit: async () =>
      lieferungsSorted
        .filter(
          (l: import('../../../../../../dbModel.ts').Lieferung) =>
            l.art_id === artId,
        )
        .filter(
          (l: import('../../../../../../dbModel.ts').Lieferung) =>
            !exists(l.anzahl_auspflanzbereit),
        )
        .map((l: import('../../../../../../dbModel.ts').Lieferung) => {
          const datum = l.datum
            ? format(new Date(l.datum), 'yyyy.MM.dd')
            : `kein Datum`
          const geplant = l.geplant ? ', (geplant)' : ''
          const text = `${datum}, ID: ${l.id}${geplant}`

          return {
            url: ['Lieferungen', l.id],
            text,
          }
        }),
    lieferungsWithoutVonAnzahlIndividuen: async () =>
      lieferungsSorted
        .filter(
          (l: import('../../../../../../dbModel.ts').Lieferung) =>
            l.art_id === artId,
        )
        .filter(
          (l: import('../../../../../../dbModel.ts').Lieferung) =>
            !exists(l.von_anzahl_individuen),
        )
        .map((l: import('../../../../../../dbModel.ts').Lieferung) => {
          const datum = l.datum
            ? format(new Date(l.datum), 'yyyy.MM.dd')
            : `kein Datum`
          const geplant = l.geplant ? ', (geplant)' : ''
          const text = `${datum}, ID: ${l.id}${geplant}`

          return {
            url: ['Lieferungen', l.id],
            text,
          }
        }),
    lieferungsWithoutVon: async () =>
      lieferungsSorted
        .filter(
          (l: import('../../../../../../dbModel.ts').Lieferung) =>
            l.art_id === artId,
        )
        .filter(
          (l: import('../../../../../../dbModel.ts').Lieferung) =>
            !l.von_kultur_id,
        )
        .filter(
          (l: import('../../../../../../dbModel.ts').Lieferung) =>
            !l.von_sammlung_id,
        )
        .map((l: import('../../../../../../dbModel.ts').Lieferung) => {
          const datum = l.datum
            ? format(new Date(l.datum), 'yyyy.MM.dd')
            : `kein Datum`
          const geplant = l.geplant ? ', (geplant)' : ''
          const text = `${datum}, ID: ${l.id}${geplant}`

          return {
            url: ['Lieferungen', l.id],
            text,
          }
        }),
    lieferungsWithoutNach: async () =>
      lieferungsSorted
        .filter(
          (l: import('../../../../../../dbModel.ts').Lieferung) =>
            l.art_id === artId,
        )
        .filter(
          (l: import('../../../../../../dbModel.ts').Lieferung) =>
            !!l.von_kultur_id || !!l.von_sammlung_id,
        )
        .filter(
          (l: import('../../../../../../dbModel.ts').Lieferung) =>
            !l.nach_kultur_id,
        )
        .filter(
          (l: import('../../../../../../dbModel.ts').Lieferung) =>
            !l.nach_ausgepflanzt,
        )
        .map((l: import('../../../../../../dbModel.ts').Lieferung) => {
          const datum = l.datum
            ? format(new Date(l.datum), 'yyyy.MM.dd')
            : `kein Datum`
          const geplant = l.geplant ? ', (geplant)' : ''
          const text = `${datum}, ID: ${l.id}${geplant}`

          return {
            url: ['Lieferungen', l.id],
            text,
          }
        }),
    lieferungsWithoutDatum: async () =>
      lieferungsSorted
        .filter(
          (l: import('../../../../../../dbModel.ts').Lieferung) =>
            l.art_id === artId,
        )
        .filter(
          (l: import('../../../../../../dbModel.ts').Lieferung) => !l.datum,
        )
        .map((l: import('../../../../../../dbModel.ts').Lieferung) => {
          const datum = l.datum
            ? format(new Date(l.datum), 'yyyy.MM.dd')
            : `kein Datum`
          const geplant = l.geplant ? ', (geplant)' : ''
          const text = `${datum}, ID: ${l.id}${geplant}`

          return {
            url: ['Lieferungen', l.id],
            text,
          }
        }),
    lieferungsWithoutPerson: async () =>
      lieferungsSorted
        .filter(
          (l: import('../../../../../../dbModel.ts').Lieferung) =>
            l.art_id === artId,
        )
        .filter(
          (l: import('../../../../../../dbModel.ts').Lieferung) => !l.person_id,
        )
        .map((l: import('../../../../../../dbModel.ts').Lieferung) => {
          const datum = l.datum
            ? format(new Date(l.datum), 'yyyy.MM.dd')
            : `kein Datum`
          const geplant = l.geplant ? ', (geplant)' : ''
          const text = `${datum}, ID: ${l.id}${geplant}`

          return {
            url: ['Lieferungen', l.id],
            text,
          }
        }),
  }
}
