import sortBy from 'lodash/sortBy'
import { first as first$ } from 'rxjs/operators'

import buildArtFolder from './art/folder'
import buildArt from './art'
import buildHerkunftFolder from './herkunft/folder'
import buildHerkunft from './herkunft'
import buildGartenFolder from './garten/folder'
import buildGarten from './garten'
import buildKulturFolder from './kultur/folder'
import buildKultur from './kultur'
import buildTeilkulturFolder from './teilkultur/folder'
import buildTeilkultur from './teilkultur'
import buildSammlungFolder from './sammlung/folder'
import buildSammlung from './sammlung'
import buildZaehlungFolder from './zaehlung/folder'
import buildZaehlung from './zaehlung'
import buildLieferungFolder from './lieferung/folder'
import buildLieferung from './lieferung'
import buildEventFolder from './event/folder'
import buildEvent from './event'
import buildPersonFolder from './person/folder'
import buildPerson from './person'
import buildSammelLieferungFolder from './sammelLieferung/folder'
import buildSammelLieferung from './sammelLieferung'
import notDeletedOrHasConflictQuery from '../../../utils/notDeletedOrHasConflictQuery'
import storeFilter from '../../../utils/storeFilter'
import queryFromFilter from '../../../utils/queryFromFilter'
import herkunftSort from '../../../utils/herkunftSort'
import teilkulturSort from '../../../utils/teilkulturSort'
import zaehlungSort from '../../../utils/zaehlungSort'
import lieferungSort from '../../../utils/lieferungSort'
import eventSort from '../../../utils/eventSort'
import personSort from '../../../utils/personSort'
import personFullname from '../../../utils/personFullname'
import aeArtLabelFromAeArt from '../../../utils/artLabelFromAeArt'

const compare = (a, b) => {
  // sort a before, if it has no value at this index
  if (a !== 0 && !a) return -1
  // sort a after if b has no value at this index
  if (b !== 0 && !b) return 1
  // sort a before if its value is smaller
  return a - b
}

const buildNodes = async ({ store }) => {
  const { db } = store

  // art
  const artFolder = buildArtFolder({ store })
  const artFilterQuery = queryFromFilter({
    table: 'art',
    filter: store.filter.art.toJSON(),
  })
  const arts = await db.collections
    .get('art')
    .query(...artFilterQuery)
    .fetch()
  const artSorters = await Promise.all(
    arts.map(async (art) => {
      const label = await art.label.pipe(first$()).toPromise()
      return { id: art.id, label }
    }),
  )
  const artsSorted = sortBy(
    arts,
    (art) => artSorters.find((s) => s.id === art.id).label,
  )
  const art = await buildArt({ store, arts: artsSorted })

  // herkunft
  const herkunftFolder = buildHerkunftFolder({ store })
  const herkunfts = await db.collections
    .get('herkunft')
    .query(notDeletedOrHasConflictQuery)
    .fetch()
  const herkunftsSorted = herkunfts
    .filter((value) =>
      storeFilter({ value, filter: store.filter.herkunft, table: 'herkunft' }),
    )
    .sort(herkunftSort)
  const herkunft = buildHerkunft({ store, herkunfts: herkunftsSorted })

  // sammlung
  const sammlungFolder = buildSammlungFolder({ store })
  const sammlungFilterQuery = queryFromFilter({
    table: 'sammlung',
    filter: store.filter.sammlung.toJSON(),
  })
  const sammlungs = await db.collections
    .get('sammlung')
    .query(...sammlungFilterQuery)
    .fetch()
  const sammlungSorters = await Promise.all(
    sammlungs.map(async (sammlung) => {
      const datum = sammlung.datum ?? ''
      const herkunft = await sammlung.herkunft.fetch()
      const herkunftNr = herkunft?.nr?.toString()?.toLowerCase()
      const herkunftGemeinde = herkunft?.gemeinde?.toString()?.toLowerCase()
      const herkunftLokalname = herkunft?.lokalname?.toString()?.toLowerCase()
      const person = await sammlung.person.fetch()
      const fullname = personFullname(person)?.toString()?.toLowerCase()
      const art = await sammlung.art.fetch()
      const artLabel = art
        ? await art.label.pipe(first$()).toPromise()
        : undefined
      const aeArtLabelLowerCase = artLabel?.toString()?.toLowerCase()
      const sort = [
        datum,
        herkunftNr,
        herkunftGemeinde,
        herkunftLokalname,
        fullname,
        aeArtLabelLowerCase,
      ]

      return { id: sammlung.id, sort }
    }),
  )
  const sammlungsSorted = sortBy(
    sammlungs,
    (sammlung) => sammlungSorters.find((s) => s.id === sammlung.id).sort,
  )
  const sammlung = await buildSammlung({ store, sammlungs: sammlungsSorted })

  // garten
  const gartenFolder = buildGartenFolder({ store })
  const gartenFilterQuery = queryFromFilter({
    table: 'garten',
    filter: store.filter.garten.toJSON(),
  })
  const gartens = await db.collections
    .get('garten')
    .query(...gartenFilterQuery)
    .fetch()
  const gartenSorters = await Promise.all(
    gartens.map(async (garten) => {
      const name = garten?.name?.toString()?.toLowerCase()
      const person = await garten?.person.fetch()
      const personName = personFullname(person)?.toString()?.toLowerCase()
      const sort = [name, personName]

      return { id: garten.id, sort }
    }),
  )
  const gartensSorted = sortBy(
    gartens,
    (garten) => gartenSorters.find((s) => s.id === garten.id).sort,
  )
  const garten = await buildGarten({ store, gartens: gartensSorted })

  // kultur
  const kulturFolder = buildKulturFolder({ store })
  const kulturFilterQuery = queryFromFilter({
    table: 'kultur',
    filter: store.filter.kultur.toJSON(),
  })
  const kulturs = await db.collections
    .get('kultur')
    .query(...kulturFilterQuery)
    .fetch()
  const kulturSorters = await Promise.all(
    kulturs.map(async (kultur) => {
      const art = await kultur.art.fetch()
      const ae_art = art ? await art.ae_art.fetch() : undefined
      const aeArtLabel = aeArtLabelFromAeArt({ ae_art })
        ?.toString()
        ?.toLowerCase()
      const herkunft = await kultur.herkunft.fetch()
      const herkunftNr = herkunft?.nr?.toString()?.toLowerCase()
      const herkunftGemeinde = herkunft?.gemeinde?.toString()?.toLowerCase()
      const herkunftLokalname = herkunft?.lokalname?.toString()?.toLowerCase()
      const garten = await kultur.garten.fetch()
      const gartenName = garten?.name?.toString()?.toLowerCase()
      const gartenPerson = garten ? await garten.person.fetch() : undefined
      const gartenPersonFullname = personFullname(gartenPerson)
        ?.toString()
        ?.toLowerCase()
      const sort = [
        aeArtLabel,
        herkunftNr,
        herkunftGemeinde,
        herkunftLokalname,
        gartenName,
        gartenPersonFullname,
      ]
      return { id: kultur.id, sort }
    }),
  )
  const kultursSorted = sortBy(
    kulturs,
    (kultur) => kulturSorters.find((s) => s.id === kultur.id).sort,
  )
  const kultur = await buildKultur({ store, kulturs: kultursSorted })

  // teilkultur
  const teilkulturFolder = buildTeilkulturFolder({ store })
  const teilkulturFilterQuery = queryFromFilter({
    table: 'teilkultur',
    filter: store.filter.teilkultur.toJSON(),
  })
  const teilkulturs = await db.collections
    .get('teilkultur')
    .query(...teilkulturFilterQuery)
    .fetch()
  const teilkultur = buildTeilkultur({
    store,
    teilkulturs: teilkulturs.sort((a, b) => teilkulturSort({ a, b })),
  })

  // zaehlung
  const zaehlungFolder = buildZaehlungFolder({ store })
  const zaehlungFilterQuery = queryFromFilter({
    table: 'zaehlung',
    filter: store.filter.zaehlung.toJSON(),
  })
  const zaehlungs = await db.collections
    .get('zaehlung')
    .query(...zaehlungFilterQuery)
    .fetch()
  const zaehlung = buildZaehlung({
    store,
    zaehlungs: zaehlungs.sort((a, b) => zaehlungSort({ a, b })),
  })

  // lieferung
  const lieferungFolder = buildLieferungFolder({ store })
  const lieferungFilterQuery = queryFromFilter({
    table: 'lieferung',
    filter: store.filter.lieferung.toJSON(),
  })
  const lieferungs = await db.collections
    .get('lieferung')
    .query(...lieferungFilterQuery)
    .fetch()
  const lieferung = buildLieferung({
    store,
    lieferungs: lieferungs.sort((a, b) => lieferungSort({ a, b })),
  })

  // sammelLieferung
  const sammelLieferungFolder = buildSammelLieferungFolder({ store })
  const sammelLieferungFilterQuery = queryFromFilter({
    table: 'sammel_lieferung',
    filter: store.filter.sammel_lieferung.toJSON(),
  })
  const sammelLieferungs = await db.collections
    .get('sammel_lieferung')
    .query(...sammelLieferungFilterQuery)
    .fetch()
  const sammelLieferung = buildSammelLieferung({
    store,
    sammelLieferungs: sammelLieferungs.sort((a, b) => lieferungSort({ a, b })),
  })

  // event
  const eventFolder = buildEventFolder({ store })
  const eventFilterQuery = queryFromFilter({
    table: 'event',
    filter: store.filter.event.toJSON(),
  })
  const events = await db.collections
    .get('event')
    .query(...eventFilterQuery)
    .fetch()
  const event = buildEvent({
    store,
    events: events.sort((a, b) => eventSort({ a, b })),
  })

  // person
  const personFolder = buildPersonFolder({ store })
  const personFilterQuery = queryFromFilter({
    table: 'person',
    filter: store.filter.person.toJSON(),
  })
  const persons = await db.collections
    .get('person')
    .query(...personFilterQuery)
    .fetch()
  const personsSorted = persons.sort((a, b) => personSort({ a, b }))
  const person = buildPerson({
    store,
    persons: personsSorted,
  })

  /*console.log('buildNodesWm', {
    nodes,
    herkunft,
    art,
    artFolder,
  })*/
  const nodes = [
    ...artFolder,
    ...art,
    ...herkunftFolder,
    ...herkunft,
    ...sammlungFolder,
    ...sammlung,
    ...gartenFolder,
    ...garten,
    ...kulturFolder,
    ...kultur,
    ...teilkulturFolder,
    ...teilkultur,
    ...zaehlungFolder,
    ...zaehlung,
    ...lieferungFolder,
    ...lieferung,
    ...eventFolder,
    ...event,
    ...personFolder,
    ...person,
    ...sammelLieferungFolder,
    ...sammelLieferung,
  ]

  const nodesSorted = nodes.sort(
    (a, b) =>
      compare(a.sort[0], b.sort[0]) ||
      compare(a.sort[1], b.sort[1]) ||
      compare(a.sort[2], b.sort[2]) ||
      compare(a.sort[3], b.sort[3]) ||
      compare(a.sort[4], b.sort[4]) ||
      compare(a.sort[5], b.sort[5]) ||
      compare(a.sort[6], b.sort[6]) ||
      compare(a.sort[7], b.sort[7]) ||
      compare(a.sort[8], b.sort[8]) ||
      compare(a.sort[9], b.sort[9]) ||
      compare(a.sort[10], b.sort[10]),
  )
  return nodesSorted
}

export default buildNodes
