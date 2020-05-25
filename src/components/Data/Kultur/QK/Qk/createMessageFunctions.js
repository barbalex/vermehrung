import format from 'date-fns/format'

export default ({ data, kulturId }) => ({
  kultursWithoutVonAnzahlIndividuen: () =>
    (data?.kultursWithoutVonAnzahlIndividuen ?? []).map((k) => {
      const garten =
        k?.garten?.name ?? `(${k?.garten?.person?.name ?? 'kein Name'})`
      const herkunft = k?.herkunft?.nr ?? '(Herkunft ohne Nr)'
      const text = `von: ${herkunft}, in: ${garten}`

      return {
        url: ['Kulturen', kulturId],
        text,
      }
    }),
  kultursWithoutGarten: () =>
    (data?.kultursWithoutGarten ?? []).map((k) => {
      const herkunft = k?.herkunft?.nr ?? '(Herkunft ohne Nr)'
      const text = `ID: ${k.id}, von: ${herkunft}`

      return {
        url: ['Kulturen', kulturId],
        text,
      }
    }),
  kultursWithoutHerkunft: () =>
    (data?.kultursWithoutHerkunft ?? []).map((k) => {
      const garten =
        k?.garten?.name ?? `(${k?.garten?.person?.name ?? 'kein Name'})`
      const text = `ID: ${k.id}, in: ${garten}`

      return {
        url: ['Kulturen', kulturId],
        text,
      }
    }),
  kultursWithoutZaehlungThisYear: () =>
    (data?.kultursWithoutZaehlungThisYear ?? []).map((k) => {
      const garten =
        k?.garten?.name ?? `(${k?.garten?.person?.name ?? 'kein Name'})`
      const herkunft = k?.herkunft?.nr ?? '(Herkunft ohne Nr)'
      const text = `von: ${herkunft}, in: ${garten}`

      return {
        url: ['Kulturen', kulturId],
        text,
      }
    }),
  teilkultursWithoutName: () =>
    (data?.teilkultursWithoutName ?? []).flatMap((k) =>
      (k?.teilkulturs ?? []).map((tk) => {
        const garten =
          k?.garten?.name ?? `(${k?.garten?.person?.name ?? 'kein Name'})`
        const herkunft = k?.herkunft?.nr ?? '(Herkunft ohne Nr)'
        const text = `von: ${herkunft}, in: ${garten}, Teilkultur-ID: ${tk.id}`

        return {
          url: ['Kulturen', kulturId, 'Teilkulturen', tk.id],
          text,
        }
      }),
    ),
  zaehlungsWithoutDatum: () =>
    (data?.zaehlungsWithoutDatum ?? []).flatMap((k) =>
      (k?.zaehlungs ?? []).map((z) => {
        const garten =
          k?.garten?.name ?? `(${k?.garten?.person?.name ?? 'kein Name'})`
        const herkunft = k?.herkunft?.nr ?? '(Herkunft ohne Nr)'
        const text = `von: ${herkunft}, in: ${garten}, Zählung-ID: ${z.id}`

        return {
          url: ['Kulturen', kulturId, 'Zaehlungen', z.id],
          text,
        }
      }),
    ),
  zaehlungsWithoutAnzahlPflanzen: () =>
    (data?.zaehlungsWithoutAnzahlPflanzen ?? []).flatMap((k) =>
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
          url: ['Kulturen', kulturId, 'Zaehlungen', z.id],
          text,
        }
      }),
    ),
  zaehlungsWithoutAnzahlAuspflanzbereit: () =>
    (data?.zaehlungsWithoutAnzahlAuspflanzbereit ?? []).flatMap((k) =>
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
          url: ['Kulturen', kulturId, 'Zaehlungen', z.id],
          text,
        }
      }),
    ),
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
          url: ['Kulturen', kulturId, 'Zaehlungen', z.id],
          text,
        }
      }),
    ),
  anLieferungsWithoutAnzahlPflanzen: () =>
    (data?.anLieferungsWithoutAnzahlPflanzen ?? []).map((l) => {
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
    (data?.ausLieferungsWithoutAnzahlPflanzen ?? []).map((l) => {
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
    (data?.anLieferungsWithoutAnzahlAuspflanzbereit ?? []).map((l) => {
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
    (data?.ausLieferungsWithoutAnzahlAuspflanzbereit ?? []).map((l) => {
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
    (data?.anLieferungsWithoutVonAnzahlIndividuen ?? []).map((l) => {
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
    (data?.ausLieferungsWithoutVonAnzahlIndividuen ?? []).map((l) => {
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
    (data?.anLieferungsWithoutVon ?? []).map((l) => {
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
    (data?.ausLieferungsWithoutNach ?? []).map((l) => {
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
    (data?.anLieferungsWithoutDatum ?? []).map((l) => {
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
    (data?.ausLieferungsWithoutDatum ?? []).map((l) => {
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
    (data?.anLieferungsWithoutPerson ?? []).map((l) => {
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
    (data?.ausLieferungsWithoutPerson ?? []).map((l) => {
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
    (data?.eventsWithoutBeschreibung ?? []).flatMap((k) =>
      (k?.events ?? []).map((ev) => {
        const garten =
          k?.garten?.name ?? `(${k?.garten?.person?.name ?? 'kein Name'})`
        const herkunft = k?.herkunft?.nr ?? '(Herkunft ohne Nr)'
        const text = `von: ${herkunft}, in: ${garten}, Event-ID: ${ev.id}`

        return {
          url: ['Kulturen', kulturId, 'Events', ev.id],
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
          url: ['Kulturen', kulturId, 'Events', ev.id],
          text,
        }
      }),
    ),
})
