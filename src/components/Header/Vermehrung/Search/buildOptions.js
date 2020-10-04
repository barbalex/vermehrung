import Fuse from 'fuse.js'
import { DateTime } from 'luxon'

import treeLabelSammlung from '../../../../utils/treeLabelSammlung'
import personLabelFromPerson from '../../../../utils/personLabelFromPerson'
import lieferungLabelFromLieferung from '../../../../utils/lieferungLabelFromLieferung'
import artLabelFromLieferung from '../../../../utils/artLabelFromLieferung'
import eventLabelFromEvent from '../../../../utils/eventLabelFromEvent'
import artLabelFromEvent from '../../../../utils/artLabelFromEvent'
import treeLabelKultur from '../../../../utils/treeLabelKultur'
import herkunftLabelFromHerkunft from '../../../../utils/herkunftLabelFromHerkunft'
import gartenLabelFromGarten from '../../../../utils/gartenLabelFromGarten'
import artLabelFromArt from '../../../../utils/artLabelFromArt'

const threshold = 0.2
const distance = 1000 // ensure text in long labels is found

const formatDateForSearch = (datum) =>
  datum ? DateTime.fromSQL(datum).toFormat('yyyy.LL.dd') : ''

export default ({ store, cb, val }) => {
  const {
    artsFiltered,
    eventsFiltered,
    gartens,
    gartensFiltered,
    herkunfts,
    herkunftsFiltered,
    kulturs,
    kultursFiltered,
    lieferungsFiltered,
    persons,
    personsFiltered,
    sammlungs,
    sammlungsFiltered,
    zaehlungsFiltered,
  } = store

  const options = []
  const searchArtSuggestions = artsFiltered.map((a) => ({
    value: a.id,
    label: artLabelFromArt({ art: a, store }),
    type: 'Arten',
  }))
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
  const searchGartenSuggestions = gartensFiltered.map((g) => {
    const person = g.person_id ? persons.get(g.person_id) : {}

    return {
      value: g.id,
      label: gartenLabelFromGarten({ garten: g, store }),
      name: g.name,
      personname: person?.fullname,
      strasse: g.strasse,
      plz: g.plz,
      ort: g.ort,
      bemerkungen: g.bemerkungen,
      aktiv: g.aktiv ? 'aktiv' : 'historisch',
      type: 'Gaerten',
    }
  })
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
  const searchHerkunftSuggestions = herkunftsFiltered.map((h) => ({
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
  const searchKulturSuggestions = kultursFiltered.map((k) => {
    const garten = k.garten_id ? gartens.get(k.garten_id) : {}
    const gartenPerson = garten.person_id ? persons.get(garten.person_id) : {}
    const herkunft = k.herkunft_id ? herkunfts.get(k.herkunft_id) : {}

    return {
      value: k.id,
      label: treeLabelKultur({ kultur: k, store }),
      personname: gartenPerson?.fullname,
      herkunftlokalname: herkunft?.lokalname,
      herkunftgemeinde: herkunft?.gemeinde,
      bemerkungen: k.bemerkungen,
      type: 'Kulturen',
    }
  })
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
  const searchEventSuggestions = eventsFiltered.map((e) => {
    const kultur = e.kultur_id ? kulturs.get(e.kultur_id) : {}
    const garten = kultur.garten_id ? gartens.get(kultur.garten_id) : {}
    const gartenPerson = garten.person_id ? persons.get(garten.person_id) : {}

    return {
      value: e.id,
      label: eventLabelFromEvent({ event: e }),
      artname: artLabelFromEvent({ event: e, store }),
      gartenname: garten?.name,
      personname: gartenPerson?.fullname,
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
  const searchLieferungSuggestions = lieferungsFiltered.map((l) => {
    const person = l.person_id ? persons.get(l.person_id) : {}
    const sammlung = l.sammlung_id ? sammlungs.get(l.sammlung_id) : {}
    const sammlungPerson = sammlung.person_id
      ? persons.get(sammlung.person_id)
      : {}
    const sammlungHerkunft = sammlung.herkunft_id
      ? herkunfts.get(sammlung.herkunft_id)
      : {}
    const vonKultur = l.von_kultur_id ? kulturs.get(l.von_kultur_id) : {}
    const vonKulturGarten = vonKultur.garten_id
      ? gartens.get(vonKultur.garten_id)
      : {}
    const vonKulturGartenPerson = vonKulturGarten.person_id
      ? persons.get(vonKulturGarten.person_id)
      : {}
    const nachKultur = l.nach_kultur_id ? kulturs.get(l.nach_kultur_id) : {}
    const nachKulturGarten = nachKultur.garten_id
      ? gartens.get(nachKultur.garten_id)
      : {}
    const nachKulturGartenPerson = nachKulturGarten.person_id
      ? persons.get(nachKulturGarten.person_id)
      : {}

    return {
      value: l.id,
      label: lieferungLabelFromLieferung({ lieferung: l, store }),
      artname: artLabelFromLieferung({ lieferung: l, store }),
      personname: person?.fullname,
      sammlungNr: sammlung?.nr,
      sammlungDatum: formatDateForSearch(sammlung?.datum),
      sammlungPerson: sammlungPerson?.fullname,
      sammlungHerkunftNr: sammlungHerkunft?.nr,
      sammlungHerkunftLokalname: sammlungHerkunft?.lokalname,
      sammlungHerkunftGemeinde: sammlungHerkunft?.gemeinde,
      vonKulturPersonName: vonKulturGartenPerson?.fullname,
      nachKulturPersonName: nachKulturGartenPerson?.fullname,
      ausgepflanzt: l.nach_ausgepflanzt ? 'ausgepflanzt' : '',
      geplant: l.geplant ? 'geplant' : 'ausgeführt',
      bemerkungen: l.bemerkungen,
      type: 'Lieferungen',
    }
  })
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
  const searchPersonSuggestions = personsFiltered.map((p) => ({
    value: p.id,
    label: personLabelFromPerson({ person: p, store }),
    nr: p.nr,
    adresszusatz: p.adresszusatz,
    strasse: p.strasse,
    plz: p.plz,
    telefon_privat: p.telefon_privat,
    telefon_geschaeft: p.telefon_geschaeft,
    telefon_mobile: p.telefon_mobile,
    email: p.email,
    bemerkungen: p.bemerkungen,
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
  const searchSammlungSuggestions = sammlungsFiltered.map((s) => {
    const herkunft = s.herkunft_id ? herkunfts.get(s.herkunft_id) : {}

    return {
      value: s.id,
      label: treeLabelSammlung({ sammlung: s, store }),
      herkunftlokalname: herkunft?.lokalname,
      herkunftgemeinde: herkunft?.gemeinde,
      nr: s.nr,
      bemerkungen: s.bemerkungen,
      datum: formatDateForSearch(s.datum),
      geplant: s.geplant ? 'geplant' : 'ausgeführt',
      type: 'Sammlungen',
    }
  })
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
  const searchZaehlungSuggestions = zaehlungsFiltered.map((z) => ({
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
