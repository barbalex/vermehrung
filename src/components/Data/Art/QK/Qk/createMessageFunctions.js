import format from 'date-fns/format'
import groupBy from 'lodash/groupBy'

import exists from '../../../../../utils/exists'

export default ({ artId, store }) => {
  const {
    artsSorted,
    eventsSorted,
    herkunftsSorted,
    kultursSorted,
    lieferungsSorted,
    personsSorted,
    sammlungsSorted,
    teilkultursSorted,
    zaehlungsSorted,
  } = store
  const year = +format(new Date(), 'yyyy')
  const startYear = `${year}-01-01`
  const startNextYear = `${year + 1}-01-01`
  const now = new Date()

  return {
    sammlungsWithoutLieferung: () =>
      sammlungsSorted
        .filter((s) => s.art_id === artId)
        .filter(
          (s) => !lieferungsSorted.find((l) => l.von_sammlung_id === s.id),
        )
        .map((v) => ({
          url: ['Sammlungen', v.id],
          text: `${v.nr}${
            v?.art?.art_ae_art?.name ? `, ${v?.art?.art_ae_art?.name}` : ''
          }${v?.person?.name ? `, ${v?.person?.name}` : ''}`,
        })),
    sammlungsWithNonUniqueNr: () => {
      const sGroupedByNr = groupBy(
        sammlungsSorted.filter((s) => s.art_id === artId),
        (h) => h.nr,
      )
      return Object.values(sGroupedByNr)
        .filter((v) => v.length > 1)
        .flatMap((vs) =>
          vs.map((v) => ({
            url: ['Sammlungen', v.id],
            text: `${v.nr}${
              v?.art?.art_ae_art?.name ? `, ${v?.art?.art_ae_art?.name}` : ''
            }${v?.person?.name ? `, ${v?.person?.name}` : ''}`,
          })),
        )
    },
    personsWithNonUniqueNr: () => {
      const pGroupedByNr = groupBy(personsSorted, (h) => h.nr)
      return Object.values(pGroupedByNr)
        .filter((v) => v.length > 1)
        .flatMap((vs) =>
          vs.map((v) => ({
            url: ['Personen', v.id],
            text: `${v.nr}${v.fullname ? `, ${v.fullname}` : ''}`,
          })),
        )
    },
    herkunftsWithNonUniqueNr: () => {
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
    artsOhneAv: () =>
      artsSorted
        .filter((a) => a.id === artId)
        .filter((a) => !a?.avs?.map((av) => !av._deleted).length)
        .map((a) => ({
          url: ['Arten', a.id],
          text: a?.art_ae_art?.name ?? '(kein Artname)',
        })),
    sammlungsWithoutNr: () =>
      sammlungsSorted
        .filter((s) => s.art_id === artId)
        .filter((s) => !exists(s.nr))
        .map((s) => {
          const datum = s.datum
            ? format(new Date(s.datum), 'yyyy.MM.dd')
            : 'kein Datum'
          const geplant = s.geplant ? ' (geplant)' : ''
          const text = `${datum}: ${
            s?.herkunft?.gemeinde ?? '(keine Gemeinde)'
          }, ${s?.herkunft?.nr ?? '(keine Nr.)'}${geplant}`

          return {
            url: ['Arten', artId, 'Sammlungen', s.id],
            text,
          }
        }),
    sammlungsWithoutHerkunft: () =>
      sammlungsSorted
        .filter((s) => s.art_id === artId)
        .filter((s) => !s.herkunft_id)
        .map((s) => {
          const datum = s.datum
            ? format(new Date(s.datum), 'yyyy.MM.dd')
            : 'kein Datum'
          const geplant = s.geplant ? ' (geplant)' : ''
          const text = `${datum}: ${
            s?.herkunft?.gemeinde ?? '(keine Gemeinde)'
          }, ${s?.herkunft?.nr ?? '(keine Nr.)'}${geplant}`

          return {
            url: ['Arten', artId, 'Sammlungen', s.id],
            text,
          }
        }),
    sammlungsWithoutPerson: () =>
      sammlungsSorted
        .filter((s) => s.art_id === artId)
        .filter((s) => !s.person_id)
        .map((s) => {
          const datum = s.datum
            ? format(new Date(s.datum), 'yyyy.MM.dd')
            : 'kein Datum'
          const geplant = s.geplant ? ' (geplant)' : ''
          const text = `${datum}: ${
            s?.herkunft?.gemeinde ?? '(keine Gemeinde)'
          }, ${s?.herkunft?.nr ?? '(keine Nr.)'}${geplant}`

          return {
            url: ['Arten', artId, 'Sammlungen', s.id],
            text,
          }
        }),
    sammlungsWithoutDatum: () =>
      sammlungsSorted
        .filter((s) => s.art_id === artId)
        .filter((s) => !s.datum)
        .map((s) => {
          const datum = s.datum
            ? format(new Date(s.datum), 'yyyy.MM.dd')
            : 'kein Datum'
          const geplant = s.geplant ? ' (geplant)' : ''
          const text = `${datum}: ${
            s?.herkunft?.gemeinde ?? '(keine Gemeinde)'
          }, ${s?.herkunft?.nr ?? '(keine Nr.)'}${geplant}`

          return {
            url: ['Arten', artId, 'Sammlungen', s.id],
            text,
          }
        }),
    sammlungsWithoutAnzahlPflanzen: () =>
      sammlungsSorted
        .filter((s) => s.art_id === artId)
        .filter((s) => !exists(s.anzahl_pflanzen))
        .map((s) => {
          const datum = s.datum
            ? format(new Date(s.datum), 'yyyy.MM.dd')
            : 'kein Datum'
          const geplant = s.geplant ? ' (geplant)' : ''
          const text = `${datum}: ${
            s?.herkunft?.gemeinde ?? '(keine Gemeinde)'
          }, ${s?.herkunft?.nr ?? '(keine Nr.)'}${geplant}`

          return {
            url: ['Arten', artId, 'Sammlungen', s.id],
            text,
          }
        }),
    sammlungsWithoutVonAnzahlIdividuen: () =>
      sammlungsSorted
        .filter((s) => s.art_id === artId)
        .filter((s) => !exists(s.von_anzahl_individuen))
        .map((s) => {
          const datum = s.datum
            ? format(new Date(s.datum), 'yyyy.MM.dd')
            : 'kein Datum'
          const geplant = s.geplant ? ' (geplant)' : ''
          const text = `${datum}: ${
            s?.herkunft?.gemeinde ?? '(keine Gemeinde)'
          }, ${s?.herkunft?.nr ?? '(keine Nr.)'}${geplant}`

          return {
            url: ['Arten', artId, 'Sammlungen', s.id],
            text,
          }
        }),
    kultursWithoutVonAnzahlIndividuen: () =>
      kultursSorted
        .filter((s) => s.art_id === artId)
        .filter((s) => !exists(s.von_anzahl_individuen))
        .map((k) => {
          const garten =
            k?.garten?.name ?? `(${k?.garten?.person?.fullname ?? 'kein Name'})`
          const herkunft = k?.herkunft?.nr ?? '(Herkunft ohne Nr)'
          const text = `von: ${herkunft}, in: ${garten}`

          return {
            url: ['Arten', artId, 'Kulturen', k.id],
            text,
          }
        }),
    kultursWithoutGarten: () =>
      kultursSorted
        .filter((s) => s.art_id === artId)
        .filter((s) => !s.garten_id)
        .map((k) => {
          const herkunft = k?.herkunft?.nr ?? '(Herkunft ohne Nr)'
          const text = `ID: ${k.id}, von: ${herkunft}`

          return {
            url: ['Arten', artId, 'Kulturen', k.id],
            text,
          }
        }),
    kultursWithoutHerkunft: () =>
      kultursSorted
        .filter((s) => s.art_id === artId)
        .filter((s) => !s.herkunft_id)
        .map((k) => {
          const garten =
            k?.garten?.name ?? `(${k?.garten?.person?.fullname ?? 'kein Name'})`
          const text = `ID: ${k.id}, in: ${garten}`

          return {
            url: ['Arten', artId, 'Kulturen', k.id],
            text,
          }
        }),
    kultursWithoutZaehlungThisYear: () =>
      kultursSorted
        .filter((s) => s.art_id === artId)
        .filter(
          (k) =>
            (k.zaehlungs ?? [])
              .filter((z) => !z._deleted)
              .filter(
                (z) =>
                  z.datum && z.datum > startYear && z.datum < startNextYear,
              ).length === 0,
        )
        .map((k) => {
          const garten =
            k?.garten?.name ?? `(${k?.garten?.person?.fullname ?? 'kein Name'})`
          const herkunft = k?.herkunft?.nr ?? '(Herkunft ohne Nr)'
          const text = `von: ${herkunft}, in: ${garten}`

          return {
            url: ['Arten', artId, 'Kulturen', k.id],
            text,
          }
        }),
    teilkultursWithoutName: () =>
      teilkultursSorted
        .filter((tk) => tk?.kultur?.art_id === artId)
        .filter((tk) => !tk.name)
        .map((tk) => {
          const garten =
            tk.kultur?.garten?.name ??
            `(${tk.kultur?.garten?.person?.fullname ?? 'kein Name'})`
          const herkunft = tk.kultur?.herkunft?.nr ?? '(Herkunft ohne Nr)'
          const text = `von: ${herkunft}, in: ${garten}, Teilkultur-ID: ${tk.id}`

          return {
            url: [
              'Arten',
              artId,
              'Kulturen',
              tk?.kultur?.id,
              'Teilkulturen',
              tk.id,
            ],
            text,
          }
        }),
    zaehlungsInFutureNotPrognose: () =>
      zaehlungsSorted
        .filter((z) => z?.kultur?.art_id === artId)
        .filter((z) => !!z.datum)
        .filter((z) => new Date(z.datum).getTime() > now)
        .map((z) => {
          const garten =
            z?.kultur?.garten?.name ??
            `(${z?.kultur?.garten?.person?.fullname ?? 'kein Name'})`
          const herkunft = z?.kultur?.herkunft?.nr ?? '(Herkunft ohne Nr)'
          const text = `von: ${herkunft}, in: ${garten}, Zählung-ID: ${z.id}`

          return {
            url: ['Arten', artId, 'Kulturen', z.id, 'Zaehlungen', z.id],
            text,
          }
        }),
    zaehlungsWithoutDatum: () =>
      zaehlungsSorted
        .filter((z) => z?.kultur?.art_id === artId)
        .filter((z) => !z.datum)
        .map((z) => {
          const garten =
            z?.kultur?.garten?.name ??
            `(${z?.kultur?.garten?.person?.fullname ?? 'kein Name'})`
          const herkunft = z?.kultur?.herkunft?.nr ?? '(Herkunft ohne Nr)'
          const text = `von: ${herkunft}, in: ${garten}, Zählung-ID: ${z.id}`

          return {
            url: ['Arten', artId, 'Kulturen', z.id, 'Zaehlungen', z.id],
            text,
          }
        }),
    zaehlungsWithoutAnzahlPflanzen: () =>
      zaehlungsSorted
        .filter((z) => z?.kultur?.art_id === artId)
        .filter(
          (z) =>
            (z.teilzaehlungs ?? [])
              .filter((tz) => !tz._deleted)
              .filter((tz) => !exists(tz.anzahl_pflanzen)).length,
        )
        .map((z) => {
          const garten =
            z?.kultur?.garten?.name ??
            `(${z?.kultur?.garten?.person?.fullname ?? 'kein Name'})`
          const herkunft = z?.kultur?.herkunft?.nr ?? '(Herkunft ohne Nr)'
          const zaehlung = z.datum
            ? `Zählung vom ${format(new Date(z.datum), 'yyyy.MM.dd')}`
            : `Zählung-ID: ${z.id}`
          const anzTz = (z?.teilzaehlungs ?? []).length
          const teilzaehlung = anzTz > 1 ? ` (${anzTz} Teilzählungen)` : ''
          const text = `von: ${herkunft}, in: ${garten}, ${zaehlung}${teilzaehlung}`

          return {
            url: ['Arten', artId, 'Kulturen', z?.kultur.id, 'Zaehlungen', z.id],
            text,
          }
        }),
    zaehlungsWithoutAnzahlAuspflanzbereit: () =>
      zaehlungsSorted
        .filter((z) => z?.kultur?.art_id === artId)
        .filter(
          (z) =>
            (z.teilzaehlungs ?? [])
              .filter((tz) => !tz._deleted)
              .filter((tz) => !exists(tz.anzahl_auspflanzbereit)).length,
        )
        .map((z) => {
          const garten =
            z?.kultur?.garten?.name ??
            `(${z?.kultur?.garten?.person?.fullname ?? 'kein Name'})`
          const herkunft = z?.kultur?.herkunft?.nr ?? '(Herkunft ohne Nr)'
          const zaehlung = z.datum
            ? `Zählung vom ${format(new Date(z.datum), 'yyyy.MM.dd')}`
            : `Zählung-ID: ${z.id}`
          const anzTz = (z?.teilzaehlungs ?? []).length
          const teilzaehlung = anzTz > 1 ? ` (${anzTz} Teilzählungen)` : ''
          const text = `von: ${herkunft}, in: ${garten}, ${zaehlung}${teilzaehlung}`

          return {
            url: ['Arten', artId, 'Kulturen', z?.kultur.id, 'Zaehlungen', z.id],
            text,
          }
        }),
    zaehlungsWithoutAnzahlMutterpflanzen: () =>
      zaehlungsSorted
        .filter((z) => z?.kultur?.art_id === artId)
        .filter(
          (z) =>
            (z.teilzaehlungs ?? [])
              .filter((tz) => !tz._deleted)
              .filter((tz) => !exists(tz.anzahl_mutterpflanzen)).length,
        )
        .map((z) => {
          const garten =
            z?.kultur?.garten?.name ??
            `(${z?.kultur?.garten?.person?.fullname ?? 'kein Name'})`
          const herkunft = z?.kultur?.herkunft?.nr ?? '(Herkunft ohne Nr)'
          const zaehlung = z.datum
            ? `Zählung vom ${format(new Date(z.datum), 'yyyy.MM.dd')}`
            : `Zählung-ID: ${z.id}`
          const anzTz = (z?.teilzaehlungs ?? []).length
          const teilzaehlung = anzTz > 1 ? ` (${anzTz} Teilzählungen)` : ''
          const text = `von: ${herkunft}, in: ${garten}, ${zaehlung}${teilzaehlung}`

          return {
            url: [
              'Arten',
              artId,
              'Kulturen',
              z?.kultur?.id,
              'Zaehlungen',
              z.id,
            ],
            text,
          }
        }),
    lieferungsWithMultipleVon: () =>
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
    lieferungsWithMultipleNach: () =>
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
    lieferungsWithoutAnzahlPflanzen: () =>
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
    lieferungsWithoutAnzahlAuspflanzbereit: () =>
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
    lieferungsWithoutVonAnzahlIndividuen: () =>
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
    lieferungsWithoutVon: () =>
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
    lieferungsWithoutNach: () =>
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
    lieferungsWithoutDatum: () =>
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
    lieferungsWithoutPerson: () =>
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
    eventsWithoutBeschreibung: () =>
      eventsSorted
        .filter((e) => e?.kultur?.art_id === artId)
        .filter((e) => !e.beschreibung)
        .map((e) => {
          const garten =
            e?.kultur?.garten?.name ??
            `(${e?.kultur?.garten?.person?.fullname ?? 'kein Name'})`
          const herkunft = e?.kultur?.herkunft?.nr ?? '(Herkunft ohne Nr)'
          const text = `von: ${herkunft}, in: ${garten}, Event-ID: ${e.id}`

          return {
            url: ['Arten', artId, 'Kulturen', e?.kultur?.id, 'Events', e.id],
            text,
          }
        }),
    eventsWithoutDatum: () =>
      eventsSorted
        .filter((e) => e?.kultur?.art_id === artId)
        .filter((e) => !e.datum)
        .map((e) => {
          const garten =
            e?.kultur?.garten?.name ??
            `(${e?.kultur?.garten?.person?.fullname ?? 'kein Name'})`
          const herkunft = e?.kultur?.herkunft?.nr ?? '(Herkunft ohne Nr)'
          const text = `von: ${herkunft}, in: ${garten}, Event-ID: ${e.id}`

          return {
            url: ['Arten', artId, 'Kulturen', e?.kultur.id, 'Events', e.id],
            text,
          }
        }),
  }
}
