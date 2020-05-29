import format from 'date-fns/format'

export default ({ data, artId }) => ({
  sammlungsWithoutNr: () =>
    (data?.sammlungsWithoutNr ?? []).map((s) => {
      const datum = s.datum
        ? format(new Date(s.datum), 'yyyy.MM.dd')
        : 'kein Datum'
      const geplant = s.geplant ? ' (geplant)' : ''
      const text = `${datum}: ${s?.herkunft.gemeinde ?? '(keine Gemeinde)'}, ${
        s?.herkunft.nr ?? '(keine Nr.)'
      }${geplant}`

      return {
        url: ['Arten', artId, 'Sammlungen', s.id],
        text,
      }
    }),
  sammlungsWithoutHerkunft: () =>
    (data?.sammlungsWithoutHerkunft ?? []).map((s) => {
      const datum = s.datum
        ? format(new Date(s.datum), 'yyyy.MM.dd')
        : 'kein Datum'
      const geplant = s.geplant ? ' (geplant)' : ''
      const text = `${datum}: ${s?.herkunft.gemeinde ?? '(keine Gemeinde)'}, ${
        s?.herkunft.nr ?? '(keine Nr.)'
      }${geplant}`

      return {
        url: ['Arten', artId, 'Sammlungen', s.id],
        text,
      }
    }),
  sammlungsWithoutPerson: () =>
    (data?.sammlungsWithoutPerson ?? []).map((s) => {
      const datum = s.datum
        ? format(new Date(s.datum), 'yyyy.MM.dd')
        : 'kein Datum'
      const geplant = s.geplant ? ' (geplant)' : ''
      const text = `${datum}: ${s?.herkunft.gemeinde ?? '(keine Gemeinde)'}, ${
        s?.herkunft.nr ?? '(keine Nr.)'
      }${geplant}`

      return {
        url: ['Arten', artId, 'Sammlungen', s.id],
        text,
      }
    }),
  sammlungsWithoutDatum: () =>
    (data?.sammlungsWithoutDatum ?? []).map((s) => {
      const datum = s.datum
        ? format(new Date(s.datum), 'yyyy.MM.dd')
        : 'kein Datum'
      const geplant = s.geplant ? ' (geplant)' : ''
      const text = `${datum}: ${s?.herkunft.gemeinde ?? '(keine Gemeinde)'}, ${
        s?.herkunft.nr ?? '(keine Nr.)'
      }${geplant}`

      return {
        url: ['Arten', artId, 'Sammlungen', s.id],
        text,
      }
    }),
  sammlungsWithoutAnzahlPflanzen: () =>
    (data?.sammlungsWithoutAnzahlPflanzen ?? []).map((s) => {
      const datum = s.datum
        ? format(new Date(s.datum), 'yyyy.MM.dd')
        : 'kein Datum'
      const geplant = s.geplant ? ' (geplant)' : ''
      const text = `${datum}: ${s?.herkunft.gemeinde ?? '(keine Gemeinde)'}, ${
        s?.herkunft.nr ?? '(keine Nr.)'
      }${geplant}`

      return {
        url: ['Arten', artId, 'Sammlungen', s.id],
        text,
      }
    }),
  sammlungsWithoutVonAnzahlIdividuen: () =>
    (data?.sammlungsWithoutVonAnzahlIdividuen ?? []).map((s) => {
      const datum = s.datum
        ? format(new Date(s.datum), 'yyyy.MM.dd')
        : 'kein Datum'
      const geplant = s.geplant ? ' (geplant)' : ''
      const text = `${datum}: ${s?.herkunft?.gemeinde ?? '(keine Gemeinde)'}, ${
        s?.herkunft?.nr ?? '(keine Nr.)'
      }${geplant}`

      return {
        url: ['Arten', artId, 'Sammlungen', s.id],
        text,
      }
    }),
  kultursWithoutVonAnzahlIndividuen: () =>
    (data?.kultursWithoutVonAnzahlIndividuen ?? []).map((k) => {
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
    (data?.kultursWithoutGarten ?? []).map((k) => {
      const herkunft = k?.herkunft?.nr ?? '(Herkunft ohne Nr)'
      const text = `ID: ${k.id}, von: ${herkunft}`

      return {
        url: ['Arten', artId, 'Kulturen', k.id],
        text,
      }
    }),
  kultursWithoutHerkunft: () =>
    (data?.kultursWithoutHerkunft ?? []).map((k) => {
      const garten =
        k?.garten?.name ?? `(${k?.garten?.person?.name ?? 'kein Name'})`
      const text = `ID: ${k.id}, in: ${garten}`

      return {
        url: ['Arten', artId, 'Kulturen', k.id],
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
        url: ['Arten', artId, 'Kulturen', k.id],
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
          url: ['Arten', artId, 'Kulturen', k.id, 'Teilkulturen', tk.id],
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
          url: ['Arten', artId, 'Kulturen', k.id, 'Zaehlungen', z.id],
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
          url: ['Arten', artId, 'Kulturen', k.id, 'Zaehlungen', z.id],
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
          url: ['Arten', artId, 'Kulturen', k.id, 'Zaehlungen', z.id],
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
})
