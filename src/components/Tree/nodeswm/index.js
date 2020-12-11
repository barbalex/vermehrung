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
import buildKulturTeilkulturFolder from './kultur/teilkultur/folder'
import buildKulturTeilkultur from './kultur/teilkultur'
import buildKulturZaehlungFolder from './kultur/zaehlung/folder'
import buildKulturZaehlung from './kultur/zaehlung'
import buildKulturAuslieferungFolder from './kultur/auslieferung/folder'
import buildKulturAuslieferung from './kultur/auslieferung'
import buildKulturAnlieferungFolder from './kultur/anlieferung/folder'
import buildKulturAnlieferung from './kultur/anlieferung'
import buildKulturEventFolder from './kultur/event/folder'
import buildKulturEvent from './kultur/event'
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
import buildPersonGartenFolder from './person/garten/folder'
import buildPersonGarten from './person/garten'
import buildPersonGartenKulturFolder from './person/garten/kultur/folder'
import buildPersonGartenKultur from './person/garten/kultur'
import buildPersonGartenKulturAnlieferungFolder from './person/garten/kultur/anlieferung/folder'
import buildPersonGartenKulturAnlieferung from './person/garten/kultur/anlieferung'
import buildPersonGartenKulturAuslieferungFolder from './person/garten/kultur/auslieferung/folder'
import buildPersonGartenKulturAuslieferung from './person/garten/kultur/auslieferung'
import buildPersonGartenKulturEventFolder from './person/garten/kultur/event/folder'
import buildPersonGartenKulturEvent from './person/garten/kultur/event'
import buildPersonGartenKulturTeilkulturFolder from './person/garten/kultur/teilkultur/folder'
import buildPersonGartenKulturTeilkultur from './person/garten/kultur/teilkultur'
import buildPersonGartenKulturZaehlungFolder from './person/garten/kultur/zaehlung/folder'
import buildPersonGartenKulturZaehlung from './person/garten/kultur/zaehlung'
import buildPersonLieferungFolder from './person/lieferung/folder'
import buildPersonLieferung from './person/lieferung'
import buildPersonSammlungFolder from './person/sammlung/folder'
import buildPersonSammlung from './person/sammlung'
import buildSammelLieferungFolder from './sammelLieferung/folder'
import buildSammelLieferung from './sammelLieferung'
import buildSammelLieferungLieferungFolder from './sammelLieferung/lieferung/folder'
import buildSammelLieferungLieferung from './sammelLieferung/lieferung'
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
import tableFilter from '../../../utils/tableFilter'

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
  let kulturFolderNodes = []
  let kulturNodes = []
  let kulturTeilkulturFolderNodes = []
  let kulturTeilkulturNodes = []
  let kulturZaehlungFolderNodes = []
  let kulturZaehlungNodes = []
  let kulturAnlieferungFolderNodes = []
  let kulturAnlieferungNodes = []
  let kulturAuslieferungFolderNodes = []
  let kulturAuslieferungNodes = []
  let kulturEventFolderNodes = []
  let kulturEventNodes = []
  let teilkulturFolderNodes = []
  let teilkulturNodes = []
  let zaehlungFolderNodes = []
  let zaehlungNodes = []
  let lieferungFolderNodes = []
  let lieferungNodes = []
  let eventFolderNodes = []
  let eventNodes = []
  let personFolderNodes = []
  let personNodes = []
  let personGartenFolderNodes = []
  let personGartenNodes = []
  let personGartenKulturFolderNodes = []
  let personGartenKulturNodes = []
  let personGartenKulturAnlieferungFolderNodes = []
  let personGartenKulturAnlieferungNodes = []
  let personGartenKulturAuslieferungFolderNodes = []
  let personGartenKulturAuslieferungNodes = []
  let personGartenKulturEventFolderNodes = []
  let personGartenKulturEventNodes = []
  let personGartenKulturTeilkulturFolderNodes = []
  let personGartenKulturTeilkulturNodes = []
  let personGartenKulturZaehlungFolderNodes = []
  let personGartenKulturZaehlungNodes = []
  let personLieferungFolderNodes = []
  let personLieferungNodes = []
  let personSammlungFolderNodes = []
  let personSammlungNodes = []
  let sammelLieferungFolderNodes = []
  let sammelLieferungNodes = []
  let sammelLieferungLieferungFolderNodes = []
  let sammelLieferungLieferungNodes = []

  // 1 art
  if (showArt) {
    const artQuery = db.collections
      .get('art')
      .query(...tableFilter({ store, table: 'art' }))
    const artCount = await artQuery.fetchCount()
    artFolderNodes = buildArtFolder({ count: artCount })
    const artFolderIsOpen = openNodes.some(
      (n) => n.length === 1 && n[0] === 'Arten',
    )
    if (artFolderIsOpen) {
      // build art nodes
      const arts = await artQuery.fetch()
      const artsSorted = await artsSortedFromArts(arts)
      artNodes = await Promise.all(
        artsSorted.map(
          async (art, index) => await buildArt({ store, art, index }),
        ),
      )

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
        const sammlungsQuery = art.sammlungs.extend(...sammlungFilterQuery)
        const sammlungCount = await sammlungsQuery.fetchCount()
        artSammlungFolderNodes = buildArtSammlungFolder({
          count: sammlungCount,
          artIndex,
          artId,
        })

        const artSammlungFolderIsOpen = openNodes.some(
          (n) =>
            n.length === 3 &&
            n[0] === 'Arten' &&
            n[1] === artId &&
            n[2] === 'Sammlungen',
        )
        if (artSammlungFolderIsOpen) {
          const sammlungs = await sammlungsQuery.fetch()
          const sammlungsSorted = await sammlungsSortedFromSammlungs(sammlungs)
          artSammlungNodes = await Promise.all(
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
          const openArtSammlungNodes = openNodes.filter(
            (n) => n[0] === 'Arten' && n[2] === 'Sammlungen' && n.length === 4,
          )
          for (const artSammlungNode of openArtSammlungNodes) {
            const sammlungId = artSammlungNode[3]
            const sammlung = sammlungsSorted.find((s) => s.id === sammlungId)
            const sammlungIndex = artSammlungNodes.findIndex(
              (s) => s.id === `${artId}${sammlungId}`,
            )
            const lieferungs = await sammlung.lieferungs
              .extend(...tableFilter({ store, table: 'lieferung' }))
              .fetch()
            artSammlungAuslieferungFolderNodes = await buildArtSammlungAuslieferungFolder(
              {
                sammlungId,
                sammlungIndex,
                artId,
                artIndex,
                children: lieferungs,
              },
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
              artSammlungAuslieferungNodes = lieferungsSorted.map(
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
            }
          }
        }

        // 1.2 art > kultur
        const kulturFilterQuery = queryFromFilter({
          table: 'kultur',
          filter: store.filter.kultur.toJSON(),
        })
        const artKulturQuery = art.kulturs.extend(...kulturFilterQuery)
        const kulturCount = await artKulturQuery.fetchCount()
        artKulturFolderNodes = buildArtKulturFolder({
          count: kulturCount,
          artIndex,
          artId,
        })
        const artKulturFolderIsOpen = openNodes.some(
          (n) =>
            n.length === 3 &&
            n[0] === 'Arten' &&
            n[1] === artId &&
            n[2] === 'Kulturen',
        )
        if (artKulturFolderIsOpen) {
          const kulturs = await artKulturQuery.fetch()
          const kultursSorted = await kultursSortedFromKulturs(kulturs)
          artKulturNodes = await Promise.all(
            kultursSorted.map(
              async (kultur, kulturIndex) =>
                await buildArtKultur({ kultur, kulturIndex, artId, artIndex }),
            ),
          )

          const openArtKulturNodes = openNodes.filter(
            (n) => n[0] === 'Arten' && n[2] === 'Kulturen' && n.length === 4,
          )
          for (const artKulturNode of openArtKulturNodes) {
            const kulturId = artKulturNode[3]
            const kultur = kultursSorted.find((s) => s.id === kulturId)
            if (!kultur) break
            const kulturIndex = artKulturNodes.findIndex(
              (s) => s.id === `${artId}${kulturId}`,
            )

            // teilkultur nodes
            const kulturOption = await kultur.kultur_option.fetch()
            console.log('buildNodes, kulturOption:', kulturOption)
            if (kulturOption?.tk) {
              const teilkulturs = await kultur.teilkulturs
                .extend(...tableFilter({ store, table: 'teilkultur' }))
                .fetch()
              console.log('buildNodes, teilkulturs:', teilkulturs)
              artKulturTeilkulturFolderNodes = buildArtKulturTeilkulturFolder({
                kulturId,
                kulturIndex,
                artId,
                artIndex,
                children: teilkulturs,
              })
              console.log(
                'buildNodes, artKulturTeilkulturFolderNodes:',
                artKulturTeilkulturFolderNodes,
              )
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
                artKulturTeilkulturNodes = teilkultursSorted.map(
                  (teilkultur, teilkulturIndex) =>
                    buildArtKulturTeilkultur({
                      teilkultur,
                      teilkulturIndex,
                      kulturId,
                      kulturIndex,
                      artId,
                      artIndex,
                    }),
                )
              }
            }

            // zaehlung nodes
            const artKulturZaehlungQuery = kultur.zaehlungs.extend(
              ...tableFilter({ store, table: 'zaehlung' }),
            )
            const zaehlungsCount = await artKulturZaehlungQuery.fetchCount()
            artKulturZaehlungFolderNodes = await buildArtKulturZaehlungFolder({
              kulturId,
              kulturIndex,
              artId,
              artIndex,
              count: zaehlungsCount,
            })
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
              const zaehlungs = await artKulturZaehlungQuery.fetch()
              const zaehlungsSorted = zaehlungs.sort((a, b) =>
                zaehlungSort({ a, b }),
              )
              artKulturZaehlungNodes = await Promise.all(
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
            }

            // anlieferung nodes
            const anlieferungs = await kultur.anlieferungs
              .extend(...tableFilter({ store, table: 'lieferung' }))
              .fetch()
            artKulturAnlieferungFolderNodes = await buildArtKulturAnlieferungFolder(
              {
                kulturId,
                kulturIndex,
                artId,
                artIndex,
                children: anlieferungs,
              },
            )
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
              artKulturAnlieferungNodes = anlieferungsSorted.map(
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
            }

            // auslieferung nodes
            const ausLieferungFilterQuery = queryFromFilter({
              table: 'lieferung',
              filter: store.filter.lieferung.toJSON(),
            })
            const auslieferungs = await kultur.auslieferungs
              .extend(...ausLieferungFilterQuery)
              .fetch()
            artKulturAuslieferungFolderNodes = await buildArtKulturAuslieferungFolder(
              {
                kulturId,
                kulturIndex,
                artId,
                artIndex,
                children: auslieferungs,
              },
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
              artKulturAuslieferungNodes = auslieferungsSorted.map(
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
            }

            // event nodes
            const eventsQuery = kultur.events.extend(
              ...tableFilter({ store, table: 'event' }),
            )
            const eventsCount = await eventsQuery.fetchCount()
            artKulturEventFolderNodes = await buildArtKulturEventFolder({
              kulturId,
              kulturIndex,
              artId,
              artIndex,
              count: eventsCount,
            })
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
              const events = await eventsQuery.fetch()
              const eventsSorted = events.sort((a, b) => eventSort({ a, b }))
              artKulturEventNodes = eventsSorted.map((event, eventIndex) =>
                buildArtKulturEvent({
                  event,
                  eventIndex,
                  kulturId,
                  kulturIndex,
                  artId,
                  artIndex,
                }),
              )
            }
          }
        }
      }
    }
  }

  // 2 herkunft
  if (showHerkunft) {
    const herkunftQuery = db.collections
      .get('herkunft')
      .query(...tableFilter({ store, table: 'herkunft' }))
    const herkunftCount = await herkunftQuery.fetchCount()
    herkunftFolderNodes = buildHerkunftFolder({ count: herkunftCount })
    if (openNodes.some((n) => n.length === 1 && n[0] === 'Herkuenfte')) {
      const herkunfts = await herkunftQuery.fetch()
      const herkunftsSorted = herkunfts.sort((a, b) => herkunftSort({ a, b }))
      herkunftNodes = herkunftsSorted.map((herkunft, index) =>
        buildHerkunft({ herkunft, index }),
      )

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
        const herkunftSammlungQuery = herkunft.sammlungs.extend(
          ...tableFilter({ store, table: 'sammlung' }),
        )
        const sammlungsCount = await herkunftSammlungQuery.fetchCount()
        herkunftSammlungFolderNodes = buildHerkunftSammlungFolder({
          count: sammlungsCount,
          herkunftIndex,
          herkunftId,
        })
        const herkunftSammlungFolderIsOpen = openNodes.some(
          (n) =>
            n.length === 3 &&
            n[0] === 'Herkuenfte' &&
            n[1] === herkunftId &&
            n[2] === 'Sammlungen',
        )
        if (herkunftSammlungFolderIsOpen) {
          const sammlungs = await herkunftSammlungQuery.fetch()
          const sammlungsSorted = await sammlungsSortedFromSammlungs(sammlungs)
          herkunftSammlungNodes = await Promise.all(
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
          const openHerkunftSammlungNodes = openNodes.filter(
            (n) =>
              n[0] === 'Herkuenfte' && n[2] === 'Sammlungen' && n.length === 4,
          )
          for (const herkunftSammlungNode of openHerkunftSammlungNodes) {
            const sammlungId = herkunftSammlungNode[3]
            const sammlung = sammlungsSorted.find((s) => s.id === sammlungId)
            const sammlungIndex = herkunftSammlungNodes.findIndex(
              (s) => s.id === `${herkunftId}${sammlungId}`,
            )
            const lieferungs = await sammlung.lieferungs
              .extend(...tableFilter({ store, table: 'lieferung' }))
              .fetch()
            herkunftSammlungAuslieferungFolderNodes = await buildHerkunftSammlungAuslieferungFolder(
              {
                sammlungId,
                sammlungIndex,
                herkunftId,
                herkunftIndex,
                children: lieferungs,
              },
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
              herkunftSammlungAuslieferungNodes = lieferungsSorted.map(
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
            }
          }
        }
      }
    }
  }

  // 3 sammlung
  if (showSammlung) {
    const sammlungQuery = db.collections
      .get('sammlung')
      .query(...tableFilter({ store, table: 'sammlung' }))
    const sammlungCount = await sammlungQuery.fetchCount()
    sammlungFolderNodes = buildSammlungFolder({ count: sammlungCount })
    if (openNodes.some((n) => n.length === 1 && n[0] === 'Sammlungen')) {
      const sammlungs = await sammlungQuery.fetch()
      const sammlungsSorted = await sammlungsSortedFromSammlungs(sammlungs)
      sammlungNodes = await Promise.all(
        sammlungsSorted.map(
          async (sammlung, index) => await buildSammlung({ sammlung, index }),
        ),
      )

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
        const sammlungHerkunftQuery = sammlung.herkunft
        const herkunft = await sammlungHerkunftQuery.fetch()
        sammlungHerkunftFolderNodes = buildSammlungHerkunftFolder({
          count: [herkunft].length,
          sammlungIndex,
          sammlungId,
        })
        const sammlungHerkunftFolderIsOpen = openNodes.some(
          (n) =>
            n.length === 3 &&
            n[0] === 'Sammlungen' &&
            n[1] === sammlungId &&
            n[2] === 'Herkuenfte',
        )
        if (sammlungHerkunftFolderIsOpen) {
          sammlungHerkunftNodes = [herkunft].map((herkunft, herkunftIndex) =>
            buildSammlungHerkunft({
              herkunft,
              herkunftIndex,
              sammlungId,
              sammlungIndex,
            }),
          )
        }

        // 2.1 sammlung > auslieferung
        const sammlungLieferungQuery = sammlung.lieferungs.extend(
          ...tableFilter({ store, table: 'lieferung' }),
        )
        const sammlungLieferungCount = await sammlungLieferungQuery.fetchCount()
        sammlungAuslieferungFolderNodes = buildSammlungAuslieferungFolder({
          count: sammlungLieferungCount,
          sammlungIndex,
          sammlungId,
        })
        const sammlungAuslieferungFolderIsOpen = openNodes.some(
          (n) =>
            n.length === 3 &&
            n[0] === 'Sammlungen' &&
            n[1] === sammlungId &&
            n[2] === 'Aus-Lieferungen',
        )
        if (sammlungAuslieferungFolderIsOpen) {
          const lieferungs = await sammlungLieferungQuery.fetch()
          const lieferungsSorted = lieferungs.sort((a, b) =>
            lieferungSort({ a, b }),
          )
          sammlungAuslieferungNodes = lieferungsSorted.map(
            (lieferung, lieferungIndex) =>
              buildSammlungAuslieferung({
                lieferung,
                lieferungIndex,
                sammlungId,
                sammlungIndex,
              }),
          )
        }
      }
    }
  }

  // 4 garten
  if (showGarten) {
    const gartenQuery = db.collections
      .get('garten')
      .query(...tableFilter({ store, table: 'garten' }))
    const gartenCount = await gartenQuery.fetchCount()
    gartenFolderNodes = buildGartenFolder({ count: gartenCount })
    if (openNodes.some((n) => n.length === 1 && n[0] === 'Gaerten')) {
      const gartens = await gartenQuery.fetch()
      const gartensSorted = await gartensSortedFromGartens(gartens)
      gartenNodes = await Promise.all(
        gartensSorted.map(
          async (garten, index) => await buildGarten({ garten, index }),
        ),
      )

      // on to child nodes
      const openGartenNodes = openNodes.filter(
        (n) => n[0] === 'Gaerten' && n.length === 2,
      )
      for (const gartenNode of openGartenNodes) {
        const gartenId = gartenNode[1]
        const garten = gartensSorted.find((a) => a.id === gartenId)
        const gartenIndex = gartenNodes.findIndex((a) => a.id === gartenId)

        // 2.1 garten > kultur
        const gartenKulturQuery = garten.kulturs.extend(
          ...tableFilter({ store, table: 'kultur' }),
        )
        const gartenKulturCount = await gartenKulturQuery.fetchCount()
        gartenKulturFolderNodes = buildGartenKulturFolder({
          count: gartenKulturCount,
          gartenIndex,
          gartenId,
        })
        const gartenKulturFolderIsOpen = openNodes.some(
          (n) =>
            n.length === 3 &&
            n[0] === 'Gaerten' &&
            n[1] === gartenId &&
            n[2] === 'Kulturen',
        )
        if (gartenKulturFolderIsOpen) {
          const kulturs = await gartenKulturQuery.fetch()
          const kultursSorted = await kultursSortedFromKulturs(kulturs)
          gartenKulturNodes = await Promise.all(
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

          const openGartenKulturNodes = openNodes.filter(
            (n) => n[0] === 'Gaerten' && n[2] === 'Kulturen' && n.length === 4,
          )
          for (const gartenKulturNode of openGartenKulturNodes) {
            const kulturId = gartenKulturNode[3]
            const kultur = kultursSorted.find((s) => s.id === kulturId)
            if (!kultur) break
            const kulturIndex = gartenKulturNodes.findIndex(
              (s) => s.id === `${gartenId}${kulturId}`,
            )

            // garten > kultur > teilkultur
            const kulturOption = await kultur.kultur_option.fetch()
            if (kulturOption?.tk) {
              const teilkulturFilterQuery = queryFromFilter({
                table: 'teilkultur',
                filter: store.filter.teilkultur.toJSON(),
              })
              const teilkulturs = await kultur.teilkulturs
                .extend(...teilkulturFilterQuery)
                .fetch()
              gartenKulturTeilkulturFolderNodes = await buildGartenKulturTeilkulturFolder(
                {
                  kulturId,
                  kulturIndex,
                  gartenId,
                  gartenIndex,
                  children: teilkulturs,
                },
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
                gartenKulturTeilkulturNodes = teilkultursSorted.map(
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
              }
            }

            // garten > kultur > zaehlung
            const zaehlungFilterQuery = queryFromFilter({
              table: 'zaehlung',
              filter: store.filter.zaehlung.toJSON(),
            })
            const zaehlungs = await kultur.zaehlungs
              .extend(...zaehlungFilterQuery)
              .fetch()
            gartenKulturZaehlungFolderNodes = await buildGartenKulturZaehlungFolder(
              {
                kulturId,
                kulturIndex,
                gartenId,
                gartenIndex,
                children: zaehlungs,
              },
            )
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
              gartenKulturZaehlungNodes = await Promise.all(
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
            }

            // garten > kultur > anlieferung
            const anlieferungs = await kultur.anlieferungs
              .extend(...tableFilter({ store, table: 'lieferung' }))
              .fetch()
            gartenKulturAnlieferungFolderNodes = await buildGartenKulturAnlieferungFolder(
              {
                kulturId,
                kulturIndex,
                gartenId,
                gartenIndex,
                children: anlieferungs,
              },
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
              gartenKulturAnlieferungNodes = anlieferungsSorted.map(
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
            }

            // garten > kultur > auslieferung
            const auslieferungs = await kultur.auslieferungs
              .extend(...tableFilter({ store, table: 'lieferung' }))
              .fetch()
            gartenKulturAuslieferungFolderNodes = await buildGartenKulturAuslieferungFolder(
              {
                kulturId,
                kulturIndex,
                gartenId,
                gartenIndex,
                children: auslieferungs,
              },
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
              gartenKulturAuslieferungNodes = auslieferungsSorted.map(
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
            }

            // garten > kultur > event
            const gartenKulturEventQuery = kultur.events.extend(
              ...tableFilter({ store, table: 'event' }),
            )
            const gartenKulturEventCount = await gartenKulturEventQuery.fetchCount()
            gartenKulturEventFolderNodes = await buildGartenKulturEventFolder({
              kulturId,
              kulturIndex,
              gartenId,
              gartenIndex,
              count: gartenKulturEventCount,
            })
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
              const events = await gartenKulturEventQuery.fetch()
              const eventsSorted = events.sort((a, b) => eventSort({ a, b }))
              gartenKulturEventNodes = eventsSorted.map((event, eventIndex) =>
                buildGartenKulturEvent({
                  event,
                  eventIndex,
                  kulturId,
                  kulturIndex,
                  gartenId,
                  gartenIndex,
                }),
              )
            }
          }
        }
      }
    }
  }

  // 5 kultur
  if (showKultur) {
    const kulturQuery = db.collections
      .get('kultur')
      .query(...tableFilter({ store, table: 'kultur' }))
    const kulturCount = await kulturQuery.fetchCount()
    kulturFolderNodes = buildKulturFolder({ count: kulturCount })
    if (openNodes.some((n) => n.length === 1 && n[0] === 'Kulturen')) {
      const kulturs = await kulturQuery.fetch()
      const kultursSorted = await kultursSortedFromKulturs(kulturs)
      kulturNodes = await Promise.all(
        kultursSorted.map(
          async (kultur, index) => await buildKultur({ kultur, index }),
        ),
      )

      // on to child nodes
      const openKulturNodes = openNodes.filter(
        (n) => n[0] === 'Kulturen' && n.length === 2,
      )
      for (const kulturNode of openKulturNodes) {
        const kulturId = kulturNode[1]
        const kultur = kultursSorted.find((a) => a.id === kulturId)
        if (!kultur) break
        const kulturIndex = kulturNodes.findIndex((a) => a.id === kulturId)

        // 2.1 kultur > teilkultur
        const kulturOption = await kultur.kultur_option.fetch()
        if (kulturOption?.tk) {
          const kulturTeilkulturQuery = kultur.teilkulturs.extend(
            ...tableFilter({ store, table: 'teilkultur' }),
          )
          const kulturTeilkulturCount = await kulturTeilkulturQuery.fetchCount()
          kulturTeilkulturFolderNodes = buildKulturTeilkulturFolder({
            count: kulturTeilkulturCount,
            kulturIndex,
            kulturId,
          })

          const kulturTeilkulturFolderIsOpen = openNodes.some(
            (n) =>
              n.length === 3 &&
              n[0] === 'Kulturen' &&
              n[1] === kulturId &&
              n[2] === 'Teilkulturen',
          )
          if (kulturTeilkulturFolderIsOpen) {
            const teilkulturs = await kulturTeilkulturQuery.fetch()
            const teilkultursSorted = teilkulturs.sort((a, b) =>
              teilkulturSort({ a, b }),
            )
            kulturTeilkulturNodes = teilkultursSorted.map(
              (teilkultur, teilkulturIndex) =>
                buildKulturTeilkultur({
                  teilkultur,
                  teilkulturIndex,
                  kulturId,
                  kulturIndex,
                }),
            )
          }
        }

        // 2.1 kultur > zaehlung
        const kulturZaehlungQuery = kultur.zaehlungs.extend(
          ...tableFilter({ store, table: 'zaehlung' }),
        )
        const kulturZaehlungCount = await kulturZaehlungQuery.fetchCount()
        kulturZaehlungFolderNodes = buildKulturZaehlungFolder({
          count: kulturZaehlungCount,
          kulturIndex,
          kulturId,
        })

        const kulturZaehlungFolderIsOpen = openNodes.some(
          (n) =>
            n.length === 3 &&
            n[0] === 'Kulturen' &&
            n[1] === kulturId &&
            n[2] === 'Zaehlungen',
        )
        if (kulturZaehlungFolderIsOpen) {
          const zaehlungs = await kulturZaehlungQuery.fetch()
          const zaehlungsSorted = zaehlungs.sort((a, b) =>
            zaehlungSort({ a, b }),
          )
          kulturZaehlungNodes = await Promise.all(
            zaehlungsSorted.map(
              async (zaehlung, zaehlungIndex) =>
                await buildKulturZaehlung({
                  zaehlung,
                  zaehlungIndex,
                  kulturId,
                  kulturIndex,
                }),
            ),
          )
        }

        // kultur > anlieferung
        const kulturAnlieferungQuery = kultur.anlieferungs.extend(
          ...tableFilter({ store, table: 'lieferung' }),
        )
        const kulturAnlieferungCount = kulturAnlieferungQuery.fetchCount()
        kulturAnlieferungFolderNodes = buildKulturAnlieferungFolder({
          count: kulturAnlieferungCount,
          kulturIndex,
          kulturId,
        })
        const kulturAnlieferungFolderIsOpen = openNodes.some(
          (n) =>
            n.length === 3 &&
            n[0] === 'Kulturen' &&
            n[1] === kulturId &&
            n[2] === 'An-Lieferungen',
        )
        if (kulturAnlieferungFolderIsOpen) {
          const anlieferungs = await kulturAnlieferungQuery.fetch()
          const anlieferungsSorted = anlieferungs.sort((a, b) =>
            lieferungSort({ a, b }),
          )
          kulturAnlieferungNodes = anlieferungsSorted.map(
            (lieferung, lieferungIndex) =>
              buildKulturAnlieferung({
                lieferung,
                lieferungIndex,
                kulturId,
                kulturIndex,
              }),
          )
        }

        // kultur > auslieferung
        const kulturAuslieferungQuery = kultur.auslieferungs.extend(
          ...tableFilter({ store, table: 'lieferung' }),
        )
        const kulturAuslieferungCount = await kulturAuslieferungQuery.fetchCount()
        kulturAuslieferungFolderNodes = buildKulturAuslieferungFolder({
          count: kulturAuslieferungCount,
          kulturIndex,
          kulturId,
        })
        const kulturAuslieferungFolderIsOpen = openNodes.some(
          (n) =>
            n.length === 3 &&
            n[0] === 'Kulturen' &&
            n[1] === kulturId &&
            n[2] === 'Aus-Lieferungen',
        )
        if (kulturAuslieferungFolderIsOpen) {
          const auslieferungs = await kulturAuslieferungQuery.fetch()
          const auslieferungsSorted = auslieferungs.sort((a, b) =>
            lieferungSort({ a, b }),
          )
          kulturAuslieferungNodes = auslieferungsSorted.map(
            (lieferung, lieferungIndex) =>
              buildKulturAuslieferung({
                lieferung,
                lieferungIndex,
                kulturId,
                kulturIndex,
              }),
          )
        }

        // kultur > event
        const kulturEventQuery = kultur.events.extend(
          ...tableFilter({ store, table: 'event' }),
        )
        const kulturEventCount = await kulturEventQuery.fetchCount()
        kulturEventFolderNodes = buildKulturEventFolder({
          count: kulturEventCount,
          kulturIndex,
          kulturId,
        })
        const kulturEventFolderIsOpen = openNodes.some(
          (n) =>
            n.length === 3 &&
            n[0] === 'Kulturen' &&
            n[1] === kulturId &&
            n[2] === 'Events',
        )
        if (kulturEventFolderIsOpen) {
          const events = await kulturEventQuery.fetch()
          const eventsSorted = events.sort((a, b) => eventSort({ a, b }))
          kulturEventNodes = eventsSorted.map((event, eventIndex) =>
            buildKulturEvent({
              event,
              eventIndex,
              kulturId,
              kulturIndex,
            }),
          )
        }
      }
    }
  }

  // 6 teilkultur
  if (showTeilkultur) {
    const teilkulturQuery = db.collections
      .get('teilkultur')
      .query(...tableFilter({ store, table: 'teilkultur' }))
    const teilkulturCount = await teilkulturQuery.fetchCount()
    teilkulturFolderNodes = buildTeilkulturFolder({ count: teilkulturCount })
    if (openNodes.some((n) => n.length === 1 && n[0] === 'Teilkulturen')) {
      const teilkulturs = await teilkulturQuery.fetch()
      const teilkultursSorted = teilkulturs.sort((a, b) =>
        teilkulturSort({ a, b }),
      )
      teilkulturNodes = teilkultursSorted.map((teilkultur, index) =>
        buildTeilkultur({ teilkultur, index }),
      )
    }
  }

  // 7 zaehlung
  if (showZaehlung) {
    const zaehlungQuery = db.collections
      .get('zaehlung')
      .query(...tableFilter({ store, table: 'zaehlung' }))
    const zaehlungCount = await zaehlungQuery.fetchCount()
    zaehlungFolderNodes = buildZaehlungFolder({ count: zaehlungCount })
    if (openNodes.some((n) => n.length === 1 && n[0] === 'Zaehlungen')) {
      const zaehlungs = await zaehlungQuery.fetch()
      const zaehlungsSorted = zaehlungs.sort((a, b) => zaehlungSort({ a, b }))
      zaehlungNodes = await Promise.all(
        zaehlungsSorted.map(
          async (zaehlung, index) => await buildZaehlung({ zaehlung, index }),
        ),
      )
    }
  }

  // 8 lieferung
  if (showLieferung) {
    const lieferungQuery = db.collections
      .get('lieferung')
      .query(...tableFilter({ store, table: 'lieferung' }))
    const lieferungCount = await lieferungQuery.fetchCount()
    lieferungFolderNodes = buildLieferungFolder({ count: lieferungCount })
    if (openNodes.some((n) => n.length === 1 && n[0] === 'Lieferungen')) {
      const lieferungs = await lieferungQuery.fetch()
      const lieferungsSorted = lieferungs.sort((a, b) =>
        lieferungSort({ a, b }),
      )
      lieferungNodes = lieferungsSorted.map((lieferung, index) =>
        buildLieferung({ lieferung, index }),
      )
    }
  }

  // 9 sammelLieferung
  if (showSammelLieferung) {
    const sammelLieferungQuery = db.collections
      .get('sammel_lieferung')
      .query(...tableFilter({ store, table: 'sammel_lieferung' }))
    const sammelLieferungCount = await sammelLieferungQuery.fetchCount()
    sammelLieferungFolderNodes = buildSammelLieferungFolder({
      count: sammelLieferungCount,
    })
    if (
      openNodes.some((n) => n.length === 1 && n[0] === 'Sammel-Lieferungen')
    ) {
      const sammelLieferungs = await sammelLieferungQuery.fetch()
      const sammelLieferungsSorted = sammelLieferungs.sort((a, b) =>
        lieferungSort({ a, b }),
      )
      sammelLieferungNodes = await Promise.all(
        sammelLieferungsSorted.map(
          async (sammelLieferung, index) =>
            await buildSammelLieferung({
              sammelLieferung,
              index,
            }),
        ),
      )

      // on to child nodes
      const openSammelLieferungNodes = openNodes.filter(
        (n) => n.length === 2 && n[0] === 'Sammel-Lieferungen',
      )
      for (const sammelLieferungNode of openSammelLieferungNodes) {
        const sammelLieferungId = sammelLieferungNode[1]
        const sammelLieferung = sammelLieferungsSorted.find(
          (a) => a.id === sammelLieferungId,
        )
        const sammelLieferungIndex = sammelLieferungNodes.findIndex(
          (a) => a.id === sammelLieferungId,
        )

        // 2.1 sammelLieferung > lieferung
        const lieferungs = await sammelLieferung.lieferungs
          .extend(...tableFilter({ store, table: 'lieferung' }))
          .fetch()
        const lieferungsSorted = lieferungs.sort((a, b) =>
          lieferungSort({ a, b }),
        )
        sammelLieferungLieferungFolderNodes = buildSammelLieferungLieferungFolder(
          {
            children: lieferungsSorted,
            sammelLieferungIndex,
            sammelLieferungId,
          },
        )
        const sammelLieferungLieferungFolderIsOpen = openNodes.some(
          (n) =>
            n.length === 3 &&
            n[0] === 'Sammel-Lieferungen' &&
            n[1] === sammelLieferungId &&
            n[2] === 'Lieferungen',
        )
        if (sammelLieferungLieferungFolderIsOpen) {
          sammelLieferungLieferungNodes = lieferungsSorted.map(
            (lieferung, lieferungIndex) =>
              buildSammelLieferungLieferung({
                lieferung,
                lieferungIndex,
                sammelLieferungId,
                sammelLieferungIndex,
              }),
          )
        }
      }
    }
  }

  // 10 event
  if (showEvent) {
    const eventQuery = db.collections
      .get('event')
      .query(...tableFilter({ store, table: 'event' }))
    const eventCount = await eventQuery.fetchCount()
    eventFolderNodes = buildEventFolder({ count: eventCount })
    if (openNodes.some((n) => n.length === 1 && n[0] === 'Events')) {
      const events = await eventQuery.fetch()
      const eventsSorted = events.sort((a, b) => eventSort({ a, b }))
      eventNodes = eventsSorted.map((event, index) =>
        buildEvent({ event, index }),
      )
    }
  }

  // 11 person
  if (showPerson) {
    const personQuery = db.collections
      .get('person')
      .query(...tableFilter({ store, table: 'person' }))
    const personCount = await personQuery.fetchCount()
    personFolderNodes = buildPersonFolder({ count: personCount })
    if (openNodes.some((n) => n.length === 1 && n[0] === 'Personen')) {
      const persons = await personQuery.fetch()
      const personsSorted = persons.sort((a, b) => personSort({ a, b }))
      personNodes = personsSorted.map((person, index) =>
        buildPerson({ person, index }),
      )

      // on to child nodes
      const openPersonNodes = openNodes.filter(
        (n) => n[0] === 'Personen' && n.length === 2,
      )
      for (const personNode of openPersonNodes) {
        const personId = personNode[1]
        const person = personsSorted.find((a) => a.id === personId)
        const personIndex = personNodes.findIndex((a) => a.id === personId)

        // person > sammlung
        const personSammlungQuery = person.sammlungs.extend(
          ...tableFilter({ store, table: 'sammlung' }),
        )
        const personSammlungCount = await personSammlungQuery.fetchCount()
        personSammlungFolderNodes = buildPersonSammlungFolder({
          count: personSammlungCount,
          personIndex,
          personId,
        })

        const personSammlungFolderIsOpen = openNodes.some(
          (n) =>
            n.length === 3 &&
            n[0] === 'Personen' &&
            n[1] === personId &&
            n[2] === 'Sammlungen',
        )
        if (personSammlungFolderIsOpen) {
          const sammlungs = await personSammlungQuery.fetch()
          const sammlungsSorted = await sammlungsSortedFromSammlungs(sammlungs)
          personSammlungNodes = await Promise.all(
            sammlungsSorted.map(
              async (sammlung, index) =>
                await buildPersonSammlung({
                  sammlung,
                  index,
                  personId,
                  personIndex,
                }),
            ),
          )
        }

        // person > garten
        const personGartenQuery = person.gartens.extend(
          ...tableFilter({ store, table: 'garten' }),
        )
        const personGartenCount = await personGartenQuery.fetchCount()
        personGartenFolderNodes = buildPersonGartenFolder({
          count: personGartenCount,
          personIndex,
          personId,
        })
        const personGartenFolderIsOpen = openNodes.some(
          (n) =>
            n.length === 3 &&
            n[0] === 'Personen' &&
            n[1] === personId &&
            n[2] === 'Gaerten',
        )
        if (personGartenFolderIsOpen) {
          const gartens = await personGartenQuery.fetch()
          const gartensSorted = await gartensSortedFromGartens(gartens)
          personGartenNodes = await Promise.all(
            gartensSorted.map(
              async (garten, index) =>
                await buildPersonGarten({
                  garten,
                  index,
                  personId,
                  personIndex,
                }),
            ),
          )

          const openPersonGartenNodes = openNodes.filter(
            (n) => n[0] === 'Personen' && n[2] === 'Gaerten' && n.length === 4,
          )
          for (const personGartenNode of openPersonGartenNodes) {
            const gartenId = personGartenNode[3]
            const garten = gartensSorted.find((s) => s.id === gartenId)
            if (!garten) break
            const gartenIndex = personGartenNodes.findIndex(
              (s) => s.id === `${personId}${gartenId}`,
            )

            // garten > kultur nodes
            const gartenKulturQuery = garten.kulturs.extend(
              ...tableFilter({ store, table: 'kultur' }),
            )
            const gartenKulturCount = await gartenKulturQuery.fetchCount()
            personGartenKulturFolderNodes = buildPersonGartenKulturFolder({
              gartenId,
              gartenIndex,
              personId,
              personIndex,
              count: gartenKulturCount,
            })
            const personGartenKulturFolderIsOpen = openNodes.some(
              (n) =>
                n.length === 5 &&
                n[0] === 'Personen' &&
                n[1] === personId &&
                n[2] === 'Gaerten' &&
                n[3] === gartenId &&
                n[4] === 'Kulturen',
            )
            if (personGartenKulturFolderIsOpen) {
              const kulturs = await gartenKulturQuery.fetch()
              const kultursSorted = await kultursSortedFromKulturs(kulturs)
              personGartenKulturNodes = await Promise.all(
                kultursSorted.map(
                  async (kultur, kulturIndex) =>
                    await buildPersonGartenKultur({
                      kultur,
                      kulturIndex,
                      gartenId,
                      gartenIndex,
                      personId,
                      personIndex,
                    }),
                ),
              )

              const openPersonGartenKulturNodes = openNodes.filter(
                (n) =>
                  n.length === 6 &&
                  n[0] === 'Personen' &&
                  n[1] === personId &&
                  n[2] === 'Gaerten' &&
                  n[3] === gartenId &&
                  n[4] === 'Kulturen',
              )
              for (const personGartenKulturNode of openPersonGartenKulturNodes) {
                const kulturId = personGartenKulturNode[5]
                const kulturIndex = personGartenKulturNodes.findIndex(
                  (s) => s.id === `${personId}${gartenId}${kulturId}`,
                )
                const kultur = kultursSorted.find((s) => s.id === kulturId)
                if (!kultur) break

                // teilkultur nodes
                const kulturOption = await kultur.kultur_option.fetch()
                console.log('buildNodes', {
                  kulturOption,
                  kultur,
                  tk: kulturOption?.tk,
                })
                if (kulturOption?.tk) {
                  const teilkulturQuery = kultur.teilkulturs.extend(
                    ...tableFilter({ store, table: 'teilkultur' }),
                  )
                  const teilkulturCount = await teilkulturQuery.fetchCount()
                  personGartenKulturTeilkulturFolderNodes = buildPersonGartenKulturTeilkulturFolder(
                    {
                      kulturId,
                      kulturIndex,
                      gartenId,
                      gartenIndex,
                      personId,
                      personIndex,
                      count: teilkulturCount,
                    },
                  )
                  const personGartenKulturTeilkulturFolderIsOpen = openNodes.some(
                    (n) =>
                      n.length === 7 &&
                      n[0] === 'Personen' &&
                      n[1] === personId &&
                      n[2] === 'Gaerten' &&
                      n[3] === gartenId &&
                      n[4] === 'Kulturen' &&
                      n[5] === kulturId &&
                      n[6] === 'Teilkulturen',
                  )

                  if (personGartenKulturTeilkulturFolderIsOpen) {
                    const teilkulturs = await teilkulturQuery.fetch()
                    const teilkultursSorted = teilkulturs.sort((a, b) =>
                      teilkulturSort({ a, b }),
                    )
                    personGartenKulturTeilkulturNodes = teilkultursSorted.map(
                      (teilkultur, teilkulturIndex) =>
                        buildPersonGartenKulturTeilkultur({
                          teilkultur,
                          teilkulturIndex,
                          kulturId,
                          kulturIndex,
                          gartenId,
                          gartenIndex,
                          personId,
                          personIndex,
                        }),
                    )
                  }
                }

                // zaehlung nodes
                const zaehlungQuery = kultur.zaehlungs.extend(
                  ...tableFilter({ store, table: 'zaehlung' }),
                )
                const zaehlungCount = await zaehlungQuery.fetchCount()
                personGartenKulturZaehlungFolderNodes = buildPersonGartenKulturZaehlungFolder(
                  {
                    kulturId,
                    kulturIndex,
                    gartenId,
                    gartenIndex,
                    personId,
                    personIndex,
                    count: zaehlungCount,
                  },
                )
                const personGartenKulturZaehlungFolderIsOpen = openNodes.some(
                  (n) =>
                    n.length === 7 &&
                    n[0] === 'Personen' &&
                    n[1] === personId &&
                    n[2] === 'Gaerten' &&
                    n[3] === gartenId &&
                    n[4] === 'Kulturen' &&
                    n[5] === kulturId &&
                    n[6] === 'Zaehlungen',
                )

                if (personGartenKulturZaehlungFolderIsOpen) {
                  const zaehlungs = await zaehlungQuery.fetch()
                  const zaehlungsSorted = zaehlungs.sort((a, b) =>
                    zaehlungSort({ a, b }),
                  )
                  personGartenKulturZaehlungNodes = await Promise.all(
                    zaehlungsSorted.map(
                      async (zaehlung, zaehlungIndex) =>
                        await buildPersonGartenKulturZaehlung({
                          zaehlung,
                          zaehlungIndex,
                          kulturId,
                          kulturIndex,
                          gartenId,
                          gartenIndex,
                          personId,
                          personIndex,
                        }),
                    ),
                  )
                }

                // anlieferung nodes
                const anlieferungQuery = kultur.anlieferungs.extend(
                  ...tableFilter({ store, table: 'lieferung' }),
                )
                const anlieferungCount = await anlieferungQuery.fetchCount()
                personGartenKulturAnlieferungFolderNodes = buildPersonGartenKulturAnlieferungFolder(
                  {
                    kulturId,
                    kulturIndex,
                    gartenId,
                    gartenIndex,
                    personId,
                    personIndex,
                    count: anlieferungCount,
                  },
                )
                const personGartenKulturAnlieferungFolderIsOpen = openNodes.some(
                  (n) =>
                    n.length === 7 &&
                    n[0] === 'Personen' &&
                    n[1] === personId &&
                    n[2] === 'Gaerten' &&
                    n[3] === gartenId &&
                    n[4] === 'Kulturen' &&
                    n[5] === kulturId &&
                    n[6] === 'An-Lieferungen',
                )

                if (personGartenKulturAnlieferungFolderIsOpen) {
                  const anlieferungs = await anlieferungQuery.fetch()
                  const anlieferungsSorted = anlieferungs.sort((a, b) =>
                    lieferungSort({ a, b }),
                  )
                  personGartenKulturAnlieferungNodes = anlieferungsSorted.map(
                    (lieferung, lieferungIndex) =>
                      buildPersonGartenKulturAnlieferung({
                        lieferung,
                        lieferungIndex,
                        kulturId,
                        kulturIndex,
                        gartenId,
                        gartenIndex,
                        personId,
                        personIndex,
                      }),
                  )
                }

                // auslieferung nodes
                const auslieferungQuery = kultur.auslieferungs.extend(
                  ...tableFilter({ store, table: 'lieferung' }),
                )
                const auslieferungCount = await auslieferungQuery.fetchCount()
                personGartenKulturAuslieferungFolderNodes = buildPersonGartenKulturAuslieferungFolder(
                  {
                    kulturId,
                    kulturIndex,
                    gartenId,
                    gartenIndex,
                    personId,
                    personIndex,
                    count: auslieferungCount,
                  },
                )
                const personGartenKulturAuslieferungFolderIsOpen = openNodes.some(
                  (n) =>
                    n.length === 7 &&
                    n[0] === 'Personen' &&
                    n[1] === personId &&
                    n[2] === 'Gaerten' &&
                    n[3] === gartenId &&
                    n[4] === 'Kulturen' &&
                    n[5] === kulturId &&
                    n[6] === 'An-Lieferungen',
                )

                if (personGartenKulturAuslieferungFolderIsOpen) {
                  const auslieferungs = await auslieferungQuery.fetch()
                  const auslieferungsSorted = auslieferungs.sort((a, b) =>
                    lieferungSort({ a, b }),
                  )
                  personGartenKulturAuslieferungNodes = auslieferungsSorted.map(
                    (lieferung, lieferungIndex) =>
                      buildPersonGartenKulturAuslieferung({
                        lieferung,
                        lieferungIndex,
                        kulturId,
                        kulturIndex,
                        gartenId,
                        gartenIndex,
                        personId,
                        personIndex,
                      }),
                  )
                }

                // event nodes
                const eventQuery = kultur.events.extend(
                  ...tableFilter({ store, table: 'event' }),
                )
                const eventCount = await eventQuery.fetchCount()
                personGartenKulturEventFolderNodes = buildPersonGartenKulturEventFolder(
                  {
                    kulturId,
                    kulturIndex,
                    gartenId,
                    gartenIndex,
                    personId,
                    personIndex,
                    count: eventCount,
                  },
                )
                const personGartenKulturEventFolderIsOpen = openNodes.some(
                  (n) =>
                    n.length === 7 &&
                    n[0] === 'Personen' &&
                    n[1] === personId &&
                    n[2] === 'Gaerten' &&
                    n[3] === gartenId &&
                    n[4] === 'Kulturen' &&
                    n[5] === kulturId &&
                    n[6] === 'Events',
                )

                if (personGartenKulturEventFolderIsOpen) {
                  const events = await eventQuery.fetch()
                  const eventsSorted = events.sort((a, b) =>
                    eventSort({ a, b }),
                  )
                  personGartenKulturEventNodes = eventsSorted.map(
                    (event, eventIndex) =>
                      buildPersonGartenKulturEvent({
                        event,
                        eventIndex,
                        kulturId,
                        kulturIndex,
                        gartenId,
                        gartenIndex,
                        personId,
                        personIndex,
                      }),
                  )
                }
              }
            }
          }
        }

        // person > lieferung
        const personLieferungQuery = person.lieferungs.extend(
          ...tableFilter({ store, table: 'lieferung' }),
        )
        const personLieferungCount = await personLieferungQuery.fetchCount()
        personLieferungFolderNodes = buildPersonLieferungFolder({
          count: personLieferungCount,
          personIndex,
          personId,
        })
        const personLieferungFolderIsOpen = openNodes.some(
          (n) =>
            n.length === 3 &&
            n[0] === 'Personen' &&
            n[1] === personId &&
            n[2] === 'Lieferungen',
        )
        if (personLieferungFolderIsOpen) {
          const lieferungs = await personLieferungQuery.fetch()
          const lieferungsSorted = lieferungs.sort((a, b) =>
            lieferungSort({ a, b }),
          )
          personLieferungNodes = lieferungsSorted.map((lieferung, index) =>
            buildPersonLieferung({
              lieferung,
              index,
              personId,
              personIndex,
            }),
          )
        }
      }
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
    ...kulturTeilkulturFolderNodes,
    ...kulturTeilkulturNodes,
    ...kulturZaehlungFolderNodes,
    ...kulturZaehlungNodes,
    ...kulturAnlieferungFolderNodes,
    ...kulturAnlieferungNodes,
    ...kulturAuslieferungFolderNodes,
    ...kulturAuslieferungNodes,
    ...kulturEventFolderNodes,
    ...kulturEventNodes,
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
    ...personGartenFolderNodes,
    ...personGartenNodes,
    ...personGartenKulturFolderNodes,
    ...personGartenKulturNodes,
    ...personGartenKulturAnlieferungFolderNodes,
    ...personGartenKulturAnlieferungNodes,
    ...personGartenKulturAuslieferungFolderNodes,
    ...personGartenKulturAuslieferungNodes,
    ...personGartenKulturEventFolderNodes,
    ...personGartenKulturEventNodes,
    ...personGartenKulturTeilkulturFolderNodes,
    ...personGartenKulturTeilkulturNodes,
    ...personGartenKulturZaehlungFolderNodes,
    ...personGartenKulturZaehlungNodes,
    ...personLieferungFolderNodes,
    ...personLieferungNodes,
    ...personSammlungFolderNodes,
    ...personSammlungNodes,
    ...sammelLieferungFolderNodes,
    ...sammelLieferungNodes,
    ...sammelLieferungLieferungFolderNodes,
    ...sammelLieferungLieferungNodes,
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
