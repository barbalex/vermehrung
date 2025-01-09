import { Q } from '@nozbe/watermelondb'

import { getSnapshot } from 'mobx-state-tree'
import buildArtSammlungFolder from './art/sammlung/folder.js'
import buildArtSammlung from './art/sammlung/index.js'
import buildArtSammlungAuslieferungFolder from './art/sammlung/auslieferung/folder.js'
import buildArtSammlungAuslieferung from './art/sammlung/auslieferung/index.js'
import buildArtHerkunftFolder from './art/herkunft/folder.js'
import buildArtHerkunft from './art/herkunft/index.js'
import buildArtHerkunftSammlungFolder from './art/herkunft/sammlung/folder.js'
import buildArtHerkunftSammlung from './art/herkunft/sammlung/index.js'
import buildArtHerkunftSammlungAuslieferungFolder from './art/herkunft/sammlung/auslieferung/folder.js'
import buildArtHerkunftSammlungAuslieferung from './art/herkunft/sammlung/auslieferung/index.js'
import buildArtHerkunftKulturFolder from './art/herkunft/kultur/folder.js'
import buildArtHerkunftKultur from './art/herkunft/kultur/index.js'
import buildArtHerkunftKulturTeilkulturFolder from './art/herkunft/kultur/teilkultur/folder.js'
import buildArtHerkunftKulturTeilkultur from './art/herkunft/kultur/teilkultur/index.js'
import buildArtHerkunftKulturZaehlungFolder from './art/herkunft/kultur/zaehlung/folder.js'
import buildArtHerkunftKulturZaehlung from './art/herkunft/kultur/zaehlung/index.js'
import buildArtHerkunftKulturAnlieferungFolder from './art/herkunft/kultur/anlieferung/folder.js'
import buildArtHerkunftKulturAnlieferung from './art/herkunft/kultur/anlieferung/index.js'
import buildArtHerkunftKulturAuslieferungFolder from './art/herkunft/kultur/auslieferung/folder.js'
import buildArtHerkunftKulturAuslieferung from './art/herkunft/kultur/auslieferung/index.js'
import buildArtHerkunftKulturEventFolder from './art/herkunft/kultur/event/folder.js'
import buildArtHerkunftKulturEvent from './art/herkunft/kultur/event/index.js'
import buildArtKulturFolder from './art/kultur/folder.js'
import buildArtKultur from './art/kultur/index.js'
import buildArtKulturTeilkulturFolder from './art/kultur/teilkultur/folder.js'
import buildArtKulturTeilkultur from './art/kultur/teilkultur/index.js'
import buildArtKulturZaehlungFolder from './art/kultur/zaehlung/folder.js'
import buildArtKulturZaehlung from './art/kultur/zaehlung/index.js'
import buildArtKulturAnlieferungFolder from './art/kultur/anlieferung/folder.js'
import buildArtKulturAnlieferung from './art/kultur/anlieferung/index.js'
import buildArtKulturAuslieferungFolder from './art/kultur/auslieferung/folder.js'
import buildArtKulturAuslieferung from './art/kultur/auslieferung/index.js'
import buildArtKulturEventFolder from './art/kultur/event/folder.js'
import buildArtKulturEvent from './art/kultur/event/index.js'
import buildArtFolder from './art/folder.js'
import buildArt from './art/index.js'
import buildHerkunftFolder from './herkunft/folder.js'
import buildHerkunft from './herkunft/index.js'
import buildHerkunftSammlungFolder from './herkunft/sammlung/folder.js'
import buildHerkunftSammlung from './herkunft/sammlung/index.js'
import buildHerkunftSammlungAuslieferungFolder from './herkunft/sammlung/auslieferung/folder.js'
import buildHerkunftSammlungAuslieferung from './herkunft/sammlung/auslieferung/index.js'
import buildGartenFolder from './garten/folder.js'
import buildGarten from './garten/index.js'
import buildGartenKulturFolder from './garten/kultur/folder.js'
import buildGartenKultur from './garten/kultur/index.js'
import buildGartenKulturTeilkulturFolder from './garten/kultur/teilkultur/folder.js'
import buildGartenKulturTeilkultur from './garten/kultur/teilkultur/index.js'
import buildGartenKulturZaehlungFolder from './garten/kultur/zaehlung/folder.js'
import buildGartenKulturZaehlung from './garten/kultur/zaehlung/index.js'
import buildGartenKulturAnlieferungFolder from './garten/kultur/anlieferung/folder.js'
import buildGartenKulturAnlieferung from './garten/kultur/anlieferung/index.js'
import buildGartenKulturAuslieferungFolder from './garten/kultur/auslieferung/folder.js'
import buildGartenKulturAuslieferung from './garten/kultur/auslieferung/index.js'
import buildGartenKulturEventFolder from './garten/kultur/event/folder.js'
import buildGartenKulturEvent from './garten/kultur/event/index.js'
import buildKulturFolder from './kultur/folder.js'
import buildKultur from './kultur/index.js'
import buildKulturTeilkulturFolder from './kultur/teilkultur/folder.js'
import buildKulturTeilkultur from './kultur/teilkultur/index.js'
import buildKulturZaehlungFolder from './kultur/zaehlung/folder.js'
import buildKulturZaehlung from './kultur/zaehlung/index.js'
import buildKulturAuslieferungFolder from './kultur/auslieferung/folder.js'
import buildKulturAuslieferung from './kultur/auslieferung/index.js'
import buildKulturAnlieferungFolder from './kultur/anlieferung/folder.js'
import buildKulturAnlieferung from './kultur/anlieferung/index.js'
import buildKulturEventFolder from './kultur/event/folder.js'
import buildKulturEvent from './kultur/event/index.js'
import buildTeilkulturFolder from './teilkultur/folder.js'
import buildTeilkultur from './teilkultur/index.js'
import buildSammlungFolder from './sammlung/folder.js'
import buildSammlung from './sammlung/index.js'
import buildSammlungHerkunftFolder from './sammlung/herkunft/folder.js'
import buildSammlungHerkunft from './sammlung/herkunft/index.js'
import buildSammlungAuslieferungFolder from './sammlung/auslieferung/folder.js'
import buildSammlungAuslieferung from './sammlung/auslieferung/index.js'
import buildZaehlungFolder from './zaehlung/folder.js'
import buildZaehlung from './zaehlung/index.js'
import buildLieferungFolder from './lieferung/folder.js'
import buildLieferung from './lieferung/index.js'
import buildEventFolder from './event/folder.js'
import buildEvent from './event/index.js'
import buildPersonFolder from './person/folder.js'
import buildPerson from './person/index.js'
import buildPersonGartenFolder from './person/garten/folder.js'
import buildPersonGarten from './person/garten/index.js'
import buildPersonGartenKulturFolder from './person/garten/kultur/folder.js'
import buildPersonGartenKultur from './person/garten/kultur/index.js'
import buildPersonGartenKulturAnlieferungFolder from './person/garten/kultur/anlieferung/folder.js'
import buildPersonGartenKulturAnlieferung from './person/garten/kultur/anlieferung/index.js'
import buildPersonGartenKulturAuslieferungFolder from './person/garten/kultur/auslieferung/folder.js'
import buildPersonGartenKulturAuslieferung from './person/garten/kultur/auslieferung/index.js'
import buildPersonGartenKulturEventFolder from './person/garten/kultur/event/folder.js'
import buildPersonGartenKulturEvent from './person/garten/kultur/event/index.js'
import buildPersonGartenKulturTeilkulturFolder from './person/garten/kultur/teilkultur/folder.js'
import buildPersonGartenKulturTeilkultur from './person/garten/kultur/teilkultur/index.js'
import buildPersonGartenKulturZaehlungFolder from './person/garten/kultur/zaehlung/folder.js'
import buildPersonGartenKulturZaehlung from './person/garten/kultur/zaehlung/index.js'
import buildPersonLieferungFolder from './person/lieferung/folder.js'
import buildPersonLieferung from './person/lieferung/index.js'
import buildPersonSammlungFolder from './person/sammlung/folder.js'
import buildPersonSammlung from './person/sammlung/index.js'
import buildSammelLieferungFolder from './sammelLieferung/folder.js'
import buildSammelLieferung from './sammelLieferung/index.js'
import buildSammelLieferungLieferungFolder from './sammelLieferung/lieferung/folder.js'
import buildSammelLieferungLieferung from './sammelLieferung/lieferung/index.js'
import { herkunftSort } from '../../../utils/herkunftSort.js'
import { teilkulturSort } from '../../../utils/teilkulturSort.js'
import { zaehlungSort } from '../../../utils/zaehlungSort.js'
import { lieferungSort } from '../../../utils/lieferungSort.js'
import { eventSort } from '../../../utils/eventSort.js'
import { personSort } from '../../../utils/personSort.js'
import { artsSortedFromArts } from '../../../utils/artsSortedFromArts.js'
import { kultursSortedFromKulturs } from '../../../utils/kultursSortedFromKulturs.js'
import { gartensSortedFromGartens } from '../../../utils/gartensSortedFromGartens.js'
import { sammlungsSortedFromSammlungs } from '../../../utils/sammlungsSortedFromSammlungs.js'
import { tableFilter } from '../../../utils/tableFilter.js'
import { getShowArt } from '../../../utils/showArt.js'
import { getShowEvent } from '../../../utils/showEvent.js'
import { getShowGarten } from '../../../utils/showGarten.js'
import { getShowHerkunft } from '../../../utils/showHerkunft.js'
import { getShowKultur } from '../../../utils/showKultur.js'
import { getShowLieferung } from '../../../utils/showLieferung.js'
import { getShowPerson } from '../../../utils/showPerson.js'
import getShowSammelLieferung from '../../../utils/showSammelLieferung.js'
import getShowSammlung from '../../../utils/showSammlung.js'
import getShowTeilkultur from '../../../utils/showTeilkultur.js'
import getShowZaehlung from '../../../utils/showZaehlung.js'

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
  const { openNodes: openNodesRaw, activeNodeArray: activeNodeArrayRaw } =
    store.tree
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
  const artHerkunftFolderNodes = []
  const artHerkunftNodes = []
  const artHerkunftSammlungFolderNodes = []
  const artHerkunftSammlungNodes = []
  const artHerkunftSammlungAuslieferungFolderNodes = []
  const artHerkunftSammlungAuslieferungNodes = []
  const artHerkunftKulturFolderNodes = []
  const artHerkunftKulturNodes = []
  const artHerkunftKulturTeilkulturFolderNodes = []
  const artHerkunftKulturTeilkulturNodes = []
  const artHerkunftKulturZaehlungFolderNodes = []
  const artHerkunftKulturZaehlungNodes = []
  const artHerkunftKulturAnlieferungFolderNodes = []
  const artHerkunftKulturAnlieferungNodes = []
  const artHerkunftKulturAuslieferungFolderNodes = []
  const artHerkunftKulturAuslieferungNodes = []
  const artHerkunftKulturEventFolderNodes = []
  const artHerkunftKulturEventNodes = []
  const artKulturFolderNodes = []
  const artKulturNodes = []
  const artKulturTeilkulturFolderNodes = []
  const artKulturTeilkulturNodes = []
  const artKulturZaehlungFolderNodes = []
  const artKulturZaehlungNodes = []
  const artKulturAnlieferungFolderNodes = []
  const artKulturAnlieferungNodes = []
  const artKulturAuslieferungFolderNodes = []
  const artKulturAuslieferungNodes = []
  const artKulturEventFolderNodes = []
  const artKulturEventNodes = []
  const artSammlungFolderNodes = []
  const artSammlungNodes = []
  const artSammlungAuslieferungFolderNodes = []
  const artSammlungAuslieferungNodes = []
  let herkunftFolderNodes = []
  let herkunftNodes = []
  const herkunftSammlungFolderNodes = []
  const herkunftSammlungNodes = []
  const herkunftSammlungAuslieferungFolderNodes = []
  const herkunftSammlungAuslieferungNodes = []
  let sammlungFolderNodes = []
  let sammlungNodes = []
  const sammlungHerkunftFolderNodes = []
  const sammlungHerkunftNodes = []
  const sammlungAuslieferungFolderNodes = []
  const sammlungAuslieferungNodes = []
  let gartenFolderNodes = []
  let gartenNodes = []
  const gartenKulturFolderNodes = []
  const gartenKulturNodes = []
  const gartenKulturTeilkulturFolderNodes = []
  const gartenKulturTeilkulturNodes = []
  const gartenKulturZaehlungFolderNodes = []
  const gartenKulturZaehlungNodes = []
  const gartenKulturAnlieferungFolderNodes = []
  const gartenKulturAnlieferungNodes = []
  const gartenKulturAuslieferungFolderNodes = []
  const gartenKulturAuslieferungNodes = []
  const gartenKulturEventFolderNodes = []
  const gartenKulturEventNodes = []
  let kulturFolderNodes = []
  let kulturNodes = []
  const kulturTeilkulturFolderNodes = []
  const kulturTeilkulturNodes = []
  const kulturZaehlungFolderNodes = []
  const kulturZaehlungNodes = []
  const kulturAnlieferungFolderNodes = []
  const kulturAnlieferungNodes = []
  const kulturAuslieferungFolderNodes = []
  const kulturAuslieferungNodes = []
  const kulturEventFolderNodes = []
  const kulturEventNodes = []
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
  const personGartenFolderNodes = []
  const personGartenNodes = []
  const personGartenKulturFolderNodes = []
  const personGartenKulturNodes = []
  const personGartenKulturAnlieferungFolderNodes = []
  const personGartenKulturAnlieferungNodes = []
  const personGartenKulturAuslieferungFolderNodes = []
  const personGartenKulturAuslieferungNodes = []
  const personGartenKulturEventFolderNodes = []
  const personGartenKulturEventNodes = []
  const personGartenKulturTeilkulturFolderNodes = []
  const personGartenKulturTeilkulturNodes = []
  const personGartenKulturZaehlungFolderNodes = []
  const personGartenKulturZaehlungNodes = []
  const personLieferungFolderNodes = []
  const personLieferungNodes = []
  const personSammlungFolderNodes = []
  const personSammlungNodes = []
  let sammelLieferungFolderNodes = []
  let sammelLieferungNodes = []
  const sammelLieferungLieferungFolderNodes = []
  const sammelLieferungLieferungNodes = []

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

        // 1.1 art > Herkunft
        const herkunftsQuery = art.herkunfts.extend(
          ...tableFilter({
            table: 'herkunft',
            store,
          }),
        )
        const herkunftCount = await herkunftsQuery.fetchCount()
        artHerkunftFolderNodes.push(
          buildArtHerkunftFolder({
            count: herkunftCount,
            artIndex,
            artId,
          }),
        )

        const artHerkunftFolderIsOpen = openNodes.some(
          (n) =>
            n.length === 3 &&
            n[0] === 'Arten' &&
            n[1] === artId &&
            n[2] === 'Herkuenfte',
        )
        if (artHerkunftFolderIsOpen) {
          let herkunfts = []
          try {
            herkunfts = await herkunftsQuery.fetch()
          } catch {}
          const herkunftsSorted = herkunfts.sort(herkunftSort)
          const newArtHerkunftNodes = await Promise.all(
            herkunftsSorted.map(
              async (herkunft, herkunftIndex) =>
                await buildArtHerkunft({
                  herkunft,
                  herkunftIndex,
                  artId,
                  artIndex,
                }),
            ),
          )
          artHerkunftNodes.push(...newArtHerkunftNodes)
          const openArtHerkunftNodes = openNodes.filter(
            (n) => n[0] === 'Arten' && n[2] === 'Herkuenfte' && n.length === 4,
          )
          for (const herkunftNode of openArtHerkunftNodes) {
            const herkunftId = herkunftNode[3]
            const herkunft = herkunftsSorted.find((a) => a.id === herkunftId)
            if (!herkunft) break
            const herkunftIndex = artHerkunftNodes.findIndex(
              (a) => a.id === `${artId}/${herkunftId}`,
            )

            // 1.1.1 art > Herkunft > Sammlung
            const artHerkunftsSammlungsQuery = herkunft.sammlungs.extend(
              ...tableFilter({
                table: 'sammlung',
                store,
              }),
              Q.experimentalJoinTables(['art']),
              Q.on('art', 'id', artId),
            )
            const artHerkunftSammlungCount =
              await artHerkunftsSammlungsQuery.fetchCount()
            artHerkunftSammlungFolderNodes.push(
              buildArtHerkunftSammlungFolder({
                count: artHerkunftSammlungCount,
                herkunft,
                herkunftIndex,
                artId,
                artIndex,
              }),
            )

            const artHerkunftSammlungFolderIsOpen = openNodes.some(
              (n) =>
                n.length === 5 &&
                n[0] === 'Arten' &&
                n[1] === artId &&
                n[2] === 'Herkuenfte' &&
                n[3] === herkunftId &&
                n[4] === 'Sammlungen',
            )

            if (artHerkunftSammlungFolderIsOpen) {
              let artHerkunftSammlungs = []
              try {
                artHerkunftSammlungs = await artHerkunftsSammlungsQuery.fetch()
              } catch {}
              const artHerkunftSammlungsSorted =
                await sammlungsSortedFromSammlungs(artHerkunftSammlungs)
              const newArtHerkunftSammlungNodes = await Promise.all(
                artHerkunftSammlungsSorted.map(
                  async (sammlung, sammlungIndex) =>
                    await buildArtHerkunftSammlung({
                      sammlung,
                      sammlungIndex,
                      herkunft,
                      herkunftIndex,
                      artId,
                      artIndex,
                    }),
                ),
              )
              artHerkunftSammlungNodes.push(...newArtHerkunftSammlungNodes)
              const openArtHerkunftSammlungNodes = openNodes.filter(
                (n) =>
                  n[0] === 'Arten' &&
                  n[2] === 'Herkuenfte' &&
                  n[4] === 'Sammlungen' &&
                  n.length === 6,
              )
              for (const artHerkunftSammlungNode of openArtHerkunftSammlungNodes) {
                const sammlungId = artHerkunftSammlungNode[5]
                const sammlung = artHerkunftSammlungsSorted.find(
                  (a) => a.id === sammlungId,
                )
                if (!sammlung) break
                const sammlungIndex = artHerkunftSammlungNodes.findIndex(
                  (a) => a.id === `${artId}/${herkunftId}/${sammlungId}`,
                )
                const artHerkunftsSammlungAuslieferungsQuery =
                  sammlung.lieferungs.extend(
                    ...tableFilter({
                      table: 'lieferung',
                      store,
                    }),
                    Q.experimentalJoinTables(['art']),
                    Q.on('art', 'id', artId),
                  )
                const artHerkunftSammlungCount =
                  await artHerkunftsSammlungAuslieferungsQuery.fetchCount()
                artHerkunftSammlungAuslieferungFolderNodes.push(
                  buildArtHerkunftSammlungAuslieferungFolder({
                    count: artHerkunftSammlungCount,
                    sammlung,
                    sammlungIndex,
                    herkunft,
                    herkunftIndex,
                    artId,
                    artIndex,
                  }),
                )
                const artHerkunftSammlungAuslieferungFolderIsOpen =
                  openNodes.some(
                    (n) =>
                      n.length === 7 &&
                      n[0] === 'Arten' &&
                      n[1] === artId &&
                      n[2] === 'Herkuenfte' &&
                      n[3] === herkunftId &&
                      n[4] === 'Sammlungen' &&
                      n[5] === sammlungId &&
                      n[6] === 'Aus-Lieferungen',
                  )
                if (artHerkunftSammlungAuslieferungFolderIsOpen) {
                  let artHerkunftSammlungAuslieferungs = []
                  try {
                    artHerkunftSammlungAuslieferungs =
                      await artHerkunftsSammlungAuslieferungsQuery.fetch()
                  } catch {}
                  const artHerkunftSammlungAuslieferungsSorted =
                    artHerkunftSammlungAuslieferungs.sort(lieferungSort)
                  const newArtHerkunftSammlungAuslieferungNodes =
                    await Promise.all(
                      artHerkunftSammlungAuslieferungsSorted.map(
                        async (lieferung, lieferungIndex) =>
                          await buildArtHerkunftSammlungAuslieferung({
                            lieferung,
                            lieferungIndex,
                            sammlung,
                            sammlungIndex,
                            herkunft,
                            herkunftIndex,
                            artId,
                            artIndex,
                          }),
                      ),
                    )
                  artHerkunftSammlungAuslieferungNodes.push(
                    ...newArtHerkunftSammlungAuslieferungNodes,
                  )
                }
              }
            }

            // 1.1.2 art > herkunft > kultur
            const artHerkunftsKultursQuery = db
              .get('kultur')
              .query(
                ...tableFilter({ store, table: 'kultur' }),
                Q.experimentalJoinTables(['art']),
                Q.on('art', 'id', artId),
                Q.experimentalJoinTables(['herkunft']),
                Q.on('herkunft', 'id', herkunftId),
              )
            const artHerkunftKulturCount =
              await artHerkunftsKultursQuery.fetchCount()
            artHerkunftKulturFolderNodes.push(
              buildArtHerkunftKulturFolder({
                count: artHerkunftKulturCount,
                herkunft,
                herkunftIndex,
                artId,
                artIndex,
              }),
            )

            const artHerkunftKulturFolderIsOpen = openNodes.some(
              (n) =>
                n.length === 5 &&
                n[0] === 'Arten' &&
                n[1] === artId &&
                n[2] === 'Herkuenfte' &&
                n[3] === herkunftId &&
                n[4] === 'Kulturen',
            )

            if (artHerkunftKulturFolderIsOpen) {
              let artHerkunftKulturs = []
              try {
                artHerkunftKulturs = await artHerkunftsKultursQuery.fetch()
              } catch {}
              const artHerkunftKultursSorted =
                await kultursSortedFromKulturs(artHerkunftKulturs)
              const newArtHerkunftKulturNodes = await Promise.all(
                artHerkunftKultursSorted.map(
                  async (kultur, kulturIndex) =>
                    await buildArtHerkunftKultur({
                      kultur,
                      kulturIndex,
                      artId,
                      artIndex,
                      herkunft,
                      herkunftIndex,
                    }),
                ),
              )
              artHerkunftKulturNodes.push(...newArtHerkunftKulturNodes)
              const openArtHerkunftKulturNodes = openNodes.filter(
                (n) =>
                  n[0] === 'Arten' &&
                  n[1] === artId &&
                  n[2] === 'Herkuenfte' &&
                  n[3] === herkunftId &&
                  n[4] === 'Kulturen' &&
                  n.length === 6,
              )
              for (const artHerkunftKulturNode of openArtHerkunftKulturNodes) {
                const kulturId = artHerkunftKulturNode[5]
                const kultur = artHerkunftKultursSorted.find(
                  (s) => s.id === kulturId,
                )
                if (!kultur) break
                const kulturIndex = newArtHerkunftKulturNodes.findIndex(
                  (s) => s.id === `${artId}/${herkunftId}/${kulturId}`,
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
                  artHerkunftKulturTeilkulturFolderNodes.push(
                    buildArtHerkunftKulturTeilkulturFolder({
                      kulturId,
                      kulturIndex,
                      artId,
                      artIndex,
                      herkunft,
                      herkunftIndex,
                      count: teilkulturs.length,
                    }),
                  )
                  const artHerkunftKulturTeilkulturFolderIsOpen =
                    openNodes.some(
                      (n) =>
                        n.length === 7 &&
                        n[0] === 'Arten' &&
                        n[1] === artId &&
                        n[2] === 'Herkuenfte' &&
                        n[3] === herkunftId &&
                        n[4] === 'Kulturen' &&
                        n[5] === kulturId &&
                        n[6] === 'Teilkulturen',
                    )
                  if (artHerkunftKulturTeilkulturFolderIsOpen) {
                    const teilkultursSorted = teilkulturs.sort(teilkulturSort)
                    const newArtKulturTeilkulturNodes = teilkultursSorted.map(
                      (teilkultur, teilkulturIndex) =>
                        buildArtHerkunftKulturTeilkultur({
                          teilkultur,
                          teilkulturIndex,
                          kulturId,
                          kulturIndex,
                          artId,
                          artIndex,
                          herkunft,
                          herkunftIndex,
                        }),
                    )
                    artHerkunftKulturTeilkulturNodes.push(
                      ...newArtKulturTeilkulturNodes,
                    )
                  }
                }

                // zaehlung nodes
                const artHerkunftKulturZaehlungQuery = kultur.zaehlungs.extend(
                  ...tableFilter({ store, table: 'zaehlung' }),
                )
                const zaehlungsCount =
                  await artHerkunftKulturZaehlungQuery.fetchCount()
                artHerkunftKulturZaehlungFolderNodes.push(
                  buildArtHerkunftKulturZaehlungFolder({
                    kulturId,
                    kulturIndex,
                    artId,
                    artIndex,
                    herkunft,
                    herkunftIndex,
                    count: zaehlungsCount,
                  }),
                )
                const artHerkunftKulturZaehlungFolderIsOpen = openNodes.some(
                  (n) =>
                    n.length === 7 &&
                    n[0] === 'Arten' &&
                    n[1] === artId &&
                    n[2] === 'Herkuenfte' &&
                    n[3] === herkunftId &&
                    n[4] === 'Kulturen' &&
                    n[5] === kulturId &&
                    n[6] === 'Zaehlungen',
                )
                if (artHerkunftKulturZaehlungFolderIsOpen) {
                  let zaehlungs = []
                  try {
                    zaehlungs = await artHerkunftKulturZaehlungQuery.fetch()
                  } catch {}
                  const zaehlungsSorted = zaehlungs.sort(zaehlungSort)
                  const newArtHerkunftKulturZaehlungNodes = await Promise.all(
                    zaehlungsSorted.map(
                      async (zaehlung, zaehlungIndex) =>
                        await buildArtHerkunftKulturZaehlung({
                          zaehlung,
                          zaehlungIndex,
                          kulturId,
                          kulturIndex,
                          artId,
                          artIndex,
                          herkunft,
                          herkunftIndex,
                        }),
                    ),
                  )
                  artHerkunftKulturZaehlungNodes.push(
                    ...newArtHerkunftKulturZaehlungNodes,
                  )
                }

                // anlieferung nodes
                let anlieferungs = []
                try {
                  anlieferungs = await kultur.anlieferungs
                    .extend(...tableFilter({ store, table: 'lieferung' }))
                    .fetch()
                } catch {}
                artHerkunftKulturAnlieferungFolderNodes.push(
                  buildArtHerkunftKulturAnlieferungFolder({
                    kulturId,
                    kulturIndex,
                    artId,
                    artIndex,
                    herkunft,
                    herkunftIndex,
                    count: anlieferungs.length,
                  }),
                )
                const artKulturAnlieferungFolderIsOpen = openNodes.some(
                  (n) =>
                    n.length === 7 &&
                    n[0] === 'Arten' &&
                    n[1] === artId &&
                    n[2] === 'Herkuenfte' &&
                    n[3] === herkunftId &&
                    n[4] === 'Kulturen' &&
                    n[5] === kulturId &&
                    n[6] === 'An-Lieferungen',
                )
                if (artKulturAnlieferungFolderIsOpen) {
                  const anlieferungsSorted = anlieferungs.sort(lieferungSort)
                  const newArtHerkunftKulturAnlieferungNodes =
                    anlieferungsSorted.map((lieferung, lieferungIndex) =>
                      buildArtHerkunftKulturAnlieferung({
                        lieferung,
                        lieferungIndex,
                        kulturId,
                        kulturIndex,
                        artId,
                        artIndex,
                        herkunft,
                        herkunftIndex,
                      }),
                    )
                  artHerkunftKulturAnlieferungNodes.push(
                    ...newArtHerkunftKulturAnlieferungNodes,
                  )
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
                artHerkunftKulturAuslieferungFolderNodes.push(
                  buildArtHerkunftKulturAuslieferungFolder({
                    kulturId,
                    kulturIndex,
                    artId,
                    artIndex,
                    herkunft,
                    herkunftIndex,
                    count: auslieferungs.length,
                  }),
                )
                const artKulturAuslieferungFolderIsOpen = openNodes.some(
                  (n) =>
                    n.length === 7 &&
                    n[0] === 'Arten' &&
                    n[1] === artId &&
                    n[2] === 'Herkuenfte' &&
                    n[3] === herkunftId &&
                    n[4] === 'Kulturen' &&
                    n[5] === kulturId &&
                    n[6] === 'Aus-Lieferungen',
                )
                if (artKulturAuslieferungFolderIsOpen) {
                  const auslieferungsSorted = auslieferungs.sort(lieferungSort)
                  const newArtHerkunftKulturAuslieferungNodes =
                    auslieferungsSorted.map((lieferung, lieferungIndex) =>
                      buildArtHerkunftKulturAuslieferung({
                        lieferung,
                        lieferungIndex,
                        kulturId,
                        kulturIndex,
                        artId,
                        artIndex,
                        herkunft,
                        herkunftIndex,
                      }),
                    )
                  artKulturAuslieferungNodes.push(
                    ...newArtHerkunftKulturAuslieferungNodes,
                  )
                }

                // event nodes
                const eventsQuery = kultur.events.extend(
                  ...tableFilter({ store, table: 'event' }),
                )
                const eventsCount = await eventsQuery.fetchCount()
                artHerkunftKulturEventFolderNodes.push(
                  buildArtHerkunftKulturEventFolder({
                    kulturId,
                    kulturIndex,
                    artId,
                    artIndex,
                    herkunft,
                    herkunftIndex,
                    count: eventsCount,
                  }),
                )
                const artHerkunftKulturEventFolderIsOpen = openNodes.some(
                  (n) =>
                    n.length === 7 &&
                    n[0] === 'Arten' &&
                    n[1] === artId &&
                    n[2] === 'Herkuenfte' &&
                    n[3] === herkunftId &&
                    n[4] === 'Kulturen' &&
                    n[5] === kulturId &&
                    n[6] === 'Events',
                )
                if (artHerkunftKulturEventFolderIsOpen) {
                  let events = []
                  try {
                    events = await eventsQuery.fetch()
                  } catch {}
                  const eventsSorted = events.sort(eventSort)
                  const newArtHerkunftKulturEventNodes = eventsSorted.map(
                    (event, eventIndex) =>
                      buildArtHerkunftKulturEvent({
                        event,
                        eventIndex,
                        kulturId,
                        kulturIndex,
                        artId,
                        artIndex,
                        herkunft,
                        herkunftIndex,
                      }),
                  )
                  artKulturEventNodes.push(...newArtHerkunftKulturEventNodes)
                }
              }
            }
          }
        }

        // 1.2 art > sammlung
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
          artSammlungNodes.push(...newArtSammlungNodes)
          const openArtSammlungNodes = openNodes.filter(
            (n) =>
              n[0] === 'Arten' &&
              n[1] === artId &&
              n[2] === 'Sammlungen' &&
              n.length === 4,
          )
          for (const artSammlungNode of openArtSammlungNodes) {
            const sammlungId = artSammlungNode[3]
            const sammlung = sammlungsSorted.find((s) => s.id === sammlungId)
            if (!sammlung) break
            const sammlungIndex = newArtSammlungNodes.findIndex(
              (s) => s.id === `${artId}${sammlungId}`,
            )

            let lieferungs = []
            try {
              lieferungs = await sammlung.lieferungs
                .extend(...tableFilter({ store, table: 'lieferung' }))
                .fetch()
            } catch {}
            artSammlungAuslieferungFolderNodes.push(
              buildArtSammlungAuslieferungFolder({
                sammlungId,
                sammlungIndex,
                artId,
                artIndex,
                children: lieferungs,
              }),
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
              artSammlungAuslieferungNodes.push(
                ...newArtSammlungAuslieferungNodes,
              )
            }
          }
        }

        // 1.3 art > kultur
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
          artKulturNodes.push(...newArtKulturNodes)
          const openArtKulturNodes = openNodes.filter(
            (n) =>
              n[0] === 'Arten' &&
              n[1] === artId &&
              n[2] === 'Kulturen' &&
              n.length === 4,
          )
          for (const artKulturNode of openArtKulturNodes) {
            const kulturId = artKulturNode[3]
            const kultur = kultursSorted.find((s) => s.id === kulturId)
            if (!kultur) break
            const kulturIndex = newArtKulturNodes.findIndex(
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
                artKulturTeilkulturNodes.push(...newArtKulturTeilkulturNodes)
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
              artKulturZaehlungNodes.push(...newArtKulturZaehlungNodes)
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
              artKulturAnlieferungNodes.push(...newArtKulturAnlieferungNodes)
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
              artKulturAuslieferungNodes.push(...newArtKulturAuslieferungNodes)
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
              artKulturEventNodes.push(...newArtKulturEventNodes)
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
          herkunftSammlungNodes.push(...newHerkunftSammlungNodes)
          const openHerkunftSammlungNodes = openNodes.filter(
            (n) =>
              n[0] === 'Herkuenfte' &&
              n[1] === herkunftId &&
              n[2] === 'Sammlungen' &&
              n.length === 4,
          )
          for (const herkunftSammlungNode of openHerkunftSammlungNodes) {
            const sammlungId = herkunftSammlungNode[3]
            const sammlung = sammlungsSorted.find((s) => s.id === sammlungId)
            if (!sammlung) break
            const sammlungIndex = newHerkunftSammlungNodes.findIndex(
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
              herkunftSammlungAuslieferungNodes.push(
                ...newHerkunftSammlungAuslieferungNodes,
              )
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
            count: herkunft ? 1 : 0,
            sammlungIndex,
            sammlungId,
          }),
        )
        const sammlungHerkunftFolderIsOpen =
          !!herkunft &&
          openNodes.some(
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
          sammlungAuslieferungNodes.push(...newSammlungAuslieferungNodes)
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
          gartenKulturNodes.push(...newGartenKulturNodes)

          const openGartenKulturNodes = openNodes.filter(
            (n) =>
              n[0] === 'Gaerten' &&
              n[1] === gartenId &&
              n[2] === 'Kulturen' &&
              n.length === 4,
          )
          for (const gartenKulturNode of openGartenKulturNodes) {
            const kulturId = gartenKulturNode[3]
            const kultur = kultursSorted.find((s) => s.id === kulturId)
            if (!kultur) break

            const kulturIndex = newGartenKulturNodes.findIndex(
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
                gartenKulturTeilkulturNodes.push(
                  ...newGartenKulturTeilkulturNodes,
                )
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
              gartenKulturZaehlungNodes.push(...newGartenKulturZaehlungNodes)
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
              gartenKulturAnlieferungNodes.push(
                ...newGartenKulturAnlieferungNodes,
              )
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
              gartenKulturAuslieferungNodes.push(
                ...newGartenKulturAuslieferungNodes,
              )
            }

            // garten > kultur > event
            const gartenKulturEventQuery = kultur.events.extend(
              ...tableFilter({ store, table: 'event' }),
            )
            const gartenKulturEventCount =
              await gartenKulturEventQuery.fetchCount()
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
              gartenKulturEventNodes.push(...newGartenKulturEventNodes)
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
            kulturTeilkulturNodes.push(...newKulturTeilkulturNodes)
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
          kulturZaehlungNodes.push(...newKulturZaehlungNodes)
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
          kulturAnlieferungNodes.push(...newKulturAnlieferungNodes)
        }

        // kultur > auslieferung
        const kulturAuslieferungQuery = kultur.auslieferungs.extend(
          ...tableFilter({ store, table: 'lieferung' }),
        )
        const kulturAuslieferungCount =
          await kulturAuslieferungQuery.fetchCount()
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
          kulturAuslieferungNodes.push(...newKulturAuslieferungNodes)
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
          kulturEventNodes.push(...newKulturEventNodes)
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
          sammelLieferungLieferungNodes.push(
            ...newSammelLieferungLieferungNodes,
          )
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
        personSammlungFolderNodes.push(
          buildPersonSammlungFolder({
            count: personSammlungCount,
            personIndex,
            personId,
          }),
        )

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
          const newPersonSammlungNodes = await Promise.all(
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
          personSammlungNodes.push(...newPersonSammlungNodes)
        }

        // person > garten
        const personGartenQuery = person.gartens.extend(
          ...tableFilter({ store, table: 'garten' }),
        )
        const personGartenCount = await personGartenQuery.fetchCount()
        personGartenFolderNodes.push(
          buildPersonGartenFolder({
            count: personGartenCount,
            personIndex,
            personId,
          }),
        )
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
          const newPersonGartenNodes = await Promise.all(
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
          personGartenNodes.push(...newPersonGartenNodes)

          const openPersonGartenNodes = openNodes.filter(
            (n) =>
              n[0] === 'Personen' &&
              n[1] === personId &&
              n[2] === 'Gaerten' &&
              n.length === 4,
          )
          for (const personGartenNode of openPersonGartenNodes) {
            const gartenId = personGartenNode[3]
            const garten = gartensSorted.find((s) => s.id === gartenId)
            if (!garten) break
            const gartenIndex = newPersonGartenNodes.findIndex(
              (s) => s.id === `${personId}${gartenId}`,
            )

            // person > garten > kultur nodes
            const gartenKulturQuery = garten.kulturs.extend(
              ...tableFilter({ store, table: 'kultur' }),
            )
            const gartenKulturCount = await gartenKulturQuery.fetchCount()
            personGartenKulturFolderNodes.push(
              buildPersonGartenKulturFolder({
                gartenId,
                gartenIndex,
                personId,
                personIndex,
                count: gartenKulturCount,
              }),
            )
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
              const newPersonGartenKulturNodes = await Promise.all(
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
              personGartenKulturNodes.push(...newPersonGartenKulturNodes)

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
                const kulturIndex = newPersonGartenKulturNodes.findIndex(
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
                  personGartenKulturTeilkulturFolderNodes.push(
                    buildPersonGartenKulturTeilkulturFolder({
                      kulturId,
                      kulturIndex,
                      gartenId,
                      gartenIndex,
                      personId,
                      personIndex,
                      count: teilkulturCount,
                    }),
                  )
                  const personGartenKulturTeilkulturFolderIsOpen =
                    openNodes.some(
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
                    const newPersonGartenKulturTeilkulturNodes =
                      teilkultursSorted.map((teilkultur, teilkulturIndex) =>
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
                    personGartenKulturTeilkulturNodes.push(
                      ...newPersonGartenKulturTeilkulturNodes,
                    )
                  }
                }

                // zaehlung nodes
                const zaehlungQuery = kultur.zaehlungs.extend(
                  ...tableFilter({ store, table: 'zaehlung' }),
                )
                const zaehlungCount = await zaehlungQuery.fetchCount()
                personGartenKulturZaehlungFolderNodes.push(
                  buildPersonGartenKulturZaehlungFolder({
                    kulturId,
                    kulturIndex,
                    gartenId,
                    gartenIndex,
                    personId,
                    personIndex,
                    count: zaehlungCount,
                  }),
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
                  const newPersonGartenKulturZaehlungNodes = await Promise.all(
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
                  personGartenKulturZaehlungNodes.push(
                    ...newPersonGartenKulturZaehlungNodes,
                  )
                }

                // anlieferung nodes
                const anlieferungQuery = kultur.anlieferungs.extend(
                  ...tableFilter({ store, table: 'lieferung' }),
                )
                const anlieferungCount = await anlieferungQuery.fetchCount()
                personGartenKulturAnlieferungFolderNodes.push(
                  buildPersonGartenKulturAnlieferungFolder({
                    kulturId,
                    kulturIndex,
                    gartenId,
                    gartenIndex,
                    personId,
                    personIndex,
                    count: anlieferungCount,
                  }),
                )
                const personGartenKulturAnlieferungFolderIsOpen =
                  openNodes.some(
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
                  const newPersonGartenKulturAnlieferungNodes =
                    anlieferungsSorted.map((lieferung, lieferungIndex) =>
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
                  personGartenKulturAnlieferungNodes.push(
                    ...newPersonGartenKulturAnlieferungNodes,
                  )
                }

                // auslieferung nodes
                const auslieferungQuery = kultur.auslieferungs.extend(
                  ...tableFilter({ store, table: 'lieferung' }),
                )
                const auslieferungCount = await auslieferungQuery.fetchCount()
                personGartenKulturAuslieferungFolderNodes.push(
                  buildPersonGartenKulturAuslieferungFolder({
                    kulturId,
                    kulturIndex,
                    gartenId,
                    gartenIndex,
                    personId,
                    personIndex,
                    count: auslieferungCount,
                  }),
                )
                const personGartenKulturAuslieferungFolderIsOpen =
                  openNodes.some(
                    (n) =>
                      n.length === 7 &&
                      n[0] === 'Personen' &&
                      n[1] === personId &&
                      n[2] === 'Gaerten' &&
                      n[3] === gartenId &&
                      n[4] === 'Kulturen' &&
                      n[5] === kulturId &&
                      n[6] === 'Aus-Lieferungen',
                  )

                if (personGartenKulturAuslieferungFolderIsOpen) {
                  let auslieferungs = []
                  try {
                    auslieferungs = await auslieferungQuery.fetch()
                  } catch {}
                  const auslieferungsSorted = auslieferungs.sort(lieferungSort)
                  const newPersonGartenKulturAuslieferungNodes =
                    auslieferungsSorted.map((lieferung, lieferungIndex) =>
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
                  personGartenKulturAuslieferungNodes.push(
                    ...newPersonGartenKulturAuslieferungNodes,
                  )
                }

                // event nodes
                const eventQuery = kultur.events.extend(
                  ...tableFilter({ store, table: 'event' }),
                )
                const eventCount = await eventQuery.fetchCount()
                personGartenKulturEventFolderNodes.push(
                  buildPersonGartenKulturEventFolder({
                    kulturId,
                    kulturIndex,
                    gartenId,
                    gartenIndex,
                    personId,
                    personIndex,
                    count: eventCount,
                  }),
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
                  const newPersonGartenKulturEventNodes = eventsSorted.map(
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
                  personGartenKulturEventNodes.push(
                    ...newPersonGartenKulturEventNodes,
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
        personLieferungFolderNodes.push(
          buildPersonLieferungFolder({
            count: personLieferungCount,
            personIndex,
            personId,
          }),
        )
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
          const newPersonLieferungNodes = lieferungsSorted.map(
            (lieferung, index) =>
              buildPersonLieferung({
                lieferung,
                index,
                personId,
                personIndex,
              }),
          )
          personLieferungNodes.push(...newPersonLieferungNodes)
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
    ...artHerkunftFolderNodes,
    ...artHerkunftNodes,
    ...artHerkunftSammlungFolderNodes,
    ...artHerkunftSammlungNodes,
    ...artHerkunftSammlungAuslieferungFolderNodes,
    ...artHerkunftSammlungAuslieferungNodes,
    ...artHerkunftKulturFolderNodes,
    ...artHerkunftKulturNodes,
    ...artHerkunftKulturTeilkulturFolderNodes,
    ...artHerkunftKulturTeilkulturNodes,
    ...artHerkunftKulturZaehlungFolderNodes,
    ...artHerkunftKulturZaehlungNodes,
    ...artHerkunftKulturAnlieferungFolderNodes,
    ...artHerkunftKulturAnlieferungNodes,
    ...artHerkunftKulturAuslieferungFolderNodes,
    ...artHerkunftKulturAuslieferungNodes,
    ...artHerkunftKulturEventFolderNodes,
    ...artHerkunftKulturEventNodes,
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
  //console.log('buildNodes, nodes:', nodesSorted)
  return nodesSorted
}

export default buildNodes
