import { getSnapshot } from 'mobx-state-tree'

import buildArtSammlungFolder from './art/sammlung/folder'
import buildArtSammlung from './art/sammlung'
import buildArtKulturFolder from './art/kultur/folder'
import buildArtKultur from './art/kultur'
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
import artsSortedFromArts from '../../../utils/artsSortedFromArts'
import kultursSortedFromKulturs from '../../../utils/kultursSortedFromKulturs'
import gartensSortedFromGartens from '../../../utils/gartensSortedFromGartens'
import sammlungsSortedFromSammlungs from '../../../utils/sammlungsSortedFromSammlungs'

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
  const { activeNodeArray, openNodes: openNodesRaw, showArt } = store.tree
  const openNodes = getSnapshot(openNodesRaw)
  console.log('buildNodes', {
    activeNodeArray: activeNodeArray.slice(),
    openNodes,
  })

  let artFolder = []
  let art = []
  let artKulturFolder = []
  let artKultur = []
  let artSammlung = []
  let artSammlungFolder = []
  const herkunftFolder = buildHerkunftFolder({ store })
  let herkunft = []
  const sammlungFolder = buildSammlungFolder({ store })
  let sammlung = []
  const gartenFolder = buildGartenFolder({ store })
  let garten = []
  const kulturFolder = buildKulturFolder({ store })
  let kultur = []
  const teilkulturFolder = buildTeilkulturFolder({ store })
  let teilkultur = []
  const zaehlungFolder = buildZaehlungFolder({ store })
  let zaehlung = []
  const lieferungFolder = buildLieferungFolder({ store })
  let lieferung = []
  const eventFolder = buildEventFolder({ store })
  let event = []
  const personFolder = buildPersonFolder({ store })
  let person = []
  const sammelLieferungFolder = buildSammelLieferungFolder({ store })
  let sammelLieferung = []

  // art
  if (showArt) {
    artFolder = buildArtFolder({ store })
    const artFolderIsOpen = openNodes.some(
      (n) => n[0] === 'Arten' && n.length === 1,
    )
    if (artFolderIsOpen) {
      const artFilterQuery = queryFromFilter({
        table: 'art',
        filter: store.filter.art.toJSON(),
      })
      const arts = await db.collections
        .get('art')
        .query(...artFilterQuery)
        .fetch()
      const artsSorted = await artsSortedFromArts(arts)
      art = await buildArt({ store, arts: artsSorted })
      const openArtNodes = openNodes.filter(
        (n) => n[0] === 'Arten' && n.length === 2,
      )
      for (const artNode of openArtNodes) {
        const artId = artNode[1]
        const parentArt = artsSorted.find((a) => a.id === artId)
        const artIndex = art.findIndex((a) => a.id === artId)

        // art > kultur
        const kulturFilterQuery = queryFromFilter({
          table: 'kultur',
          filter: store.filter.kultur.toJSON(),
        })
        const kulturs = await parentArt.kulturs
          .extend(...kulturFilterQuery)
          .fetch()
        const kultursSorted = await kultursSortedFromKulturs(kulturs)
        artKulturFolder.push(
          buildArtKulturFolder({
            children: kultursSorted,
            artIndex,
            artId,
          }),
        )
        const artKulturFolderIsOpen = openNodes.some(
          (n) => n[0] === 'Arten' && n[1] === artId && n[2] === 'Kulturen',
        )
        if (artKulturFolderIsOpen) {
          const kulturNodes = await Promise.all(
            kultursSorted.map(
              async (kultur, kulturIndex) =>
                await buildArtKultur({ kultur, kulturIndex, artId, artIndex }),
            ),
          )
          artKultur.push(...kulturNodes)
        }

        // art > sammlung
        const sammlungFilterQuery = queryFromFilter({
          table: 'sammlung',
          filter: store.filter.sammlung.toJSON(),
        })
        const sammlungs = await parentArt.sammlungs
          .extend(...sammlungFilterQuery)
          .fetch()
        const sammlungsSorted = await sammlungsSortedFromSammlungs(sammlungs)
        artSammlungFolder.push(
          buildArtSammlungFolder({
            children: sammlungsSorted,
            artIndex,
            artId,
          }),
        )
        const artSammlungFolderIsOpen = !!openNodes.find(
          (n) => n.length === 3 && n[1] === artId && n[2] === 'Sammlungen',
        )
        if (artSammlungFolderIsOpen) {
          const sammlungNodes = await Promise.all(
            sammlungsSorted.map(
              async (sammlung, sammlungIndex) =>
                await buildArtSammlung({
                  sammlung,
                  sammlungIndex,
                  artId,
                  artIndex,
                }),
            ),
          )
          artSammlung.push(...sammlungNodes)
        }
      }
    }
  }

  // herkunft
  if (openNodes.some((n) => n[0] === 'Herkuenfte')) {
    const herkunfts = await db.collections
      .get('herkunft')
      .query(notDeletedOrHasConflictQuery)
      .fetch()
    const herkunftsSorted = herkunfts
      .filter((value) =>
        storeFilter({
          value,
          filter: store.filter.herkunft,
          table: 'herkunft',
        }),
      )
      .sort(herkunftSort)
    herkunft = buildHerkunft({ store, herkunfts: herkunftsSorted })
  }

  // sammlung
  if (openNodes.some((n) => n[0] === 'Sammlungen')) {
    const sammlungFilterQuery = queryFromFilter({
      table: 'sammlung',
      filter: store.filter.sammlung.toJSON(),
    })
    const sammlungs = await db.collections
      .get('sammlung')
      .query(...sammlungFilterQuery)
      .fetch()
    const sammlungsSorted = await sammlungsSortedFromSammlungs(sammlungs)
    sammlung = await buildSammlung({ store, sammlungs: sammlungsSorted })
  }

  // garten
  if (openNodes.some((n) => n[0] === 'Gaerten')) {
    const gartenFilterQuery = queryFromFilter({
      table: 'garten',
      filter: store.filter.garten.toJSON(),
    })
    const gartens = await db.collections
      .get('garten')
      .query(...gartenFilterQuery)
      .fetch()
    const gartensSorted = await gartensSortedFromGartens(gartens)
    garten = await buildGarten({ store, gartens: gartensSorted })
  }

  // kultur
  if (openNodes.some((n) => n[0] === 'Kulturen')) {
    const kulturFilterQuery = queryFromFilter({
      table: 'kultur',
      filter: store.filter.kultur.toJSON(),
    })
    const kulturs = await db.collections
      .get('kultur')
      .query(...kulturFilterQuery)
      .fetch()
    const kultursSorted = await kultursSortedFromKulturs(kulturs)
    kultur = await buildKultur({ store, kulturs: kultursSorted })
  }

  // teilkultur
  if (openNodes.some((n) => n[0] === 'Teilkulturen')) {
    const teilkulturFilterQuery = queryFromFilter({
      table: 'teilkultur',
      filter: store.filter.teilkultur.toJSON(),
    })
    const teilkulturs = await db.collections
      .get('teilkultur')
      .query(...teilkulturFilterQuery)
      .fetch()
    teilkultur = buildTeilkultur({
      store,
      teilkulturs: teilkulturs.sort((a, b) => teilkulturSort({ a, b })),
    })
  }

  // zaehlung
  if (openNodes.some((n) => n[0] === 'Zaehlungen')) {
    const zaehlungFilterQuery = queryFromFilter({
      table: 'zaehlung',
      filter: store.filter.zaehlung.toJSON(),
    })
    const zaehlungs = await db.collections
      .get('zaehlung')
      .query(...zaehlungFilterQuery)
      .fetch()
    zaehlung = buildZaehlung({
      store,
      zaehlungs: zaehlungs.sort((a, b) => zaehlungSort({ a, b })),
    })
  }

  // lieferung
  if (openNodes.some((n) => n[0] === 'Lieferungen')) {
    const lieferungFilterQuery = queryFromFilter({
      table: 'lieferung',
      filter: store.filter.lieferung.toJSON(),
    })
    const lieferungs = await db.collections
      .get('lieferung')
      .query(...lieferungFilterQuery)
      .fetch()
    lieferung = buildLieferung({
      store,
      lieferungs: lieferungs.sort((a, b) => lieferungSort({ a, b })),
    })
  }

  // sammelLieferung
  if (openNodes.some((n) => n[0] === 'Sammel-Lieferungen')) {
    const sammelLieferungFilterQuery = queryFromFilter({
      table: 'sammel_lieferung',
      filter: store.filter.sammel_lieferung.toJSON(),
    })
    const sammelLieferungs = await db.collections
      .get('sammel_lieferung')
      .query(...sammelLieferungFilterQuery)
      .fetch()
    sammelLieferung = buildSammelLieferung({
      store,
      sammelLieferungs: sammelLieferungs.sort((a, b) =>
        lieferungSort({ a, b }),
      ),
    })
  }

  // event
  if (openNodes.some((n) => n[0] === 'Events')) {
    const eventFilterQuery = queryFromFilter({
      table: 'event',
      filter: store.filter.event.toJSON(),
    })
    const events = await db.collections
      .get('event')
      .query(...eventFilterQuery)
      .fetch()
    event = buildEvent({
      store,
      events: events.sort((a, b) => eventSort({ a, b })),
    })
  }

  // person
  if (openNodes.some((n) => n[0] === 'Personen')) {
    const personFilterQuery = queryFromFilter({
      table: 'person',
      filter: store.filter.person.toJSON(),
    })
    const persons = await db.collections
      .get('person')
      .query(...personFilterQuery)
      .fetch()
    const personsSorted = persons.sort((a, b) => personSort({ a, b }))
    person = buildPerson({
      store,
      persons: personsSorted,
    })
  }

  /*console.log('buildNodesWm', {
    art,
    artFolder,
    artKulturFolder,
  })*/
  const nodes = [
    ...artFolder,
    ...art,
    ...artSammlungFolder,
    ...artSammlung,
    ...artKulturFolder,
    ...artKultur,
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
