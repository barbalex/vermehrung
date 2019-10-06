import get from 'lodash/get'

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
    messages: get(data, 'art[0].kultursWithoutZaehlungInYear').map(k => {
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
    title: 'Teil-Kulturen ohne Name',
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
]
