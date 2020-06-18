import format from 'date-fns/format'
import exists from '../../../../../utils/exists'

export default ({ data, artId, store }) => {
  const {
    lieferungsSorted,
    kultursSorted,
    teilkultursSorted,
    eventsSorted,
    sammlungsSorted,
    zaehlungsSorted,
  } = store
  const year = +format(new Date(), 'yyyy')
  const startYear = `${year}-01-01`
  const startNextYear = `${year + 1}-01-01`

  return {
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
            k?.garten?.name ?? `(${k?.garten?.person?.name ?? 'kein Name'})`
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
            k?.garten?.name ?? `(${k?.garten?.person?.name ?? 'kein Name'})`
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
            k?.garten?.name ?? `(${k?.garten?.person?.name ?? 'kein Name'})`
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
            `(${tk.kultur?.garten?.person?.name ?? 'kein Name'})`
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
    zaehlungsWithoutDatum: () =>
      zaehlungsSorted
        .filter((z) => z?.kultur?.art_id === artId)
        .filter((z) => !z.datum)
        .map((z) => {
          const garten =
            z?.kultur?.garten?.name ??
            `(${z?.kultur?.garten?.person?.name ?? 'kein Name'})`
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
            z?.garten?.name ?? `(${z?.garten?.person?.name ?? 'kein Name'})`
          const herkunft = z?.herkunft?.nr ?? '(Herkunft ohne Nr)'
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
            z?.garten?.name ?? `(${z?.garten?.person?.name ?? 'kein Name'})`
          const herkunft = z?.herkunft?.nr ?? '(Herkunft ohne Nr)'
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
      (data?.zaehlungsWithoutAnzahlMutterpflanzen ?? []).flatMap((k) =>
        (k?.zaehlungs ?? []).map((z) => {
          const garten =
            k?.garten?.name ?? `(${k?.garten?.person?.name ?? 'kein Name'})`
          const herkunft = k?.herkunft?.nr ?? '(Herkunft ohne Nr)'
          const zaehlung = z.datum
            ? `Zählung vom ${format(new Date(z.datum), 'yyyy.MM.dd')}`
            : `Zählung-ID: ${z.id}`
          const anzTz = (z?.teilzaehlungs ?? []).length
          const teilzaehlung = anzTz > 1 ? ` (${anzTz} Teilzählungen)` : ''
          const text = `von: ${herkunft}, in: ${garten}, ${zaehlung}${teilzaehlung}`

          return {
            url: ['Arten', artId, 'Kulturen', k.id, 'Zaehlungen', z.id],
            text,
          }
        }),
      ),
    lieferungsWithoutAnzahlPflanzen: () =>
      (data?.lieferungsWithoutAnzahlPflanzen ?? []).map((l) => {
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
      (data?.lieferungsWithoutAnzahlAuspflanzbereit ?? []).map((l) => {
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
      (data?.lieferungsWithoutVonAnzahlIndividuen ?? []).map((l) => {
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
      (data?.lieferungsWithoutVon ?? []).map((l) => {
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
      (data?.lieferungsWithoutNach ?? []).map((l) => {
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
      (data?.lieferungsWithoutDatum ?? []).map((l) => {
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
      (data?.lieferungsWithoutPerson ?? []).map((l) => {
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
      (data?.eventsWithoutBeschreibung ?? []).flatMap((k) =>
        (k?.events ?? []).map((ev) => {
          const garten =
            k?.garten?.name ?? `(${k?.garten?.person?.name ?? 'kein Name'})`
          const herkunft = k?.herkunft?.nr ?? '(Herkunft ohne Nr)'
          const text = `von: ${herkunft}, in: ${garten}, Event-ID: ${ev.id}`

          return {
            url: ['Arten', artId, 'Kulturen', k.id, 'Events', ev.id],
            text,
          }
        }),
      ),
    eventsWithoutDatum: () =>
      (data?.eventsWithoutDatum ?? []).flatMap((k) =>
        (k?.events ?? []).map((ev) => {
          const garten =
            k?.garten?.name ?? `(${k?.garten?.person?.name ?? 'kein Name'})`
          const herkunft = k?.herkunft?.nr ?? '(Herkunft ohne Nr)'
          const text = `von: ${herkunft}, in: ${garten}, Event-ID: ${ev.id}`

          return {
            url: ['Arten', artId, 'Kulturen', k.id, 'Events', ev.id],
            text,
          }
        }),
      ),
  }
}
