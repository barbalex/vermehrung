import { format } from 'date-fns/format'
import { first as first$ } from 'rxjs/operators'
import { Q } from 'nitromelondb'

import { exists } from '../../../../../../utils/exists.ts'
import { notDeletedQuery } from '../../../../../../utils/notDeletedQuery.ts'
import { kultursSortedFromKulturs } from '../../../../../../utils/kultursSortedFromKulturs.ts'
import { eventSort } from '../../../../../../utils/eventSort.ts'
import { lieferungSort } from '../../../../../../utils/lieferungSort.ts'
import { teilkulturSort } from '../../../../../../utils/teilkulturSort.ts'
import { zaehlungSort } from '../../../../../../utils/zaehlungSort.ts'
import { store, filterTableAtoms } from '../../../../../../store/index.ts'

export const createKulturMessageFunctions = async ({
  kulturId,
  db,
}: {
  kulturId: string
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
  const now = new Date().getTime()

  let events: import('../../../../../../dbModel.ts').Event[] = []
  try {
    const eventDelQuery =
      filter.event._deleted === false
        ? Q.where('_deleted', false)
        : filter.event._deleted === true
          ? Q.where('_deleted', true)
          : Q.or(
              Q.where('_deleted', false),
              Q.where('_deleted', true),
              Q.where('_deleted', null),
            )
    events = (await db
      ?.get<import('../../../../../../dbModel.ts').Event>('event').query(eventDelQuery).fetch()) ?? []
  } catch {}
  const eventsSorted = events.sort(eventSort)
  let kulturs: import('../../../../../../dbModel.ts').Kultur[] = []
  try {
    const kulturDelQuery =
      filter.kultur._deleted === false
        ? Q.where('_deleted', false)
        : filter.kultur._deleted === true
          ? Q.where('_deleted', true)
          : Q.or(
              Q.where('_deleted', false),
              Q.where('_deleted', true),
              Q.where('_deleted', null),
            )
    const kulturAktivQuery =
      filter.kultur.aktiv === false
        ? Q.where('aktiv', false)
        : filter.kultur.aktiv === true
          ? Q.where('aktiv', true)
          : Q.or(
              Q.where('aktiv', false),
              Q.where('aktiv', true),
              Q.where('aktiv', null),
            )
    kulturs = (await db
      ?.get<import('../../../../../../dbModel.ts').Kultur>('kultur')
      .query(kulturDelQuery, kulturAktivQuery)
      .fetch()) ?? []
  } catch {}
  const kultursSorted = await kultursSortedFromKulturs(kulturs)
  let lieferungs: import('../../../../../../dbModel.ts').Lieferung[] = []
  try {
    const lieferungDelQuery =
      filter.lieferung._deleted === false
        ? Q.where('_deleted', false)
        : filter.lieferung._deleted === true
          ? Q.where('_deleted', true)
          : Q.or(
              Q.where('_deleted', false),
              Q.where('_deleted', true),
              Q.where('_deleted', null),
            )
    lieferungs = (await db
      ?.get<import('../../../../../../dbModel.ts').Lieferung>('lieferung').query(lieferungDelQuery).fetch()) ?? []
  } catch {}
  const lieferungsSorted = lieferungs.sort(lieferungSort)
  let teilkulturs: import('../../../../../../dbModel.ts').Teilkultur[] = []
  try {
    const teilkulturDelQuery =
      filter.teilkultur._deleted === false
        ? Q.where('_deleted', false)
        : filter.teilkultur._deleted === true
          ? Q.where('_deleted', true)
          : Q.or(
              Q.where('_deleted', false),
              Q.where('_deleted', true),
              Q.where('_deleted', null),
            )
    teilkulturs = (await db
      ?.get<import('../../../../../../dbModel.ts').Teilkultur>('teilkultur').query(teilkulturDelQuery).fetch()) ?? []
  } catch {}
  const teilkultursSorted = teilkulturs.sort(teilkulturSort)
  let zaehlungs: import('../../../../../../dbModel.ts').Zaehlung[] = []
  try {
    const zaehlungDelQuery =
      filter.zaehlung._deleted === false
        ? Q.where('_deleted', false)
        : filter.zaehlung._deleted === true
          ? Q.where('_deleted', true)
          : Q.or(
              Q.where('_deleted', false),
              Q.where('_deleted', true),
              Q.where('_deleted', null),
            )
    zaehlungs = (await db
      ?.get<import('../../../../../../dbModel.ts').Zaehlung>('zaehlung').query(zaehlungDelQuery).fetch()) ?? []
  } catch {}
  const zaehlungsSorted = zaehlungs.sort(zaehlungSort)
  let teilzaehlungs: import('../../../../../../dbModel.ts').Teilzaehlung[] = []
  try {
    teilzaehlungs = (await db
      ?.get<import('../../../../../../dbModel.ts').Teilzaehlung>('teilzaehlung').query(notDeletedQuery).fetch()) ?? []
  } catch {}

  return {
    kultursWithoutVonAnzahlIndividuen: async () =>
      await Promise.all(
        kultursSorted
          .filter((k) => k.id === kulturId)
          .filter((k) => !exists(k.von_anzahl_individuen))
          .map(async (k) => {
            let text
            try {
              text = await k.label.pipe(first$()).toPromise()
            } catch {}

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
            let text
            try {
              text = await k.label.pipe(first$()).toPromise()
            } catch {}

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
            let text
            try {
              text = await k.label.pipe(first$()).toPromise()
            } catch {}

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
          )
          .map(async (k) => {
            let text
            try {
              text = await k.label.pipe(first$()).toPromise()
            } catch {}

            return {
              url: ['Kulturen', kulturId],
              text,
            }
          }),
      ),
    teilkultursWithoutName: async () =>
      await Promise.all(
        teilkultursSorted
          .filter(
            (tk: import('../../../../../../dbModel.ts').Teilkultur) =>
              tk.kultur_id === kulturId,
          )
          .filter(
            (tk: import('../../../../../../dbModel.ts').Teilkultur) => !tk.name,
          )
          .map(
            async (tk: import('../../../../../../dbModel.ts').Teilkultur) => {
              let kultur
              try {
                kultur = await tk.kultur.fetch()
              } catch {}
              let kulturLabel
              try {
                kulturLabel = await kultur?.label.pipe(first$()).toPromise()
              } catch {}

              return {
                url: ['Kulturen', kulturId, 'Teilkulturen', tk.id],
                text: `${kulturLabel ?? '(keine Kultur)'}, Teilkultur-ID: ${
                  tk.id
                }`,
              }
            },
          ),
      ),
    zaehlungsInFutureNotPrognose: async () =>
      await Promise.all(
        zaehlungsSorted
          .filter(
            (z: import('../../../../../../dbModel.ts').Zaehlung) =>
              z.kultur_id === kulturId,
          )
          .filter(
            (z: import('../../../../../../dbModel.ts').Zaehlung) => !!z.datum,
          )
          .filter(
            (z: import('../../../../../../dbModel.ts').Zaehlung) =>
              z.datum ? new Date(z.datum).getTime() > now : false,
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

            return {
              url: [
                'Arten',
                kultur?.art_id,
                'Kulturen',
                z.id,
                'Zaehlungen',
                z.id,
              ],
              text: `${kulturLabel ?? '(keine Kultur)'}, Zählung-ID: ${z.id}`,
            }
          }),
      ),
    zaehlungsWithoutDatum: async () =>
      await Promise.all(
        zaehlungsSorted
          .filter(
            (z: import('../../../../../../dbModel.ts').Zaehlung) =>
              z.kultur_id === kulturId,
          )
          .filter(
            (z: import('../../../../../../dbModel.ts').Zaehlung) => !z.datum,
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

            return {
              url: [
                'Arten',
                kultur?.art_id,
                'Kulturen',
                kulturId,
                'Zaehlungen',
                z.id,
              ],
              text: `${kulturLabel ?? '(keine Kultur)'}, Zählung-ID: ${z.id}`,
            }
          }),
      ),
    zaehlungsWithoutAnzahlPflanzen: async () =>
      await Promise.all(
        zaehlungsSorted
          .filter(
            (z: import('../../../../../../dbModel.ts').Zaehlung) =>
              z.kultur_id === kulturId,
          )
          .filter(
            (z: import('../../../../../../dbModel.ts').Zaehlung) =>
              teilzaehlungs
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
              kultur = await z.kultur.fetch()
            } catch {}
            let kulturLabel
            try {
              kulturLabel = await kultur?.label.pipe(first$()).toPromise()
            } catch {}
            const zaehlungLabel = z.datum
              ? `Zählung am ${format(new Date(z.datum), 'yyyy.MM.dd')}`
              : `Zählung-ID: ${z.id}`
            const tzs = z.teilzaehlungs
              ? await z.teilzaehlungs.extend(notDeletedQuery)?.fetch()
              : []
            const anzTz = tzs.length
            const teilzaehlung = anzTz > 1 ? ` (${anzTz} Teilzählungen)` : ''
            const text = `${
              kulturLabel ?? '(keine Kultur)'
            }, ${zaehlungLabel}${teilzaehlung}`

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
      await Promise.all(
        zaehlungsSorted
          .filter(
            (z: import('../../../../../../dbModel.ts').Zaehlung) =>
              z.kultur_id === kulturId,
          )
          .filter(
            (z: import('../../../../../../dbModel.ts').Zaehlung) =>
              teilzaehlungs
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
              ? `Zählung am ${format(new Date(z.datum), 'yyyy.MM.dd')}`
              : `Zählung-ID: ${z.id}`
            const anzTz = teilzaehlungs
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
    zaehlungsWithoutAnzahlMutterpflanzen: async () =>
      await Promise.all(
        zaehlungsSorted
          .filter(
            (z: import('../../../../../../dbModel.ts').Zaehlung) =>
              z.kultur_id === kulturId,
          )
          .filter(
            (z: import('../../../../../../dbModel.ts').Zaehlung) =>
              teilzaehlungs
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
              kultur = await z.kultur.fetch()
            } catch {}
            let kulturLabel
            try {
              kulturLabel = await kultur?.label.pipe(first$()).toPromise()
            } catch {}
            const zaehlung = z.datum
              ? `Zählung am ${format(new Date(z.datum), 'yyyy.MM.dd')}`
              : `Zählung-ID: ${z.id}`
            const anzTz = teilzaehlungs
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
    zaehlungsWithTeilzaehlungsWithoutTeilkulturThoughTeilkulturIsChoosen:
      async () =>
        await Promise.all(
          zaehlungsSorted
            .filter(
              (z: import('../../../../../../dbModel.ts').Zaehlung) =>
                z.kultur_id === kulturId,
            )
            .filter(
              async (z: import('../../../../../../dbModel.ts').Zaehlung) => {
                let kulturOption
                try {
                  kulturOption = await z.kultur_option.fetch()
                } catch {}

                return !!kulturOption?.tk
              },
            )
            .filter((z: import('../../../../../../dbModel.ts').Zaehlung) => {
              const tzs = teilzaehlungs
                .filter(
                  (tz: import('../../../../../../dbModel.ts').Teilzaehlung) =>
                    tz.zaehlung_id === z.id,
                )
                .filter(
                  (tz: import('../../../../../../dbModel.ts').Teilzaehlung) =>
                    !tz._deleted,
                )
              return (
                tzs.length &&
                tzs.filter(
                  (tz: import('../../../../../../dbModel.ts').Teilzaehlung) =>
                    !tz.teilkultur_id,
                ).length
              )
            })
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
                ? `Zählung am ${format(new Date(z.datum), 'yyyy.MM.dd')}`
                : `Zählung-ID: ${z.id}`
              const anzTz = teilzaehlungs
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
                  kultur?.art_id,
                  'Kulturen',
                  kultur?.id,
                  'Zaehlungen',
                  z.id,
                ],
                text: `${
                  kulturLabel ?? '(keine Kultur)'
                }, ${zaehlung}${teilzaehlung}`,
              }
            }),
        ),
    lieferungsWithMultipleVon: async () =>
      lieferungsSorted
        .filter(
          (l: import('../../../../../../dbModel.ts').Lieferung) =>
            l.von_kultur_id === kulturId,
        )
        .filter(
          (l: import('../../../../../../dbModel.ts').Lieferung) =>
            !!l.von_sammlung_id,
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
            l.nach_kultur_id === kulturId,
        )
        .filter(
          (l: import('../../../../../../dbModel.ts').Lieferung) =>
            l.nach_ausgepflanzt,
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
    anLieferungsWithoutAnzahlPflanzen: async () =>
      lieferungsSorted
        .filter(
          (l: import('../../../../../../dbModel.ts').Lieferung) =>
            l.nach_kultur_id === kulturId,
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
            url: ['Kulturen', kulturId, 'An-Lieferungen', l.id],
            text,
          }
        }),
    ausLieferungsWithoutAnzahlPflanzen: async () =>
      lieferungsSorted
        .filter(
          (l: import('../../../../../../dbModel.ts').Lieferung) =>
            l.von_kultur_id === kulturId,
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
            url: ['Kulturen', kulturId, 'Aus-Lieferungen', l.id],
            text,
          }
        }),
    anLieferungsWithoutAnzahlAuspflanzbereit: async () =>
      lieferungsSorted
        .filter(
          (l: import('../../../../../../dbModel.ts').Lieferung) =>
            l.nach_kultur_id === kulturId,
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
            url: ['Kulturen', kulturId, 'An-Lieferungen', l.id],
            text,
          }
        }),
    ausLieferungsWithoutAnzahlAuspflanzbereit: async () =>
      lieferungsSorted
        .filter(
          (l: import('../../../../../../dbModel.ts').Lieferung) =>
            l.von_kultur_id === kulturId,
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
            url: ['Kulturen', kulturId, 'Aus-Lieferungen', l.id],
            text,
          }
        }),
    anLieferungsWithoutVonAnzahlIndividuen: async () =>
      lieferungsSorted
        .filter(
          (l: import('../../../../../../dbModel.ts').Lieferung) =>
            l.nach_kultur_id === kulturId,
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
            url: ['Kulturen', kulturId, 'An-Lieferungen', l.id],
            text,
          }
        }),
    ausLieferungsWithoutVonAnzahlIndividuen: async () =>
      lieferungsSorted
        .filter(
          (l: import('../../../../../../dbModel.ts').Lieferung) =>
            l.von_kultur_id === kulturId,
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
            url: ['Kulturen', kulturId, 'Aus-Lieferungen', l.id],
            text,
          }
        }),
    anLieferungsWithoutVon: async () =>
      lieferungsSorted
        .filter(
          (l: import('../../../../../../dbModel.ts').Lieferung) =>
            l.nach_kultur_id === kulturId,
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
            url: ['Kulturen', kulturId, 'An-Lieferungen', l.id],
            text,
          }
        }),
    ausLieferungsWithoutNach: async () =>
      lieferungsSorted
        .filter(
          (l: import('../../../../../../dbModel.ts').Lieferung) =>
            l.von_kultur_id === kulturId,
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
            url: ['Kulturen', kulturId, 'Aus-Lieferungen', l.id],
            text,
          }
        }),
    anLieferungsWithoutDatum: async () =>
      lieferungsSorted
        .filter(
          (l: import('../../../../../../dbModel.ts').Lieferung) =>
            l.von_kultur_id === kulturId,
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
            url: ['Kulturen', kulturId, 'An-Lieferungen', l.id],
            text,
          }
        }),
    ausLieferungsWithoutDatum: async () =>
      lieferungsSorted
        .filter(
          (l: import('../../../../../../dbModel.ts').Lieferung) =>
            l.von_kultur_id === kulturId,
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
            url: ['Kulturen', kulturId, 'Aus-Lieferungen', l.id],
            text,
          }
        }),
    anLieferungsWithoutPerson: async () =>
      lieferungsSorted
        .filter(
          (l: import('../../../../../../dbModel.ts').Lieferung) =>
            l.nach_kultur_id === kulturId,
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
            url: ['Kulturen', kulturId, 'An-Lieferungen', l.id],
            text,
          }
        }),
    ausLieferungsWithoutPerson: async () =>
      lieferungsSorted
        .filter(
          (l: import('../../../../../../dbModel.ts').Lieferung) =>
            l.von_kultur_id === kulturId,
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
            url: ['Kulturen', kulturId, 'Aus-Lieferungen', l.id],
            text,
          }
        }),
    eventsWithoutBeschreibung: async () =>
      await Promise.all(
        eventsSorted
          .filter((e) => e.kultur_id === kulturId)
          .filter((e) => !e.beschreibung)
          .map(async (ev) => {
            let kultur
            try {
              kultur = await ev.kultur.fetch()
            } catch {}
            let kulturLabel
            try {
              kulturLabel = await kultur?.label.pipe(first$()).toPromise()
            } catch {}

            return {
              url: ['Kulturen', kulturId, 'Events', ev.id],
              text: `${kulturLabel ?? '(keine Kultur)'}, Event-ID: ${ev.id}`,
            }
          }),
      ),
    eventsWithoutDatum: async () =>
      await Promise.all(
        eventsSorted
          .filter((e) => e.kultur_id === kulturId)
          .filter((e) => !e.datum)
          .map(async (ev) => {
            let kultur
            try {
              kultur = await ev.kultur.fetch()
            } catch {}
            let kulturLabel
            try {
              kulturLabel = await kultur?.label.pipe(first$()).toPromise()
            } catch {}

            return {
              url: ['Kulturen', kulturId, 'Events', ev.id],
              text: `${kulturLabel ?? '(keine Kultur)'}, Event-ID: ${ev.id}`,
            }
          }),
      ),
  }
}
