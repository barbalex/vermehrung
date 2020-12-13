import Fuse from 'fuse.js'
import { DateTime } from 'luxon'
import { first as first$ } from 'rxjs/operators'

import personLabelFromPerson from '../../../../utils/personLabelFromPerson'
import lieferungLabelFromLieferung from '../../../../utils/lieferungLabelFromLieferung'
import tableFilter from '../../../../utils/tableFilter'
import gartensSortedFromGartens from '../../../../utils/gartensSortedFromGartens'
import kultursSortedFromKulturs from '../../../../utils/kultursSortedFromKulturs'
import sammlungsSortedFromSammlungs from '../../../../utils/sammlungsSortedFromSammlungs'
import artsSortedFromArts from '../../../../utils/artsSortedFromArts'
import personFullname from '../../../../utils/personFullname'
import eventSort from '../../../../utils/eventSort'
import herkunftSort from '../../../../utils/herkunftSort'
import lieferungSort from '../../../../utils/lieferungSort'
import personSort from '../../../../utils/personSort'
import zaehlungSort from '../../../../utils/zaehlungSort'
import herkunftLabelFromHerkunft from '../../../../utils/herkunftLabelFromHerkunft'

const threshold = 0.2
const distance = 1000 // ensure text in long labels is found

const formatDateForSearch = (datum) =>
  datum ? DateTime.fromSQL(datum).toFormat('yyyy.LL.dd') : ''

const buildOptions = async ({ store, cb, val }) => {
  const { db } = store

  const arts = await db.collections
    .get('art')
    .query(...tableFilter({ store, table: 'art' }))
    .fetch()
  const artsSorted = await artsSortedFromArts(arts)
  const events = await db.collections
    .get('event')
    .query(...tableFilter({ store, table: 'event' }))
    .fetch()
  const eventsSorted = events.sort((a, b) => eventSort({ a, b }))
  const gartens = await db.collections
    .get('garten')
    .query(...tableFilter({ store, table: 'garten' }))
    .fetch()
  const gartensSorted = await gartensSortedFromGartens(gartens)
  const herkunfts = await db.collections
    .get('herkunft')
    .query(...tableFilter({ store, table: 'herkunft' }))
    .fetch()
  const herkunftsSorted = herkunfts.sort((a, b) => herkunftSort({ a, b }))
  const kulturs = await db.collections
    .get('kultur')
    .query(...tableFilter({ store, table: 'kultur' }))
    .fetch()
  const kultursSorted = await kultursSortedFromKulturs(kulturs)
  const lieferungs = await db.collections
    .get('lieferung')
    .query(...tableFilter({ store, table: 'lieferung' }))
    .fetch()
  const lieferungsSorted = lieferungs.sort((a, b) => lieferungSort({ a, b }))
  const persons = await db.collections
    .get('person')
    .query(...tableFilter({ store, table: 'person' }))
    .fetch()
  const personsSorted = persons.sort((a, b) => personSort({ a, b }))
  const sammlungs = await db.collections
    .get('sammlung')
    .query(...tableFilter({ store, table: 'sammlung' }))
    .fetch()
  const sammlungsSorted = await sammlungsSortedFromSammlungs(sammlungs)

  const zaehlungs = await db.collections
    .get('zaehlung')
    .query(...tableFilter({ store, table: 'zaehlung' }))
    .fetch()
  const zaehlungsSorted = zaehlungs.sort((a, b) => zaehlungSort({ a, b }))

  const options = []
  const searchArtSuggestions = await Promise.all(
    artsSorted.map(async (a) => {
      const label = await a.label.pipe(first$()).toPromise()

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
      const label = await g.label.pipe(first$()).toPromise()
      const person = await g.person.fetch()

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
      const label = await k.label.pipe(first$()).toPromise()
      const garten = await k.garten.fetch()
      const gartenPerson = garten ? await garten.person.fetch() : undefined
      const herkunft = await k.herkunft.fetch()

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
    const label = await e.label.pipe(first$()).toPromise()
    const kultur = await e.kultur?.fetch()
    const art = await kultur?.art?.fetch()
    const artname = (await art?.label?.pipe(first$()).toPromise()) ?? ''
    const garten = await kultur?.garten?.fetch()
    const gartenPerson = await garten?.person?.fetch()

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
      const person = await l?.person?.fetch()
      const sammlung = await l?.sammlung?.fetch()
      const sammlungPerson = await sammlung?.person?.fetch()
      const sammlungHerkunft = await sammlung?.herkunft?.fetch()
      const vonKultur = l.von_kultur_id
        ? kulturs.find((k) => k.id === l.von_kultur_id)
        : undefined
      const vonKulturGarten = await vonKultur?.garten?.fetch()
      const vonKulturGartenPerson = await vonKulturGarten?.person?.fetch()
      const nachKultur = l.nach_kultur_id
        ? kulturs.find((k) => k.id === l.nach_kultur_id)
        : undefined
      const nachKulturGarten = await nachKultur?.garten?.fetch()
      const nachKulturGartenPerson = await nachKulturGarten?.person?.fetch()
      const art = await l?.art?.fetch()
      const artname = (await art?.label?.pipe(first$()).toPromise()) ?? ''

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
      const label = await s.label.pipe(first$()).toPromise()
      const herkunft = await s.herkunft.fetch()

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
