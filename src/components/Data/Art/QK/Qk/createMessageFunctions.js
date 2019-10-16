import get from 'lodash/get'
import format from 'date-fns/format'

export default ({ data, artId }) => ({
  sammlungsWithoutNr: () =>
    get(data, 'sammlungsWithoutNr').map(s => {
      const datum = s.datum
        ? format(new Date(s.datum), 'yyyy.MM.dd')
        : 'kein Datum'
      const geplant = s.geplant ? ' (geplant)' : ''
      const text = `${datum}: ${get(s, 'herkunft.gemeinde') ||
        '(keine Gemeinde)'}, ${get(s, 'herkunft.nr') ||
        '(keine Nr.)'}${geplant}`

      return {
        url: ['Arten', artId, 'Sammlungen', s.id],
        text,
      }
    }),
  sammlungsWithoutHerkunft: () =>
    get(data, 'sammlungsWithoutHerkunft').map(s => {
      const datum = s.datum
        ? format(new Date(s.datum), 'yyyy.MM.dd')
        : 'kein Datum'
      const geplant = s.geplant ? ' (geplant)' : ''
      const text = `${datum}: ${get(s, 'herkunft.gemeinde') ||
        '(keine Gemeinde)'}, ${get(s, 'herkunft.nr') ||
        '(keine Nr.)'}${geplant}`

      return {
        url: ['Arten', artId, 'Sammlungen', s.id],
        text,
      }
    }),
  sammlungsWithoutPerson: () =>
    get(data, 'sammlungsWithoutPerson').map(s => {
      const datum = s.datum
        ? format(new Date(s.datum), 'yyyy.MM.dd')
        : 'kein Datum'
      const geplant = s.geplant ? ' (geplant)' : ''
      const text = `${datum}: ${get(s, 'herkunft.gemeinde') ||
        '(keine Gemeinde)'}, ${get(s, 'herkunft.nr') ||
        '(keine Nr.)'}${geplant}`

      return {
        url: ['Arten', artId, 'Sammlungen', s.id],
        text,
      }
    }),
  sammlungsWithoutDatum: () =>
    get(data, 'sammlungsWithoutDatum').map(s => {
      const datum = s.datum
        ? format(new Date(s.datum), 'yyyy.MM.dd')
        : 'kein Datum'
      const geplant = s.geplant ? ' (geplant)' : ''
      const text = `${datum}: ${get(s, 'herkunft.gemeinde') ||
        '(keine Gemeinde)'}, ${get(s, 'herkunft.nr') ||
        '(keine Nr.)'}${geplant}`

      return {
        url: ['Arten', artId, 'Sammlungen', s.id],
        text,
      }
    }),
  sammlungsWithoutAnzahlPflanzen: () =>
    get(data, 'sammlungsWithoutAnzahlPflanzen').map(s => {
      const datum = s.datum
        ? format(new Date(s.datum), 'yyyy.MM.dd')
        : 'kein Datum'
      const geplant = s.geplant ? ' (geplant)' : ''
      const text = `${datum}: ${get(s, 'herkunft.gemeinde') ||
        '(keine Gemeinde)'}, ${get(s, 'herkunft.nr') ||
        '(keine Nr.)'}${geplant}`

      return {
        url: ['Arten', artId, 'Sammlungen', s.id],
        text,
      }
    }),
  sammlungsWithoutVonAnzahlIdividuen: () =>
    get(data, 'sammlungsWithoutVonAnzahlIdividuen').map(s => {
      const datum = s.datum
        ? format(new Date(s.datum), 'yyyy.MM.dd')
        : 'kein Datum'
      const geplant = s.geplant ? ' (geplant)' : ''
      const text = `${datum}: ${get(s, 'herkunft.gemeinde') ||
        '(keine Gemeinde)'}, ${get(s, 'herkunft.nr') ||
        '(keine Nr.)'}${geplant}`

      return {
        url: ['Arten', artId, 'Sammlungen', s.id],
        text,
      }
    }),
  kultursWithoutVonAnzahlIndividuen: () =>
    get(data, 'kultursWithoutVonAnzahlIndividuen').map(k => {
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
  kultursWithoutGarten: () =>
    get(data, 'kultursWithoutGarten').map(k => {
      const herkunft = get(k, 'herkunft.nr') || '(Herkunft ohne Nr)'
      const text = `ID: ${k.id}, von: ${herkunft}`

      return {
        url: ['Arten', artId, 'Kulturen', k.id],
        text,
      }
    }),
  kultursWithoutHerkunft: () =>
    get(data, 'kultursWithoutHerkunft').map(k => {
      const garten =
        get(k, 'garten.name') ||
        `(${get(k, 'garten.person.name') || 'kein Name'})`
      const text = `ID: ${k.id}, in: ${garten}`

      return {
        url: ['Arten', artId, 'Kulturen', k.id],
        text,
      }
    }),
  kultursWithoutZaehlungThisYear: () =>
    get(data, 'kultursWithoutZaehlungThisYear').map(k => {
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
  teilkultursWithoutName: () =>
    get(data, 'teilkultursWithoutName').flatMap(k =>
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
  zaehlungsWithoutDatum: () =>
    get(data, 'zaehlungsWithoutDatum').flatMap(k =>
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
  zaehlungsWithoutAnzahlPflanzen: () =>
    get(data, 'zaehlungsWithoutAnzahlPflanzen').flatMap(k =>
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
  zaehlungsWithoutAnzahlAuspflanzbereit: () =>
    get(data, 'zaehlungsWithoutAnzahlAuspflanzbereit').flatMap(k =>
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
  zaehlungsWithoutAnzahlMutterpflanzen: () =>
    get(data, 'zaehlungsWithoutAnzahlMutterpflanzen').flatMap(k =>
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
  lieferungsWithoutAnzahlPflanzen: () =>
    get(data, 'lieferungsWithoutAnzahlPflanzen').map(l => {
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
    get(data, 'lieferungsWithoutAnzahlAuspflanzbereit').map(l => {
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
    get(data, 'lieferungsWithoutVonAnzahlIndividuen').map(l => {
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
    get(data, 'lieferungsWithoutVon').map(l => {
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
    get(data, 'lieferungsWithoutNach').map(l => {
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
    get(data, 'lieferungsWithoutDatum').map(l => {
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
    get(data, 'lieferungsWithoutPerson').map(l => {
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
    get(data, 'eventsWithoutBeschreibung').flatMap(k =>
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
  eventsWithoutDatum: () =>
    get(data, 'eventsWithoutDatum').flatMap(k =>
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
})
