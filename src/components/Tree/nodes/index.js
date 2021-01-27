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
import getShowArt from '../../../utils/showArt'
import getShowEvent from '../../../utils/showEvent'
import getShowGarten from '../../../utils/showGarten'
import getShowHerkunft from '../../../utils/showHerkunft'
import getShowKultur from '../../../utils/showKultur'
import getShowLieferung from '../../../utils/showLieferung'
import getShowPerson from '../../../utils/showPerson'
import getShowSammelLieferung from '../../../utils/showSammelLieferung'
import getShowSammlung from '../../../utils/showSammlung'
import getShowTeilkultur from '../../../utils/showTeilkultur'
import getShowZaehlung from '../../../utils/showZaehlung'

const compare = (a, b) => {
  // sort a before, if it has no value at this index
  if (a !== 0 && !a) return -1
  // sort a after if b has no value at this index
  if (b !== 0 && !b) return 1
  // sort a before if its value is smaller
  return a - b
}

const buildNodes = async ({ store, userPersonOption, userRole }) => {
  const { db } = store
  const {
    openNodes: openNodesRaw,
    activeNodeArray: activeNodeArrayRaw,
  } = store.tree
  const openNodes = getSnapshot(openNodesRaw)
  const activeNodeArray = activeNodeArrayRaw.toJSON()

  const showArt = getShowArt({ userRole, activeNodeArray })
  const showEvent = getShowEvent({ userPersonOption, activeNodeArray })
  const showGarten = getShowGarten()
  const showHerkunft = getShowHerkunft({ userRole, activeNodeArray })
  const showKultur = getShowKultur({ userPersonOption, activeNodeArray })
  const showLieferung = getShowLieferung({ userPersonOption, activeNodeArray })
  const showPerson = getShowPerson()
  const showSammelLieferung = getShowSammelLieferung({
    userPersonOption,
    activeNodeArray,
  })
  const showSammlung = getShowSammlung({ userRole, activeNodeArray })
  const showTeilkultur = getShowTeilkultur({
    userPersonOption,
    activeNodeArray,
  })
  const showZaehlung = getShowZaehlung({ userPersonOption, activeNodeArray })

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
    const artQuery = db
      .get('art')
      .query(...tableFilter({ store, table: 'art' }))
    const artCount = await artQuery.fetchCount()
    artFolderNodes = buildArtFolder({ count: artCount })
    const artFolderIsOpen = openNodes.some(
      (n) => n.length === 1 && n[0] === 'Arten',
    )
    if (artFolderIsOpen) {
      // build art nodes
      let arts = []
      try {
        arts = await artQuery.fetch()
      } catch {}
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
        if (!art) break
        const artIndex = artNodes.findIndex((a) => a.id === artId)

        // 1.1 art > sammlung
        const sammlungsQuery = art.sammlungs.extend(
          ...tableFilter({
            table: 'sammlung',
            store,
          }),
        )
        const sammlungCount = await sammlungsQuery.fetchCount()
        artSammlungFolderNodes.push(
          buildArtSammlungFolder({
            count: sammlungCount,
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
          let sammlungs = []
          try {
            sammlungs = await sammlungsQuery.fetch()
          } catch {}
          const sammlungsSorted = await sammlungsSortedFromSammlungs(sammlungs)
          const newArtSammlungNodes = await Promise.all(
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
          artSammlungNodes = [...artSammlungNodes, ...newArtSammlungNodes]
          const openArtSammlungNodes = openNodes.filter(
            (n) => n[0] === 'Arten' && n[2] === 'Sammlungen' && n.length === 4,
          )
          for (const artSammlungNode of openArtSammlungNodes) {
            const sammlungId = artSammlungNode[3]
            const sammlung = sammlungsSorted.find((s) => s.id === sammlungId)
            if (!sammlung) break
            const sammlungIndex = artSammlungNodes.findIndex(
              (s) => s.id === `${artId}${sammlungId}`,
            )

            let lieferungs = []
            try {
              lieferungs = await sammlung.lieferungs
                .extend(...tableFilter({ store, table: 'lieferung' }))
                .fetch()
            } catch {}
            const newArtSammlungAuslieferungFolderNode = await buildArtSammlungAuslieferungFolder(
              {
                sammlungId,
                sammlungIndex,
                artId,
                artIndex,
                children: lieferungs,
              },
            )
            artSammlungAuslieferungFolderNodes.push(
              newArtSammlungAuslieferungFolderNode,
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
              const lieferungsSorted = lieferungs.sort(lieferungSort)
              const newArtSammlungAuslieferungNodes = lieferungsSorted.map(
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
              artSammlungAuslieferungNodes = [
                ...artSammlungAuslieferungNodes,
                ...newArtSammlungAuslieferungNodes,
              ]
            }
          }
        }

        // 1.2 art > kultur
        const artKulturQuery = art.kulturs.extend(
          ...tableFilter({
            table: 'kultur',
            store,
          }),
        )
        const kulturCount = await artKulturQuery.fetchCount()
        artKulturFolderNodes.push(
          buildArtKulturFolder({
            count: kulturCount,
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
          let kulturs = []
          try {
            kulturs = await artKulturQuery.fetch()
          } catch {}
          const kultursSorted = await kultursSortedFromKulturs(kulturs)
          const newArtKulturNodes = await Promise.all(
            kultursSorted.map(
              async (kultur, kulturIndex) =>
                await buildArtKultur({ kultur, kulturIndex, artId, artIndex }),
            ),
          )
          artKulturNodes = [...artKulturNodes, ...newArtKulturNodes]
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
            let kulturOption
            try {
              kulturOption = await kultur.kultur_option.fetch()
            } catch {}
            if (kulturOption?.tk) {
              let teilkulturs = []
              try {
                teilkulturs = await kultur.teilkulturs
                  .extend(...tableFilter({ store, table: 'teilkultur' }))
                  .fetch()
              } catch {}
              artKulturTeilkulturFolderNodes.push(
                buildArtKulturTeilkulturFolder({
                  kulturId,
                  kulturIndex,
                  artId,
                  artIndex,
                  children: teilkulturs,
                }),
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
                const teilkultursSorted = teilkulturs.sort(teilkulturSort)
                const newArtKulturTeilkulturNodes = teilkultursSorted.map(
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
                artKulturTeilkulturNodes = [
                  ...artKulturTeilkulturNodes,
                  ...newArtKulturTeilkulturNodes,
                ]
              }
            }

            // zaehlung nodes
            const artKulturZaehlungQuery = kultur.zaehlungs.extend(
              ...tableFilter({ store, table: 'zaehlung' }),
            )
            const zaehlungsCount = await artKulturZaehlungQuery.fetchCount()
            artKulturZaehlungFolderNodes.push(
              buildArtKulturZaehlungFolder({
                kulturId,
                kulturIndex,
                artId,
                artIndex,
                count: zaehlungsCount,
              }),
            )
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
              let zaehlungs = []
              try {
                zaehlungs = await artKulturZaehlungQuery.fetch()
              } catch {}
              const zaehlungsSorted = zaehlungs.sort(zaehlungSort)
              const newArtKulturZaehlungNodes = await Promise.all(
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
              artKulturZaehlungNodes = [
                ...artKulturZaehlungNodes,
                ...newArtKulturZaehlungNodes,
              ]
            }

            // anlieferung nodes
            let anlieferungs = []
            try {
              anlieferungs = await kultur.anlieferungs
                .extend(...tableFilter({ store, table: 'lieferung' }))
                .fetch()
            } catch {}
            artKulturAnlieferungFolderNodes.push(
              buildArtKulturAnlieferungFolder({
                kulturId,
                kulturIndex,
                artId,
                artIndex,
                children: anlieferungs,
              }),
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
              const anlieferungsSorted = anlieferungs.sort(lieferungSort)
              const newArtKulturAnlieferungNodes = anlieferungsSorted.map(
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
              artKulturAnlieferungNodes = [
                ...artKulturAnlieferungNodes,
                ...newArtKulturAnlieferungNodes,
              ]
            }

            // auslieferung nodes
            let auslieferungs = []
            try {
              auslieferungs = await kultur.auslieferungs
                .extend(
                  ...tableFilter({
                    table: 'lieferung',
                    store,
                  }),
                )
                .fetch()
            } catch {}
            artKulturAuslieferungFolderNodes.push(
              buildArtKulturAuslieferungFolder({
                kulturId,
                kulturIndex,
                artId,
                artIndex,
                children: auslieferungs,
              }),
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
              const auslieferungsSorted = auslieferungs.sort(lieferungSort)
              const newArtKulturAuslieferungNodes = auslieferungsSorted.map(
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
              artKulturAuslieferungNodes = [
                ...artKulturAuslieferungNodes,
                ...newArtKulturAuslieferungNodes,
              ]
            }

            // event nodes
            const eventsQuery = kultur.events.extend(
              ...tableFilter({ store, table: 'event' }),
            )
            const eventsCount = await eventsQuery.fetchCount()
            artKulturEventFolderNodes.push(
              buildArtKulturEventFolder({
                kulturId,
                kulturIndex,
                artId,
                artIndex,
                count: eventsCount,
              }),
            )
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
              let events = []
              try {
                events = await eventsQuery.fetch()
              } catch {}
              const eventsSorted = events.sort(eventSort)
              const newArtKulturEventNodes = eventsSorted.map(
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
              artKulturEventNodes = [
                ...artKulturEventNodes,
                ...newArtKulturEventNodes,
              ]
            }
          }
        }
      }
    }
  }

  // 2 herkunft
  if (showHerkunft) {
    const herkunftQuery = db
      .get('herkunft')
      .query(...tableFilter({ store, table: 'herkunft' }))
    const herkunftCount = await herkunftQuery.fetchCount()
    herkunftFolderNodes = buildHerkunftFolder({ count: herkunftCount })
    if (openNodes.some((n) => n.length === 1 && n[0] === 'Herkuenfte')) {
      let herkunfts = []
      try {
        herkunfts = await herkunftQuery.fetch()
      } catch {}
      const herkunftsSorted = herkunfts.sort(herkunftSort)
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
        if (!herkunft) break

        const herkunftIndex = herkunftNodes.findIndex(
          (a) => a.id === herkunftId,
        )

        // 2.1 herkunft > sammlung
        const herkunftSammlungQuery = herkunft.sammlungs.extend(
          ...tableFilter({ store, table: 'sammlung' }),
        )
        const sammlungsCount = await herkunftSammlungQuery.fetchCount()
        herkunftSammlungFolderNodes.push(
          buildHerkunftSammlungFolder({
            count: sammlungsCount,
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
          let sammlungs = []
          try {
            sammlungs = await herkunftSammlungQuery.fetch()
          } catch {}
          const sammlungsSorted = await sammlungsSortedFromSammlungs(sammlungs)
          const newHerkunftSammlungNodes = await Promise.all(
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
          herkunftSammlungNodes = [
            ...herkunftSammlungNodes,
            ...newHerkunftSammlungNodes,
          ]
          const openHerkunftSammlungNodes = openNodes.filter(
            (n) =>
              n[0] === 'Herkuenfte' && n[2] === 'Sammlungen' && n.length === 4,
          )
          for (const herkunftSammlungNode of openHerkunftSammlungNodes) {
            const sammlungId = herkunftSammlungNode[3]
            const sammlung = sammlungsSorted.find((s) => s.id === sammlungId)
            if (!sammlung) break
            const sammlungIndex = herkunftSammlungNodes.findIndex(
              (s) => s.id === `${herkunftId}${sammlungId}`,
            )
            let lieferungs = []
            try {
              lieferungs = await sammlung.lieferungs
                .extend(...tableFilter({ store, table: 'lieferung' }))
                .fetch()
            } catch {}
            herkunftSammlungAuslieferungFolderNodes.push(
              buildHerkunftSammlungAuslieferungFolder({
                sammlungId,
                sammlungIndex,
                herkunftId,
                herkunftIndex,
                children: lieferungs,
              }),
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
              const lieferungsSorted = lieferungs.sort(lieferungSort)
              const newHerkunftSammlungAuslieferungNodes = lieferungsSorted.map(
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
              herkunftSammlungAuslieferungNodes = [
                ...herkunftSammlungAuslieferungNodes,
                ...newHerkunftSammlungAuslieferungNodes,
              ]
            }
          }
        }
      }
    }
  }

  // 3 sammlung
  if (showSammlung) {
    const sammlungQuery = db
      .get('sammlung')
      .query(...tableFilter({ store, table: 'sammlung' }))
    const sammlungCount = await sammlungQuery.fetchCount()
    sammlungFolderNodes = buildSammlungFolder({ count: sammlungCount })
    if (openNodes.some((n) => n.length === 1 && n[0] === 'Sammlungen')) {
      let sammlungs = []
      try {
        sammlungs = await sammlungQuery.fetch()
      } catch {}
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
        if (!sammlung) break
        const sammlungIndex = sammlungNodes.findIndex(
          (a) => a.id === sammlungId,
        )

        // 2.1 sammlung > herkunft
        const sammlungHerkunftQuery = sammlung.herkunft
        let herkunft
        try {
          herkunft = await sammlungHerkunftQuery.fetch()
        } catch {}
        sammlungHerkunftFolderNodes.push(
          buildSammlungHerkunftFolder({
            count: [herkunft].length,
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
          sammlungHerkunftNodes.push(
            buildSammlungHerkunft({
              herkunft,
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
        sammlungAuslieferungFolderNodes.push(
          buildSammlungAuslieferungFolder({
            count: sammlungLieferungCount,
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
          let lieferungs = []
          try {
            lieferungs = await sammlungLieferungQuery.fetch()
          } catch {}
          const lieferungsSorted = lieferungs.sort(lieferungSort)
          const newSammlungAuslieferungNodes = lieferungsSorted.map(
            (lieferung, lieferungIndex) =>
              buildSammlungAuslieferung({
                lieferung,
                lieferungIndex,
                sammlungId,
                sammlungIndex,
              }),
          )
          sammlungAuslieferungNodes = [
            ...sammlungAuslieferungNodes,
            ...newSammlungAuslieferungNodes,
          ]
        }
      }
    }
  }

  // 4 garten
  if (showGarten) {
    const gartenQuery = db
      .get('garten')
      .query(...tableFilter({ store, table: 'garten' }))
    const gartenCount = await gartenQuery.fetchCount()
    gartenFolderNodes = buildGartenFolder({ count: gartenCount })
    if (openNodes.some((n) => n.length === 1 && n[0] === 'Gaerten')) {
      let gartens = []
      try {
        gartens = await gartenQuery.fetch()
      } catch {}
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
        if (!garten) break
        const gartenIndex = gartenNodes.findIndex((a) => a.id === gartenId)

        // 2.1 garten > kultur
        const gartenKulturQuery = garten.kulturs.extend(
          ...tableFilter({ store, table: 'kultur' }),
        )
        const gartenKulturCount = await gartenKulturQuery.fetchCount()
        gartenKulturFolderNodes.push(
          buildGartenKulturFolder({
            count: gartenKulturCount,
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
          let kulturs = []
          try {
            kulturs = await gartenKulturQuery.fetch()
          } catch {}
          const kultursSorted = await kultursSortedFromKulturs(kulturs)
          const newGartenKulturNodes = await Promise.all(
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
          gartenKulturNodes = [...gartenKulturNodes, ...newGartenKulturNodes]

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
              let teilkulturs = []
              try {
                teilkulturs = await kultur.teilkulturs
                  .extend(
                    ...tableFilter({
                      table: 'teilkultur',
                      store,
                    }),
                  )
                  .fetch()
              } catch {}
              gartenKulturTeilkulturFolderNodes.push(
                buildGartenKulturTeilkulturFolder({
                  kulturId,
                  kulturIndex,
                  gartenId,
                  gartenIndex,
                  children: teilkulturs,
                }),
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
                const teilkultursSorted = teilkulturs.sort(teilkulturSort)
                const newGartenKulturTeilkulturNodes = teilkultursSorted.map(
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
                gartenKulturTeilkulturNodes = [
                  ...gartenKulturTeilkulturNodes,
                  ...newGartenKulturTeilkulturNodes,
                ]
              }
            }

            // garten > kultur > zaehlung
            let zaehlungs = []
            try {
              zaehlungs = await kultur.zaehlungs
                .extend(
                  ...tableFilter({
                    table: 'zaehlung',
                    store,
                  }),
                )
                .fetch()
            } catch {}
            gartenKulturZaehlungFolderNodes.push(
              buildGartenKulturZaehlungFolder({
                kulturId,
                kulturIndex,
                gartenId,
                gartenIndex,
                children: zaehlungs,
              }),
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
              const zaehlungsSorted = zaehlungs.sort(zaehlungSort)
              const newGartenKulturZaehlungNodes = await Promise.all(
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
              gartenKulturZaehlungNodes = [
                ...gartenKulturZaehlungNodes,
                ...newGartenKulturZaehlungNodes,
              ]
            }

            // garten > kultur > anlieferung
            let anlieferungs = []
            try {
              anlieferungs = await kultur.anlieferungs
                .extend(...tableFilter({ store, table: 'lieferung' }))
                .fetch()
            } catch {}
            gartenKulturAnlieferungFolderNodes.push(
              buildGartenKulturAnlieferungFolder({
                kulturId,
                kulturIndex,
                gartenId,
                gartenIndex,
                children: anlieferungs,
              }),
            )
            const gartenKulturAnlieferungFolderIsOpen = openNodes.some(
              (n) =>
                n.length === 5 &&
                n[0] === 'Gaerten' &&
                n[1] === gartenId &&
                n[2] === 'Kulturen' &&
                n[3] === kulturId &&
                n[4] === 'An-Lieferungen',
            )
            if (gartenKulturAnlieferungFolderIsOpen) {
              const anlieferungsSorted = anlieferungs.sort(lieferungSort)
              const newGartenKulturAnlieferungNodes = anlieferungsSorted.map(
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
              gartenKulturAnlieferungNodes = [
                ...gartenKulturAnlieferungNodes,
                ...newGartenKulturAnlieferungNodes,
              ]
            }

            // garten > kultur > auslieferung
            let auslieferungs = []
            try {
              auslieferungs = await kultur.auslieferungs
                .extend(...tableFilter({ store, table: 'lieferung' }))
                .fetch()
            } catch {}
            gartenKulturAuslieferungFolderNodes.push(
              buildGartenKulturAuslieferungFolder({
                kulturId,
                kulturIndex,
                gartenId,
                gartenIndex,
                children: auslieferungs,
              }),
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
              const auslieferungsSorted = auslieferungs.sort(lieferungSort)
              const newGartenKulturAuslieferungNodes = auslieferungsSorted.map(
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
              gartenKulturAuslieferungNodes = [
                ...gartenKulturAuslieferungNodes,
                ...newGartenKulturAuslieferungNodes,
              ]
            }

            // garten > kultur > event
            const gartenKulturEventQuery = kultur.events.extend(
              ...tableFilter({ store, table: 'event' }),
            )
            const gartenKulturEventCount = await gartenKulturEventQuery.fetchCount()
            gartenKulturEventFolderNodes.push(
              buildGartenKulturEventFolder({
                kulturId,
                kulturIndex,
                gartenId,
                gartenIndex,
                count: gartenKulturEventCount,
              }),
            )
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
              let events = []
              try {
                events = await gartenKulturEventQuery.fetch()
              } catch {}
              const eventsSorted = events.sort(eventSort)
              const newGartenKulturEventNodes = eventsSorted.map(
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
              gartenKulturEventNodes = [
                ...gartenKulturEventNodes,
                ...newGartenKulturEventNodes,
              ]
            }
          }
        }
      }
    }
  }

  // 5 kultur
  if (showKultur) {
    const kulturQuery = db
      .get('kultur')
      .query(...tableFilter({ store, table: 'kultur' }))
    const kulturCount = await kulturQuery.fetchCount()
    kulturFolderNodes = buildKulturFolder({ count: kulturCount })
    if (openNodes.some((n) => n.length === 1 && n[0] === 'Kulturen')) {
      let kulturs = []
      try {
        kulturs = await kulturQuery.fetch()
      } catch {}
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
        let kulturOption
        try {
          kulturOption = await kultur.kultur_option.fetch()
        } catch {}
        if (kulturOption?.tk) {
          const kulturTeilkulturQuery = kultur.teilkulturs.extend(
            ...tableFilter({ store, table: 'teilkultur' }),
          )
          const kulturTeilkulturCount = await kulturTeilkulturQuery.fetchCount()
          kulturTeilkulturFolderNodes.push(
            buildKulturTeilkulturFolder({
              count: kulturTeilkulturCount,
              kulturIndex,
              kulturId,
            }),
          )

          const kulturTeilkulturFolderIsOpen = openNodes.some(
            (n) =>
              n.length === 3 &&
              n[0] === 'Kulturen' &&
              n[1] === kulturId &&
              n[2] === 'Teilkulturen',
          )
          if (kulturTeilkulturFolderIsOpen) {
            let teilkulturs
            try {
              teilkulturs = await kulturTeilkulturQuery.fetch()
            } catch {}
            const teilkultursSorted = teilkulturs.sort(teilkulturSort)
            const newKulturTeilkulturNodes = teilkultursSorted.map(
              (teilkultur, teilkulturIndex) =>
                buildKulturTeilkultur({
                  teilkultur,
                  teilkulturIndex,
                  kulturId,
                  kulturIndex,
                }),
            )
            kulturTeilkulturNodes = [
              ...kulturTeilkulturNodes,
              ...newKulturTeilkulturNodes,
            ]
          }
        }

        // 2.1 kultur > zaehlung
        const kulturZaehlungQuery = kultur.zaehlungs.extend(
          ...tableFilter({ store, table: 'zaehlung' }),
        )
        const kulturZaehlungCount = await kulturZaehlungQuery.fetchCount()
        kulturZaehlungFolderNodes.push(
          buildKulturZaehlungFolder({
            count: kulturZaehlungCount,
            kulturIndex,
            kulturId,
          }),
        )

        const kulturZaehlungFolderIsOpen = openNodes.some(
          (n) =>
            n.length === 3 &&
            n[0] === 'Kulturen' &&
            n[1] === kulturId &&
            n[2] === 'Zaehlungen',
        )
        if (kulturZaehlungFolderIsOpen) {
          let zaehlungs = []
          try {
            zaehlungs = await kulturZaehlungQuery.fetch()
          } catch {}
          const zaehlungsSorted = zaehlungs.sort(zaehlungSort)
          const newKulturZaehlungNodes = await Promise.all(
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
          kulturZaehlungNodes = [
            ...kulturZaehlungNodes,
            ...newKulturZaehlungNodes,
          ]
        }

        // kultur > anlieferung
        const kulturAnlieferungQuery = kultur.anlieferungs.extend(
          ...tableFilter({ store, table: 'lieferung' }),
        )
        const kulturAnlieferungCount = await kulturAnlieferungQuery.fetchCount()
        kulturAnlieferungFolderNodes.push(
          buildKulturAnlieferungFolder({
            count: kulturAnlieferungCount,
            kulturIndex,
            kulturId,
          }),
        )
        const kulturAnlieferungFolderIsOpen = openNodes.some(
          (n) =>
            n.length === 3 &&
            n[0] === 'Kulturen' &&
            n[1] === kulturId &&
            n[2] === 'An-Lieferungen',
        )
        if (kulturAnlieferungFolderIsOpen) {
          let anlieferungs = []
          try {
            anlieferungs = await kulturAnlieferungQuery.fetch()
          } catch {}
          const anlieferungsSorted = anlieferungs.sort(lieferungSort)
          const newKulturAnlieferungNodes = anlieferungsSorted.map(
            (lieferung, lieferungIndex) =>
              buildKulturAnlieferung({
                lieferung,
                lieferungIndex,
                kulturId,
                kulturIndex,
              }),
          )
          kulturAnlieferungNodes = [
            ...kulturAnlieferungNodes,
            ...newKulturAnlieferungNodes,
          ]
        }

        // kultur > auslieferung
        const kulturAuslieferungQuery = kultur.auslieferungs.extend(
          ...tableFilter({ store, table: 'lieferung' }),
        )
        const kulturAuslieferungCount = await kulturAuslieferungQuery.fetchCount()
        kulturAuslieferungFolderNodes.push(
          buildKulturAuslieferungFolder({
            count: kulturAuslieferungCount,
            kulturIndex,
            kulturId,
          }),
        )
        const kulturAuslieferungFolderIsOpen = openNodes.some(
          (n) =>
            n.length === 3 &&
            n[0] === 'Kulturen' &&
            n[1] === kulturId &&
            n[2] === 'Aus-Lieferungen',
        )
        if (kulturAuslieferungFolderIsOpen) {
          let auslieferungs = []
          try {
            auslieferungs = await kulturAuslieferungQuery.fetch()
          } catch {}
          const auslieferungsSorted = auslieferungs.sort(lieferungSort)
          const newKulturAuslieferungNodes = auslieferungsSorted.map(
            (lieferung, lieferungIndex) =>
              buildKulturAuslieferung({
                lieferung,
                lieferungIndex,
                kulturId,
                kulturIndex,
              }),
          )
          kulturAuslieferungNodes = [
            ...kulturAuslieferungNodes,
            ...newKulturAuslieferungNodes,
          ]
        }

        // kultur > event
        const kulturEventQuery = kultur.events.extend(
          ...tableFilter({ store, table: 'event' }),
        )
        const kulturEventCount = await kulturEventQuery.fetchCount()
        kulturEventFolderNodes.push(
          buildKulturEventFolder({
            count: kulturEventCount,
            kulturIndex,
            kulturId,
          }),
        )
        const kulturEventFolderIsOpen = openNodes.some(
          (n) =>
            n.length === 3 &&
            n[0] === 'Kulturen' &&
            n[1] === kulturId &&
            n[2] === 'Events',
        )
        if (kulturEventFolderIsOpen) {
          let events = []
          try {
            events = await kulturEventQuery.fetch()
          } catch {}
          const eventsSorted = events.sort(eventSort)
          const newKulturEventNodes = eventsSorted.map((event, eventIndex) =>
            buildKulturEvent({
              event,
              eventIndex,
              kulturId,
              kulturIndex,
            }),
          )
          kulturEventNodes = [...kulturEventNodes, ...newKulturEventNodes]
        }
      }
    }
  }

  // 6 teilkultur
  if (showTeilkultur) {
    const teilkulturQuery = db
      .get('teilkultur')
      .query(...tableFilter({ store, table: 'teilkultur' }))
    const teilkulturCount = await teilkulturQuery.fetchCount()
    teilkulturFolderNodes = buildTeilkulturFolder({ count: teilkulturCount })
    if (openNodes.some((n) => n.length === 1 && n[0] === 'Teilkulturen')) {
      let teilkulturs = []
      try {
        teilkulturs = await teilkulturQuery.fetch()
      } catch {}
      const teilkultursSorted = teilkulturs.sort(teilkulturSort)
      teilkulturNodes = teilkultursSorted.map((teilkultur, index) =>
        buildTeilkultur({ teilkultur, index }),
      )
    }
  }

  // 7 zaehlung
  if (showZaehlung) {
    const zaehlungQuery = db
      .get('zaehlung')
      .query(...tableFilter({ store, table: 'zaehlung' }))
    const zaehlungCount = await zaehlungQuery.fetchCount()
    zaehlungFolderNodes = buildZaehlungFolder({ count: zaehlungCount })
    if (openNodes.some((n) => n.length === 1 && n[0] === 'Zaehlungen')) {
      let zaehlungs = []
      try {
        zaehlungs = await zaehlungQuery.fetch()
      } catch {}
      const zaehlungsSorted = zaehlungs.sort(zaehlungSort)
      zaehlungNodes = await Promise.all(
        zaehlungsSorted.map(
          async (zaehlung, index) => await buildZaehlung({ zaehlung, index }),
        ),
      )
    }
  }

  // 8 lieferung
  if (showLieferung) {
    const lieferungQuery = db
      .get('lieferung')
      .query(...tableFilter({ store, table: 'lieferung' }))
    const lieferungCount = await lieferungQuery.fetchCount()
    lieferungFolderNodes = buildLieferungFolder({ count: lieferungCount })
    if (openNodes.some((n) => n.length === 1 && n[0] === 'Lieferungen')) {
      let lieferungs = []
      try {
        lieferungs = await lieferungQuery.fetch()
      } catch {}
      const lieferungsSorted = lieferungs.sort(lieferungSort)
      lieferungNodes = lieferungsSorted.map((lieferung, index) =>
        buildLieferung({ lieferung, index }),
      )
    }
  }

  // 9 sammelLieferung
  if (showSammelLieferung) {
    const sammelLieferungQuery = db
      .get('sammel_lieferung')
      .query(...tableFilter({ store, table: 'sammel_lieferung' }))
    const sammelLieferungCount = await sammelLieferungQuery.fetchCount()
    sammelLieferungFolderNodes = buildSammelLieferungFolder({
      count: sammelLieferungCount,
    })
    if (
      openNodes.some((n) => n.length === 1 && n[0] === 'Sammel-Lieferungen')
    ) {
      let sammelLieferungs = []
      try {
        sammelLieferungs = await sammelLieferungQuery.fetch()
      } catch {}
      const sammelLieferungsSorted = sammelLieferungs.sort(lieferungSort)
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
        if (!sammelLieferung) break
        const sammelLieferungIndex = sammelLieferungNodes.findIndex(
          (a) => a.id === sammelLieferungId,
        )

        // 2.1 sammelLieferung > lieferung
        let lieferungs = []
        try {
          lieferungs = await sammelLieferung.lieferungs
            .extend(...tableFilter({ store, table: 'lieferung' }))
            .fetch()
        } catch {}
        const lieferungsSorted = lieferungs.sort(lieferungSort)
        sammelLieferungLieferungFolderNodes.push(
          buildSammelLieferungLieferungFolder({
            children: lieferungsSorted,
            sammelLieferungIndex,
            sammelLieferungId,
          }),
        )
        const sammelLieferungLieferungFolderIsOpen = openNodes.some(
          (n) =>
            n.length === 3 &&
            n[0] === 'Sammel-Lieferungen' &&
            n[1] === sammelLieferungId &&
            n[2] === 'Lieferungen',
        )
        if (sammelLieferungLieferungFolderIsOpen) {
          const newSammelLieferungLieferungNodes = lieferungsSorted.map(
            (lieferung, lieferungIndex) =>
              buildSammelLieferungLieferung({
                lieferung,
                lieferungIndex,
                sammelLieferungId,
                sammelLieferungIndex,
              }),
          )
          sammelLieferungLieferungNodes = [
            ...sammelLieferungLieferungNodes,
            ...newSammelLieferungLieferungNodes,
          ]
        }
      }
    }
  }

  // 10 event
  if (showEvent) {
    const eventQuery = db
      .get('event')
      .query(...tableFilter({ store, table: 'event' }))
    const eventCount = await eventQuery.fetchCount()
    eventFolderNodes = buildEventFolder({ count: eventCount })
    if (openNodes.some((n) => n.length === 1 && n[0] === 'Events')) {
      let events = []
      try {
        events = await eventQuery.fetch()
      } catch {}
      const eventsSorted = events.sort(eventSort)
      eventNodes = eventsSorted.map((event, index) =>
        buildEvent({ event, index }),
      )
    }
  }

  // 11 person
  if (showPerson) {
    const personQuery = db
      .get('person')
      .query(...tableFilter({ store, table: 'person' }))
    const personCount = await personQuery.fetchCount()
    personFolderNodes = buildPersonFolder({ count: personCount })
    if (openNodes.some((n) => n.length === 1 && n[0] === 'Personen')) {
      let persons = []
      try {
        persons = await personQuery.fetch()
      } catch {}
      const personsSorted = persons.sort(personSort)
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
        if (!person) break
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
          let sammlungs = []
          try {
            sammlungs = await personSammlungQuery.fetch()
          } catch {}
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
          let gartens = []
          try {
            gartens = await personGartenQuery.fetch()
          } catch {}
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

            // person > garten > kultur nodes
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
              let kulturs = []
              try {
                kulturs = await gartenKulturQuery.fetch()
              } catch {}
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
                const kultur = kultursSorted.find((s) => s.id === kulturId)
                if (!kultur) break
                const kulturIndex = personGartenKulturNodes.findIndex(
                  (s) => s.id === `${personId}${gartenId}${kulturId}`,
                )

                // teilkultur nodes
                let kulturOption
                try {
                  kulturOption = await kultur.kultur_option.fetch()
                } catch {}
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
                    let teilkulturs = []
                    try {
                      teilkulturs = await teilkulturQuery.fetch()
                    } catch {}
                    const teilkultursSorted = teilkulturs.sort(teilkulturSort)
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
                  let zaehlungs
                  try {
                    zaehlungs = await zaehlungQuery.fetch()
                  } catch {}
                  const zaehlungsSorted = zaehlungs.sort(zaehlungSort)
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
                  let anlieferungs = []
                  try {
                    anlieferungs = await anlieferungQuery.fetch()
                  } catch {}
                  const anlieferungsSorted = anlieferungs.sort(lieferungSort)
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
                  let auslieferungs = []
                  try {
                    auslieferungs = await auslieferungQuery.fetch()
                  } catch {}
                  const auslieferungsSorted = auslieferungs.sort(lieferungSort)
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
                  let events = []
                  try {
                    events = await eventQuery.fetch()
                  } catch {}
                  const eventsSorted = events.sort(eventSort)
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
          let lieferungs = []
          try {
            lieferungs = await personLieferungQuery.fetch()
          } catch {}
          const lieferungsSorted = lieferungs.sort(lieferungSort)
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
  console.log('buildNodes, nodes:', nodesSorted)
  return nodesSorted
}

export default buildNodes
