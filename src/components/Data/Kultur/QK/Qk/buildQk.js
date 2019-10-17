import get from 'lodash/get'
import format from 'date-fns/format'

export default ({ data, kulturId }) => [
  {
    title: 'Kulturen ohne "von Anzahl Individuen"',
    messages: get(data, 'kultursWithoutVonAnzahlIndividuen').map(k => {
      const garten =
        get(k, 'garten.name') ||
        `(${get(k, 'garten.person.name') || 'kein Name'})`
      const herkunft = get(k, 'herkunft.nr') || '(Herkunft ohne Nr)'
      const text = `von: ${herkunft}, in: ${garten}`

      return {
        url: ['Kulturen', kulturId],
        text,
      }
    }),
  },
  {
    title: 'Kulturen ohne Garten',
    messages: get(data, 'kultursWithoutGarten').map(k => {
      const herkunft = get(k, 'herkunft.nr') || '(Herkunft ohne Nr)'
      const text = `ID: ${k.id}, von: ${herkunft}`

      return {
        url: ['Kulturen', kulturId],
        text,
      }
    }),
  },
  {
    title: 'Kulturen ohne Herkunft',
    messages: get(data, 'kultursWithoutHerkunft').map(k => {
      const garten =
        get(k, 'garten.name') ||
        `(${get(k, 'garten.person.name') || 'kein Name'})`
      const text = `ID: ${k.id}, in: ${garten}`

      return {
        url: ['Kulturen', kulturId],
        text,
      }
    }),
  },
  {
    title: 'Kulturen ohne Zählung im aktuellen Jahr',
    messages: get(data, 'kultursWithoutZaehlungThisYear').map(k => {
      const garten =
        get(k, 'garten.name') ||
        `(${get(k, 'garten.person.name') || 'kein Name'})`
      const herkunft = get(k, 'herkunft.nr') || '(Herkunft ohne Nr)'
      const text = `von: ${herkunft}, in: ${garten}`

      return {
        url: ['Kulturen', kulturId],
        text,
      }
    }),
  },
  {
    title: 'Teilkulturen ohne "Name"',
    messages: get(data, 'teilkultursWithoutName').flatMap(k =>
      (get(k, 'teilkulturs') || []).map(tk => {
        const garten =
          get(k, 'garten.name') ||
          `(${get(k, 'garten.person.name') || 'kein Name'})`
        const herkunft = get(k, 'herkunft.nr') || '(Herkunft ohne Nr)'
        const text = `von: ${herkunft}, in: ${garten}, Teilkultur-ID: ${tk.id}`

        return {
          url: ['Kulturen', kulturId, 'Teilkulturen', tk.id],
          text,
        }
      }),
    ),
  },
  {
    title: 'Zählungen ohne "Datum"',
    messages: get(data, 'zaehlungsWithoutDatum').flatMap(k =>
      (get(k, 'zaehlungs') || []).map(z => {
        const garten =
          get(k, 'garten.name') ||
          `(${get(k, 'garten.person.name') || 'kein Name'})`
        const herkunft = get(k, 'herkunft.nr') || '(Herkunft ohne Nr)'
        const text = `von: ${herkunft}, in: ${garten}, Zählung-ID: ${z.id}`

        return {
          url: ['Kulturen', kulturId, 'Zaehlungen', z.id],
          text,
        }
      }),
    ),
  },
  {
    title: '(Teil-)Zählungen ohne "Anzahl Pflanzen"',
    messages: get(data, 'zaehlungsWithoutAnzahlPflanzen').flatMap(k =>
      (get(k, 'zaehlungs') || []).map(z => {
        const garten =
          get(k, 'garten.name') ||
          `(${get(k, 'garten.person.name') || 'kein Name'})`
        const herkunft = get(k, 'herkunft.nr') || '(Herkunft ohne Nr)'
        const zaehlung = z.datum
          ? `Zählung vom ${format(new Date(z.datum), 'yyyy.MM.dd')}`
          : `Zählung-ID: ${z.id}`
        const anzTz = (get(z, 'teilzaehlungs') || []).length
        const teilzaehlung = anzTz > 1 ? ` (${anzTz} Teilzählungen)` : ''
        const text = `von: ${herkunft}, in: ${garten}, ${zaehlung}${teilzaehlung}`

        return {
          url: ['Kulturen', kulturId, 'Zaehlungen', z.id],
          text,
        }
      }),
    ),
  },
  {
    title: '(Teil-)Zählungen ohne "Anzahl auspflanz-bereit"',
    messages: get(data, 'zaehlungsWithoutAnzahlAuspflanzbereit').flatMap(k =>
      (get(k, 'zaehlungs') || []).map(z => {
        const garten =
          get(k, 'garten.name') ||
          `(${get(k, 'garten.person.name') || 'kein Name'})`
        const herkunft = get(k, 'herkunft.nr') || '(Herkunft ohne Nr)'
        const zaehlung = z.datum
          ? `Zählung vom ${format(new Date(z.datum), 'yyyy.MM.dd')}`
          : `Zählung-ID: ${z.id}`
        const anzTz = (get(z, 'teilzaehlungs') || []).length
        const teilzaehlung = anzTz > 1 ? ` (${anzTz} Teilzählungen)` : ''
        const text = `von: ${herkunft}, in: ${garten}, ${zaehlung}${teilzaehlung}`

        return {
          url: ['Kulturen', kulturId, 'Zaehlungen', z.id],
          text,
        }
      }),
    ),
  },
  {
    title: '(Teil-)Zählungen ohne "Anzahl Mutterpflanzen"',
    messages: get(data, 'zaehlungsWithoutAnzahlMutterpflanzen').flatMap(k =>
      (get(k, 'zaehlungs') || []).map(z => {
        const garten =
          get(k, 'garten.name') ||
          `(${get(k, 'garten.person.name') || 'kein Name'})`
        const herkunft = get(k, 'herkunft.nr') || '(Herkunft ohne Nr)'
        const zaehlung = z.datum
          ? `Zählung vom ${format(new Date(z.datum), 'yyyy.MM.dd')}`
          : `Zählung-ID: ${z.id}`
        const anzTz = (get(z, 'teilzaehlungs') || []).length
        const teilzaehlung = anzTz > 1 ? ` (${anzTz} Teilzählungen)` : ''
        const text = `von: ${herkunft}, in: ${garten}, ${zaehlung}${teilzaehlung}`

        return {
          url: ['Kulturen', kulturId, 'Zaehlungen', z.id],
          text,
        }
      }),
    ),
  },
  {
    title: 'An-Lieferungen ohne "Anzahl Pflanzen"',
    messages: get(data, 'anLieferungsWithoutAnzahlPflanzen').map(l => {
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
  },
  {
    title: 'Aus-Lieferungen ohne "Anzahl Pflanzen"',
    messages: get(data, 'ausLieferungsWithoutAnzahlPflanzen').map(l => {
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
  },
  {
    title: 'An-Lieferungen ohne "Anzahl auspflanz-bereit"',
    messages: get(data, 'anLieferungsWithoutAnzahlAuspflanzbereit').map(l => {
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
  },
  {
    title: 'Aus-Lieferungen ohne "Anzahl auspflanz-bereit"',
    messages: get(data, 'ausLieferungsWithoutAnzahlAuspflanzbereit').map(l => {
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
  },
  {
    title: 'An-Lieferungen ohne "von Anzahl Individuen"',
    messages: get(data, 'anLieferungsWithoutVonAnzahlIndividuen').map(l => {
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
  },
  {
    title: 'Aus-Lieferungen ohne "von Anzahl Individuen"',
    messages: get(data, 'ausLieferungsWithoutVonAnzahlIndividuen').map(l => {
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
  },
  {
    title: 'An-Lieferungen ohne "von" (Sammlung oder Kultur)',
    messages: get(data, 'anLieferungsWithoutVon').map(l => {
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
  },
  {
    title: 'Aus-Lieferungen ohne "nach" ("Kultur" oder "ausgepflanzt")',
    messages: get(data, 'ausLieferungsWithoutNach').map(l => {
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
  },
  {
    title: 'An-Lieferungen ohne "Datum"',
    messages: get(data, 'anLieferungsWithoutDatum').map(l => {
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
  },
  {
    title: 'Aus-Lieferungen ohne "Datum"',
    messages: get(data, 'ausLieferungsWithoutDatum').map(l => {
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
  },
  {
    title: 'An-Lieferungen ohne Person',
    messages: get(data, 'anLieferungsWithoutPerson').map(l => {
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
  },
  {
    title: 'Aus-Lieferungen ohne Person',
    messages: get(data, 'ausLieferungsWithoutPerson').map(l => {
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
  },
  {
    title: 'Events ohne "Beschreibung"',
    messages: get(data, 'eventsWithoutBeschreibung').flatMap(k =>
      (get(k, 'events') || []).map(ev => {
        const garten =
          get(k, 'garten.name') ||
          `(${get(k, 'garten.person.name') || 'kein Name'})`
        const herkunft = get(k, 'herkunft.nr') || '(Herkunft ohne Nr)'
        const text = `von: ${herkunft}, in: ${garten}, Event-ID: ${ev.id}`

        return {
          url: ['Kulturen', kulturId, 'Events', ev.id],
          text,
        }
      }),
    ),
  },
  {
    title: 'Events ohne "Datum"',
    messages: get(data, 'eventsWithoutDatum').flatMap(k =>
      (get(k, 'events') || []).map(ev => {
        const garten =
          get(k, 'garten.name') ||
          `(${get(k, 'garten.person.name') || 'kein Name'})`
        const herkunft = get(k, 'herkunft.nr') || '(Herkunft ohne Nr)'
        const text = `von: ${herkunft}, in: ${garten}, Event-ID: ${ev.id}`

        return {
          url: ['Kulturen', kulturId, 'Events', ev.id],
          text,
        }
      }),
    ),
  },
]
