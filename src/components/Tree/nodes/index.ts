import { Q } from '@nozbe/watermelondb'

import { buildArtSammlungFolder } from './art/sammlung/folder.ts'
import { buildArtSammlung } from './art/sammlung/index.ts'
import { buildArtSammlungAuslieferungFolder } from './art/sammlung/auslieferung/folder.ts'
import { buildArtSammlungAuslieferung } from './art/sammlung/auslieferung/index.ts'
import { buildArtHerkunftFolder } from './art/herkunft/folder.ts'
import { buildArtHerkunft } from './art/herkunft/index.ts'
import { buildArtHerkunftSammlungFolder } from './art/herkunft/sammlung/folder.ts'
import { buildArtHerkunftSammlung } from './art/herkunft/sammlung/index.ts'
import { buildArtHerkunftSammlungAuslieferungFolder } from './art/herkunft/sammlung/auslieferung/folder.ts'
import { buildArtHerkunftSammlungAuslieferung } from './art/herkunft/sammlung/auslieferung/index.ts'
import { buildArtHerkunftKulturFolder } from './art/herkunft/kultur/folder.ts'
import { buildArtHerkunftKultur } from './art/herkunft/kultur/index.ts'
import { buildArtHerkunftKulturTeilkulturFolder } from './art/herkunft/kultur/teilkultur/folder.ts'
import { buildArtHerkunftKulturTeilkultur } from './art/herkunft/kultur/teilkultur/index.ts'
import { buildArtHerkunftKulturZaehlungFolder } from './art/herkunft/kultur/zaehlung/folder.ts'
import { buildArtHerkunftKulturZaehlung } from './art/herkunft/kultur/zaehlung/index.ts'
import { buildArtHerkunftKulturAnlieferungFolder } from './art/herkunft/kultur/anlieferung/folder.ts'
import { buildArtHerkunftKulturAnlieferung } from './art/herkunft/kultur/anlieferung/index.ts'
import { buildArtHerkunftKulturAuslieferungFolder } from './art/herkunft/kultur/auslieferung/folder.ts'
import { buildArtHerkunftKulturAuslieferung } from './art/herkunft/kultur/auslieferung/index.ts'
import { buildArtHerkunftKulturBedarfFolder } from './art/herkunft/kultur/bedarf/folder.ts'
import { buildArtHerkunftKulturBedarf } from './art/herkunft/kultur/bedarf/index.ts'
import { buildArtKulturFolder } from './art/kultur/folder.ts'
import { buildArtKultur } from './art/kultur/index.ts'
import { buildArtKulturTeilkulturFolder } from './art/kultur/teilkultur/folder.ts'
import { buildArtKulturTeilkultur } from './art/kultur/teilkultur/index.ts'
import { buildArtKulturZaehlungFolder } from './art/kultur/zaehlung/folder.ts'
import { buildArtKulturZaehlung } from './art/kultur/zaehlung/index.ts'
import { buildArtKulturAnlieferungFolder } from './art/kultur/anlieferung/folder.ts'
import { buildArtKulturAnlieferung } from './art/kultur/anlieferung/index.ts'
import { buildArtKulturAuslieferungFolder } from './art/kultur/auslieferung/folder.ts'
import { buildArtKulturAuslieferung } from './art/kultur/auslieferung/index.ts'
import { buildArtKulturBedarfFolder } from './art/kultur/bedarf/folder.ts'
import { buildArtKulturBedarf } from './art/kultur/bedarf/index.ts'
import type {
  Art,
  Garten,
  Herkunft,
  Kultur,
  Lieferung,
  Person,
  Sammlung,
  Teilkultur,
  Zaehlung,
} from '../../../dbModel.ts'
import { buildArtFolder } from './art/folder.ts'
import { buildArt } from './art/index.ts'
import {
  store,
  dbAtom,
  apFilterAtom,
  openNodesAtom,
  activeNodeArrayAtom,
} from '../../../store/index.ts'
import { buildHerkunftFolder } from './herkunft/folder.ts'
import { buildHerkunft } from './herkunft/index.ts'
import { buildHerkunftSammlungFolder } from './herkunft/sammlung/folder.ts'
import { buildHerkunftSammlung } from './herkunft/sammlung/index.ts'
import { buildHerkunftSammlungAuslieferungFolder } from './herkunft/sammlung/auslieferung/folder.ts'
import { buildHerkunftSammlungAuslieferung } from './herkunft/sammlung/auslieferung/index.ts'
import { buildGartenFolder } from './garten/folder.ts'
import { buildGarten } from './garten/index.ts'
import { buildGartenKulturFolder } from './garten/kultur/folder.ts'
import { buildGartenKultur } from './garten/kultur/index.ts'
import { buildGartenKulturTeilkulturFolder } from './garten/kultur/teilkultur/folder.ts'
import { buildGartenKulturTeilkultur } from './garten/kultur/teilkultur/index.ts'
import { buildGartenKulturZaehlungFolder } from './garten/kultur/zaehlung/folder.ts'
import { buildGartenKulturZaehlung } from './garten/kultur/zaehlung/index.ts'
import { buildGartenKulturAnlieferungFolder } from './garten/kultur/anlieferung/folder.ts'
import { buildGartenKulturAnlieferung } from './garten/kultur/anlieferung/index.ts'
import { buildGartenKulturAuslieferungFolder } from './garten/kultur/auslieferung/folder.ts'
import { buildGartenKulturAuslieferung } from './garten/kultur/auslieferung/index.ts'
import { buildGartenKulturBedarfFolder } from './garten/kultur/bedarf/folder.ts'
import { buildGartenKulturBedarf } from './garten/kultur/bedarf/index.ts'
import { buildKulturFolder } from './kultur/folder.ts'
import { buildKultur } from './kultur/index.ts'
import { buildKulturTeilkulturFolder } from './kultur/teilkultur/folder.ts'
import { buildKulturTeilkultur } from './kultur/teilkultur/index.ts'
import { buildKulturZaehlungFolder } from './kultur/zaehlung/folder.ts'
import { buildKulturZaehlung } from './kultur/zaehlung/index.ts'
import { buildKulturAuslieferungFolder } from './kultur/auslieferung/folder.ts'
import { buildKulturAuslieferung } from './kultur/auslieferung/index.ts'
import { buildKulturAnlieferungFolder } from './kultur/anlieferung/folder.ts'
import { buildKulturAnlieferung } from './kultur/anlieferung/index.ts'
import { buildKulturBedarfFolder } from './kultur/bedarf/folder.ts'
import { buildKulturBedarf } from './kultur/bedarf/index.ts'
import { buildTeilkulturFolder } from './teilkultur/folder.ts'
import { buildTeilkultur } from './teilkultur/index.ts'
import { buildSammlungFolder } from './sammlung/folder.ts'
import { buildSammlung } from './sammlung/index.ts'
import { buildSammlungHerkunftFolder } from './sammlung/herkunft/folder.ts'
import { buildSammlungHerkunft } from './sammlung/herkunft/index.ts'
import { buildSammlungAuslieferungFolder } from './sammlung/auslieferung/folder.ts'
import { buildSammlungAuslieferung } from './sammlung/auslieferung/index.ts'
import { buildZaehlungFolder } from './zaehlung/folder.ts'
import { buildZaehlung } from './zaehlung/index.ts'
import { buildLieferungFolder } from './lieferung/folder.ts'
import { buildLieferung } from './lieferung/index.ts'
import { buildPersonFolder } from './person/folder.ts'
import { buildPerson } from './person/index.ts'
import { buildPersonGartenFolder } from './person/garten/folder.ts'
import { buildPersonGarten } from './person/garten/index.ts'
import { buildPersonGartenKulturFolder } from './person/garten/kultur/folder.ts'
import { buildPersonGartenKultur } from './person/garten/kultur/index.ts'
import { buildPersonGartenKulturAnlieferungFolder } from './person/garten/kultur/anlieferung/folder.ts'
import { buildPersonGartenKulturAnlieferung } from './person/garten/kultur/anlieferung/index.ts'
import { buildPersonGartenKulturAuslieferungFolder } from './person/garten/kultur/auslieferung/folder.ts'
import { buildPersonGartenKulturAuslieferung } from './person/garten/kultur/auslieferung/index.ts'
import { buildPersonGartenKulturBedarfFolder } from './person/garten/kultur/bedarf/folder.ts'
import { buildPersonGartenKulturBedarf } from './person/garten/kultur/bedarf/index.ts'
import { buildPersonGartenKulturTeilkulturFolder } from './person/garten/kultur/teilkultur/folder.ts'
import { buildPersonGartenKulturTeilkultur } from './person/garten/kultur/teilkultur/index.ts'
import { buildPersonGartenKulturZaehlungFolder } from './person/garten/kultur/zaehlung/folder.ts'
import { buildPersonGartenKulturZaehlung } from './person/garten/kultur/zaehlung/index.ts'
import { buildPersonLieferungFolder } from './person/lieferung/folder.ts'
import { buildPersonLieferung } from './person/lieferung/index.ts'
import { buildPersonSammlungFolder } from './person/sammlung/folder.ts'
import { buildPersonSammlung } from './person/sammlung/index.ts'
// import { buildSammelLieferungFolder } from './sammelLieferung/folder.ts'
// import { buildSammelLieferung } from './sammelLieferung/index.ts'
// import { buildSammelLieferungLieferungFolder } from './sammelLieferung/lieferung/folder.ts'
// import { buildSammelLieferungLieferung } from './sammelLieferung/lieferung/index.ts'
import { herkunftSort } from '../../../utils/herkunftSort.ts'
import { teilkulturSort } from '../../../utils/teilkulturSort.ts'
import { zaehlungSort } from '../../../utils/zaehlungSort.ts'
import { lieferungSort } from '../../../utils/lieferungSort.ts'
import { bedarfSort } from '../../../utils/bedarfSort.ts'
import { personSort } from '../../../utils/personSort.ts'
import { artsSortedFromArts } from '../../../utils/artsSortedFromArts.ts'
import { kultursSortedFromKulturs } from '../../../utils/kultursSortedFromKulturs.ts'
import { gartensSortedFromGartens } from '../../../utils/gartensSortedFromGartens.ts'
import { sammlungsSortedFromSammlungs } from '../../../utils/sammlungsSortedFromSammlungs.ts'
import { tableFilter } from '../../../utils/tableFilter.ts'
import { getShowArt } from '../../../utils/showArt.ts'
import { getShowGarten } from '../../../utils/showGarten.ts'
import { getShowHerkunft } from '../../../utils/showHerkunft.ts'
import { getShowKultur } from '../../../utils/showKultur.ts'
import { getShowLieferung } from '../../../utils/showLieferung.ts'
import { getShowPerson } from '../../../utils/showPerson.ts'
// import { getShowSammelLieferung } from '../../../utils/showSammelLieferung.ts'
import { getShowSammlung } from '../../../utils/showSammlung.ts'
import { getShowTeilkultur } from '../../../utils/showTeilkultur.ts'
import { getShowZaehlung } from '../../../utils/showZaehlung.ts'

export interface TreeNode {
  nodeType: string
  menuTitle: string
  id: string
  label: string
  url: string[]
  sort: (string | number | undefined)[]
  hasChildren: boolean
  childrenCount?: number
  mono?: boolean
  table?: string
  [key: string]: unknown
}

const compare = (a?: string | number, b?: string | number) => {
  // sort a before, if it has no value at this index
  if (a !== 0 && !a) return -1
  // sort a after if b has no value at this index
  if (b !== 0 && !b) return 1
  // sort a before if its value is smaller
  return (Number(a ?? 0) || 0) - (Number(b ?? 0) || 0)
}

export const buildNodes = async ({
  userPersonOption,
  userRole,
}: {
  userPersonOption: import('../../../dbModel.ts').PersonOption | null | undefined
  userRole: string | null | undefined
}) => {
  const db = store.get(dbAtom)
  const apFilter = store.get(apFilterAtom)
  const openNodes = store.get(openNodesAtom)
  const activeNodeArray = store.get(activeNodeArrayAtom)

  const showArt = getShowArt({ userRole, activeNodeArray })
  const showGarten = getShowGarten()
  const showHerkunft = getShowHerkunft({ userRole, activeNodeArray })
  const showKultur = getShowKultur({ userPersonOption, activeNodeArray })
  const showLieferung = getShowLieferung({ userPersonOption, activeNodeArray })
  const showPerson = getShowPerson()
  // const showSammelLieferung = getShowSammelLieferung({
  //   userPersonOption,
  //   activeNodeArray,
  // })
  const showSammlung = getShowSammlung({ userRole, activeNodeArray })
  const showTeilkultur = getShowTeilkultur({
    userPersonOption,
    activeNodeArray,
  })
  const showZaehlung = getShowZaehlung({ userPersonOption, activeNodeArray })

  let artFolderNodes: TreeNode[] = []
  let artNodes: TreeNode[] = []
  const artHerkunftFolderNodes: TreeNode[] = []
  const artHerkunftNodes: TreeNode[] = []
  const artHerkunftSammlungFolderNodes: TreeNode[] = []
  const artHerkunftSammlungNodes: TreeNode[] = []
  const artHerkunftSammlungAuslieferungFolderNodes: TreeNode[] = []
  const artHerkunftSammlungAuslieferungNodes: TreeNode[] = []
  const artHerkunftKulturFolderNodes: TreeNode[] = []
  const artHerkunftKulturNodes: TreeNode[] = []
  const artHerkunftKulturTeilkulturFolderNodes: TreeNode[] = []
  const artHerkunftKulturTeilkulturNodes: TreeNode[] = []
  const artHerkunftKulturZaehlungFolderNodes: TreeNode[] = []
  const artHerkunftKulturZaehlungNodes: TreeNode[] = []
  const artHerkunftKulturAnlieferungFolderNodes: TreeNode[] = []
  const artHerkunftKulturAnlieferungNodes: TreeNode[] = []
  const artHerkunftKulturAuslieferungFolderNodes: TreeNode[] = []
  const artHerkunftKulturAuslieferungNodes: TreeNode[] = []
  const artHerkunftKulturBedarfFolderNodes: TreeNode[] = []
  const artHerkunftKulturBedarfNodes: TreeNode[] = []
  const artKulturFolderNodes: TreeNode[] = []
  const artKulturNodes: TreeNode[] = []
  const artKulturTeilkulturFolderNodes: TreeNode[] = []
  const artKulturTeilkulturNodes: TreeNode[] = []
  const artKulturZaehlungFolderNodes: TreeNode[] = []
  const artKulturZaehlungNodes: TreeNode[] = []
  const artKulturAnlieferungFolderNodes: TreeNode[] = []
  const artKulturAnlieferungNodes: TreeNode[] = []
  const artKulturAuslieferungFolderNodes: TreeNode[] = []
  const artKulturAuslieferungNodes: TreeNode[] = []
  const artKulturBedarfFolderNodes: TreeNode[] = []
  const artKulturBedarfNodes: TreeNode[] = []
  const artSammlungFolderNodes: TreeNode[] = []
  const artSammlungNodes: TreeNode[] = []
  const artSammlungAuslieferungFolderNodes: TreeNode[] = []
  const artSammlungAuslieferungNodes: TreeNode[] = []
  let herkunftFolderNodes: TreeNode[] = []
  let herkunftNodes: TreeNode[] = []
  const herkunftSammlungFolderNodes: TreeNode[] = []
  const herkunftSammlungNodes: TreeNode[] = []
  const herkunftSammlungAuslieferungFolderNodes: TreeNode[] = []
  const herkunftSammlungAuslieferungNodes: TreeNode[] = []
  let sammlungFolderNodes: TreeNode[] = []
  let sammlungNodes: TreeNode[] = []
  const sammlungHerkunftFolderNodes: TreeNode[] = []
  const sammlungHerkunftNodes: TreeNode[] = []
  const sammlungAuslieferungFolderNodes: TreeNode[] = []
  const sammlungAuslieferungNodes: TreeNode[] = []
  let gartenFolderNodes: TreeNode[] = []
  let gartenNodes: TreeNode[] = []
  const gartenKulturFolderNodes: TreeNode[] = []
  const gartenKulturNodes: TreeNode[] = []
  const gartenKulturTeilkulturFolderNodes: TreeNode[] = []
  const gartenKulturTeilkulturNodes: TreeNode[] = []
  const gartenKulturZaehlungFolderNodes: TreeNode[] = []
  const gartenKulturZaehlungNodes: TreeNode[] = []
  const gartenKulturAnlieferungFolderNodes: TreeNode[] = []
  const gartenKulturAnlieferungNodes: TreeNode[] = []
  const gartenKulturAuslieferungFolderNodes: TreeNode[] = []
  const gartenKulturAuslieferungNodes: TreeNode[] = []
  const gartenKulturBedarfFolderNodes: TreeNode[] = []
  const gartenKulturBedarfNodes: TreeNode[] = []
  let kulturFolderNodes: TreeNode[] = []
  let kulturNodes: TreeNode[] = []
  const kulturTeilkulturFolderNodes: TreeNode[] = []
  const kulturTeilkulturNodes: TreeNode[] = []
  const kulturZaehlungFolderNodes: TreeNode[] = []
  const kulturZaehlungNodes: TreeNode[] = []
  const kulturAnlieferungFolderNodes: TreeNode[] = []
  const kulturAnlieferungNodes: TreeNode[] = []
  const kulturAuslieferungFolderNodes: TreeNode[] = []
  const kulturAuslieferungNodes: TreeNode[] = []
  const kulturBedarfFolderNodes: TreeNode[] = []
  const kulturBedarfNodes: TreeNode[] = []
  let teilkulturFolderNodes: TreeNode[] = []
  let teilkulturNodes: TreeNode[] = []
  let zaehlungFolderNodes: TreeNode[] = []
  let zaehlungNodes: TreeNode[] = []
  let lieferungFolderNodes: TreeNode[] = []
  let lieferungNodes: TreeNode[] = []
  let personFolderNodes: TreeNode[] = []
  let personNodes: TreeNode[] = []
  const personGartenFolderNodes: TreeNode[] = []
  const personGartenNodes: TreeNode[] = []
  const personGartenKulturFolderNodes: TreeNode[] = []
  const personGartenKulturNodes: TreeNode[] = []
  const personGartenKulturAnlieferungFolderNodes: TreeNode[] = []
  const personGartenKulturAnlieferungNodes: TreeNode[] = []
  const personGartenKulturAuslieferungFolderNodes: TreeNode[] = []
  const personGartenKulturAuslieferungNodes: TreeNode[] = []
  const personGartenKulturBedarfFolderNodes: TreeNode[] = []
  const personGartenKulturBedarfNodes: TreeNode[] = []
  const personGartenKulturTeilkulturFolderNodes: TreeNode[] = []
  const personGartenKulturTeilkulturNodes: TreeNode[] = []
  const personGartenKulturZaehlungFolderNodes: TreeNode[] = []
  const personGartenKulturZaehlungNodes: TreeNode[] = []
  const personLieferungFolderNodes: TreeNode[] = []
  const personLieferungNodes: TreeNode[] = []
  const personSammlungFolderNodes: TreeNode[] = []
  const personSammlungNodes: TreeNode[] = []
  // const sammelLieferungFolderNodes = []
  // const sammelLieferungNodes = []
  // const sammelLieferungLieferungFolderNodes = []
  // const sammelLieferungLieferungNodes = []

  // 1 art
  if (showArt) {
    const artQuery = db
      ?.get<Art>('art')
      .query(...tableFilter({ table: 'art', apFilter }))
    const artCount = (await artQuery?.fetchCount()) ?? 0
    artFolderNodes = buildArtFolder({ count: artCount })
    const artFolderIsOpen = openNodes.some(
      (n) => n.length === 1 && n[0] === 'Arten',
    )
    if (artFolderIsOpen) {
      // build art nodes
      let arts: import('../../../dbModel.ts').Art[] = []
      try {
        arts = (await artQuery?.fetch()) ?? []
      } catch {}
      const artsSorted = await artsSortedFromArts(arts)
      artNodes = await Promise.all(
        artsSorted.map(async (art, index) => await buildArt({ art, index })),
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
          }),
        )
        const herkunftCount = (await herkunftsQuery?.fetchCount()) ?? 0
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
          let herkunfts: import('../../../dbModel.ts').Herkunft[] = []
          try {
            herkunfts = (await herkunftsQuery?.fetch()) ?? []
          } catch {}
          const herkunftsSorted = herkunfts.sort(herkunftSort)
          const newArtHerkunftNodes = await Promise.all(
            herkunftsSorted.map(
              async (herkunft, herkunftIndex) =>
                await buildArtHerkunft({
                  herkunft: herkunft as Herkunft,
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
              }),
              Q.experimentalJoinTables(['art']),
              Q.on('art', 'id', artId),
            )
            const artHerkunftSammlungCount =
              await artHerkunftsSammlungsQuery?.fetchCount()
            artHerkunftSammlungFolderNodes.push(
              buildArtHerkunftSammlungFolder({
                count: artHerkunftSammlungCount,
                herkunft: herkunft as Herkunft,
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
              let artHerkunftSammlungs: import('../../../dbModel.ts').Sammlung[] = []
              try {
                artHerkunftSammlungs = (await artHerkunftsSammlungsQuery?.fetch()) ?? []
              } catch {}
              const artHerkunftSammlungsSorted =
                await sammlungsSortedFromSammlungs(artHerkunftSammlungs)
              const newArtHerkunftSammlungNodes = await Promise.all(
                artHerkunftSammlungsSorted.map(
                  async (sammlung, sammlungIndex) =>
                    await buildArtHerkunftSammlung({
                      sammlung,
                      sammlungIndex,
                      herkunft: herkunft as Herkunft,
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
                    }),
                    Q.experimentalJoinTables(['art']),
                    Q.on('art', 'id', artId),
                  )
                const artHerkunftSammlungCount =
                  await artHerkunftsSammlungAuslieferungsQuery?.fetchCount()
                artHerkunftSammlungAuslieferungFolderNodes.push(
                  buildArtHerkunftSammlungAuslieferungFolder({
                    count: artHerkunftSammlungCount,
                    sammlung,
                    sammlungIndex,
                    herkunft: herkunft as Herkunft,
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
                  let artHerkunftSammlungAuslieferungs: import('../../../dbModel.ts').Lieferung[] = []
                  try {
                    artHerkunftSammlungAuslieferungs =
                      await artHerkunftsSammlungAuslieferungsQuery?.fetch()
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
                            herkunft: herkunft as Herkunft,
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
              ?.get<Kultur>('kultur')
              .query(
                ...tableFilter({ table: 'kultur' }),
                Q.experimentalJoinTables(['art']),
                Q.on('art', 'id', artId),
                Q.experimentalJoinTables(['herkunft']),
                Q.on('herkunft', 'id', herkunftId),
              )
            const artHerkunftKulturCount =
              (await artHerkunftsKultursQuery?.fetchCount()) ?? 0
            artHerkunftKulturFolderNodes.push(
              buildArtHerkunftKulturFolder({
                count: artHerkunftKulturCount,
                herkunft: herkunft as Herkunft,
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
              let artHerkunftKulturs: import('../../../dbModel.ts').Kultur[] = []
              try {
                artHerkunftKulturs = (await artHerkunftsKultursQuery?.fetch()) ?? []
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
                      herkunft: herkunft as Herkunft,
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
                  let teilkulturs: import('../../../dbModel.ts').Teilkultur[] = []
                  try {
                    teilkulturs = await kultur.teilkulturs
                      .extend(...tableFilter({ table: 'teilkultur' }))
                      .fetch()
                  } catch {}
                  artHerkunftKulturTeilkulturFolderNodes.push(
                    buildArtHerkunftKulturTeilkulturFolder({
                      kulturId,
                      kulturIndex,
                      artId,
                      artIndex,
                      herkunft: herkunft as Herkunft,
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
                    const teilkultursSorted = (teilkulturs ?? []).sort(teilkulturSort)
                    const newArtKulturTeilkulturNodes = teilkultursSorted.map(
                      (teilkultur, teilkulturIndex) =>
                        buildArtHerkunftKulturTeilkultur({
                          teilkultur,
                          teilkulturIndex,
                          kulturId,
                          kulturIndex,
                          artId,
                          artIndex,
                          herkunft: herkunft as Herkunft,
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
                  ...tableFilter({ table: 'zaehlung' }),
                )
                const zaehlungsCount =
                  await artHerkunftKulturZaehlungQuery?.fetchCount()
                artHerkunftKulturZaehlungFolderNodes.push(
                  buildArtHerkunftKulturZaehlungFolder({
                    kulturId,
                    kulturIndex,
                    artId,
                    artIndex,
                    herkunft: herkunft as Herkunft,
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
                  let zaehlungs: import('../../../dbModel.ts').Zaehlung[] = []
                  try {
                    zaehlungs = (await artHerkunftKulturZaehlungQuery?.fetch()) ?? []
                  } catch {}
                  const zaehlungsSorted = (zaehlungs ?? []).sort(zaehlungSort)
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
                          herkunft: herkunft as Herkunft,
                          herkunftIndex,
                        }),
                    ),
                  )
                  artHerkunftKulturZaehlungNodes.push(
                    ...newArtHerkunftKulturZaehlungNodes,
                  )
                }

                // anlieferung nodes
                let anlieferungs: import('../../../dbModel.ts').Lieferung[] = []
                try {
                  anlieferungs = await kultur.anlieferungs
                    .extend(...tableFilter({ table: 'lieferung' }))
                    .fetch()
                } catch {}
                artHerkunftKulturAnlieferungFolderNodes.push(
                  buildArtHerkunftKulturAnlieferungFolder({
                    kulturId,
                    kulturIndex,
                    artId,
                    artIndex,
                    herkunft: herkunft as Herkunft,
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
                        herkunft: herkunft as Herkunft,
                        herkunftIndex,
                      }),
                    )
                  artHerkunftKulturAnlieferungNodes.push(
                    ...newArtHerkunftKulturAnlieferungNodes,
                  )
                }

                // auslieferung nodes
                let auslieferungs: import('../../../dbModel.ts').Lieferung[] = []
                try {
                  auslieferungs = await kultur.auslieferungs
                    .extend(
                      ...tableFilter({
                        table: 'lieferung',
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
                    herkunft: herkunft as Herkunft,
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
                        herkunft: herkunft as Herkunft,
                        herkunftIndex,
                      }),
                    )
                  artKulturAuslieferungNodes.push(
                    ...newArtHerkunftKulturAuslieferungNodes,
                  )
                }

                // bedarf nodes
                const bedarfsQuery = kultur.bedarfs.extend(
                  ...tableFilter({ table: 'bedarf' }),
                )
                const bedarfeCount = (await bedarfsQuery?.fetchCount()) ?? 0
                artHerkunftKulturBedarfFolderNodes.push(
                  buildArtHerkunftKulturBedarfFolder({
                    kulturId,
                    kulturIndex,
                    artId,
                    artIndex,
                    herkunft: herkunft as Herkunft,
                    herkunftIndex,
                    count: bedarfeCount,
                  }),
                )
                const artHerkunftKulturBedarfFolderIsOpen = openNodes.some(
                  (n) =>
                    n.length === 7 &&
                    n[0] === 'Arten' &&
                    n[1] === artId &&
                    n[2] === 'Herkuenfte' &&
                    n[3] === herkunftId &&
                    n[4] === 'Kulturen' &&
                    n[5] === kulturId &&
                    n[6] === 'Bedarf',
                )
                if (artHerkunftKulturBedarfFolderIsOpen) {
                  let bedarfe: import('../../../dbModel.ts').Bedarf[] = []
                  try {
                    bedarfe = (await bedarfsQuery?.fetch()) ?? []
                  } catch {}
                  const bedarfeSorted = bedarfe.sort(bedarfSort)
                  const newArtHerkunftKulturBedarfNodes = bedarfeSorted.map(
                    (bedarf, bedarfIndex) =>
                      buildArtHerkunftKulturBedarf({
                        bedarf,
                        bedarfIndex,
                        kulturId,
                        kulturIndex,
                        artId,
                        artIndex,
                        herkunft: herkunft as Herkunft,
                        herkunftIndex,
                      }),
                  )
                  artKulturBedarfNodes.push(...newArtHerkunftKulturBedarfNodes)
                }
              }
            }
          }
        }

        // 1.2 art > sammlung
        const sammlungsQuery = art.sammlungs.extend(
          ...tableFilter({
            table: 'sammlung',
          }),
        )
        const sammlungCount = (await sammlungsQuery?.fetchCount()) ?? 0
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
          let sammlungs: import('../../../dbModel.ts').Sammlung[] = []
          try {
            sammlungs = (await sammlungsQuery?.fetch()) ?? []
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

            let lieferungs: import('../../../dbModel.ts').Lieferung[] = []
            try {
              lieferungs = await sammlung.lieferungs
                .extend(...tableFilter({ table: 'lieferung' }))
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
          }),
        )
        const kulturCount = (await artKulturQuery?.fetchCount()) ?? 0
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
          let kulturs: import('../../../dbModel.ts').Kultur[] = []
          try {
            kulturs = (await artKulturQuery?.fetch()) ?? []
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
              let teilkulturs: import('../../../dbModel.ts').Teilkultur[] = []
              try {
                teilkulturs = await kultur.teilkulturs
                  .extend(...tableFilter({ table: 'teilkultur' }))
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
                const teilkultursSorted = (teilkulturs ?? []).sort(teilkulturSort)
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
              ...tableFilter({ table: 'zaehlung' }),
            )
            const zaehlungsCount = (await artKulturZaehlungQuery?.fetchCount()) ?? 0
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
              let zaehlungs: import('../../../dbModel.ts').Zaehlung[] = []
              try {
                zaehlungs = (await artKulturZaehlungQuery?.fetch()) ?? []
              } catch {}
              const zaehlungsSorted = (zaehlungs ?? []).sort(zaehlungSort)
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
            let anlieferungs: import('../../../dbModel.ts').Lieferung[] = []
            try {
              anlieferungs = await kultur.anlieferungs
                .extend(...tableFilter({ table: 'lieferung' }))
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
            let auslieferungs: import('../../../dbModel.ts').Lieferung[] = []
            try {
              auslieferungs = await kultur.auslieferungs
                .extend(
                  ...tableFilter({
                    table: 'lieferung',
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

            // bedarf nodes
            const bedarfsQuery = kultur.bedarfs.extend(
              ...tableFilter({ table: 'bedarf' }),
            )
            const bedarfeCount = (await bedarfsQuery?.fetchCount()) ?? 0
            artKulturBedarfFolderNodes.push(
              buildArtKulturBedarfFolder({
                kulturId,
                kulturIndex,
                artId,
                artIndex,
                count: bedarfeCount,
              }),
            )
            const artKulturBedarfFolderIsOpen = openNodes.some(
              (n) =>
                n.length === 5 &&
                n[0] === 'Arten' &&
                n[1] === artId &&
                n[2] === 'Kulturen' &&
                n[3] === kulturId &&
                n[4] === 'Bedarf',
            )
            if (artKulturBedarfFolderIsOpen) {
              let bedarfe: import('../../../dbModel.ts').Bedarf[] = []
              try {
                bedarfe = (await bedarfsQuery?.fetch()) ?? []
              } catch {}
              const bedarfeSorted = bedarfe.sort(bedarfSort)
              const newArtKulturBedarfNodes = bedarfeSorted.map(
                (bedarf, bedarfIndex) =>
                  buildArtKulturBedarf({
                    bedarf,
                    bedarfIndex,
                    kulturId,
                    kulturIndex,
                    artId,
                    artIndex,
                  }),
              )
              artKulturBedarfNodes.push(...newArtKulturBedarfNodes)
            }
          }
        }
      }
    }
  }

  // 2 herkunft
  if (showHerkunft) {
    const herkunftQuery = db
      ?.get<Herkunft>('herkunft')
      .query(...tableFilter({ table: 'herkunft' }))
    const herkunftCount = (await herkunftQuery?.fetchCount()) ?? 0
    herkunftFolderNodes = buildHerkunftFolder({ count: herkunftCount })
    if (openNodes.some((n) => n.length === 1 && n[0] === 'Herkuenfte')) {
      let herkunfts: import('../../../dbModel.ts').Herkunft[] = []
      try {
        herkunfts = (await herkunftQuery?.fetch()) ?? []
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
          ...tableFilter({ table: 'sammlung' }),
        )
        const sammlungsCount = (await herkunftSammlungQuery?.fetchCount()) ?? 0
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
          let sammlungs: import('../../../dbModel.ts').Sammlung[] = []
          try {
            sammlungs = (await herkunftSammlungQuery?.fetch()) ?? []
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
            let lieferungs: import('../../../dbModel.ts').Lieferung[] = []
            try {
              lieferungs = await sammlung.lieferungs
                .extend(...tableFilter({ table: 'lieferung' }))
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
      ?.get<Sammlung>('sammlung')
      .query(...tableFilter({ table: 'sammlung' }))
    const sammlungCount = (await sammlungQuery?.fetchCount()) ?? 0
    sammlungFolderNodes = buildSammlungFolder({ count: sammlungCount })
    if (openNodes.some((n) => n.length === 1 && n[0] === 'Sammlungen')) {
      let sammlungs: import('../../../dbModel.ts').Sammlung[] = []
      try {
        sammlungs = (await sammlungQuery?.fetch()) ?? []
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
          herkunft = (await sammlungHerkunftQuery?.fetch()) ?? []
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
              herkunft: herkunft as Herkunft,
              sammlungId,
              sammlungIndex,
            }),
          )
        }

        // 2.1 sammlung > auslieferung
        const sammlungLieferungQuery = sammlung.lieferungs.extend(
          ...tableFilter({ table: 'lieferung' }),
        )
        const sammlungLieferungCount = (await sammlungLieferungQuery?.fetchCount()) ?? 0
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
          let lieferungs: import('../../../dbModel.ts').Lieferung[] = []
          try {
            lieferungs = (await sammlungLieferungQuery?.fetch()) ?? []
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
      ?.get<Garten>('garten')
      .query(...tableFilter({ table: 'garten' }))
    const gartenCount = (await gartenQuery?.fetchCount()) ?? 0
    gartenFolderNodes = buildGartenFolder({ count: gartenCount })
    if (openNodes.some((n) => n.length === 1 && n[0] === 'Gaerten')) {
      let gartens: import('../../../dbModel.ts').Garten[] = []
      try {
        gartens = (await gartenQuery?.fetch()) ?? []
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
          ...tableFilter({ table: 'kultur' }),
        )
        const gartenKulturCount = (await gartenKulturQuery?.fetchCount()) ?? 0
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
          let kulturs: import('../../../dbModel.ts').Kultur[] = []
          try {
            kulturs = (await gartenKulturQuery?.fetch()) ?? []
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
              let teilkulturs: import('../../../dbModel.ts').Teilkultur[] = []
              try {
                teilkulturs = await kultur.teilkulturs
                  .extend(
                    ...tableFilter({
                      table: 'teilkultur',
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
                const teilkultursSorted = (teilkulturs ?? []).sort(teilkulturSort)
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
            let zaehlungs: import('../../../dbModel.ts').Zaehlung[] = []
            try {
              zaehlungs = await kultur.zaehlungs
                .extend(
                  ...tableFilter({
                    table: 'zaehlung',
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
              const zaehlungsSorted = (zaehlungs ?? []).sort(zaehlungSort)
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
            let anlieferungs: import('../../../dbModel.ts').Lieferung[] = []
            try {
              anlieferungs = await kultur.anlieferungs
                .extend(...tableFilter({ table: 'lieferung' }))
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
            let auslieferungs: import('../../../dbModel.ts').Lieferung[] = []
            try {
              auslieferungs = await kultur.auslieferungs
                .extend(...tableFilter({ table: 'lieferung' }))
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

            // garten > kultur > bedarf
            const gartenKulturBedarfQuery = kultur.bedarfs.extend(
              ...tableFilter({ table: 'bedarf' }),
            )
            const gartenKulturBedarfCount =
              await gartenKulturBedarfQuery?.fetchCount()
            gartenKulturBedarfFolderNodes.push(
              buildGartenKulturBedarfFolder({
                kulturId,
                kulturIndex,
                gartenId,
                gartenIndex,
                count: gartenKulturBedarfCount,
              }),
            )
            const gartenKulturBedarfFolderIsOpen = openNodes.some(
              (n) =>
                n.length === 5 &&
                n[0] === 'Gaerten' &&
                n[1] === gartenId &&
                n[2] === 'Kulturen' &&
                n[3] === kulturId &&
                n[4] === 'Bedarf',
            )
            if (gartenKulturBedarfFolderIsOpen) {
              let bedarfe: import('../../../dbModel.ts').Bedarf[] = []
              try {
                bedarfe = (await gartenKulturBedarfQuery?.fetch()) ?? []
              } catch {}
              const bedarfeSorted = bedarfe.sort(bedarfSort)
              const newGartenKulturBedarfNodes = bedarfeSorted.map(
                (bedarf, bedarfIndex) =>
                  buildGartenKulturBedarf({
                    bedarf,
                    bedarfIndex,
                    kulturId,
                    kulturIndex,
                    gartenId,
                    gartenIndex,
                  }),
              )
              gartenKulturBedarfNodes.push(...newGartenKulturBedarfNodes)
            }
          }
        }
      }
    }
  }

  // 5 kultur
  if (showKultur) {
    const kulturQuery = db
      ?.get<Kultur>('kultur')
      .query(...tableFilter({ table: 'kultur' }))
    const kulturCount = (await kulturQuery?.fetchCount()) ?? 0
    kulturFolderNodes = buildKulturFolder({ count: kulturCount })
    if (openNodes.some((n) => n.length === 1 && n[0] === 'Kulturen')) {
      let kulturs: import('../../../dbModel.ts').Kultur[] = []
      try {
        kulturs = (await kulturQuery?.fetch()) ?? []
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
            ...tableFilter({ table: 'teilkultur' }),
          )
          const kulturTeilkulturCount = (await kulturTeilkulturQuery?.fetchCount()) ?? 0
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
              teilkulturs = (await kulturTeilkulturQuery?.fetch()) ?? []
            } catch {}
            const teilkultursSorted = (teilkulturs ?? []).sort(teilkulturSort)
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
          ...tableFilter({ table: 'zaehlung' }),
        )
        const kulturZaehlungCount = (await kulturZaehlungQuery?.fetchCount()) ?? 0
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
          let zaehlungs: import('../../../dbModel.ts').Zaehlung[] = []
          try {
            zaehlungs = (await kulturZaehlungQuery?.fetch()) ?? []
          } catch {}
          const zaehlungsSorted = (zaehlungs ?? []).sort(zaehlungSort)
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
          ...tableFilter({ table: 'lieferung' }),
        )
        const kulturAnlieferungCount = (await kulturAnlieferungQuery?.fetchCount()) ?? 0
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
          let anlieferungs: import('../../../dbModel.ts').Lieferung[] = []
          try {
            anlieferungs = (await kulturAnlieferungQuery?.fetch()) ?? []
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
          ...tableFilter({ table: 'lieferung' }),
        )
        const kulturAuslieferungCount =
          await kulturAuslieferungQuery?.fetchCount()
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
          let auslieferungs: import('../../../dbModel.ts').Lieferung[] = []
          try {
            auslieferungs = (await kulturAuslieferungQuery?.fetch()) ?? []
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

        // kultur > bedarf
        const kulturBedarfQuery = kultur.bedarfs.extend(
          ...tableFilter({ table: 'bedarf' }),
        )
        const kulturBedarfCount = (await kulturBedarfQuery?.fetchCount()) ?? 0
        kulturBedarfFolderNodes.push(
          buildKulturBedarfFolder({
            count: kulturBedarfCount,
            kulturIndex,
            kulturId,
          }),
        )
        const kulturBedarfFolderIsOpen = openNodes.some(
          (n) =>
            n.length === 3 &&
            n[0] === 'Kulturen' &&
            n[1] === kulturId &&
            n[2] === 'Bedarf',
        )
        if (kulturBedarfFolderIsOpen) {
          let bedarfe: import('../../../dbModel.ts').Bedarf[] = []
          try {
            bedarfe = (await kulturBedarfQuery?.fetch()) ?? []
          } catch {}
          const bedarfeSorted = bedarfe.sort(bedarfSort)
          const newKulturBedarfNodes = bedarfeSorted.map((bedarf, bedarfIndex) =>
            buildKulturBedarf({
              bedarf,
              bedarfIndex,
              kulturId,
              kulturIndex,
            }),
          )
          kulturBedarfNodes.push(...newKulturBedarfNodes)
        }
      }
    }
  }

  // 6 teilkultur
  if (showTeilkultur) {
    const teilkulturQuery = db
      ?.get<Teilkultur>('teilkultur')
      .query(...tableFilter({ table: 'teilkultur' }))
    const teilkulturCount = (await teilkulturQuery?.fetchCount()) ?? 0
    teilkulturFolderNodes = buildTeilkulturFolder({ count: teilkulturCount })
    if (openNodes.some((n) => n.length === 1 && n[0] === 'Teilkulturen')) {
      let teilkulturs: import('../../../dbModel.ts').Teilkultur[] = []
      try {
        teilkulturs = (await teilkulturQuery?.fetch()) ?? []
      } catch {}
      const teilkultursSorted = (teilkulturs ?? []).sort(teilkulturSort)
      teilkulturNodes = teilkultursSorted.map((teilkultur, index) =>
        buildTeilkultur({ teilkultur, index }),
      )
    }
  }

  // 7 zaehlung
  if (showZaehlung) {
    const zaehlungQuery = db
      ?.get<Zaehlung>('zaehlung')
      .query(...tableFilter({ table: 'zaehlung' }))
    const zaehlungCount = (await zaehlungQuery?.fetchCount()) ?? 0
    zaehlungFolderNodes = buildZaehlungFolder({ count: zaehlungCount })
    if (openNodes.some((n) => n.length === 1 && n[0] === 'Zaehlungen')) {
      let zaehlungs: import('../../../dbModel.ts').Zaehlung[] = []
      try {
        zaehlungs = (await zaehlungQuery?.fetch()) ?? []
      } catch {}
      const zaehlungsSorted = (zaehlungs ?? []).sort(zaehlungSort)
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
      ?.get<Lieferung>('lieferung')
      .query(...tableFilter({ table: 'lieferung' }))
    const lieferungCount = (await lieferungQuery?.fetchCount()) ?? 0
    lieferungFolderNodes = buildLieferungFolder({ count: lieferungCount })
    if (openNodes.some((n) => n.length === 1 && n[0] === 'Lieferungen')) {
      let lieferungs: import('../../../dbModel.ts').Lieferung[] = []
      try {
        lieferungs = (await lieferungQuery?.fetch()) ?? []
      } catch {}
      const lieferungsSorted = lieferungs.sort(lieferungSort)
      lieferungNodes = lieferungsSorted.map((lieferung, index) =>
        buildLieferung({ lieferung, index }),
      )
    }
  }

  // 9 sammelLieferung
  // if (showSammelLieferung) {
  //   const sammelLieferungQuery = db
  //     .get<SammelLieferung>('sammel_lieferung')
  //     .query(...tableFilter({ table: 'sammel_lieferung' }))
  //   const sammelLieferungCount = (await sammelLieferungQuery?.fetchCount()) ?? 0
  //   sammelLieferungFolderNodes = buildSammelLieferungFolder({
  //     count: sammelLieferungCount,
  //   })
  //   if (
  //     openNodes.some((n) => n.length === 1 && n[0] === 'Sammel-Lieferungen')
  //   ) {
  //     let sammelLieferungs = []
  //     try {
  //       sammelLieferungs = await sammelLieferungQuery?.fetch()
  //     } catch {}
  //     const sammelLieferungsSorted = sammelLieferungs.sort(lieferungSort)
  //     sammelLieferungNodes = await Promise.all(
  //       sammelLieferungsSorted.map(
  //         async (sammelLieferung, index) =>
  //           await buildSammelLieferung({
  //             sammelLieferung,
  //             index,
  //           }),
  //       ),
  //     )

  //     // on to child nodes
  //     const openSammelLieferungNodes = openNodes.filter(
  //       (n) => n.length === 2 && n[0] === 'Sammel-Lieferungen',
  //     )
  //     for (const sammelLieferungNode of openSammelLieferungNodes) {
  //       const sammelLieferungId = sammelLieferungNode[1]
  //       const sammelLieferung = sammelLieferungsSorted.find(
  //         (a) => a.id === sammelLieferungId,
  //       )
  //       if (!sammelLieferung) break
  //       const sammelLieferungIndex = sammelLieferungNodes.findIndex(
  //         (a) => a.id === sammelLieferungId,
  //       )

  //       // 2.1 sammelLieferung > lieferung
  //       let lieferungs = []
  //       try {
  //         lieferungs = await sammelLieferung.lieferungs
  //           .extend(...tableFilter({ table: 'lieferung' }))
  //           .fetch()
  //       } catch {}
  //       const lieferungsSorted = lieferungs.sort(lieferungSort)
  //       sammelLieferungLieferungFolderNodes.push(
  //         buildSammelLieferungLieferungFolder({
  //           children: lieferungsSorted,
  //           sammelLieferungIndex,
  //           sammelLieferungId,
  //         }),
  //       )
  //       const sammelLieferungLieferungFolderIsOpen = openNodes.some(
  //         (n) =>
  //           n.length === 3 &&
  //           n[0] === 'Sammel-Lieferungen' &&
  //           n[1] === sammelLieferungId &&
  //           n[2] === 'Lieferungen',
  //       )
  //       if (sammelLieferungLieferungFolderIsOpen) {
  //         const newSammelLieferungLieferungNodes = lieferungsSorted.map(
  //           (lieferung, lieferungIndex) =>
  //             buildSammelLieferungLieferung({
  //               lieferung,
  //               lieferungIndex,
  //               sammelLieferungId,
  //               sammelLieferungIndex,
  //             }),
  //         )
  //         sammelLieferungLieferungNodes.push(
  //           ...newSammelLieferungLieferungNodes,
  //         )
  //       }
  //     }
  //   }
  // }

  // 11 person
  if (showPerson) {
    const personQuery = db
      ?.get<Person>('person')
      .query(...tableFilter({ table: 'person' }))
    const personCount = (await personQuery?.fetchCount()) ?? 0
    personFolderNodes = buildPersonFolder({ count: personCount })
    if (openNodes.some((n) => n.length === 1 && n[0] === 'Personen')) {
      let persons: import('../../../dbModel.ts').Person[] = []
      try {
        persons = (await personQuery?.fetch()) ?? []
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
          ...tableFilter({ table: 'sammlung' }),
        )
        const personSammlungCount = (await personSammlungQuery?.fetchCount()) ?? 0
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
          let sammlungs: import('../../../dbModel.ts').Sammlung[] = []
          try {
            sammlungs = (await personSammlungQuery?.fetch()) ?? []
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
          ...tableFilter({ table: 'garten' }),
        )
        const personGartenCount = (await personGartenQuery?.fetchCount()) ?? 0
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
          let gartens: import('../../../dbModel.ts').Garten[] = []
          try {
            gartens = (await personGartenQuery?.fetch()) ?? []
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
              ...tableFilter({ table: 'kultur' }),
            )
            const gartenKulturCount = (await gartenKulturQuery?.fetchCount()) ?? 0
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
              let kulturs: import('../../../dbModel.ts').Kultur[] = []
              try {
                kulturs = (await gartenKulturQuery?.fetch()) ?? []
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
                    ...tableFilter({ table: 'teilkultur' }),
                  )
                  const teilkulturCount = (await teilkulturQuery?.fetchCount()) ?? 0
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
                    let teilkulturs: import('../../../dbModel.ts').Teilkultur[] = []
                    try {
                      teilkulturs = (await teilkulturQuery?.fetch()) ?? []
                    } catch {}
                    const teilkultursSorted = (teilkulturs ?? []).sort(teilkulturSort)
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
                  ...tableFilter({ table: 'zaehlung' }),
                )
                const zaehlungCount = (await zaehlungQuery?.fetchCount()) ?? 0
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
                    zaehlungs = (await zaehlungQuery?.fetch()) ?? []
                  } catch {}
                  const zaehlungsSorted = (zaehlungs ?? []).sort(zaehlungSort)
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
                  ...tableFilter({ table: 'lieferung' }),
                )
                const anlieferungCount = (await anlieferungQuery?.fetchCount()) ?? 0
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
                  let anlieferungs: import('../../../dbModel.ts').Lieferung[] = []
                  try {
                    anlieferungs = (await anlieferungQuery?.fetch()) ?? []
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
                  ...tableFilter({ table: 'lieferung' }),
                )
                const auslieferungCount = (await auslieferungQuery?.fetchCount()) ?? 0
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
                  let auslieferungs: import('../../../dbModel.ts').Lieferung[] = []
                  try {
                    auslieferungs = (await auslieferungQuery?.fetch()) ?? []
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

                // bedarf nodes
                const bedarfsQuery = kultur.bedarfs.extend(
                  ...tableFilter({ table: 'bedarf' }),
                )
                const bedarfeCount = (await bedarfsQuery?.fetchCount()) ?? 0
                personGartenKulturBedarfFolderNodes.push(
                  buildPersonGartenKulturBedarfFolder({
                    kulturId,
                    kulturIndex,
                    gartenId,
                    gartenIndex,
                    personId,
                    personIndex,
                    count: bedarfeCount,
                  }),
                )
                const personGartenKulturBedarfFolderIsOpen = openNodes.some(
                  (n) =>
                    n.length === 7 &&
                    n[0] === 'Personen' &&
                    n[1] === personId &&
                    n[2] === 'Gaerten' &&
                    n[3] === gartenId &&
                    n[4] === 'Kulturen' &&
                    n[5] === kulturId &&
                    n[6] === 'Bedarf',
                )

                if (personGartenKulturBedarfFolderIsOpen) {
                  let bedarfe: import('../../../dbModel.ts').Bedarf[] = []
                  try {
                    bedarfe = (await bedarfsQuery?.fetch()) ?? []
                  } catch {}
                  const bedarfeSorted = bedarfe.sort(bedarfSort)
                  const newPersonGartenKulturBedarfNodes = bedarfeSorted.map(
                    (bedarf, bedarfIndex) =>
                      buildPersonGartenKulturBedarf({
                        bedarf,
                        bedarfIndex,
                        kulturId,
                        kulturIndex,
                        gartenId,
                        gartenIndex,
                        personId,
                        personIndex,
                      }),
                  )
                  personGartenKulturBedarfNodes.push(
                    ...newPersonGartenKulturBedarfNodes,
                  )
                }
              }
            }
          }
        }

        // person > lieferung
        const personLieferungQuery = person.lieferungs.extend(
          ...tableFilter({ table: 'lieferung' }),
        )
        const personLieferungCount = (await personLieferungQuery?.fetchCount()) ?? 0
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
          let lieferungs: import('../../../dbModel.ts').Lieferung[] = []
          try {
            lieferungs = (await personLieferungQuery?.fetch()) ?? []
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
    ...artHerkunftKulturBedarfFolderNodes,
    ...artHerkunftKulturBedarfNodes,
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
    ...artKulturBedarfFolderNodes,
    ...artKulturBedarfNodes,
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
    ...gartenKulturBedarfFolderNodes,
    ...gartenKulturBedarfNodes,
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
    ...kulturBedarfFolderNodes,
    ...kulturBedarfNodes,
    ...teilkulturFolderNodes,
    ...teilkulturNodes,
    ...zaehlungFolderNodes,
    ...zaehlungNodes,
    ...lieferungFolderNodes,
    ...lieferungNodes,
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
    ...personGartenKulturBedarfFolderNodes,
    ...personGartenKulturBedarfNodes,
    ...personGartenKulturTeilkulturFolderNodes,
    ...personGartenKulturTeilkulturNodes,
    ...personGartenKulturZaehlungFolderNodes,
    ...personGartenKulturZaehlungNodes,
    ...personLieferungFolderNodes,
    ...personLieferungNodes,
    ...personSammlungFolderNodes,
    ...personSammlungNodes,
    // ...sammelLieferungFolderNodes,
    // ...sammelLieferungNodes,
    // ...sammelLieferungLieferungFolderNodes,
    // ...sammelLieferungLieferungNodes,
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
