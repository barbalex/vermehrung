import format from 'date-fns/format'
import groupBy from 'lodash/groupBy'
import { first as first$ } from 'rxjs/operators'
import { Q } from '@nozbe/watermelondb'

import exists from '../../../../../../utils/exists'
import kulturLabelFromKultur from '../../../../../../utils/kulturLabelFromKultur'

import notDeletedQuery from '../../../../../../utils/notDeletedQuery'
import artsSortedFromArts from '../../../../../../utils/artsSortedFromArts'
import gartensSortedFromGartens from '../../../../../../utils/gartensSortedFromGartens'
import kultursSortedFromKulturs from '../../../../../../utils/kultursSortedFromKulturs'
import sammlungsSortedFromSammlungs from '../../../../../../utils/sammlungsSortedFromSammlungs'
import eventSort from '../../../../../../utils/eventSort'
import herkunftSort from '../../../../../../utils/herkunftSort'
import lieferungSort from '../../../../../../utils/lieferungSort'
import personSort from '../../../../../../utils/personSort'
import teilkulturSort from '../../../../../../utils/teilkulturSort'
import zaehlungSort from '../../../../../../utils/zaehlungSort'
import personFullname from '../../../../../../utils/personFullname'

const createMessageFunctions = async ({ artId, store, db }) => {
  const year = +format(new Date(), 'yyyy')
  const startYear = `${year}-01-01`
  const startNextYear = `${year + 1}-01-01`
  const now = new Date()

  const arts = await db.collections.get('art').query(notDeletedQuery).fetch()
  const artsSorted = await artsSortedFromArts(arts)
  const avs = await db.collections.get('av').query(notDeletedQuery).fetch()
  const gartens = await db.collections
    .get('garten')
    .query(notDeletedQuery)
    .fetch()
  const gartensSorted = await gartensSortedFromGartens(gartens)
  const herkunfts = await db.collections
    .get('herkunft')
    .query(notDeletedQuery)
    .fetch()
  const herkunftsSorted = herkunfts.sort((a, b) => herkunftSort({ a, b }))
  const kulturs = await db.collections
    .get('kultur')
    .query(notDeletedQuery)
    .fetch()
  const kultursSorted = await kultursSortedFromKulturs(kulturs)
  const lieferungs = await db.collections
    .get('lieferung')
    .query(notDeletedQuery)
    .fetch()
  const lieferungsSorted = lieferungs.sort((a, b) => lieferungSort({ a, b }))
  const persons = await db.collections
    .get('person')
    .query(notDeletedQuery)
    .fetch()
  const personsSorted = persons.sort((a, b) => personSort({ a, b }))

  const sammlungsOfArt = await db.collections
    .get('sammlung')
    .query(Q.where('_deleted', false), Q.on('art', 'id', artId))
    .fetch()
  const sammlungsOfArtSorted = await sammlungsSortedFromSammlungs(
    sammlungsOfArt,
  )
  const zaehlungsOfArt = await db.collections
    .get('zaehlung')
    .query(
      Q.experimentalNestedJoin('kultur', 'art'),
      Q.on('kultur', Q.on('art', 'id', artId)),
      Q.where('_deleted', false),
    )
    .fetch()
  const zaehlungsOfArtSorted = zaehlungsOfArt.sort((a, b) =>
    zaehlungSort({ a, b }),
  )
  const teilzaehlungsOfArt = await db.collections
    .get('teilzaehlung')
    .query(
      Q.experimentalNestedJoin('zaehlung', 'kultur'),
      Q.experimentalNestedJoin('kultur', 'art'),
      Q.on('zaehlung', Q.on('kultur', Q.on('art', 'id', artId))),
      Q.where('_deleted', false),
    )
    .fetch()
  const teilkultursOfArt = await db.collections
    .get('teilkultur')
    .query(
      Q.experimentalNestedJoin('kultur', 'art'),
      Q.on('kultur', Q.on('art', 'id', artId)),
      Q.where('_deleted', false),
    )
    .fetch()
  const teilkultursOfArtSorted = teilkultursOfArt.sort((a, b) =>
    teilkulturSort({ a, b }),
  )
  const eventsOfArt = await db.collections
    .get('event')
    .query(
      Q.experimentalNestedJoin('kultur', 'art'),
      Q.on('kultur', Q.on('art', 'id', artId)),
      Q.where('_deleted', false),
    )
    .fetch()
  const eventsOfArtSorted = eventsOfArt.sort((a, b) => eventSort({ a, b }))

  // TODO: check if some of this could be optimized using watermelon queries
  return {
    personsWithNonUniqueNr: async () => {
      const pGroupedByNr = groupBy(personsSorted.filter(p=>exists(p.nr)), (h) => h.nr)
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
      const hkGroupedByNr = groupBy(herkunftsSorted, (h) => h.nr)
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
                .filter((av) => av.art_id === a.id)
                .filter((av) => !av._deleted).length,
          )
          .map(async (a) => {
            const text = await a.label.pipe(first$()).toPromise()

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
            (s) => !lieferungsSorted.find((l) => l.von_sammlung_id === s.id),
          )
          .map(async (s) => {
            const text = await s.label.pipe(first$()).toPromise()

            return {
              url: ['Sammlungen', s.id],
              text,
            }
          }),
      ),
    sammlungsWithNonUniqueNr: async () => {
      const sGroupedByNr = groupBy(
        sammlungsOfArtSorted.filter((s) => s.art_id === artId),
        (h) => h.nr,
      )
      return await Promise.all(
        Object.values(sGroupedByNr)
          .filter((s) => s.length > 1)
          .flatMap((vs) =>
            vs.map(async (s) => {
              const text = await s.label.pipe(first$()).toPromise()

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
            const text = await s.label.pipe(first$()).toPromise()

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
            const text = await s.label.pipe(first$()).toPromise()

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
            const text = await s.label.pipe(first$()).toPromise()

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
            const text = await s.label.pipe(first$()).toPromise()

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
            const text = await s.label.pipe(first$()).toPromise()

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
            const text = await s.label.pipe(first$()).toPromise()

            return {
              url: ['Arten', artId, 'Sammlungen', s.id],
              text,
            }
          }),
      ),
    gartensAllKultursInactive: async () =>
      await Promise.all(
        gartensSorted
          .filter(async (g) => {
            const kulturs = await g.kulturs.extend(notDeletedQuery).fetch()
            const kultursCount = kulturs.length
            const activeKultursCount = kulturs.filter((k) => k.aktiv).length
            return !!kultursCount && !activeKultursCount
          })
          .map(async (g) => {
            const text = await g.label.pipe(first$()).toPromise()

            return {
              url: ['Gaerten', g.id],
              text,
            }
          }),
      ),
    kultursWithoutVonAnzahlIndividuen: async () =>
      await Promise.all(
        kultursSorted
          .filter((s) => s.art_id === artId)
          .filter((s) => !exists(s.von_anzahl_individuen))
          .map(async (k) => {
            const text = await k.label.pipe(first$()).toPromise()

            return {
              url: ['Arten', artId, 'Kulturen', k.id],
              text,
            }
          }),
      ),
    kultursWithoutGarten: async () =>
      await Promise.all(
        kultursSorted
          .filter((s) => s.art_id === artId)
          .filter((s) => !s.garten_id)
          .map(async (k) => {
            const text = await k.label.pipe(first$()).toPromise()

            return {
              url: ['Arten', artId, 'Kulturen', k.id],
              text,
            }
          }),
      ),
    kultursWithoutHerkunft: async () =>
      await Promise.all(
        kultursSorted
          .filter((s) => s.art_id === artId)
          .filter((s) => !s.herkunft_id)
          .map(async (k) => {
            const text = await k.label.pipe(first$()).toPromise()

            return {
              url: ['Arten', artId, 'Kulturen', k.id],
              text,
            }
          }),
      ),
    kultursWithoutZaehlungThisYear: async () =>
      await Promise.all(
        kultursSorted
          .filter((s) => s.art_id === artId)
          .filter(
            (k) =>
              zaehlungsOfArt
                .filter((z) => z.id === k.zaehlung_id)
                .filter((z) => !z._deleted)
                .filter(
                  (z) =>
                    z.datum && z.datum > startYear && z.datum < startNextYear,
                ).length === 0,
          )
          .map(async (k) => {
            const text = await k.label.pipe(first$()).toPromise()

            return {
              url: ['Arten', artId, 'Kulturen', k.id],
              text,
            }
          }),
      ),
    teilkultursWithoutName: async () =>
      await Promise.all(
        teilkultursOfArtSorted
          .filter((tk) => !tk.name)
          .map(async (tk) => {
            const kultur = await tk.kultur.fetch()
            const kulturLabel = await kultur.label.pipe(first$()).toPromise()
            const text = `${kulturLabel}, Teilkultur-ID: ${tk.id}`

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
          }),
      ),
    zaehlungsInFutureNotPrognose: async () =>
      await Promise.all(
        zaehlungsOfArtSorted
          .filter((z) => !!z.datum)
          .filter((z) => new Date(z.datum).getTime() > now)
          .map(async (z) => {
            const kultur = await z.kultur.fetch()
            const kulturLabel = await kultur.label.pipe(first$()).toPromise()
            const text = `${kulturLabel}, Zählung-ID: ${z.id}`

            return {
              url: ['Arten', artId, 'Kulturen', z.id, 'Zaehlungen', z.id],
              text,
            }
          }),
      ),
    zaehlungsWithoutDatum: async () =>
      await Promise.all(
        zaehlungsOfArtSorted
          .filter((z) => !z.datum)
          .map(async (z) => {
            const kultur = await z.kultur.fetch()
            const kulturLabel = await kultur.label.pipe(first$()).toPromise()
            const text = `${kulturLabel}, Zählung-ID: ${z.id}`

            return {
              url: ['Arten', artId, 'Kulturen', z.id, 'Zaehlungen', z.id],
              text,
            }
          }),
      ),
    zaehlungsWithoutAnzahlPflanzen: async () =>
      await Promise.all(
        zaehlungsOfArtSorted
          .filter(
            (z) =>
              teilzaehlungsOfArt
                .filter((tz) => tz.zaehlung_id === z.id)
                .filter((tz) => !tz._deleted)
                .filter((tz) => !exists(tz.anzahl_pflanzen)).length,
          )
          .map(async (z) => {
            const kultur = await z.kultur.fetch()
            const kulturLabel = await kultur.label.pipe(first$()).toPromise()
            const zaehlung = z.datum
              ? `Zählung vom ${format(new Date(z.datum), 'yyyy.MM.dd')}`
              : `Zählung-ID: ${z.id}`
            const anzTz = teilzaehlungsOfArt
              .filter((tz) => tz.zaehlung_id === z.id)
              .filter((tz) => !tz._deleted).length
            const teilzaehlung = anzTz > 1 ? ` (${anzTz} Teilzählungen)` : ''
            const text = `${kulturLabel}, ${zaehlung}${teilzaehlung}`

            return {
              url: ['Arten', artId, 'Kulturen', kultur.id, 'Zaehlungen', z.id],
              text,
            }
          }),
      ),
    zaehlungsWithoutAnzahlAuspflanzbereit: async () =>
      zaehlungsOfArtSorted
        .filter((z) => {
          const kultur = z.kultur_id ? store.kulturs.get(z.kultur_id) : {}
          return kultur?.art_id === artId
        })
        .filter(
          (z) =>
            teilzaehlungsOfArt
              .filter((tz) => tz.zaehlung_id === z.id)
              .filter((tz) => !tz._deleted)
              .filter((tz) => !exists(tz.anzahl_auspflanzbereit)).length,
        )
        .map((z) => {
          const kultur = z.kultur_id ? store.kulturs.get(z.kultur_id) : {}
          const kulturLabel = kulturLabelFromKultur({
            kultur,
            store,
          })
          const zaehlung = z.datum
            ? `Zählung vom ${format(new Date(z.datum), 'yyyy.MM.dd')}`
            : `Zählung-ID: ${z.id}`
          const anzTz = teilzaehlungsOfArt
            .filter((tz) => tz.zaehlung_id === z.id)
            .filter((tz) => !tz._deleted).length
          const teilzaehlung = anzTz > 1 ? ` (${anzTz} Teilzählungen)` : ''
          const text = `${kulturLabel}, ${zaehlung}${teilzaehlung}`

          return {
            url: ['Arten', artId, 'Kulturen', kultur.id, 'Zaehlungen', z.id],
            text,
          }
        }),
    zaehlungsWithoutAnzahlMutterpflanzen: async () =>
      zaehlungsOfArtSorted
        .filter((z) => {
          const kultur = z.kultur_id ? store.kulturs.get(z.kultur_id) : {}
          return kultur?.art_id === artId
        })
        .filter(
          (z) =>
            teilzaehlungsOfArt
              .filter((tz) => tz.zaehlung_id === z.id)
              .filter((tz) => !tz._deleted)
              .filter((tz) => !exists(tz.anzahl_mutterpflanzen)).length,
        )
        .map((z) => {
          const kultur = z.kultur_id ? store.kulturs.get(z.kultur_id) : {}
          const kulturLabel = kulturLabelFromKultur({
            kultur,
            store,
          })
          const zaehlung = z.datum
            ? `Zählung vom ${format(new Date(z.datum), 'yyyy.MM.dd')}`
            : `Zählung-ID: ${z.id}`
          const anzTz = teilzaehlungsOfArt
            .filter((tz) => tz.zaehlung_id === z.id)
            .filter((tz) => !tz._deleted).length
          const teilzaehlung = anzTz > 1 ? ` (${anzTz} Teilzählungen)` : ''
          const text = `${kulturLabel}, ${zaehlung}${teilzaehlung}`

          return {
            url: ['Arten', artId, 'Kulturen', kultur?.id, 'Zaehlungen', z.id],
            text,
          }
        }),
    zaehlungsWithTeilzaehlungsWithoutTeilkulturThoughTeilkulturIsChoosen: async () =>
      zaehlungsOfArtSorted
        .filter((z) => {
          const kultur = z.kultur_id ? store.kulturs.get(z.kultur_id) : {}
          const kulturOption = z.kultur_id
            ? store.kultur_options.get(z.kultur_id)
            : {}
          return kultur?.art_id === artId && !!kulturOption?.tk
        })
        .filter((z) => {
          const tz = teilzaehlungsOfArt
            .filter((tz) => tz.zaehlung_id === z.id)
            .filter((tz) => !tz._deleted)
          return tz.length && tz.filter((tz) => !tz.teilkultur_id).length
        })
        .map((z) => {
          const kultur = z.kultur_id ? store.kulturs.get(z.kultur_id) : {}
          const kulturLabel = kulturLabelFromKultur({
            kultur,
            store,
          })
          const zaehlung = z.datum
            ? `Zählung vom ${format(new Date(z.datum), 'yyyy.MM.dd')}`
            : `Zählung-ID: ${z.id}`
          const anzTz = teilzaehlungsOfArt
            .filter((tz) => tz.zaehlung_id === z.id)
            .filter((tz) => !tz._deleted).length
          const teilzaehlung = anzTz > 1 ? ` (${anzTz} Teilzählungen)` : ''
          const text = `${kulturLabel}, ${zaehlung}${teilzaehlung}`

          return {
            url: ['Arten', artId, 'Kulturen', kultur?.id, 'Zaehlungen', z.id],
            text,
          }
        }),
    lieferungsWithMultipleVon: async () =>
      lieferungsSorted
        .filter((l) => l.art_id === artId)
        .filter((l) => !!l.von_sammlung_id)
        .filter((l) => !!l.von_kultur_id)
        .map((l) => {
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
        .filter((l) => l.art_id === artId)
        .filter((l) => l.nach_ausgepflanzt)
        .filter((l) => !!l.nach_kultur_id)
        .map((l) => {
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
        .filter((l) => l.art_id === artId)
        .filter((l) => !exists(l.anzahl_pflanzen))
        .map((l) => {
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
        .filter((l) => l.art_id === artId)
        .filter((l) => !exists(l.anzahl_auspflanzbereit))
        .map((l) => {
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
        .filter((l) => l.art_id === artId)
        .filter((l) => !exists(l.von_anzahl_individuen))
        .map((l) => {
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
        .filter((l) => l.art_id === artId)
        .filter((l) => !l.von_kultur_id)
        .filter((l) => !l.von_sammlung_id)
        .map((l) => {
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
        .filter((l) => l.art_id === artId)
        .filter((l) => !!l.von_kultur_id || !!l.von_sammlung_id)
        .filter((l) => !l.nach_kultur_id)
        .filter((l) => !l.nach_ausgepflanzt)
        .map((l) => {
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
        .filter((l) => l.art_id === artId)
        .filter((l) => !l.datum)
        .map((l) => {
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
        .filter((l) => l.art_id === artId)
        .filter((l) => !l.person_id)
        .map((l) => {
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
    eventsWithoutBeschreibung: async () =>
      eventsOfArtSorted
        .filter((e) => {
          const kultur = e.kultur_id ? store.kulturs.get(e.kultur_id) : {}
          return kultur?.art_id === artId
        })
        .filter((e) => !e.beschreibung)
        .map((e) => {
          const kultur = e.kultur_id ? store.kulturs.get(e.kultur_id) : {}
          const kulturLabel = kulturLabelFromKultur({
            kultur,
            store,
          })
          const text = `${kulturLabel}, Event-ID: ${e.id}`

          return {
            url: ['Arten', artId, 'Kulturen', kultur?.id, 'Events', e.id],
            text,
          }
        }),
    eventsWithoutDatum: async () =>
      eventsOfArtSorted
        .filter((e) => {
          const kultur = e.kultur_id ? store.kulturs.get(e.kultur_id) : {}
          return kultur?.art_id === artId
        })
        .filter((e) => !e.datum)
        .map((e) => {
          const kultur = e.kultur_id ? store.kulturs.get(e.kultur_id) : {}
          const kulturLabel = kulturLabelFromKultur({
            kultur,
            store,
          })
          const text = `${kulturLabel}, Event-ID: ${e.id}`

          return {
            url: ['Arten', artId, 'Kulturen', kultur.id, 'Events', e.id],
            text,
          }
        }),
  }
}

export default createMessageFunctions
