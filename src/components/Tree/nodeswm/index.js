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
  const arts = await db.collections
    .get('art')
    .query(notDeletedOrHasConflictQuery)
    .fetch()
  const artsFiltered = arts.filter((value) =>
    storeFilter({ value, filter: store.filter.art, table: 'art' }),
  )
  const artSorters = await Promise.all(
    artsFiltered.map(async (art) => {
      const label = await art.label.pipe(first$()).toPromise()
      return { id: art.id, label }
    }),
  )
  const artsSorted = sortBy(
    artsFiltered,
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
  const sammlungs = await db.collections
    .get('sammlung')
    .query(notDeletedOrHasConflictQuery)
    .fetch()
  const sammlungsFiltered = sammlungs.filter((value) =>
    storeFilter({ value, filter: store.filter.sammlung, table: 'sammlung' }),
  )
  const sammlungSorters = await Promise.all(
    sammlungsFiltered.map(async (sammlung) => {
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
    sammlungsFiltered,
    (sammlung) => sammlungSorters.find((s) => s.id === sammlung.id).sort,
  )
  const sammlung = await buildSammlung({ store, sammlungs: sammlungsSorted })

  // garten
  const gartenFolder = buildGartenFolder({ store })
  const gartens = await db.collections
    .get('garten')
    .query(notDeletedOrHasConflictQuery)
    .fetch()
  const gartensFiltered = gartens.filter((value) =>
    storeFilter({ value, filter: store.filter.garten, table: 'garten' }),
  )
  const gartenSorters = await Promise.all(
    gartensFiltered.map(async (garten) => {
      const name = garten?.name?.toString()?.toLowerCase()
      const person = await garten?.person.fetch()
      const personName = personFullname(person)?.toString()?.toLowerCase()
      const sort = [name, personName]

      return { id: garten.id, sort }
    }),
  )
  const gartensSorted = sortBy(
    gartensFiltered,
    (garten) => gartenSorters.find((s) => s.id === garten.id).sort,
  )
  const garten = await buildGarten({ store, gartens: gartensSorted })

  // kultur
  const kulturFolder = buildKulturFolder({ store })
  const kulturs = await db.collections
    .get('kultur')
    .query(notDeletedOrHasConflictQuery)
    .fetch()
  const kultursFiltered = kulturs.filter((value) =>
    storeFilter({ value, filter: store.filter.kultur, table: 'kultur' }),
  )
  const kulturSorters = await Promise.all(
    kultursFiltered.map(async (kultur) => {
      const art = await kultur?.art.fetch()
      const ae_art = art?.ae_art?.fetch()
      const artLabel = aeArtLabelFromAeArt({ ae_art })

      const herkunft = await kultur?.herkunft?.fetch()
      const herkunftNr = herkunft?.nr?.toString()?.toLowerCase()
      const herkunftGemeinde = herkunft?.gemeinde?.toString()?.toLowerCase()
      const herkunftLokalname = herkunft?.lokalname?.toString()?.toLowerCase()

      const garten = await kultur?.garten.fetch()
      const gartenName = garten?.name?.toString()?.toLowerCase()

      const gartenPerson = garten ? await garten?.person.fetch() : undefined
      const gartenPersonLabel = await gartenPerson?.fullname
        ?.pipe(first$())
        .toPromise()

      const zwiLa = kultur.zwischenlager

      const sort = [
        artLabel,
        herkunftNr,
        herkunftGemeinde,
        herkunftLokalname,
        gartenName,
        gartenPersonLabel,
        zwiLa,
      ]

      return { id: kultur.id, sort }
    }),
  )
  const kultursSorted = sortBy(
    kultursFiltered,
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
  const lieferungs = await db.collections
    .get('lieferung')
    .query(notDeletedOrHasConflictQuery)
    .fetch()
  const lieferungsSorted = lieferungs
    .filter((value) =>
      storeFilter({
        value,
        filter: store.filter.lieferung,
        table: 'lieferung',
      }),
    )
    .sort(lieferungSort)
  const lieferung = buildLieferung({
    store,
    lieferungs: lieferungsSorted,
  })

  // sammelLieferung
  const sammelLieferungFolder = buildSammelLieferungFolder({ store })
  const sammelLieferungs = await db.collections
    .get('sammel_lieferung')
    .query(notDeletedOrHasConflictQuery)
    .fetch()
  const sammelLieferungsSorted = sammelLieferungs
    .filter((value) =>
      storeFilter({
        value,
        filter: store.filter.sammel_lieferung,
        table: 'sammel_lieferung',
      }),
    )
    .sort(lieferungSort)
  const sammelLieferung = buildSammelLieferung({
    store,
    sammelLieferungs: sammelLieferungsSorted,
  })

  // event
  const eventFolder = buildEventFolder({ store })
  const events = await db.collections
    .get('event')
    .query(notDeletedOrHasConflictQuery)
    .fetch()
  const eventsSorted = events
    .filter((value) =>
      storeFilter({
        value,
        filter: store.filter.event,
        table: 'event',
      }),
    )
    .sort((a, b) => eventSort({ a, b }))
  const event = buildEvent({
    store,
    events: eventsSorted,
  })

  // person
  const personFolder = buildPersonFolder({ store })
  const persons = await db.collections
    .get('person')
    .query(notDeletedOrHasConflictQuery)
    .fetch()
  const personsSorted = persons
    .filter((value) =>
      storeFilter({
        value,
        filter: store.filter.person,
        table: 'person',
      }),
    )
    .sort((a, b) => personSort({ a, b }))
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
