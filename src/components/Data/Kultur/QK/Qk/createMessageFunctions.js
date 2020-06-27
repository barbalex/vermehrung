import format from 'date-fns/format'

import exists from '../../../../../utils/exists'

export default ({ kulturId, store }) => {
  const {
    lieferungsSorted,
    kultursSorted,
    teilkultursSorted,
    eventsSorted,
    zaehlungsSorted,
  } = store
  const year = +format(new Date(), 'yyyy')
  const startYear = `${year}-01-01`
  const startNextYear = `${year + 1}-01-01`

  return {
    kultursWithoutVonAnzahlIndividuen: () =>
      kultursSorted
        .filter((k) => k.id === kulturId)
        .filter((k) => !exists(k.von_anzahl_individuen))
        .map((k) => {
          const garten =
            k?.garten?.name ?? `${k?.garten?.person?.fullname ?? 'kein Name'}`
          const herkunft = k?.herkunft?.nr ?? '(Herkunft ohne Nr)'
          const text = `von: ${herkunft}, in: ${garten}`

          return {
            url: ['Kulturen', kulturId],
            text,
          }
        }),
    kultursWithoutGarten: () =>
      kultursSorted
        .filter((k) => k.id === kulturId)
        .filter((k) => !k.garten_id)
        .map((k) => {
          const herkunft = k?.herkunft?.nr ?? '(Herkunft ohne Nr)'
          const text = `ID: ${k.id}, von: ${herkunft}`

          return {
            url: ['Kulturen', kulturId],
            text,
          }
        }),
    kultursWithoutHerkunft: () =>
      kultursSorted
        .filter((k) => k.id === kulturId)
        .filter((k) => !k.herkunft_id)
        .map((k) => {
          const garten =
            k?.garten?.name ?? `${k?.garten?.person?.fullname ?? 'kein Name'}`
          const text = `ID: ${k.id}, in: ${garten}`

          return {
            url: ['Kulturen', kulturId],
            text,
          }
        }),
    kultursWithoutZaehlungThisYear: () =>
      kultursSorted
        .filter((k) => k.id === kulturId)
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
            k?.garten?.name ?? `${k?.garten?.person?.fullname ?? 'kein Name'}`
          const herkunft = k?.herkunft?.nr ?? '(Herkunft ohne Nr)'
          const text = `von: ${herkunft}, in: ${garten}`

          return {
            url: ['Kulturen', kulturId],
            text,
          }
        }),
    teilkultursWithoutName: () =>
      teilkultursSorted
        .filter((tk) => tk.kultur_id === kulturId)
        .filter((tk) => !tk.name)
        .map((tk) => {
          const garten =
            tk.kultur?.garten?.name ??
            `${tk.kultur?.garten?.person?.fullname ?? 'kein Name'}`
          const herkunft = tk.kultur?.herkunft?.nr ?? '(Herkunft ohne Nr)'
          const text = `von: ${herkunft}, in: ${garten}, Teilkultur-ID: ${tk.id}`

          return {
            url: ['Kulturen', kulturId, 'Teilkulturen', tk.id],
            text,
          }
        }),
    zaehlungsWithoutDatum: () =>
      zaehlungsSorted
        .filter((z) => z.kultur_id === kulturId)
        .filter((z) => !z.datum)
        .map((z) => {
          const garten =
            z?.kultur?.garten?.name ??
            `${z?.kultur?.garten?.person?.fullname ?? 'kein Name'}`
          const herkunft = z?.kultur?.herkunft?.nr ?? '(Herkunft ohne Nr)'
          const text = `von: ${herkunft}, in: ${garten}, Zählung-ID: ${z.id}`

          return {
            url: ['Kulturen', kulturId, 'Zaehlungen', z.id],
            text,
          }
        }),
    zaehlungsWithoutAnzahlPflanzen: () =>
      zaehlungsSorted
        .filter((z) => z.kultur_id === kulturId)
        .filter(
          (z) =>
            (z.teilzaehlungs ?? [])
              .filter((tz) => !tz._deleted)
              .filter((tz) => !exists(tz.anzahl_pflanzen)).length,
        )
        .map((z) => {
          const garten =
            z.kultur?.garten?.name ??
            `${z.kultur?.garten?.person?.fullname ?? 'kein Name'}`
          const herkunft = z.kultur?.herkunft?.nr ?? '(Herkunft ohne Nr)'
          const zaehlung = z.datum
            ? `Zählung vom ${format(new Date(z.datum), 'yyyy.MM.dd')}`
            : `Zählung-ID: ${z.id}`
          const anzTz = (z.teilzaehlungs ?? []).filter((tz) => !tz._deleted)
            .length
          const teilzaehlung = anzTz > 1 ? ` (${anzTz} Teilzählungen)` : ''
          const text = `von: ${herkunft}, in: ${garten}, ${zaehlung}${teilzaehlung}`

          return {
            url: ['Kulturen', kulturId, 'Zaehlungen', z.id],
            text,
          }
        }),
    zaehlungsWithoutAnzahlAuspflanzbereit: () =>
      zaehlungsSorted
        .filter((z) => z.kultur_id === kulturId)
        .filter(
          (z) =>
            (z.teilzaehlungs ?? [])
              .filter((tz) => !tz._deleted)
              .filter((tz) => !exists(tz.anzahl_auspflanzbereit)).length,
        )
        .map((z) => {
          const garten =
            z.kultur?.garten?.name ??
            `${z.kultur?.garten?.person?.fullname ?? 'kein Name'}`
          const herkunft = z.kultur?.herkunft?.nr ?? '(Herkunft ohne Nr)'
          const zaehlung = z.datum
            ? `Zählung vom ${format(new Date(z.datum), 'yyyy.MM.dd')}`
            : `Zählung-ID: ${z.id}`
          const anzTz = (z.teilzaehlungs ?? []).filter((tz) => !tz._deleted)
            .length
          const teilzaehlung = anzTz > 1 ? ` (${anzTz} Teilzählungen)` : ''
          const text = `von: ${herkunft}, in: ${garten}, ${zaehlung}${teilzaehlung}`

          return {
            url: ['Kulturen', kulturId, 'Zaehlungen', z.id],
            text,
          }
        }),
    zaehlungsWithoutAnzahlMutterpflanzen: () =>
      zaehlungsSorted
        .filter((z) => z.kultur_id === kulturId)
        .filter(
          (z) =>
            (z.teilzaehlungs ?? [])
              .filter((tz) => !tz._deleted)
              .filter((tz) => !exists(tz.anzahl_mutterpflanzen)).length,
        )
        .map((z) => {
          const garten =
            z.kultur?.garten?.name ??
            `${z.kultur?.garten?.person?.fullname ?? 'kein Name'}`
          const herkunft = z.kultur?.herkunft?.nr ?? '(Herkunft ohne Nr)'
          const zaehlung = z.datum
            ? `Zählung vom ${format(new Date(z.datum), 'yyyy.MM.dd')}`
            : `Zählung-ID: ${z.id}`
          const anzTz = (z.teilzaehlungs ?? []).filter((tz) => !tz._deleted)
            .length
          const teilzaehlung = anzTz > 1 ? ` (${anzTz} Teilzählungen)` : ''
          const text = `von: ${herkunft}, in: ${garten}, ${zaehlung}${teilzaehlung}`

          return {
            url: ['Kulturen', kulturId, 'Zaehlungen', z.id],
            text,
          }
        }),
    lieferungsWithMultipleVon: () =>
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
    lieferungsWithMultipleNach: () =>
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
    anLieferungsWithoutAnzahlPflanzen: () =>
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
    ausLieferungsWithoutAnzahlPflanzen: () =>
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
    anLieferungsWithoutAnzahlAuspflanzbereit: () =>
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
    ausLieferungsWithoutAnzahlAuspflanzbereit: () =>
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
    anLieferungsWithoutVonAnzahlIndividuen: () =>
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
    ausLieferungsWithoutVonAnzahlIndividuen: () =>
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
    anLieferungsWithoutVon: () =>
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
    ausLieferungsWithoutNach: () =>
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
    anLieferungsWithoutDatum: () =>
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
    ausLieferungsWithoutDatum: () =>
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
    anLieferungsWithoutPerson: () =>
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
    ausLieferungsWithoutPerson: () =>
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
    eventsWithoutBeschreibung: () =>
      eventsSorted
        .filter((e) => e.kultur_id === kulturId)
        .filter((e) => !e.beschreibung)
        .map((ev) => {
          const garten =
            ev.kultur?.garten?.name ??
            `${ev.kultur?.garten?.person?.fullname ?? 'kein Name'}`
          const herkunft = ev.kultur?.herkunft?.nr ?? '(Herkunft ohne Nr)'
          const text = `von: ${herkunft}, in: ${garten}, Event-ID: ${ev.id}`

          return {
            url: ['Kulturen', kulturId, 'Events', ev.id],
            text,
          }
        }),
    eventsWithoutDatum: () =>
      eventsSorted
        .filter((e) => e.kultur_id === kulturId)
        .filter((e) => !e.datum)
        .map((ev) => {
          const garten =
            ev.kultur?.garten?.name ??
            `${ev.kultur?.garten?.person?.fullname ?? 'kein Name'}`
          const herkunft = ev.kultur?.herkunft?.nr ?? '(Herkunft ohne Nr)'
          const text = `von: ${herkunft}, in: ${garten}, Event-ID: ${ev.id}`

          return {
            url: ['Kulturen', kulturId, 'Events', ev.id],
            text,
          }
        }),
  }
}
