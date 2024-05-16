import Fuse from 'fuse.js'
import { DateTime } from 'luxon'
import { first as first$ } from 'rxjs/operators'

import personLabelFromPerson from '../../../../utils/personLabelFromPerson.js'
import lieferungLabelFromLieferung from '../../../../utils/lieferungLabelFromLieferung'
import tableFilter from '../../../../utils/tableFilter'
import gartensSortedFromGartens from '../../../../utils/gartensSortedFromGartens.js'
import kultursSortedFromKulturs from '../../../../utils/kultursSortedFromKulturs'
import sammlungsSortedFromSammlungs from '../../../../utils/sammlungsSortedFromSammlungs'
import artsSortedFromArts from '../../../../utils/artsSortedFromArts.js'
import personFullname from '../../../../utils/personFullname'
import eventSort from '../../../../utils/eventSort'
import herkunftSort from '../../../../utils/herkunftSort.js'
import lieferungSort from '../../../../utils/lieferungSort'
import personSort from '../../../../utils/personSort'
import zaehlungSort from '../../../../utils/zaehlungSort'
import herkunftLabelFromHerkunft from '../../../../utils/herkunftLabelFromHerkunft.js'

const threshold = 0.2
const distance = 1000 // ensure text in long labels is found

const formatDateForSearch = (datum) =>
  datum ? DateTime.fromSQL(datum).toFormat('yyyy.LL.dd') : ''

const buildOptions = async ({ store, cb, val }) => {
  const { db } = store

  let arts = []
  try {
    arts = await db
      .get('art')
      .query(...tableFilter({ store, table: 'art' }))
      .fetch()
  } catch {}
  const artsSorted = await artsSortedFromArts(arts)

  let events = []
  try {
    events = await db
      .get('event')
      .query(...tableFilter({ store, table: 'event' }))
      .fetch()
  } catch {}
  const eventsSorted = events.sort(eventSort)

  let gartens = []
  try {
    gartens = await db
      .get('garten')
      .query(...tableFilter({ store, table: 'garten' }))
      .fetch()
  } catch {}
  const gartensSorted = await gartensSortedFromGartens(gartens)

  let herkunfts = []
  try {
    herkunfts = await db
      .get('herkunft')
      .query(...tableFilter({ store, table: 'herkunft' }))
      .fetch()
  } catch {}
  const herkunftsSorted = herkunfts.sort(herkunftSort)

  let kulturs = []
  try {
    kulturs = await db
      .get('kultur')
      .query(...tableFilter({ store, table: 'kultur' }))
      .fetch()
  } catch {}
  const kultursSorted = await kultursSortedFromKulturs(kulturs)

  let lieferungs = []
  try {
    lieferungs = await db
      .get('lieferung')
      .query(...tableFilter({ store, table: 'lieferung' }))
      .fetch()
  } catch {}
  const lieferungsSorted = lieferungs.sort(lieferungSort)

  let persons = []
  try {
    persons = await db
      .get('person')
      .query(...tableFilter({ store, table: 'person' }))
      .fetch()
  } catch {}
  const personsSorted = persons.sort(personSort)

  let sammlungs = []
  try {
    sammlungs = await db
      .get('sammlung')
      .query(...tableFilter({ store, table: 'sammlung' }))
      .fetch()
  } catch {}
  const sammlungsSorted = await sammlungsSortedFromSammlungs(sammlungs)

  let zaehlungs = []
  try {
    zaehlungs = await db
      .get('zaehlung')
      .query(...tableFilter({ store, table: 'zaehlung' }))
      .fetch()
  } catch {}
  const zaehlungsSorted = zaehlungs.sort(zaehlungSort)

  const options = []
  const searchArtSuggestions = await Promise.all(
    artsSorted.map(async (a) => {
      let label = ''
      try {
        label = await a.label.pipe(first$()).toPromise()
      } catch {}

      return {
        value: a.id,
        label,
        type: 'Arten',
      }
    }),
  )
  const artSuggestionsFuse = new Fuse(searchArtSuggestions, {
    keys: [{ name: 'label', weight: 1 }],
    threshold,
    distance,
  })
  const artSuggestions = artSuggestionsFuse.search(val).map((o) => o.item)
  if (artSuggestions.length) {
    options.push({
      label: `Arten (${artSuggestions.length})`,
      options: artSuggestions,
    })
  }
  const searchGartenSuggestions = await Promise.all(
    gartensSorted.map(async (g) => {
      let label
      try {
        label = await g.label.pipe(first$()).toPromise()
      } catch {}
      let person
      try {
        person = await g.person.fetch()
      } catch {}

      return {
        value: g.id,
        label,
        name: g.name ?? '',
        personname: personFullname(person) ?? '',
        strasse: g.strasse ?? '',
        plz: g.plz,
        ort: g.ort ?? '',
        bemerkungen: g.bemerkungen ?? '',
        aktiv: g.aktiv ? 'aktiv' : 'historisch',
        type: 'Gaerten',
      }
    }),
  )
  const gartenSuggestionsFuse = new Fuse(searchGartenSuggestions, {
    keys: [
      { name: 'name', weight: 1 },
      { name: 'personname', weight: 0.7 },
      { name: 'strasse', weight: 0.5 },
      { name: 'plz', weight: 0.5 },
      { name: 'ort', weight: 0.5 },
      { name: 'aktiv', weight: 0.5 },
      { name: 'bemerkungen', weight: 0.5 },
    ],
    threshold,
    distance,
  })
  const gartenSuggestions = gartenSuggestionsFuse.search(val).map((o) => o.item)
  if (gartenSuggestions.length) {
    options.push({
      label: `Gärten (${gartenSuggestions.length})`,
      options: gartenSuggestions,
    })
  }
  const searchHerkunftSuggestions = herkunftsSorted.map((h) => ({
    value: h.id,
    label: herkunftLabelFromHerkunft({ herkunft: h }),
    ...h,
    type: 'Herkuenfte',
  }))
  const herkunftSuggestionsFuse = new Fuse(searchHerkunftSuggestions, {
    keys: [
      { name: 'nr', weight: 1 },
      { name: 'lokalname', weight: 1 },
      { name: 'gemeinde', weight: 0.7 },
      { name: 'kanton', weight: 0.5 },
      { name: 'land', weight: 0.5 },
      { name: 'bemerkungen', weight: 0.5 },
    ],
    threshold,
    distance,
  })
  const herkunftSuggestions = herkunftSuggestionsFuse
    .search(val)
    .map((o) => o.item)
  if (herkunftSuggestions.length) {
    options.push({
      label: `Herkünfte (${herkunftSuggestions.length})`,
      options: herkunftSuggestions,
    })
  }
  const searchKulturSuggestions = await Promise.all(
    kultursSorted.map(async (k) => {
      let label
      try {
        label = await k.label.pipe(first$()).toPromise()
      } catch {}
      let garten
      try {
        garten = await k.garten.fetch()
      } catch {}
      let gartenPerson
      try {
        gartenPerson = await garten.person.fetch()
      } catch {}
      let herkunft
      try {
        herkunft = await k.herkunft.fetch()
      } catch {}

      return {
        value: k.id,
        label,
        personname: personFullname(gartenPerson) ?? '',
        herkunftlokalname: herkunft?.lokalname ?? '',
        herkunftgemeinde: herkunft?.gemeinde ?? '',
        bemerkungen: k.bemerkungen ?? '',
        type: 'Kulturen',
      }
    }),
  )
  const kulturSuggestionsFuse = new Fuse(searchKulturSuggestions, {
    keys: [
      { name: 'label', weight: 1 },
      { name: 'personname', weight: 0.7 },
      { name: 'herkunftlokalname', weight: 0.7 },
      { name: 'herkunftgemeinde', weight: 0.7 },
      { name: 'bemerkungen', weight: 0.5 },
    ],
    threshold,
    distance,
  })
  const kulturSuggestions = kulturSuggestionsFuse.search(val).map((o) => o.item)
  if (kulturSuggestions.length) {
    options.push({
      label: `Kulturen (${kulturSuggestions.length})`,
      options: kulturSuggestions,
    })
  }
  const searchEventSuggestions = eventsSorted.map(async (e) => {
    let label
    try {
      label = await e.label.pipe(first$()).toPromise()
    } catch {}
    let kultur
    try {
      kultur = await e.kultur?.fetch()
    } catch {}
    let art
    try {
      art = await kultur?.art?.fetch()
    } catch {}
    let artname = ''
    try {
      artname = await art?.label?.pipe(first$()).toPromise()
    } catch {}
    let garten
    try {
      garten = await kultur?.garten?.fetch()
    } catch {}
    let gartenPerson
    try {
      gartenPerson = await garten?.person?.fetch()
    } catch {}

    return {
      value: e.id,
      label,
      artname,
      gartenname: garten?.name ?? '',
      personname: personFullname(gartenPerson) ?? '',
      geplant: e.geplant ? 'geplant' : 'ausgeführt',
      parent: e.kultur_id,
      type: 'Events',
    }
  })
  const eventSuggestionsFuse = new Fuse(searchEventSuggestions, {
    keys: [
      { name: 'artname', weight: 0.7 },
      { name: 'gartenname', weight: 0.7 },
      { name: 'personname', weight: 0.7 },
      { name: 'label', weight: 1 },
      { name: 'geplant', weight: 1 },
    ],
    threshold,
    distance,
  })
  const eventSuggestions = eventSuggestionsFuse.search(val).map((o) => o.item)
  if (eventSuggestions.length) {
    options.push({
      label: `Events (${eventSuggestions.length})`,
      options: eventSuggestions,
    })
  }
  const searchLieferungSuggestions = await Promise.all(
    lieferungsSorted.map(async (l) => {
      let person
      try {
        person = await l?.person?.fetch()
      } catch {}
      let sammlung
      try {
        sammlung = await l?.sammlung?.fetch()
      } catch {}
      let sammlungPerson
      try {
        sammlungPerson = await sammlung?.person?.fetch()
      } catch {}
      let sammlungHerkunft
      try {
        sammlungHerkunft = await sammlung?.herkunft?.fetch()
      } catch {}
      const vonKultur = kulturs.find((k) => k.id === l.von_kultur_id)
      let vonKulturGarten
      try {
        vonKulturGarten = await vonKultur?.garten?.fetch()
      } catch {}
      let vonKulturGartenPerson
      try {
        vonKulturGartenPerson = await vonKulturGarten?.person?.fetch()
      } catch {}
      const nachKultur = kulturs.find((k) => k.id === l.nach_kultur_id)
      let nachKulturGarten
      try {
        nachKulturGarten = await nachKultur?.garten?.fetch()
      } catch {}
      let nachKulturGartenPerson
      try {
        nachKulturGartenPerson = await nachKulturGarten?.person?.fetch()
      } catch {}
      let art
      try {
        art = await l?.art?.fetch()
      } catch {}
      let artname
      try {
        artname = (await art?.label?.pipe(first$()).toPromise()) ?? ''
      } catch {}

      return {
        value: l.id,
        label: lieferungLabelFromLieferung({ lieferung: l }),
        artname,
        personname: personFullname(person) ?? '',
        sammlungNr: sammlung?.nr ?? '',
        sammlungDatum: formatDateForSearch(sammlung?.datum),
        sammlungPerson: personFullname(sammlungPerson) ?? '',
        sammlungHerkunftNr: sammlungHerkunft?.nr ?? '',
        sammlungHerkunftLokalname: sammlungHerkunft?.lokalname ?? '',
        sammlungHerkunftGemeinde: sammlungHerkunft?.gemeinde ?? '',
        vonKulturPersonName: personFullname(vonKulturGartenPerson) ?? '',
        nachKulturPersonName: personFullname(nachKulturGartenPerson) ?? '',
        ausgepflanzt: l.nach_ausgepflanzt ? 'ausgepflanzt' : '',
        geplant: l.geplant ? 'geplant' : 'ausgeführt',
        bemerkungen: l.bemerkungen,
        type: 'Lieferungen',
      }
    }),
  )
  const lieferungSuggestionsFuse = new Fuse(searchLieferungSuggestions, {
    keys: [
      { name: 'artname', weight: 1 },
      { name: 'personname', weight: 1 },
      { name: 'label', weight: 1 },
      { name: 'sammlungNr', weight: 1 },
      { name: 'sammlungDatum', weight: 0.7 },
      { name: 'sammlungPerson', weight: 0.7 },
      { name: 'sammlungHerkunftNr', weight: 0.7 },
      { name: 'sammlungHerkunftLokalname', weight: 0.7 },
      { name: 'sammlungHerkunftGemeinde', weight: 0.7 },
      { name: 'vonKulturPersonName', weight: 0.7 },
      { name: 'nachKulturPersonName', weight: 0.7 },
      { name: 'ausgepflanzt', weight: 1 },
      { name: 'geplant', weight: 1 },
      { name: 'bemerkungen', weight: 0.5 },
    ],
    threshold,
    distance,
  })
  const lieferungSuggestions = lieferungSuggestionsFuse
    .search(val)
    .map((o) => o.item)
  if (lieferungSuggestions.length) {
    options.push({
      label: `Lieferungen (${lieferungSuggestions.length})`,
      options: lieferungSuggestions,
    })
  }
  const searchPersonSuggestions = personsSorted.map((p) => ({
    value: p.id,
    label: personLabelFromPerson({ person: p }),
    nr: p.nr,
    adresszusatz: p.adresszusatz ?? '',
    strasse: p.strasse ?? '',
    plz: p.plz,
    telefon_privat: p.telefon_privat ?? '',
    telefon_geschaeft: p.telefon_geschaeft ?? '',
    telefon_mobile: p.telefon_mobile ?? '',
    email: p.email ?? '',
    bemerkungen: p.bemerkungen ?? '',
    type: 'Personen',
  }))
  const personSuggestionsFuse = new Fuse(searchPersonSuggestions, {
    keys: [
      { name: 'nr', weight: 1 },
      { name: 'label', weight: 1 },
      { name: 'adresszusatz', weight: 0.5 },
      { name: 'strasse', weight: 0.5 },
      { name: 'plz', weight: 0.5 },
      { name: 'telefon_privat', weight: 0.5 },
      { name: 'telefon_geschaeft', weight: 0.5 },
      { name: 'telefon_mobile', weight: 0.5 },
      { name: 'email', weight: 0.5 },
      { name: 'bemerkungen', weight: 0.5 },
    ],
    threshold,
    distance,
  })
  const personSuggestions = personSuggestionsFuse.search(val).map((o) => o.item)
  if (personSuggestions.length) {
    options.push({
      label: `Personen (${personSuggestions.length})`,
      options: personSuggestions,
    })
  }
  const searchSammlungSuggestions = await Promise.all(
    sammlungsSorted.map(async (s) => {
      let label
      try {
        label = await s.label.pipe(first$()).toPromise()
      } catch {}
      let herkunft
      try {
        herkunft = await s.herkunft.fetch()
      } catch {}

      return {
        value: s.id,
        label,
        herkunftlokalname: herkunft?.lokalname ?? '',
        herkunftgemeinde: herkunft?.gemeinde ?? '',
        nr: s.nr,
        bemerkungen: s.bemerkungen ?? '',
        datum: formatDateForSearch(s.datum),
        geplant: s.geplant ? 'geplant' : 'ausgeführt',
        type: 'Sammlungen',
      }
    }),
  )
  const sammlungSuggestionsFuse = new Fuse(searchSammlungSuggestions, {
    keys: [
      { name: 'label', weight: 1 },
      { name: 'herkunftlokalname', weight: 0.7 },
      { name: 'herkunftgemeinde', weight: 0.7 },
      { name: 'nr', weight: 1 },
      { name: 'datum', weight: 1 },
      { name: 'bemerkungen', weight: 0.5 },
      { name: 'geplant', weight: 1 },
    ],
    threshold,
    distance,
  })
  const sammlungSuggestions = sammlungSuggestionsFuse
    .search(val)
    .map((o) => o.item)
  if (sammlungSuggestions.length) {
    options.push({
      label: `Sammlungen (${sammlungSuggestions.length})`,
      options: sammlungSuggestions,
    })
  }
  const searchZaehlungSuggestions = zaehlungsSorted.map((z) => ({
    value: z.id,
    label: formatDateForSearch(z.datum),
    parent: z.kultur_id,
    type: 'Zaehlungen',
  }))
  const zaehlungSuggestionsFuse = new Fuse(searchZaehlungSuggestions, {
    keys: [{ name: 'label', weight: 1 }],
    threshold,
    distance,
  })
  const zaehlungSuggestions = zaehlungSuggestionsFuse
    .search(val)
    .map((o) => o.item)
  if (zaehlungSuggestions.length) {
    options.push({
      label: `Zählungen (${zaehlungSuggestions.length})`,
      options: zaehlungSuggestions,
    })
  }
  if (!options.length && val) {
    options.push({ val: 'none', label: '(keine Resultate)' })
  }
  cb(options)
}

export default buildOptions
