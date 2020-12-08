import { getSnapshot } from 'mobx-state-tree'

import buildArtSammlungFolder from './art/sammlung/folder'
import buildArtSammlung from './art/sammlung'
import buildArtSammlungAuslieferungFolder from './art/sammlung/auslieferung/folder'
import buildArtSammlungAuslieferung from './art/sammlung/auslieferung'
import buildArtKulturFolder from './art/kultur/folder'
import buildArtKultur from './art/kultur'
import buildArtKulturTeilkulturFolder from './art/kultur/teilkultur/folder'
import buildArtKulturTeilkultur from './art/kultur/teilkultur'
import buildArtKulturZaehlungFolder from './art/kultur/zaehlung/folder'
import buildArtKulturZaehlung from './art/kultur/zaehlung'
import buildArtKulturAnlieferungFolder from './art/kultur/anlieferung/folder'
import buildArtKulturAnlieferung from './art/kultur/anlieferung'
import buildArtKulturAuslieferungFolder from './art/kultur/auslieferung/folder'
import buildArtKulturAuslieferung from './art/kultur/auslieferung'
import buildArtKulturEventFolder from './art/kultur/event/folder'
import buildArtKulturEvent from './art/kultur/event'
import buildArtFolder from './art/folder'
import buildArt from './art'
import buildHerkunftFolder from './herkunft/folder'
import buildHerkunft from './herkunft'
import buildHerkunftSammlungFolder from './herkunft/sammlung/folder'
import buildHerkunftSammlung from './herkunft/sammlung'
import buildHerkunftSammlungAuslieferungFolder from './herkunft/sammlung/auslieferung/folder'
import buildHerkunftSammlungAuslieferung from './herkunft/sammlung/auslieferung'
import buildGartenFolder from './garten/folder'
import buildGarten from './garten'
import buildGartenKulturFolder from './garten/kultur/folder'
import buildGartenKultur from './garten/kultur'
import buildGartenKulturTeilkulturFolder from './garten/kultur/teilkultur/folder'
import buildGartenKulturTeilkultur from './garten/kultur/teilkultur'
import buildGartenKulturZaehlungFolder from './garten/kultur/zaehlung/folder'
import buildGartenKulturZaehlung from './garten/kultur/zaehlung'
import buildGartenKulturAnlieferungFolder from './garten/kultur/anlieferung/folder'
import buildGartenKulturAnlieferung from './garten/kultur/anlieferung'
import buildGartenKulturAuslieferungFolder from './garten/kultur/auslieferung/folder'
import buildGartenKulturAuslieferung from './garten/kultur/auslieferung'
import buildGartenKulturEventFolder from './garten/kultur/event/folder'
import buildGartenKulturEvent from './garten/kultur/event'
import buildKulturFolder from './kultur/folder'
import buildKultur from './kultur'
import buildTeilkulturFolder from './teilkultur/folder'
import buildTeilkultur from './teilkultur'
import buildSammlungFolder from './sammlung/folder'
import buildSammlung from './sammlung'
import buildSammlungHerkunftFolder from './sammlung/herkunft/folder'
import buildSammlungHerkunft from './sammlung/herkunft'
import buildSammlungAuslieferungFolder from './sammlung/auslieferung/folder'
import buildSammlungAuslieferung from './sammlung/auslieferung'
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
  const {
    openNodes: openNodesRaw,
    showArt,
    showHerkunft,
    showSammlung,
    showGarten,
    showKultur,
    showTeilkultur,
    showZaehlung,
    showLieferung,
    showSammelLieferung,
    showEvent,
    showPerson,
  } = store.tree
  const openNodes = getSnapshot(openNodesRaw)
  /*console.log('buildNodes', {
    activeNodeArray: activeNodeArray.slice(),
    openNodes,
  })*/

  let artFolderNodes = []
  let artNodes = []
  let artKulturFolderNodes = []
  let artKulturNodes = []
  let artKulturTeilkulturFolderNodes = []
  let artKulturTeilkulturNodes = []
  let artKulturZaehlungFolderNodes = []
  let artKulturZaehlungNodes = []
  let artKulturAnlieferungFolderNodes = []
  let artKulturAnlieferungNodes = []
  let artKulturAuslieferungFolderNodes = []
  let artKulturAuslieferungNodes = []
  let artKulturEventFolderNodes = []
  let artKulturEventNodes = []
  let artSammlungFolderNodes = []
  let artSammlungNodes = []
  let artSammlungAuslieferungFolderNodes = []
  let artSammlungAuslieferungNodes = []
  let herkunftFolderNodes = []
  let herkunftNodes = []
  let herkunftSammlungFolderNodes = []
  let herkunftSammlungNodes = []
  let herkunftSammlungAuslieferungFolderNodes = []
  let herkunftSammlungAuslieferungNodes = []
  let sammlungFolderNodes = []
  let sammlungNodes = []
  let sammlungHerkunftFolderNodes = []
  let sammlungHerkunftNodes = []
  let sammlungAuslieferungFolderNodes = []
  let sammlungAuslieferungNodes = []
  let gartenFolderNodes = []
  let gartenNodes = []
  let gartenKulturFolderNodes = []
  let gartenKulturNodes = []
  let gartenKulturTeilkulturFolderNodes = []
  let gartenKulturTeilkulturNodes = []
  let gartenKulturZaehlungFolderNodes = []
  let gartenKulturZaehlungNodes = []
  let gartenKulturAnlieferungFolderNodes = []
  let gartenKulturAnlieferungNodes = []
  let gartenKulturAuslieferungFolderNodes = []
  let gartenKulturAuslieferungNodes = []
  let gartenKulturEventFolderNodes = []
  let gartenKulturEventNodes = []
  const kulturFolderNodes = buildKulturFolder({ store })
  let kulturNodes = []
  const teilkulturFolderNodes = buildTeilkulturFolder({ store })
  let teilkulturNodes = []
  const zaehlungFolderNodes = buildZaehlungFolder({ store })
  let zaehlungNodes = []
  const lieferungFolderNodes = buildLieferungFolder({ store })
  let lieferungNodes = []
  const eventFolderNodes = buildEventFolder({ store })
  let eventNodes = []
  const personFolderNodes = buildPersonFolder({ store })
  let personNodes = []
  const sammelLieferungFolderNodes = buildSammelLieferungFolder({ store })
  let sammelLieferungNodes = []

  // 1 art
  if (showArt) {
    artFolderNodes = buildArtFolder({ store })
    const artFolderIsOpen = openNodes.some(
      (n) => n.length === 1 && n[0] === 'Arten',
    )
    if (artFolderIsOpen) {
      // build art nodes
      const artFilterQuery = queryFromFilter({
        table: 'art',
        filter: store.filter.art.toJSON(),
      })
      const arts = await db.collections
        .get('art')
        .query(...artFilterQuery)
        .fetch()
      const artsSorted = await artsSortedFromArts(arts)
      artNodes = await buildArt({ store, arts: artsSorted })

      // on to child nodes
      const openArtNodes = openNodes.filter(
        (n) => n[0] === 'Arten' && n.length === 2,
      )
      for (const artNode of openArtNodes) {
        const artId = artNode[1]
        const art = artsSorted.find((a) => a.id === artId)
        const artIndex = artNodes.findIndex((a) => a.id === artId)

        // 1.1 art > sammlung
        const sammlungFilterQuery = queryFromFilter({
          table: 'sammlung',
          filter: store.filter.sammlung.toJSON(),
        })
        const sammlungs = await art.sammlungs
          .extend(...sammlungFilterQuery)
          .fetch()
        const sammlungsSorted = await sammlungsSortedFromSammlungs(sammlungs)
        artSammlungFolderNodes.push(
          buildArtSammlungFolder({
            children: sammlungsSorted,
            artIndex,
            artId,
          }),
        )
        const artSammlungFolderIsOpen = openNodes.some(
          (n) =>
            n.length === 3 &&
            n[0] === 'Arten' &&
            n[1] === artId &&
            n[2] === 'Sammlungen',
        )
        if (artSammlungFolderIsOpen) {
          const myArtSammlungNodes = await Promise.all(
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
          artSammlungNodes.push(...myArtSammlungNodes)
          const openArtSammlungNodes = openNodes.filter(
            (n) => n[0] === 'Arten' && n[2] === 'Sammlungen' && n.length === 4,
          )
          for (const artSammlungNode of openArtSammlungNodes) {
            const sammlungId = artSammlungNode[3]
            const sammlung = sammlungsSorted.find((s) => s.id === sammlungId)
            const sammlungIndex = myArtSammlungNodes.findIndex(
              (s) => s.id === `${artId}${sammlungId}`,
            )
            const lieferungFilterQuery = queryFromFilter({
              table: 'lieferung',
              filter: store.filter.lieferung.toJSON(),
            })
            const lieferungs = await sammlung.lieferungs
              .extend(...lieferungFilterQuery)
              .fetch()
            const artSammlungAuslieferungFolderNode = await buildArtSammlungAuslieferungFolder(
              {
                sammlungId,
                sammlungIndex,
                artId,
                artIndex,
                children: lieferungs,
              },
            )
            artSammlungAuslieferungFolderNodes.push(
              artSammlungAuslieferungFolderNode,
            )
            const artSammlungAuslieferungFolderIsOpen = openNodes.some(
              (n) =>
                n.length === 5 &&
                n[0] === 'Arten' &&
                n[1] === artId &&
                n[2] === 'Sammlungen' &&
                n[3] === sammlungId &&
                n[4] === 'Aus-Lieferungen',
            )
            if (artSammlungAuslieferungFolderIsOpen) {
              const lieferungsSorted = lieferungs.sort((a, b) =>
                lieferungSort({ a, b }),
              )
              const myArtSammlungAuslieferungNodes = lieferungsSorted.map(
                (lieferung, lieferungIndex) =>
                  buildArtSammlungAuslieferung({
                    lieferung,
                    lieferungIndex,
                    sammlungId,
                    sammlungIndex,
                    artId,
                    artIndex,
                  }),
              )
              artSammlungAuslieferungNodes.push(
                ...myArtSammlungAuslieferungNodes,
              )
            }
          }
        }

        // 1.2 art > kultur
        const kulturFilterQuery = queryFromFilter({
          table: 'kultur',
          filter: store.filter.kultur.toJSON(),
        })
        const kulturs = await art.kulturs.extend(...kulturFilterQuery).fetch()
        const kultursSorted = await kultursSortedFromKulturs(kulturs)
        artKulturFolderNodes.push(
          buildArtKulturFolder({
            children: kultursSorted,
            artIndex,
            artId,
          }),
        )
        const artKulturFolderIsOpen = openNodes.some(
          (n) =>
            n.length === 3 &&
            n[0] === 'Arten' &&
            n[1] === artId &&
            n[2] === 'Kulturen',
        )
        if (artKulturFolderIsOpen) {
          const kulturNodes = await Promise.all(
            kultursSorted.map(
              async (kultur, kulturIndex) =>
                await buildArtKultur({ kultur, kulturIndex, artId, artIndex }),
            ),
          )
          artKulturNodes.push(...kulturNodes)

          const openArtKulturNodes = openNodes.filter(
            (n) => n[0] === 'Arten' && n[2] === 'Kulturen' && n.length === 4,
          )
          for (const artKulturNode of openArtKulturNodes) {
            const kulturId = artKulturNode[3]
            const kultur = kultursSorted.find((s) => s.id === kulturId)
            const kulturIndex = kulturNodes.findIndex(
              (s) => s.id === `${artId}${kulturId}`,
            )

            // teilkultur nodes
            const teilkulturFilterQuery = queryFromFilter({
              table: 'teilkultur',
              filter: store.filter.teilkultur.toJSON(),
            })
            const teilkulturs = await kultur.teilkulturs
              .extend(...teilkulturFilterQuery)
              .fetch()
            const artKulturTeilkulturFolderNode = await buildArtKulturTeilkulturFolder(
              {
                kulturId,
                kulturIndex,
                artId,
                artIndex,
                children: teilkulturs,
              },
            )
            artKulturTeilkulturFolderNodes.push(artKulturTeilkulturFolderNode)
            const artKulturTeilkulturFolderIsOpen = openNodes.some(
              (n) =>
                n.length === 5 &&
                n[0] === 'Arten' &&
                n[1] === artId &&
                n[2] === 'Kulturen' &&
                n[3] === kulturId &&
                n[4] === 'Teilkulturen',
            )
            if (artKulturTeilkulturFolderIsOpen) {
              const teilkultursSorted = teilkulturs.sort((a, b) =>
                teilkulturSort({ a, b }),
              )
              const myArtKulturTeilkulturNodes = await Promise.all(
                teilkultursSorted.map(
                  async (teilkultur, teilkulturIndex) =>
                    await buildArtKulturTeilkultur({
                      teilkultur,
                      teilkulturIndex,
                      kulturId,
                      kulturIndex,
                      artId,
                      artIndex,
                    }),
                ),
              )
              artKulturTeilkulturNodes.push(...myArtKulturTeilkulturNodes)
            }

            // zaehlung nodes
            const zaehlungFilterQuery = queryFromFilter({
              table: 'zaehlung',
              filter: store.filter.zaehlung.toJSON(),
            })
            const zaehlungs = await kultur.zaehlungs
              .extend(...zaehlungFilterQuery)
              .fetch()
            const artKulturZaehlungFolderNode = await buildArtKulturZaehlungFolder(
              {
                kulturId,
                kulturIndex,
                artId,
                artIndex,
                children: zaehlungs,
              },
            )
            artKulturZaehlungFolderNodes.push(artKulturZaehlungFolderNode)
            const artKulturZaehlungFolderIsOpen = openNodes.some(
              (n) =>
                n.length === 5 &&
                n[0] === 'Arten' &&
                n[1] === artId &&
                n[2] === 'Kulturen' &&
                n[3] === kulturId &&
                n[4] === 'Zaehlungen',
            )
            if (artKulturZaehlungFolderIsOpen) {
              const zaehlungsSorted = zaehlungs.sort((a, b) =>
                zaehlungSort({ a, b }),
              )
              const myArtKulturZaehlungNodes = await Promise.all(
                zaehlungsSorted.map(
                  async (zaehlung, zaehlungIndex) =>
                    await buildArtKulturZaehlung({
                      zaehlung,
                      zaehlungIndex,
                      kulturId,
                      kulturIndex,
                      artId,
                      artIndex,
                    }),
                ),
              )
              artKulturZaehlungNodes.push(...myArtKulturZaehlungNodes)
            }

            // anlieferung nodes
            const lieferungFilterQuery = queryFromFilter({
              table: 'lieferung',
              filter: store.filter.lieferung.toJSON(),
            })
            const anlieferungs = await kultur.anlieferungs
              .extend(...lieferungFilterQuery)
              .fetch()
            const artKulturAnlieferungFolderNode = await buildArtKulturAnlieferungFolder(
              {
                kulturId,
                kulturIndex,
                artId,
                artIndex,
                children: anlieferungs,
              },
            )
            artKulturAnlieferungFolderNodes.push(artKulturAnlieferungFolderNode)
            const artKulturAnlieferungFolderIsOpen = openNodes.some(
              (n) =>
                n.length === 5 &&
                n[0] === 'Arten' &&
                n[1] === artId &&
                n[2] === 'Kulturen' &&
                n[3] === kulturId &&
                n[4] === 'An-Lieferungen',
            )
            if (artKulturAnlieferungFolderIsOpen) {
              const anlieferungsSorted = anlieferungs.sort((a, b) =>
                lieferungSort({ a, b }),
              )
              const myArtKulturAnlieferungNodes = anlieferungsSorted.map(
                (lieferung, lieferungIndex) =>
                  buildArtKulturAnlieferung({
                    lieferung,
                    lieferungIndex,
                    kulturId,
                    kulturIndex,
                    artId,
                    artIndex,
                  }),
              )
              artKulturAnlieferungNodes.push(...myArtKulturAnlieferungNodes)
            }

            // auslieferung nodes
            const ausLieferungFilterQuery = queryFromFilter({
              table: 'lieferung',
              filter: store.filter.lieferung.toJSON(),
            })
            const auslieferungs = await kultur.auslieferungs
              .extend(...ausLieferungFilterQuery)
              .fetch()
            const artKulturAuslieferungFolderNode = await buildArtKulturAuslieferungFolder(
              {
                kulturId,
                kulturIndex,
                artId,
                artIndex,
                children: auslieferungs,
              },
            )
            artKulturAuslieferungFolderNodes.push(
              artKulturAuslieferungFolderNode,
            )
            const artKulturAuslieferungFolderIsOpen = openNodes.some(
              (n) =>
                n.length === 5 &&
                n[0] === 'Arten' &&
                n[1] === artId &&
                n[2] === 'Kulturen' &&
                n[3] === kulturId &&
                n[4] === 'Aus-Lieferungen',
            )
            if (artKulturAuslieferungFolderIsOpen) {
              const auslieferungsSorted = auslieferungs.sort((a, b) =>
                lieferungSort({ a, b }),
              )
              const myArtKulturAuslieferungNodes = auslieferungsSorted.map(
                (lieferung, lieferungIndex) =>
                  buildArtKulturAuslieferung({
                    lieferung,
                    lieferungIndex,
                    kulturId,
                    kulturIndex,
                    artId,
                    artIndex,
                  }),
              )
              artKulturAuslieferungNodes.push(...myArtKulturAuslieferungNodes)
            }

            // event nodes
            const eventFilterQuery = queryFromFilter({
              table: 'lieferung',
              filter: store.filter.lieferung.toJSON(),
            })
            const events = await kultur.events
              .extend(...eventFilterQuery)
              .fetch()
            const artKulturEventFolderNode = await buildArtKulturEventFolder({
              kulturId,
              kulturIndex,
              artId,
              artIndex,
              children: events,
            })
            artKulturEventFolderNodes.push(artKulturEventFolderNode)
            const artKulturEventFolderIsOpen = openNodes.some(
              (n) =>
                n.length === 5 &&
                n[0] === 'Arten' &&
                n[1] === artId &&
                n[2] === 'Kulturen' &&
                n[3] === kulturId &&
                n[4] === 'Events',
            )
            if (artKulturEventFolderIsOpen) {
              const eventsSorted = events.sort((a, b) => eventSort({ a, b }))
              const myArtKulturEventNodes = eventsSorted.map(
                (event, eventIndex) =>
                  buildArtKulturEvent({
                    event,
                    eventIndex,
                    kulturId,
                    kulturIndex,
                    artId,
                    artIndex,
                  }),
              )
              artKulturEventNodes.push(...myArtKulturEventNodes)
            }
          }
        }
      }
    }
  }

  // 2 herkunft
  if (showHerkunft) {
    herkunftFolderNodes = buildHerkunftFolder({ store })
    if (openNodes.some((n) => n.length === 1 && n[0] === 'Herkuenfte')) {
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
      herkunftNodes = buildHerkunft({ store, herkunfts: herkunftsSorted })

      // on to child nodes
      const openHerkunftNodes = openNodes.filter(
        (n) => n[0] === 'Herkuenfte' && n.length === 2,
      )
      for (const herkunftNode of openHerkunftNodes) {
        const herkunftId = herkunftNode[1]
        const herkunft = herkunftsSorted.find((a) => a.id === herkunftId)
        const herkunftIndex = herkunftNodes.findIndex(
          (a) => a.id === herkunftId,
        )

        // 2.1 herkunft > sammlung
        const sammlungFilterQuery = queryFromFilter({
          table: 'sammlung',
          filter: store.filter.sammlung.toJSON(),
        })
        const sammlungs = await herkunft.sammlungs
          .extend(...sammlungFilterQuery)
          .fetch()
        const sammlungsSorted = await sammlungsSortedFromSammlungs(sammlungs)
        herkunftSammlungFolderNodes.push(
          buildHerkunftSammlungFolder({
            children: sammlungsSorted,
            herkunftIndex,
            herkunftId,
          }),
        )
        const herkunftSammlungFolderIsOpen = openNodes.some(
          (n) =>
            n.length === 3 &&
            n[0] === 'Herkuenfte' &&
            n[1] === herkunftId &&
            n[2] === 'Sammlungen',
        )
        if (herkunftSammlungFolderIsOpen) {
          const myHerkunftSammlungNodes = await Promise.all(
            sammlungsSorted.map(
              async (sammlung, sammlungIndex) =>
                await buildHerkunftSammlung({
                  sammlung,
                  sammlungIndex,
                  herkunftId,
                  herkunftIndex,
                }),
            ),
          )
          herkunftSammlungNodes.push(...myHerkunftSammlungNodes)
          const openHerkunftSammlungNodes = openNodes.filter(
            (n) =>
              n[0] === 'Herkuenfte' && n[2] === 'Sammlungen' && n.length === 4,
          )
          for (const herkunftSammlungNode of openHerkunftSammlungNodes) {
            const sammlungId = herkunftSammlungNode[3]
            const sammlung = sammlungsSorted.find((s) => s.id === sammlungId)
            const sammlungIndex = myHerkunftSammlungNodes.findIndex(
              (s) => s.id === `${herkunftId}${sammlungId}`,
            )
            const lieferungFilterQuery = queryFromFilter({
              table: 'lieferung',
              filter: store.filter.lieferung.toJSON(),
            })
            const lieferungs = await sammlung.lieferungs
              .extend(...lieferungFilterQuery)
              .fetch()
            const herkunftSammlungAuslieferungFolderNode = await buildHerkunftSammlungAuslieferungFolder(
              {
                sammlungId,
                sammlungIndex,
                herkunftId,
                herkunftIndex,
                children: lieferungs,
              },
            )
            herkunftSammlungAuslieferungFolderNodes.push(
              herkunftSammlungAuslieferungFolderNode,
            )
            const herkunftSammlungAuslieferungFolderIsOpen = openNodes.some(
              (n) =>
                n.length === 5 &&
                n[0] === 'Herkuenfte' &&
                n[1] === herkunftId &&
                n[2] === 'Sammlungen' &&
                n[3] === sammlungId &&
                n[4] === 'Aus-Lieferungen',
            )
            if (herkunftSammlungAuslieferungFolderIsOpen) {
              const lieferungsSorted = lieferungs.sort((a, b) =>
                lieferungSort({ a, b }),
              )
              const myHerkunftSammlungAuslieferungNodes = lieferungsSorted.map(
                (lieferung, lieferungIndex) =>
                  buildHerkunftSammlungAuslieferung({
                    lieferung,
                    lieferungIndex,
                    sammlungId,
                    sammlungIndex,
                    herkunftId,
                    herkunftIndex,
                  }),
              )
              herkunftSammlungAuslieferungNodes.push(
                ...myHerkunftSammlungAuslieferungNodes,
              )
            }
          }
        }
      }
    }
  }

  // 3 sammlung
  if (showSammlung) {
    sammlungFolderNodes = buildSammlungFolder({ store })
    if (openNodes.some((n) => n.length === 1 && n[0] === 'Sammlungen')) {
      const sammlungFilterQuery = queryFromFilter({
        table: 'sammlung',
        filter: store.filter.sammlung.toJSON(),
      })
      const sammlungs = await db.collections
        .get('sammlung')
        .query(...sammlungFilterQuery)
        .fetch()
      const sammlungsSorted = await sammlungsSortedFromSammlungs(sammlungs)
      sammlungNodes = await buildSammlung({ store, sammlungs: sammlungsSorted })

      // on to child nodes
      const openSammlungNodes = openNodes.filter(
        (n) => n.length === 2 && n[0] === 'Sammlungen',
      )
      for (const sammlungNode of openSammlungNodes) {
        const sammlungId = sammlungNode[1]
        const sammlung = sammlungsSorted.find((a) => a.id === sammlungId)
        const sammlungIndex = sammlungNodes.findIndex(
          (a) => a.id === sammlungId,
        )

        // 2.1 sammlung > herkunft
        const herkunft = await sammlung.herkunft.fetch()
        sammlungHerkunftFolderNodes.push(
          buildSammlungHerkunftFolder({
            children: [herkunft],
            sammlungIndex,
            sammlungId,
          }),
        )
        const sammlungHerkunftFolderIsOpen = openNodes.some(
          (n) =>
            n.length === 3 &&
            n[0] === 'Sammlungen' &&
            n[1] === sammlungId &&
            n[2] === 'Herkuenfte',
        )
        if (sammlungHerkunftFolderIsOpen) {
          const mySammlungHerkunftNodes = [herkunft].map(
            (herkunft, herkunftIndex) =>
              buildSammlungHerkunft({
                herkunft,
                herkunftIndex,
                sammlungId,
                sammlungIndex,
              }),
          )
          sammlungHerkunftNodes.push(...mySammlungHerkunftNodes)
        }

        // 2.1 sammlung > auslieferung
        const lieferungFilterQuery = queryFromFilter({
          table: 'lieferung',
          filter: store.filter.lieferung.toJSON(),
        })
        const lieferungs = await sammlung.lieferungs
          .extend(...lieferungFilterQuery)
          .fetch()
        const lieferungsSorted = lieferungs.sort((a, b) =>
          lieferungSort({ a, b }),
        )
        sammlungAuslieferungFolderNodes.push(
          buildSammlungAuslieferungFolder({
            children: lieferungsSorted,
            sammlungIndex,
            sammlungId,
          }),
        )
        const sammlungAuslieferungFolderIsOpen = openNodes.some(
          (n) =>
            n.length === 3 &&
            n[0] === 'Sammlungen' &&
            n[1] === sammlungId &&
            n[2] === 'Aus-Lieferungen',
        )
        if (sammlungAuslieferungFolderIsOpen) {
          const mySammlungAuslieferungNodes = lieferungsSorted.map(
            (lieferung, lieferungIndex) =>
              buildSammlungAuslieferung({
                lieferung,
                lieferungIndex,
                sammlungId,
                sammlungIndex,
              }),
          )
          sammlungAuslieferungNodes.push(...mySammlungAuslieferungNodes)
        }
      }
    }
  }

  // 4 garten
  if (showGarten) {
    gartenFolderNodes = buildGartenFolder({ store })
    if (openNodes.some((n) => n.length === 1 && n[0] === 'Gaerten')) {
      const gartenFilterQuery = queryFromFilter({
        table: 'garten',
        filter: store.filter.garten.toJSON(),
      })
      const gartens = await db.collections
        .get('garten')
        .query(...gartenFilterQuery)
        .fetch()
      const gartensSorted = await gartensSortedFromGartens(gartens)
      gartenNodes = await buildGarten({ store, gartens: gartensSorted })

      // on to child nodes
      const openGartenNodes = openNodes.filter(
        (n) => n[0] === 'Gaerten' && n.length === 2,
      )
      for (const gartenNode of openGartenNodes) {
        const gartenId = gartenNode[1]
        const garten = gartensSorted.find((a) => a.id === gartenId)
        const gartenIndex = gartenNodes.findIndex((a) => a.id === gartenId)

        // 2.1 garten > kultur
        const kulturFilterQuery = queryFromFilter({
          table: 'kultur',
          filter: store.filter.kultur.toJSON(),
        })
        const kulturs = await garten.kulturs
          .extend(...kulturFilterQuery)
          .fetch()
        const kultursSorted = await kultursSortedFromKulturs(kulturs)
        gartenKulturFolderNodes.push(
          buildGartenKulturFolder({
            children: kultursSorted,
            gartenIndex,
            gartenId,
          }),
        )
        const gartenKulturFolderIsOpen = openNodes.some(
          (n) =>
            n.length === 3 &&
            n[0] === 'Gaerten' &&
            n[1] === gartenId &&
            n[2] === 'Kulturen',
        )
        if (gartenKulturFolderIsOpen) {
          const myGartenKulturNodes = await Promise.all(
            kultursSorted.map(
              async (kultur, kulturIndex) =>
                await buildGartenKultur({
                  kultur,
                  kulturIndex,
                  gartenId,
                  gartenIndex,
                }),
            ),
          )
          gartenKulturNodes.push(...myGartenKulturNodes)

          const openGartenKulturNodes = openNodes.filter(
            (n) => n[0] === 'Gaerten' && n[2] === 'Kulturen' && n.length === 4,
          )
          for (const gartenKulturNode of openGartenKulturNodes) {
            const kulturId = gartenKulturNode[3]
            const kultur = kultursSorted.find((s) => s.id === kulturId)
            const kulturIndex = myGartenKulturNodes.findIndex(
              (s) => s.id === `${gartenId}${kulturId}`,
            )

            // garten > kultur > teilkultur
            const teilkulturFilterQuery = queryFromFilter({
              table: 'teilkultur',
              filter: store.filter.teilkultur.toJSON(),
            })
            const teilkulturs = await kultur.teilkulturs
              .extend(...teilkulturFilterQuery)
              .fetch()
            const gartenKulturTeilkulturFolderNode = await buildGartenKulturTeilkulturFolder(
              {
                kulturId,
                kulturIndex,
                gartenId,
                gartenIndex,
                children: teilkulturs,
              },
            )
            gartenKulturTeilkulturFolderNodes.push(
              gartenKulturTeilkulturFolderNode,
            )
            const gartenKulturTeilkulturFolderIsOpen = openNodes.some(
              (n) =>
                n.length === 5 &&
                n[0] === 'Gaerten' &&
                n[1] === gartenId &&
                n[2] === 'Kulturen' &&
                n[3] === kulturId &&
                n[4] === 'Teilkulturen',
            )
            if (gartenKulturTeilkulturFolderIsOpen) {
              const teilkultursSorted = teilkulturs.sort((a, b) =>
                teilkulturSort({ a, b }),
              )
              const myGartenKulturTeilkulturNodes = teilkultursSorted.map(
                (teilkultur, teilkulturIndex) =>
                  buildGartenKulturTeilkultur({
                    teilkultur,
                    teilkulturIndex,
                    kulturId,
                    kulturIndex,
                    gartenId,
                    gartenIndex,
                  }),
              )
              gartenKulturTeilkulturNodes.push(...myGartenKulturTeilkulturNodes)
            }

            // garten > kultur > zaehlung
            const zaehlungFilterQuery = queryFromFilter({
              table: 'zaehlung',
              filter: store.filter.zaehlung.toJSON(),
            })
            const zaehlungs = await kultur.zaehlungs
              .extend(...zaehlungFilterQuery)
              .fetch()
            const gartenKulturZaehlungFolderNode = await buildGartenKulturZaehlungFolder(
              {
                kulturId,
                kulturIndex,
                gartenId,
                gartenIndex,
                children: zaehlungs,
              },
            )
            gartenKulturZaehlungFolderNodes.push(gartenKulturZaehlungFolderNode)
            const gartenKulturZaehlungFolderIsOpen = openNodes.some(
              (n) =>
                n.length === 5 &&
                n[0] === 'Gaerten' &&
                n[1] === gartenId &&
                n[2] === 'Kulturen' &&
                n[3] === kulturId &&
                n[4] === 'Zaehlungen',
            )
            if (gartenKulturZaehlungFolderIsOpen) {
              const zaehlungsSorted = zaehlungs.sort((a, b) =>
                zaehlungSort({ a, b }),
              )
              const myGartenKulturZaehlungNodes = await Promise.all(
                zaehlungsSorted.map(
                  async (zaehlung, zaehlungIndex) =>
                    await buildGartenKulturZaehlung({
                      zaehlung,
                      zaehlungIndex,
                      kulturId,
                      kulturIndex,
                      gartenId,
                      gartenIndex,
                    }),
                ),
              )
              gartenKulturZaehlungNodes.push(...myGartenKulturZaehlungNodes)
            }

            // garten > kultur > anlieferung
            const lieferungFilterQuery = queryFromFilter({
              table: 'lieferung',
              filter: store.filter.lieferung.toJSON(),
            })
            const anlieferungs = await kultur.anlieferungs
              .extend(...lieferungFilterQuery)
              .fetch()
            const gartenKulturAnlieferungFolderNode = await buildGartenKulturAnlieferungFolder(
              {
                kulturId,
                kulturIndex,
                gartenId,
                gartenIndex,
                children: anlieferungs,
              },
            )
            gartenKulturAnlieferungFolderNodes.push(
              gartenKulturAnlieferungFolderNode,
            )
            const gartenKulturAnlieferungFolderIsOpen = openNodes.some(
              (n) =>
                n.length === 5 &&
                n[0] === 'Gaerten' &&
                n[1] === gartenId &&
                n[2] === 'Kulturen' &&
                n[3] === kulturId &&
                n[4] === 'Aus-Lieferungen',
            )
            if (gartenKulturAnlieferungFolderIsOpen) {
              const anlieferungsSorted = anlieferungs.sort((a, b) =>
                lieferungSort({ a, b }),
              )
              const myGartenKulturAnlieferungNodes = anlieferungsSorted.map(
                (lieferung, lieferungIndex) =>
                  buildGartenKulturAnlieferung({
                    lieferung,
                    lieferungIndex,
                    kulturId,
                    kulturIndex,
                    gartenId,
                    gartenIndex,
                  }),
              )
              gartenKulturAnlieferungNodes.push(
                ...myGartenKulturAnlieferungNodes,
              )
            }

            // garten > kultur > auslieferung
            const auslieferungs = await kultur.auslieferungs
              .extend(...lieferungFilterQuery)
              .fetch()
            const gartenKulturAuslieferungFolderNode = await buildGartenKulturAuslieferungFolder(
              {
                kulturId,
                kulturIndex,
                gartenId,
                gartenIndex,
                children: auslieferungs,
              },
            )
            gartenKulturAuslieferungFolderNodes.push(
              gartenKulturAuslieferungFolderNode,
            )
            const gartenKulturAuslieferungFolderIsOpen = openNodes.some(
              (n) =>
                n.length === 5 &&
                n[0] === 'Gaerten' &&
                n[1] === gartenId &&
                n[2] === 'Kulturen' &&
                n[3] === kulturId &&
                n[4] === 'Aus-Lieferungen',
            )
            if (gartenKulturAuslieferungFolderIsOpen) {
              const auslieferungsSorted = auslieferungs.sort((a, b) =>
                lieferungSort({ a, b }),
              )
              const myGartenKulturAuslieferungNodes = auslieferungsSorted.map(
                (lieferung, lieferungIndex) =>
                  buildGartenKulturAuslieferung({
                    lieferung,
                    lieferungIndex,
                    kulturId,
                    kulturIndex,
                    gartenId,
                    gartenIndex,
                  }),
              )
              gartenKulturAuslieferungNodes.push(
                ...myGartenKulturAuslieferungNodes,
              )
            }

            // garten > kultur > event
            const eventFilterQuery = queryFromFilter({
              table: 'event',
              filter: store.filter.event.toJSON(),
            })
            const events = await kultur.events
              .extend(...eventFilterQuery)
              .fetch()
            const gartenKulturEventFolderNode = await buildGartenKulturEventFolder(
              {
                kulturId,
                kulturIndex,
                gartenId,
                gartenIndex,
                children: events,
              },
            )
            gartenKulturEventFolderNodes.push(gartenKulturEventFolderNode)
            const gartenKulturEventFolderIsOpen = openNodes.some(
              (n) =>
                n.length === 5 &&
                n[0] === 'Gaerten' &&
                n[1] === gartenId &&
                n[2] === 'Kulturen' &&
                n[3] === kulturId &&
                n[4] === 'Events',
            )
            if (gartenKulturEventFolderIsOpen) {
              const eventsSorted = events.sort((a, b) => eventSort({ a, b }))
              const myGartenKulturEventNodes = eventsSorted.map(
                (event, eventIndex) =>
                  buildGartenKulturEvent({
                    event,
                    eventIndex,
                    kulturId,
                    kulturIndex,
                    gartenId,
                    gartenIndex,
                  }),
              )
              gartenKulturEventNodes.push(...myGartenKulturEventNodes)
            }
          }
        }
      }
    }
  }

  // 5 kultur
  if (showKultur) {
    if (openNodes.some((n) => n.length === 1 && n[0] === 'Kulturen')) {
      const kulturFilterQuery = queryFromFilter({
        table: 'kultur',
        filter: store.filter.kultur.toJSON(),
      })
      const kulturs = await db.collections
        .get('kultur')
        .query(...kulturFilterQuery)
        .fetch()
      const kultursSorted = await kultursSortedFromKulturs(kulturs)
      kulturNodes = await buildKultur({ store, kulturs: kultursSorted })
    }
  }

  // 6 teilkultur
  if (showTeilkultur) {
    if (openNodes.some((n) => n.length === 1 && n[0] === 'Teilkulturen')) {
      const teilkulturFilterQuery = queryFromFilter({
        table: 'teilkultur',
        filter: store.filter.teilkultur.toJSON(),
      })
      const teilkulturs = await db.collections
        .get('teilkultur')
        .query(...teilkulturFilterQuery)
        .fetch()
      teilkulturNodes = buildTeilkultur({
        store,
        teilkulturs: teilkulturs.sort((a, b) => teilkulturSort({ a, b })),
      })
    }
  }

  // 7 zaehlung
  if (showZaehlung) {
    if (openNodes.some((n) => n.length === 1 && n[0] === 'Zaehlungen')) {
      const zaehlungFilterQuery = queryFromFilter({
        table: 'zaehlung',
        filter: store.filter.zaehlung.toJSON(),
      })
      const zaehlungs = await db.collections
        .get('zaehlung')
        .query(...zaehlungFilterQuery)
        .fetch()
      zaehlungNodes = buildZaehlung({
        store,
        zaehlungs: zaehlungs.sort((a, b) => zaehlungSort({ a, b })),
      })
    }
  }

  // 8 lieferung
  if (showLieferung) {
    if (openNodes.some((n) => n.length === 1 && n[0] === 'Lieferungen')) {
      const lieferungFilterQuery = queryFromFilter({
        table: 'lieferung',
        filter: store.filter.lieferung.toJSON(),
      })
      const lieferungs = await db.collections
        .get('lieferung')
        .query(...lieferungFilterQuery)
        .fetch()
      lieferungNodes = buildLieferung({
        store,
        lieferungs: lieferungs.sort((a, b) => lieferungSort({ a, b })),
      })
    }
  }

  // 9 sammelLieferung
  if (showSammelLieferung) {
    if (
      openNodes.some((n) => n.length === 1 && n[0] === 'Sammel-Lieferungen')
    ) {
      const sammelLieferungFilterQuery = queryFromFilter({
        table: 'sammel_lieferung',
        filter: store.filter.sammel_lieferung.toJSON(),
      })
      const sammelLieferungs = await db.collections
        .get('sammel_lieferung')
        .query(...sammelLieferungFilterQuery)
        .fetch()
      sammelLieferungNodes = buildSammelLieferung({
        store,
        sammelLieferungs: sammelLieferungs.sort((a, b) =>
          lieferungSort({ a, b }),
        ),
      })
    }
  }

  // 10 event
  if (showEvent) {
    if (openNodes.some((n) => n.length === 1 && n[0] === 'Events')) {
      const eventFilterQuery = queryFromFilter({
        table: 'event',
        filter: store.filter.event.toJSON(),
      })
      const events = await db.collections
        .get('event')
        .query(...eventFilterQuery)
        .fetch()
      eventNodes = buildEvent({
        store,
        events: events.sort((a, b) => eventSort({ a, b })),
      })
    }
  }

  // 11 person
  if (showPerson) {
    if (openNodes.some((n) => n.length === 1 && n[0] === 'Personen')) {
      const personFilterQuery = queryFromFilter({
        table: 'person',
        filter: store.filter.person.toJSON(),
      })
      const persons = await db.collections
        .get('person')
        .query(...personFilterQuery)
        .fetch()
      const personsSorted = persons.sort((a, b) => personSort({ a, b }))
      personNodes = buildPerson({
        store,
        persons: personsSorted,
      })
    }
  }

  /*console.log('buildNodesWm', {
    artSammlungAuslieferungNodes,
    artSammlungAuslieferungFolderNodes,
  })*/
  const nodes = [
    ...artFolderNodes,
    ...artNodes,
    ...artSammlungFolderNodes,
    ...artSammlungNodes,
    ...artSammlungAuslieferungFolderNodes,
    ...artSammlungAuslieferungNodes,
    ...artKulturFolderNodes,
    ...artKulturNodes,
    ...artKulturTeilkulturFolderNodes,
    ...artKulturTeilkulturNodes,
    ...artKulturZaehlungFolderNodes,
    ...artKulturZaehlungNodes,
    ...artKulturAnlieferungFolderNodes,
    ...artKulturAnlieferungNodes,
    ...artKulturAuslieferungFolderNodes,
    ...artKulturAuslieferungNodes,
    ...artKulturEventFolderNodes,
    ...artKulturEventNodes,
    ...herkunftFolderNodes,
    ...herkunftNodes,
    ...herkunftSammlungFolderNodes,
    ...herkunftSammlungNodes,
    ...herkunftSammlungAuslieferungFolderNodes,
    ...herkunftSammlungAuslieferungNodes,
    ...sammlungFolderNodes,
    ...sammlungNodes,
    ...sammlungHerkunftFolderNodes,
    ...sammlungHerkunftNodes,
    ...sammlungAuslieferungFolderNodes,
    ...sammlungAuslieferungNodes,
    ...gartenFolderNodes,
    ...gartenNodes,
    ...gartenKulturFolderNodes,
    ...gartenKulturNodes,
    ...gartenKulturTeilkulturFolderNodes,
    ...gartenKulturTeilkulturNodes,
    ...gartenKulturZaehlungFolderNodes,
    ...gartenKulturZaehlungNodes,
    ...gartenKulturAnlieferungFolderNodes,
    ...gartenKulturAnlieferungNodes,
    ...gartenKulturAuslieferungFolderNodes,
    ...gartenKulturAuslieferungNodes,
    ...gartenKulturEventFolderNodes,
    ...gartenKulturEventNodes,
    ...kulturFolderNodes,
    ...kulturNodes,
    ...teilkulturFolderNodes,
    ...teilkulturNodes,
    ...zaehlungFolderNodes,
    ...zaehlungNodes,
    ...lieferungFolderNodes,
    ...lieferungNodes,
    ...eventFolderNodes,
    ...eventNodes,
    ...personFolderNodes,
    ...personNodes,
    ...sammelLieferungFolderNodes,
    ...sammelLieferungNodes,
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
