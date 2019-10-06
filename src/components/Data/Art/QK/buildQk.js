import get from 'lodash/get'
import format from 'date-fns/format'

export default ({ data, artId }) => [
  {
    title: 'Kulturen ohne "von Anzahl Individuen"',
    messages: get(data, 'art[0].kultursWithoutVonAnzahlIndividuen').map(k => {
      const garten =
        get(k, 'garten.name') ||
        `(${get(k, 'garten.person.name') || 'kein Name'})`
      const herkunft = get(k, 'herkunft.nr') || '(Herkunft ohne Nr)'
      const text = `von: ${herkunft}, in: ${garten}`

      return {
        url: ['Arten', artId, 'Kulturen', k.id],
        text,
      }
    }),
  },
  {
    title: 'Kulturen ohne Garten',
    messages: get(data, 'art[0].kultursWithoutGarten').map(k => {
      const herkunft = get(k, 'herkunft.nr') || '(Herkunft ohne Nr)'
      const text = `ID: ${k.id}, von: ${herkunft}`

      return {
        url: ['Arten', artId, 'Kulturen', k.id],
        text,
      }
    }),
  },
  {
    title: 'Kulturen ohne Herkunft',
    messages: get(data, 'art[0].kultursWithoutHerkunft').map(k => {
      const garten =
        get(k, 'garten.name') ||
        `(${get(k, 'garten.person.name') || 'kein Name'})`
      const text = `ID: ${k.id}, in: ${garten}`

      return {
        url: ['Arten', artId, 'Kulturen', k.id],
        text,
      }
    }),
  },
  {
    title: 'Kulturen ohne Zählung im aktuellen Jahr',
    messages: get(data, 'art[0].kultursWithoutZaehlungThisYear').map(k => {
      const garten =
        get(k, 'garten.name') ||
        `(${get(k, 'garten.person.name') || 'kein Name'})`
      const herkunft = get(k, 'herkunft.nr') || '(Herkunft ohne Nr)'
      const text = `von: ${herkunft}, in: ${garten}`

      return {
        url: ['Arten', artId, 'Kulturen', k.id],
        text,
      }
    }),
  },
  {
    title: 'Teilkulturen ohne "Name"',
    messages: get(data, 'art[0].teilkultursWithoutName').flatMap(k =>
      (get(k, 'teilkulturs') || []).map(tk => {
        const garten =
          get(k, 'garten.name') ||
          `(${get(k, 'garten.person.name') || 'kein Name'})`
        const herkunft = get(k, 'herkunft.nr') || '(Herkunft ohne Nr)'
        const text = `von: ${herkunft}, in: ${garten}, Teilkultur-ID: ${tk.id}`

        return {
          url: ['Arten', artId, 'Kulturen', k.id, 'Teilkulturen', tk.id],
          text,
        }
      }),
    ),
  },
  {
    title: 'Zählungen ohne "Datum"',
    messages: get(data, 'art[0].zaehlungsWithoutDatum').flatMap(k =>
      (get(k, 'zaehlungs') || []).map(z => {
        const garten =
          get(k, 'garten.name') ||
          `(${get(k, 'garten.person.name') || 'kein Name'})`
        const herkunft = get(k, 'herkunft.nr') || '(Herkunft ohne Nr)'
        const text = `von: ${herkunft}, in: ${garten}, Zählung-ID: ${z.id}`

        return {
          url: ['Arten', artId, 'Kulturen', k.id, 'Zaehlungen', z.id],
          text,
        }
      }),
    ),
  },
  {
    title: '(Teil-)Zählungen ohne "Anzahl Pflanzen"',
    messages: get(data, 'art[0].zaehlungsWithoutAnzahlPflanzen').flatMap(k =>
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
          url: ['Arten', artId, 'Kulturen', k.id, 'Zaehlungen', z.id],
          text,
        }
      }),
    ),
  },
  {
    title: '(Teil-)Zählungen ohne "Anzahl auspflanz-bereit"',
    messages: get(data, 'art[0].zaehlungsWithoutAnzahlAuspflanzbereit').flatMap(
      k =>
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
            url: ['Arten', artId, 'Kulturen', k.id, 'Zaehlungen', z.id],
            text,
          }
        }),
    ),
  },
  {
    title: '(Teil-)Zählungen ohne "Anzahl Mutterpflanzen"',
    messages: get(data, 'art[0].zaehlungsWithoutAnzahlMutterpflanzen').flatMap(
      k =>
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
            url: ['Arten', artId, 'Kulturen', k.id, 'Zaehlungen', z.id],
            text,
          }
        }),
    ),
  },
  {
    title: 'Events ohne "Beschreibung"',
    messages: get(data, 'art[0].eventsWithoutBeschreibung').flatMap(k =>
      (get(k, 'events') || []).map(ev => {
        const garten =
          get(k, 'garten.name') ||
          `(${get(k, 'garten.person.name') || 'kein Name'})`
        const herkunft = get(k, 'herkunft.nr') || '(Herkunft ohne Nr)'
        const text = `von: ${herkunft}, in: ${garten}, Event-ID: ${ev.id}`

        return {
          url: ['Arten', artId, 'Kulturen', k.id, 'Events', ev.id],
          text,
        }
      }),
    ),
  },
  {
    title: 'Events ohne "Datum"',
    messages: get(data, 'art[0].eventsWithoutDatum').flatMap(k =>
      (get(k, 'events') || []).map(ev => {
        const garten =
          get(k, 'garten.name') ||
          `(${get(k, 'garten.person.name') || 'kein Name'})`
        const herkunft = get(k, 'herkunft.nr') || '(Herkunft ohne Nr)'
        const text = `von: ${herkunft}, in: ${garten}, Event-ID: ${ev.id}`

        return {
          url: ['Arten', artId, 'Kulturen', k.id, 'Events', ev.id],
          text,
        }
      }),
    ),
  },
]
