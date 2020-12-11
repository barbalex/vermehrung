import format from 'date-fns/format'
import { first as first$ } from 'rxjs/operators'
//import { Q } from '@nozbe/watermelondb'

import exists from '../../../../../../utils/exists'
import herkunftLabelFromKultur from '../../../../../../utils/herkunftLabelFromKultur'
import gartenLabelFromKultur from '../../../../../../utils/gartenLabelFromKultur'

import notDeletedQuery from '../../../../../../utils/notDeletedQuery'
import kultursSortedFromKulturs from '../../../../../../utils/kultursSortedFromKulturs'
import eventSort from '../../../../../../utils/eventSort'
import lieferungSort from '../../../../../../utils/lieferungSort'
import teilkulturSort from '../../../../../../utils/teilkulturSort'
import teilzaehlungsSortByTk from '../../../../../../utils/teilzaehlungsSortByTk'
import zaehlungSort from '../../../../../../utils/zaehlungSort'

const createMessageFunctions = async ({ kulturId, store }) => {
  const { db } = store
  const year = +format(new Date(), 'yyyy')
  const startYear = `${year}-01-01`
  const startNextYear = `${year + 1}-01-01`
  const now = new Date()

  const events = await db.collections
    .get('event')
    .query(notDeletedQuery)
    .fetch()
  const eventsSorted = events.sort((a, b) => eventSort({ a, b }))
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
  const teilkulturs = await db.collections
    .get('teilkultur')
    .query(notDeletedQuery)
    .fetch()
  const teilkultursSorted = teilkulturs.sort((a, b) => teilkulturSort({ a, b }))
  const zaehlungs = await db.collections
    .get('zaehlung')
    .query(notDeletedQuery)
    .fetch()
  const zaehlungsSorted = zaehlungs.sort((a, b) => zaehlungSort({ a, b }))
  const teilzaehlungs = await db.collections
    .get('teilzaehlung')
    .query(notDeletedQuery)
    .fetch()
  const teilzaehlungsSorted = await teilzaehlungsSortByTk(teilzaehlungs)

  return {
    kultursWithoutVonAnzahlIndividuen: async () =>
      await Promise.all(
        kultursSorted
          .filter((k) => k.id === kulturId)
          .filter((k) => !exists(k.von_anzahl_individuen))
          .map(async (k) => {
            const text = await k.label.pipe(first$()).toPromise()

            return {
              url: ['Kulturen', kulturId],
              text,
            }
          }),
      ),
    kultursWithoutGarten: async () =>
      await Promise.all(
        kultursSorted
          .filter((k) => k.id === kulturId)
          .filter((k) => !k.garten_id)
          .map(async (k) => {
            const text = await k.label.pipe(first$()).toPromise()

            return {
              url: ['Kulturen', kulturId],
              text,
            }
          }),
      ),
    kultursWithoutHerkunft: async () =>
      await Promise.all(
        kultursSorted
          .filter((k) => k.id === kulturId)
          .filter((k) => !k.herkunft_id)
          .map(async (k) => {
            const text = await k.label.pipe(first$()).toPromise()

            return {
              url: ['Kulturen', kulturId],
              text,
            }
          }),
      ),
    kultursWithoutZaehlungThisYear: async () =>
      await Promise.all(
        kultursSorted
          .filter((k) => k.id === kulturId)
          .filter(
            (k) =>
              zaehlungs
                .filter((z) => z.kultur_id === k.id)
                .filter((z) => !z._deleted)
                .filter(
                  (z) =>
                    z.datum && z.datum > startYear && z.datum < startNextYear,
                ).length === 0,
          )
          .map(async (k) => {
            const text = await k.label.pipe(first$()).toPromise()

            return {
              url: ['Kulturen', kulturId],
              text,
            }
          }),
      ),
    teilkultursWithoutName: async () =>
      await Promise.all(
        teilkultursSorted
          .filter((tk) => tk.kultur_id === kulturId)
          .filter((tk) => !tk.name)
          .map(async (tk) => {
            const kultur = await tk.kultur.fetch()
            const kulturLabel = await kultur.label.pipe(first$()).toPromise()

            return {
              url: ['Kulturen', kulturId, 'Teilkulturen', tk.id],
              text: `in: ${kulturLabel}, Teilkultur-ID: ${tk.id}`,
            }
          }),
      ),
    zaehlungsInFutureNotPrognose: async () =>
      await Promise.all(
        zaehlungsSorted
          .filter((z) => z.kultur_id === kulturId)
          .filter((z) => !!z.datum)
          .filter((z) => new Date(z.datum).getTime() > now)
          .map(async (z) => {
            const kultur = await z.kultur.fetch()
            const kulturLabel = await kultur.label.pipe(first$()).toPromise()

            return {
              url: [
                'Arten',
                kultur?.art_id,
                'Kulturen',
                z.id,
                'Zaehlungen',
                z.id,
              ],
              text: `in: ${kulturLabel}, Zählung-ID: ${z.id}`,
            }
          }),
      ),
    zaehlungsWithoutDatum: async () =>
      await Promise.all(
        zaehlungsSorted
          .filter((z) => z.kultur_id === kulturId)
          .filter((z) => !z.datum)
          .map(async (z) => {
            const kultur = await z.kultur.fetch()
            const kulturLabel = await kultur.label.pipe(first$()).toPromise()

            return {
              url: [
                'Arten',
                kultur?.art_id,
                'Kulturen',
                kulturId,
                'Zaehlungen',
                z.id,
              ],
              text: `in: ${kulturLabel}, Zählung-ID: ${z.id}`,
            }
          }),
      ),
    zaehlungsWithoutAnzahlPflanzen: async () =>
      await Promise.all(
        zaehlungsSorted
          .filter((z) => z.kultur_id === kulturId)
          .filter(
            (z) =>
              teilzaehlungs
                .filter((tz) => tz.zaehlung_id === z.id)
                .filter((tz) => !tz._deleted)
                .filter((tz) => !exists(tz.anzahl_pflanzen)).length,
          )
          .map(async (z) => {
            const kultur = await z.kultur.fetch()
            const kulturLabel = await kultur.label.pipe(first$()).toPromise()
            const zaehlungLabel = z.datum
              ? `Zählung vom ${format(new Date(z.datum), 'yyyy.MM.dd')}`
              : `Zählung-ID: ${z.id}`
            const tzs = await z.teilzaehlungs.extend(notDeletedQuery).fetch()
            const anzTz = tzs.length
            const teilzaehlung = anzTz > 1 ? ` (${anzTz} Teilzählungen)` : ''
            const text = `in: ${kulturLabel}, ${zaehlungLabel}${teilzaehlung}`

            return {
              url: [
                'Arten',
                kultur?.art_id,
                'Kulturen',
                kulturId,
                'Zaehlungen',
                z.id,
              ],
              text,
            }
          }),
      ),
    zaehlungsWithoutAnzahlAuspflanzbereit: async () =>
      zaehlungsSorted
        .filter((z) => z.kultur_id === kulturId)
        .filter(
          (z) =>
            [...store.teilzaehlungs.values()]
              .filter((tz) => tz.zaehlung_id === z.id)
              .filter((tz) => !tz._deleted)
              .filter((tz) => !exists(tz.anzahl_auspflanzbereit)).length,
        )
        .map((z) => {
          const kultur = z?.kultur_id ? store.kulturs.get(z.kultur_id) : {}
          const gartenLabel = gartenLabelFromKultur({ kultur, store })
          const herkunftLabel = herkunftLabelFromKultur({ kultur, store })
          const zaehlung = z.datum
            ? `Zählung vom ${format(new Date(z.datum), 'yyyy.MM.dd')}`
            : `Zählung-ID: ${z.id}`
          const anzTz = [...store.teilzaehlungs.values()]
            .filter((tz) => tz.zaehlung_id === z.id)
            .filter((tz) => !tz._deleted).length
          const teilzaehlung = anzTz > 1 ? ` (${anzTz} Teilzählungen)` : ''
          const text = `von: ${herkunftLabel}, in: ${gartenLabel}, ${zaehlung}${teilzaehlung}`

          return {
            url: [
              'Arten',
              kultur?.art_id,
              'Kulturen',
              kulturId,
              'Zaehlungen',
              z.id,
            ],
            text,
          }
        }),
    zaehlungsWithoutAnzahlMutterpflanzen: async () =>
      zaehlungsSorted
        .filter((z) => z.kultur_id === kulturId)
        .filter(
          (z) =>
            [...store.teilzaehlungs.values()]
              .filter((tz) => tz.zaehlung_id === z.id)
              .filter((tz) => !tz._deleted)
              .filter((tz) => !exists(tz.anzahl_mutterpflanzen)).length,
        )
        .map((z) => {
          const kultur = z?.kultur_id ? store.kulturs.get(z.kultur_id) : {}
          const gartenLabel = gartenLabelFromKultur({ kultur, store })
          const herkunftLabel = herkunftLabelFromKultur({ kultur, store })
          const zaehlung = z.datum
            ? `Zählung vom ${format(new Date(z.datum), 'yyyy.MM.dd')}`
            : `Zählung-ID: ${z.id}`
          const anzTz = [...store.teilzaehlungs.values()]
            .filter((tz) => tz.zaehlung_id === z.id)
            .filter((tz) => !tz._deleted).length
          const teilzaehlung = anzTz > 1 ? ` (${anzTz} Teilzählungen)` : ''
          const text = `von: ${herkunftLabel}, in: ${gartenLabel}, ${zaehlung}${teilzaehlung}`

          return {
            url: [
              'Arten',
              kultur?.art_id,
              'Kulturen',
              kulturId,
              'Zaehlungen',
              z.id,
            ],
            text,
          }
        }),
    zaehlungsWithTeilzaehlungsWithoutTeilkulturThoughTeilkulturIsChoosen: async () =>
      zaehlungsSorted
        .filter((z) => z.kultur_id === kulturId)
        .filter((z) => {
          const kulturOption = z.kultur_id
            ? store.kultur_options.get(z.kultur_id)
            : {}
          return !!kulturOption?.tk
        })
        .filter((z) => {
          const tzs = [...store.teilzaehlungs.values()]
            .filter((tz) => tz.zaehlung_id === z.id)
            .filter((tz) => !tz._deleted)
          return tzs.length && tzs.filter((tz) => !tz.teilkultur_id).length
        })
        .map((z) => {
          const kultur = z?.kultur_id ? store.kulturs.get(z.kultur_id) : {}
          const gartenLabel = gartenLabelFromKultur({ kultur, store })
          const herkunftLabel = herkunftLabelFromKultur({ kultur, store })
          const zaehlung = z.datum
            ? `Zählung vom ${format(new Date(z.datum), 'yyyy.MM.dd')}`
            : `Zählung-ID: ${z.id}`
          const anzTz = [...store.teilzaehlungs.values()]
            .filter((tz) => tz.zaehlung_id === z.id)
            .filter((tz) => !tz._deleted).length
          const teilzaehlung = anzTz > 1 ? ` (${anzTz} Teilzählungen)` : ''

          return {
            url: [
              'Arten',
              kultur?.art_id,
              'Kulturen',
              kultur?.id,
              'Zaehlungen',
              z.id,
            ],
            text: `von: ${herkunftLabel}, in: ${gartenLabel}, ${zaehlung}${teilzaehlung}`,
          }
        }),
    lieferungsWithMultipleVon: async () =>
      lieferungsSorted
        .filter((l) => l.von_kultur_id === kulturId)
        .filter((l) => !!l.von_sammlung_id)
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
        .filter((l) => l.nach_kultur_id === kulturId)
        .filter((l) => l.nach_ausgepflanzt)
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
    anLieferungsWithoutAnzahlPflanzen: async () =>
      lieferungsSorted
        .filter((l) => l.nach_kultur_id === kulturId)
        .filter((l) => !exists(l.anzahl_pflanzen))
        .map((l) => {
          const datum = l.datum
            ? format(new Date(l.datum), 'yyyy.MM.dd')
            : `kein Datum`
          const geplant = l.geplant ? ', (geplant)' : ''
          const text = `${datum}, ID: ${l.id}${geplant}`

          return {
            url: ['Kulturen', kulturId, 'An-Lieferungen', l.id],
            text,
          }
        }),
    ausLieferungsWithoutAnzahlPflanzen: async () =>
      lieferungsSorted
        .filter((l) => l.von_kultur_id === kulturId)
        .filter((l) => !exists(l.anzahl_pflanzen))
        .map((l) => {
          const datum = l.datum
            ? format(new Date(l.datum), 'yyyy.MM.dd')
            : `kein Datum`
          const geplant = l.geplant ? ', (geplant)' : ''
          const text = `${datum}, ID: ${l.id}${geplant}`

          return {
            url: ['Kulturen', kulturId, 'Aus-Lieferungen', l.id],
            text,
          }
        }),
    anLieferungsWithoutAnzahlAuspflanzbereit: async () =>
      lieferungsSorted
        .filter((l) => l.nach_kultur_id === kulturId)
        .filter((l) => !exists(l.anzahl_auspflanzbereit))
        .map((l) => {
          const datum = l.datum
            ? format(new Date(l.datum), 'yyyy.MM.dd')
            : `kein Datum`
          const geplant = l.geplant ? ', (geplant)' : ''
          const text = `${datum}, ID: ${l.id}${geplant}`

          return {
            url: ['Kulturen', kulturId, 'An-Lieferungen', l.id],
            text,
          }
        }),
    ausLieferungsWithoutAnzahlAuspflanzbereit: async () =>
      lieferungsSorted
        .filter((l) => l.von_kultur_id === kulturId)
        .filter((l) => !exists(l.anzahl_auspflanzbereit))
        .map((l) => {
          const datum = l.datum
            ? format(new Date(l.datum), 'yyyy.MM.dd')
            : `kein Datum`
          const geplant = l.geplant ? ', (geplant)' : ''
          const text = `${datum}, ID: ${l.id}${geplant}`

          return {
            url: ['Kulturen', kulturId, 'Aus-Lieferungen', l.id],
            text,
          }
        }),
    anLieferungsWithoutVonAnzahlIndividuen: async () =>
      lieferungsSorted
        .filter((l) => l.nach_kultur_id === kulturId)
        .filter((l) => !exists(l.von_anzahl_individuen))
        .map((l) => {
          const datum = l.datum
            ? format(new Date(l.datum), 'yyyy.MM.dd')
            : `kein Datum`
          const geplant = l.geplant ? ', (geplant)' : ''
          const text = `${datum}, ID: ${l.id}${geplant}`

          return {
            url: ['Kulturen', kulturId, 'An-Lieferungen', l.id],
            text,
          }
        }),
    ausLieferungsWithoutVonAnzahlIndividuen: async () =>
      lieferungsSorted
        .filter((l) => l.von_kultur_id === kulturId)
        .filter((l) => !exists(l.von_anzahl_individuen))
        .map((l) => {
          const datum = l.datum
            ? format(new Date(l.datum), 'yyyy.MM.dd')
            : `kein Datum`
          const geplant = l.geplant ? ', (geplant)' : ''
          const text = `${datum}, ID: ${l.id}${geplant}`

          return {
            url: ['Kulturen', kulturId, 'Aus-Lieferungen', l.id],
            text,
          }
        }),
    anLieferungsWithoutVon: async () =>
      lieferungsSorted
        .filter((l) => l.nach_kultur_id === kulturId)
        .filter((l) => !l.von_kultur_id)
        .filter((l) => !l.von_sammlung_id)
        .map((l) => {
          const datum = l.datum
            ? format(new Date(l.datum), 'yyyy.MM.dd')
            : `kein Datum`
          const geplant = l.geplant ? ', (geplant)' : ''
          const text = `${datum}, ID: ${l.id}${geplant}`

          return {
            url: ['Kulturen', kulturId, 'An-Lieferungen', l.id],
            text,
          }
        }),
    ausLieferungsWithoutNach: async () =>
      lieferungsSorted
        .filter((l) => l.von_kultur_id === kulturId)
        .filter((l) => !l.nach_kultur_id)
        .filter((l) => !l.nach_ausgepflanzt)
        .map((l) => {
          const datum = l.datum
            ? format(new Date(l.datum), 'yyyy.MM.dd')
            : `kein Datum`
          const geplant = l.geplant ? ', (geplant)' : ''
          const text = `${datum}, ID: ${l.id}${geplant}`

          return {
            url: ['Kulturen', kulturId, 'Aus-Lieferungen', l.id],
            text,
          }
        }),
    anLieferungsWithoutDatum: async () =>
      lieferungsSorted
        .filter((l) => l.von_kultur_id === kulturId)
        .filter((l) => !l.datum)
        .map((l) => {
          const datum = l.datum
            ? format(new Date(l.datum), 'yyyy.MM.dd')
            : `kein Datum`
          const geplant = l.geplant ? ', (geplant)' : ''
          const text = `${datum}, ID: ${l.id}${geplant}`

          return {
            url: ['Kulturen', kulturId, 'An-Lieferungen', l.id],
            text,
          }
        }),
    ausLieferungsWithoutDatum: async () =>
      lieferungsSorted
        .filter((l) => l.von_kultur_id === kulturId)
        .filter((l) => !l.datum)
        .map((l) => {
          const datum = l.datum
            ? format(new Date(l.datum), 'yyyy.MM.dd')
            : `kein Datum`
          const geplant = l.geplant ? ', (geplant)' : ''
          const text = `${datum}, ID: ${l.id}${geplant}`

          return {
            url: ['Kulturen', kulturId, 'Aus-Lieferungen', l.id],
            text,
          }
        }),
    anLieferungsWithoutPerson: async () =>
      lieferungsSorted
        .filter((l) => l.nach_kultur_id === kulturId)
        .filter((l) => !l.person_id)
        .map((l) => {
          const datum = l.datum
            ? format(new Date(l.datum), 'yyyy.MM.dd')
            : `kein Datum`
          const geplant = l.geplant ? ', (geplant)' : ''
          const text = `${datum}, ID: ${l.id}${geplant}`

          return {
            url: ['Kulturen', kulturId, 'An-Lieferungen', l.id],
            text,
          }
        }),
    ausLieferungsWithoutPerson: async () =>
      lieferungsSorted
        .filter((l) => l.von_kultur_id === kulturId)
        .filter((l) => !l.person_id)
        .map((l) => {
          const datum = l.datum
            ? format(new Date(l.datum), 'yyyy.MM.dd')
            : `kein Datum`
          const geplant = l.geplant ? ', (geplant)' : ''
          const text = `${datum}, ID: ${l.id}${geplant}`

          return {
            url: ['Kulturen', kulturId, 'Aus-Lieferungen', l.id],
            text,
          }
        }),
    eventsWithoutBeschreibung: async () =>
      eventsSorted
        .filter((e) => e.kultur_id === kulturId)
        .filter((e) => !e.beschreibung)
        .map((ev) => {
          const kultur = ev?.kultur_id ? store.kulturs.get(ev.kultur_id) : {}
          const gartenLabel = gartenLabelFromKultur({ kultur, store })
          const herkunftLabel = herkunftLabelFromKultur({ kultur, store })

          return {
            url: ['Kulturen', kulturId, 'Events', ev.id],
            text: `von: ${herkunftLabel}, in: ${gartenLabel}, Event-ID: ${ev.id}`,
          }
        }),
    eventsWithoutDatum: async () =>
      eventsSorted
        .filter((e) => e.kultur_id === kulturId)
        .filter((e) => !e.datum)
        .map((ev) => {
          const kultur = ev?.kultur_id ? store.kulturs.get(ev.kultur_id) : {}
          const gartenLabel = gartenLabelFromKultur({ kultur, store })
          const herkunftLabel = herkunftLabelFromKultur({ kultur, store })

          return {
            url: ['Kulturen', kulturId, 'Events', ev.id],
            text: `von: ${herkunftLabel}, in: ${gartenLabel}, Event-ID: ${ev.id}`,
          }
        }),
  }
}

export default createMessageFunctions
