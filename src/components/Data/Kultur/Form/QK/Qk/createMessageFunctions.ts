import { DateTime } from 'luxon'
import { first as first$ } from 'rxjs/operators'
import { Q } from 'nitromelondb'

import { exists } from '../../../../../../utils/exists.ts'
import { notDeletedQuery } from '../../../../../../utils/notDeletedQuery.ts'
import { kultursSortedFromKulturs } from '../../../../../../utils/kultursSortedFromKulturs.ts'
import { lieferungSort } from '../../../../../../utils/lieferungSort.ts'
import { teilkulturSort } from '../../../../../../utils/teilkulturSort.ts'
import { zaehlungSort } from '../../../../../../utils/zaehlungSort.ts'
import { store, filterTableAtoms } from '../../../../../../store/index.ts'
import { triStateDeletedQuery } from '../../../../../../utils/triStateDeletedQuery.ts'
import {
  buildQkMessages,
  labelOf,
  lieferungText,
} from '../../../../../shared/QK/buildQkMessages.ts'

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
  const year = DateTime.now().year
  const startYear = `${year}-01-01`
  const startNextYear = `${year + 1}-01-01`
  const now = new Date().getTime()

  let kulturs: import('../../../../../../dbModel.ts').Kultur[] = []
  try {
    const kulturDelQuery = triStateDeletedQuery(filter.kultur._deleted)
    const kulturAktivQuery =
      filter.kultur.aktiv === false ? Q.where('aktiv', false)
      : filter.kultur.aktiv === true ? Q.where('aktiv', true)
      : Q.or(
          Q.where('aktiv', false),
          Q.where('aktiv', true),
          Q.where('aktiv', null),
        )
    kulturs =
      (await db
        ?.get<import('../../../../../../dbModel.ts').Kultur>('kultur')
        .query(kulturDelQuery, kulturAktivQuery)
        .fetch()) ?? []
  } catch {}
  const kultursSorted = await kultursSortedFromKulturs(kulturs)
  let lieferungs: import('../../../../../../dbModel.ts').Lieferung[] = []
  try {
    const lieferungDelQuery = triStateDeletedQuery(filter.lieferung._deleted)
    lieferungs =
      (await db
        ?.get<import('../../../../../../dbModel.ts').Lieferung>('lieferung')
        .query(lieferungDelQuery)
        .fetch()) ?? []
  } catch {}
  const lieferungsSorted = lieferungs.sort(lieferungSort)
  let teilkulturs: import('../../../../../../dbModel.ts').Teilkultur[] = []
  try {
    const teilkulturDelQuery = triStateDeletedQuery(filter.teilkultur._deleted)
    teilkulturs =
      (await db
        ?.get<import('../../../../../../dbModel.ts').Teilkultur>('teilkultur')
        .query(teilkulturDelQuery)
        .fetch()) ?? []
  } catch {}
  const teilkultursSorted = teilkulturs.sort(teilkulturSort)
  let zaehlungs: import('../../../../../../dbModel.ts').Zaehlung[] = []
  try {
    const zaehlungDelQuery = triStateDeletedQuery(filter.zaehlung._deleted)
    zaehlungs =
      (await db
        ?.get<import('../../../../../../dbModel.ts').Zaehlung>('zaehlung')
        .query(zaehlungDelQuery)
        .fetch()) ?? []
  } catch {}
  const zaehlungsSorted = zaehlungs.sort(zaehlungSort)
  // the scope kultur: every zaehlung message needs its art_id and label
  let kulturRow: import('../../../../../../dbModel.ts').Kultur | null = null
  try {
    kulturRow =
      (await db
        ?.get<import('../../../../../../dbModel.ts').Kultur>('kultur')
        .find(kulturId)) ?? null
  } catch {}
  let kulturLabel = ''
  try {
    kulturLabel =
      (await kulturRow?.label.pipe(first$()).toPromise()) ?? '(keine Kultur)'
  } catch {}
  const zaehlungUrl = (z: { id: string }) =>
    [
      'Arten',
      kulturRow?.art_id,
      'Kulturen',
      kulturId,
      'Zaehlungen',
      z.id,
      'Zaehlung',
    ] as string[]
  const zaehlungText = (z: import('../../../../../../dbModel.ts').Zaehlung) => {
    const zaehlungLabel =
      z.datum ?
        `Zählung am ${DateTime.fromJSDate(new Date(z.datum)).toFormat('yyyy.LL.dd')}`
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
    return `${kulturLabel ?? '(keine Kultur)'}, ${zaehlungLabel}${teilzaehlung}`
  }
  let teilzaehlungs: import('../../../../../../dbModel.ts').Teilzaehlung[] = []
  try {
    teilzaehlungs =
      (await db
        ?.get<import('../../../../../../dbModel.ts').Teilzaehlung>(
          'teilzaehlung',
        )
        .query(notDeletedQuery)
        .fetch()) ?? []
  } catch {}

  return {
    kultursWithoutVonAnzahlIndividuen: async () =>
      await buildQkMessages({
        rows: kultursSorted.filter((k) => k.id === kulturId),
        failsCheck: (k) => !exists(k.von_anzahl_individuen),
        buildUrl: () => ['Kulturen', kulturId, 'Kultur'],
        buildText: (k) => labelOf(k),
      }),
    kultursWithoutGarten: async () =>
      await buildQkMessages({
        rows: kultursSorted.filter((k) => k.id === kulturId),
        failsCheck: (k) => !k.garten_id,
        buildUrl: () => ['Kulturen', kulturId, 'Kultur'],
        buildText: (k) => labelOf(k),
      }),
    kultursWithoutHerkunft: async () =>
      await buildQkMessages({
        rows: kultursSorted.filter((k) => k.id === kulturId),
        failsCheck: (k) => !k.herkunft_id,
        buildUrl: () => ['Kulturen', kulturId, 'Kultur'],
        buildText: (k) => labelOf(k),
      }),
    kultursWithoutZaehlungThisYear: async () =>
      await buildQkMessages({
        rows: kultursSorted.filter(
          (k: import('../../../../../../dbModel.ts').Kultur) =>
            k.id === kulturId,
        ),
        failsCheck: (k: import('../../../../../../dbModel.ts').Kultur) =>
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
        buildUrl: () => ['Kulturen', kulturId, 'Kultur'],
        buildText: (k: import('../../../../../../dbModel.ts').Kultur) =>
          labelOf(k),
      }),
    teilkultursWithoutName: async () =>
      await buildQkMessages({
        rows: teilkultursSorted.filter(
          (tk: import('../../../../../../dbModel.ts').Teilkultur) =>
            tk.kultur_id === kulturId,
        ),
        failsCheck: (tk: import('../../../../../../dbModel.ts').Teilkultur) =>
          !tk.name,
        buildUrl: (tk: import('../../../../../../dbModel.ts').Teilkultur) => [
          'Kulturen',
          kulturId,
          'Teilkulturen',
          tk.id,
          'Teilkultur',
        ],
        buildText: (tk: import('../../../../../../dbModel.ts').Teilkultur) =>
          `${kulturLabel ?? '(keine Kultur)'}, Teilkultur-ID: ${tk.id}`,
      }),
    zaehlungsInFutureNotPrognose: async () =>
      await buildQkMessages({
        rows: zaehlungsSorted.filter(
          (z: import('../../../../../../dbModel.ts').Zaehlung) =>
            z.kultur_id === kulturId,
        ),
        failsCheck: (z: import('../../../../../../dbModel.ts').Zaehlung) =>
          !!z.datum && new Date(z.datum).getTime() > now,
        buildUrl: (z: import('../../../../../../dbModel.ts').Zaehlung) =>
          zaehlungUrl(z),
        buildText: (z: import('../../../../../../dbModel.ts').Zaehlung) =>
          zaehlungText(z),
      }),
    zaehlungsWithoutDatum: async () =>
      await buildQkMessages({
        rows: zaehlungsSorted.filter(
          (z: import('../../../../../../dbModel.ts').Zaehlung) =>
            z.kultur_id === kulturId,
        ),
        failsCheck: (z: import('../../../../../../dbModel.ts').Zaehlung) =>
          !z.datum,
        buildUrl: (z: import('../../../../../../dbModel.ts').Zaehlung) =>
          zaehlungUrl(z),
        buildText: (z: import('../../../../../../dbModel.ts').Zaehlung) =>
          zaehlungText(z),
      }),
    zaehlungsWithoutAnzahlPflanzen: async () =>
      await buildQkMessages({
        rows: zaehlungsSorted.filter(
          (z: import('../../../../../../dbModel.ts').Zaehlung) =>
            z.kultur_id === kulturId,
        ),
        failsCheck: (z: import('../../../../../../dbModel.ts').Zaehlung) =>
          !!teilzaehlungs
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
        buildUrl: (z: import('../../../../../../dbModel.ts').Zaehlung) =>
          zaehlungUrl(z),
        buildText: (z: import('../../../../../../dbModel.ts').Zaehlung) =>
          zaehlungText(z),
      }),
    zaehlungsWithoutAnzahlAuspflanzbereit: async () =>
      await buildQkMessages({
        rows: zaehlungsSorted.filter(
          (z: import('../../../../../../dbModel.ts').Zaehlung) =>
            z.kultur_id === kulturId,
        ),
        failsCheck: (z: import('../../../../../../dbModel.ts').Zaehlung) =>
          !!teilzaehlungs
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
        buildUrl: (z: import('../../../../../../dbModel.ts').Zaehlung) =>
          zaehlungUrl(z),
        buildText: (z: import('../../../../../../dbModel.ts').Zaehlung) =>
          zaehlungText(z),
      }),
    zaehlungsWithoutAnzahlMutterpflanzen: async () =>
      await buildQkMessages({
        rows: zaehlungsSorted.filter(
          (z: import('../../../../../../dbModel.ts').Zaehlung) =>
            z.kultur_id === kulturId,
        ),
        failsCheck: (z: import('../../../../../../dbModel.ts').Zaehlung) =>
          !!teilzaehlungs
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
        buildUrl: (z: import('../../../../../../dbModel.ts').Zaehlung) =>
          zaehlungUrl(z),
        buildText: (z: import('../../../../../../dbModel.ts').Zaehlung) =>
          zaehlungText(z),
      }),
    zaehlungsWithTeilzaehlungsWithoutTeilkulturThoughTeilkulturIsChoosen:
      async () => {
        // kultur_option.tk is per kultur - one fetch for the whole scope.
        // NOTE: the original passed an async predicate to .filter(),
        // which is always truthy - the tk check never filtered
        const firstZaehlung = zaehlungsSorted.find(
          (z: import('../../../../../../dbModel.ts').Zaehlung) =>
            z.kultur_id === kulturId,
        )
        let tkChoosen = false
        if (firstZaehlung) {
          try {
            tkChoosen = !!(await firstZaehlung.kultur_option.fetch())?.tk
          } catch {}
        }
        if (!tkChoosen) return []
        return await buildQkMessages({
          rows: zaehlungsSorted.filter(
            (z: import('../../../../../../dbModel.ts').Zaehlung) =>
              z.kultur_id === kulturId,
          ),
          failsCheck: (z: import('../../../../../../dbModel.ts').Zaehlung) => {
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
              !!tzs.length &&
              !!tzs.filter(
                (tz: import('../../../../../../dbModel.ts').Teilzaehlung) =>
                  !tz.teilkultur_id,
              ).length
            )
          },
          buildUrl: (z: import('../../../../../../dbModel.ts').Zaehlung) =>
            zaehlungUrl(z),
          buildText: (z: import('../../../../../../dbModel.ts').Zaehlung) =>
            zaehlungText(z),
        })
      },
    lieferungsWithMultipleVon: async () =>
      await buildQkMessages({
        rows: lieferungsSorted.filter(
          (l: import('../../../../../../dbModel.ts').Lieferung) =>
            l.von_kultur_id === kulturId,
        ),
        failsCheck: (l: import('../../../../../../dbModel.ts').Lieferung) =>
          !!l.von_sammlung_id,
        buildUrl: (l: import('../../../../../../dbModel.ts').Lieferung) => [
          'Lieferungen',
          l.id,
          'Lieferung',
        ],
        buildText: (l: import('../../../../../../dbModel.ts').Lieferung) =>
          lieferungText(l),
      }),
    lieferungsWithMultipleNach: async () =>
      await buildQkMessages({
        rows: lieferungsSorted.filter(
          (l: import('../../../../../../dbModel.ts').Lieferung) =>
            l.nach_kultur_id === kulturId,
        ),
        failsCheck: (l: import('../../../../../../dbModel.ts').Lieferung) =>
          !!l.nach_ausgepflanzt,
        buildUrl: (l: import('../../../../../../dbModel.ts').Lieferung) => [
          'Lieferungen',
          l.id,
          'Lieferung',
        ],
        buildText: (l: import('../../../../../../dbModel.ts').Lieferung) =>
          lieferungText(l),
      }),
    anLieferungsWithoutAnzahlPflanzen: async () =>
      await buildQkMessages({
        rows: lieferungsSorted.filter(
          (l: import('../../../../../../dbModel.ts').Lieferung) =>
            l.nach_kultur_id === kulturId,
        ),
        failsCheck: (l: import('../../../../../../dbModel.ts').Lieferung) =>
          !exists(l.anzahl_pflanzen),
        buildUrl: (l) => [
          'Kulturen',
          kulturId,
          'An-Lieferungen',
          l.id,
          'Lieferung',
        ],
        buildText: (l) => lieferungText(l),
      }),
    ausLieferungsWithoutAnzahlPflanzen: async () =>
      await buildQkMessages({
        rows: lieferungsSorted.filter(
          (l: import('../../../../../../dbModel.ts').Lieferung) =>
            l.von_kultur_id === kulturId,
        ),
        failsCheck: (l: import('../../../../../../dbModel.ts').Lieferung) =>
          !exists(l.anzahl_pflanzen),
        buildUrl: (l) => [
          'Kulturen',
          kulturId,
          'Aus-Lieferungen',
          l.id,
          'Lieferung',
        ],
        buildText: (l) => lieferungText(l),
      }),
    anLieferungsWithoutAnzahlAuspflanzbereit: async () =>
      await buildQkMessages({
        rows: lieferungsSorted.filter(
          (l: import('../../../../../../dbModel.ts').Lieferung) =>
            l.nach_kultur_id === kulturId,
        ),
        failsCheck: (l: import('../../../../../../dbModel.ts').Lieferung) =>
          !exists(l.anzahl_auspflanzbereit),
        buildUrl: (l) => [
          'Kulturen',
          kulturId,
          'An-Lieferungen',
          l.id,
          'Lieferung',
        ],
        buildText: (l) => lieferungText(l),
      }),
    ausLieferungsWithoutAnzahlAuspflanzbereit: async () =>
      await buildQkMessages({
        rows: lieferungsSorted.filter(
          (l: import('../../../../../../dbModel.ts').Lieferung) =>
            l.von_kultur_id === kulturId,
        ),
        failsCheck: (l: import('../../../../../../dbModel.ts').Lieferung) =>
          !exists(l.anzahl_auspflanzbereit),
        buildUrl: (l) => [
          'Kulturen',
          kulturId,
          'Aus-Lieferungen',
          l.id,
          'Lieferung',
        ],
        buildText: (l) => lieferungText(l),
      }),
    anLieferungsWithoutVonAnzahlIndividuen: async () =>
      await buildQkMessages({
        rows: lieferungsSorted.filter(
          (l: import('../../../../../../dbModel.ts').Lieferung) =>
            l.nach_kultur_id === kulturId,
        ),
        failsCheck: (l: import('../../../../../../dbModel.ts').Lieferung) =>
          !exists(l.von_anzahl_individuen),
        buildUrl: (l) => [
          'Kulturen',
          kulturId,
          'An-Lieferungen',
          l.id,
          'Lieferung',
        ],
        buildText: (l) => lieferungText(l),
      }),
    ausLieferungsWithoutVonAnzahlIndividuen: async () =>
      await buildQkMessages({
        rows: lieferungsSorted.filter(
          (l: import('../../../../../../dbModel.ts').Lieferung) =>
            l.von_kultur_id === kulturId,
        ),
        failsCheck: (l: import('../../../../../../dbModel.ts').Lieferung) =>
          !exists(l.von_anzahl_individuen),
        buildUrl: (l) => [
          'Kulturen',
          kulturId,
          'Aus-Lieferungen',
          l.id,
          'Lieferung',
        ],
        buildText: (l) => lieferungText(l),
      }),
    anLieferungsWithoutVon: async () =>
      await buildQkMessages({
        rows: lieferungsSorted.filter(
          (l: import('../../../../../../dbModel.ts').Lieferung) =>
            l.nach_kultur_id === kulturId,
        ),
        failsCheck: (l: import('../../../../../../dbModel.ts').Lieferung) =>
          !l.von_kultur_id,
        buildUrl: (l: import('../../../../../../dbModel.ts').Lieferung) => [
          'Kulturen',
          kulturId,
          'An-Lieferungen',
          l.id,
          'Lieferung',
        ],
        buildText: (l: import('../../../../../../dbModel.ts').Lieferung) =>
          lieferungText(l),
      }),
    ausLieferungsWithoutNach: async () =>
      await buildQkMessages({
        rows: lieferungsSorted.filter(
          (l: import('../../../../../../dbModel.ts').Lieferung) =>
            l.von_kultur_id === kulturId,
        ),
        failsCheck: (l: import('../../../../../../dbModel.ts').Lieferung) =>
          !l.nach_kultur_id && !l.nach_ausgepflanzt,
        buildUrl: (l: import('../../../../../../dbModel.ts').Lieferung) => [
          'Kulturen',
          kulturId,
          'Aus-Lieferungen',
          l.id,
          'Lieferung',
        ],
        buildText: (l: import('../../../../../../dbModel.ts').Lieferung) =>
          lieferungText(l),
      }),
    anLieferungsWithoutDatum: async () =>
      await buildQkMessages({
        rows: lieferungsSorted.filter(
          (l: import('../../../../../../dbModel.ts').Lieferung) =>
            l.nach_kultur_id === kulturId,
        ),
        failsCheck: (l: import('../../../../../../dbModel.ts').Lieferung) =>
          !l.datum,
        buildUrl: (l: import('../../../../../../dbModel.ts').Lieferung) => [
          'Kulturen',
          kulturId,
          'An-Lieferungen',
          l.id,
          'Lieferung',
        ],
        buildText: (l: import('../../../../../../dbModel.ts').Lieferung) =>
          lieferungText(l),
      }),
    ausLieferungsWithoutDatum: async () =>
      await buildQkMessages({
        rows: lieferungsSorted.filter(
          (l: import('../../../../../../dbModel.ts').Lieferung) =>
            l.von_kultur_id === kulturId,
        ),
        failsCheck: (l: import('../../../../../../dbModel.ts').Lieferung) =>
          !l.datum,
        buildUrl: (l: import('../../../../../../dbModel.ts').Lieferung) => [
          'Kulturen',
          kulturId,
          'Aus-Lieferungen',
          l.id,
          'Lieferung',
        ],
        buildText: (l: import('../../../../../../dbModel.ts').Lieferung) =>
          lieferungText(l),
      }),
    anLieferungsWithoutPerson: async () =>
      await buildQkMessages({
        rows: lieferungsSorted.filter(
          (l: import('../../../../../../dbModel.ts').Lieferung) =>
            l.nach_kultur_id === kulturId,
        ),
        failsCheck: (l: import('../../../../../../dbModel.ts').Lieferung) =>
          !l.person_id,
        buildUrl: (l: import('../../../../../../dbModel.ts').Lieferung) => [
          'Kulturen',
          kulturId,
          'An-Lieferungen',
          l.id,
          'Lieferung',
        ],
        buildText: (l: import('../../../../../../dbModel.ts').Lieferung) =>
          lieferungText(l),
      }),
    ausLieferungsWithoutPerson: async () =>
      await buildQkMessages({
        rows: lieferungsSorted.filter(
          (l: import('../../../../../../dbModel.ts').Lieferung) =>
            l.von_kultur_id === kulturId,
        ),
        failsCheck: (l: import('../../../../../../dbModel.ts').Lieferung) =>
          !l.person_id,
        buildUrl: (l: import('../../../../../../dbModel.ts').Lieferung) => [
          'Kulturen',
          kulturId,
          'Aus-Lieferungen',
          l.id,
          'Lieferung',
        ],
        buildText: (l: import('../../../../../../dbModel.ts').Lieferung) =>
          lieferungText(l),
      }),
  }
}
