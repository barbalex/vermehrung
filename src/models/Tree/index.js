import { types, getParent, getSnapshot } from 'mobx-state-tree'
import isEqual from 'lodash/isEqual'
import { navigate } from '@reach/router'

import allParentNodesAreOpen from '../../components/Tree/allParentNodesAreOpen'

import buildNodes from '../../components/Tree/nodes'
import sortNodes from '../../utils/sortNodes'

import buildArtFolder from '../../components/Tree/nodes/art/folder'
import buildArt from '../../components/Tree/nodes/art'

import buildArtSammlungFolder from '../../components/Tree/nodes/art/sammlung/folder'
import buildArtSammlung from '../../components/Tree/nodes/art/sammlung'
import buildArtSammlungAusLieferungFolder from '../../components/Tree/nodes/art/sammlung/auslieferung/folder'
import buildArtSammlungAusLieferung from '../../components/Tree/nodes/art/sammlung/auslieferung'

import buildArtKulturFolder from '../../components/Tree/nodes/art/kultur/folder'
import buildArtKultur from '../../components/Tree/nodes/art/kultur'
import buildArtKulturEventFolder from '../../components/Tree/nodes/art/kultur/event/folder'
import buildArtKulturEvent from '../../components/Tree/nodes/art/kultur/event'
import buildArtKulturTeilkulturFolder from '../../components/Tree/nodes/art/kultur/teilkultur/folder'
import buildArtKulturTeilkultur from '../../components/Tree/nodes/art/kultur/teilkultur'
import buildArtKulturZaehlungFolder from '../../components/Tree/nodes/art/kultur/zaehlung/folder'
import buildArtKulturZaehlung from '../../components/Tree/nodes/art/kultur/zaehlung'
import buildArtKulturAusLieferungFolder from '../../components/Tree/nodes/art/kultur/auslieferung/folder'
import buildArtKulturAusLieferung from '../../components/Tree/nodes/art/kultur/auslieferung'
import buildArtKulturAnLieferungFolder from '../../components/Tree/nodes/art/kultur/anlieferung/folder'
import buildArtKulturAnLieferung from '../../components/Tree/nodes/art/kultur/anlieferung'

import buildGartenFolder from '../../components/Tree/nodes/garten/folder'
import buildGarten from '../../components/Tree/nodes/garten'
import buildGartenKulturFolder from '../../components/Tree/nodes/garten/kultur/folder'
import buildGartenKultur from '../../components/Tree/nodes/garten/kultur'
import buildGartenKulturTeilkulturFolder from '../../components/Tree/nodes/garten/kultur/teilkultur/folder'
import buildGartenKulturTeilkultur from '../../components/Tree/nodes/garten/kultur/teilkultur'
import buildGartenKulturEventFolder from '../../components/Tree/nodes/garten/kultur/event/folder'
import buildGartenKulturEvent from '../../components/Tree/nodes/garten/kultur/event'
import buildGartenKulturZaehlungFolder from '../../components/Tree/nodes/garten/kultur/zaehlung/folder'
import buildGartenKulturZaehlung from '../../components/Tree/nodes/garten/kultur/zaehlung'
import buildGartenKulturAusLieferungFolder from '../../components/Tree/nodes/garten/kultur/auslieferung/folder'
import buildGartenKulturAusLieferung from '../../components/Tree/nodes/garten/kultur/auslieferung'
import buildGartenKulturAnLieferungFolder from '../../components/Tree/nodes/garten/kultur/anlieferung/folder'
import buildGartenKulturAnLieferung from '../../components/Tree/nodes/garten/kultur/anlieferung'

import buildHerkunftFolder from '../../components/Tree/nodes/herkunft/folder'
import buildHerkunftHerkunft from '../../components/Tree/nodes/herkunft'
import buildHerkunftSammlungFolder from '../../components/Tree/nodes/herkunft/sammlung/folder'
import buildHerkunftSammlung from '../../components/Tree/nodes/herkunft/sammlung'
import buildHerkunftSammlungAusLieferungFolder from '../../components/Tree/nodes/herkunft/sammlung/auslieferung/folder'
import buildHerkunftSammlungAusLieferung from '../../components/Tree/nodes/herkunft/sammlung/auslieferung'

import buildLieferungFolder from '../../components/Tree/nodes/lieferung/folder'
import buildLieferung from '../../components/Tree/nodes/lieferung'

import buildSammelLieferungFolder from '../../components/Tree/nodes/sammelLieferung/folder'
import buildSammelLieferung from '../../components/Tree/nodes/sammelLieferung'
import buildSammelLieferungLieferungFolder from '../../components/Tree/nodes/sammelLieferung/lieferung/folder'
import buildSammelLieferungLieferung from '../../components/Tree/nodes/sammelLieferung/lieferung'

import buildTeilkulturFolder from '../../components/Tree/nodes/teilkultur/folder'
import buildTeilkultur from '../../components/Tree/nodes/teilkultur'

import buildZaehlungFolder from '../../components/Tree/nodes/zaehlung/folder'
import buildZaehlung from '../../components/Tree/nodes/zaehlung'

import buildEventFolder from '../../components/Tree/nodes/event/folder'
import buildEvent from '../../components/Tree/nodes/event'

import buildPersonFolder from '../../components/Tree/nodes/person/folder'
import buildPerson from '../../components/Tree/nodes/person'
import buildPersonGartenFolder from '../../components/Tree/nodes/person/garten/folder'
import buildPersonGarten from '../../components/Tree/nodes/person/garten'
import buildPersonGartenKulturFolder from '../../components/Tree/nodes/person/garten/kultur/folder'
import buildPersonGartenKultur from '../../components/Tree/nodes/person/garten/kultur'
import buildPersonGartenKulturZaehlungFolder from '../../components/Tree/nodes/person/garten/kultur/zaehlung/folder'
import buildPersonGartenKulturZaehlung from '../../components/Tree/nodes/person/garten/kultur/zaehlung'
import buildPersonGartenKulturEventFolder from '../../components/Tree/nodes/person/garten/kultur/event/folder'
import buildPersonGartenKulturEvent from '../../components/Tree/nodes/person/garten/kultur/event'
import buildPersonGartenKulturTeilkulturFolder from '../../components/Tree/nodes/person/garten/kultur/teilkultur/folder'
import buildPersonGartenKulturTeilkultur from '../../components/Tree/nodes/person/garten/kultur/teilkultur'
import buildPersonGartenKulturAuslieferungFolder from '../../components/Tree/nodes/person/garten/kultur/auslieferung/folder'
import buildPersonGartenKulturAuslieferung from '../../components/Tree/nodes/person/garten/kultur/auslieferung'
import buildPersonGartenKulturAnlieferungFolder from '../../components/Tree/nodes/person/garten/kultur/anlieferung/folder'
import buildPersonGartenKulturAnlieferung from '../../components/Tree/nodes/person/garten/kultur/anlieferung'
import buildPersonSammlungFolder from '../../components/Tree/nodes/person/sammlung/folder'
import buildPersonSammlung from '../../components/Tree/nodes/person/sammlung'
import buildPersonLieferungFolder from '../../components/Tree/nodes/person/lieferung/folder'
import buildPersonLieferung from '../../components/Tree/nodes/person/lieferung'

import buildSammlungFolder from '../../components/Tree/nodes/sammlung/folder'
import buildSammlung from '../../components/Tree/nodes/sammlung'
import buildSammlungHerkunftFolder from '../../components/Tree/nodes/sammlung/herkunft/folder'
import buildSammlungHerkunft from '../../components/Tree/nodes/sammlung/herkunft'
import buildSammlungAusLieferungFolder from '../../components/Tree/nodes/sammlung/auslieferung/folder'
import buildSammlungAusLieferung from '../../components/Tree/nodes/sammlung/auslieferung'
import buildSammlungAusLieferungKulturFolder from '../../components/Tree/nodes/sammlung/auslieferung/kultur/folder'
import buildSammlungAusLieferungKultur from '../../components/Tree/nodes/sammlung/auslieferung/kultur'
import buildSammlungAusLieferungKulturZaehlungFolder from '../../components/Tree/nodes/sammlung/auslieferung/kultur/zaehlung/folder'
import buildSammlungAusLieferungKulturZaehlung from '../../components/Tree/nodes/sammlung/auslieferung/kultur/zaehlung'
import buildSammlungAusLieferungKulturEventFolder from '../../components/Tree/nodes/sammlung/auslieferung/kultur/event/folder'
import buildSammlungAusLieferungKulturEvent from '../../components/Tree/nodes/sammlung/auslieferung/kultur/event'
import buildSammlungAusLieferungKulturAusLieferungFolder from '../../components/Tree/nodes/sammlung/auslieferung/kultur/auslieferung/folder'
import buildSammlungAusLieferungKulturAusLieferung from '../../components/Tree/nodes/sammlung/auslieferung/kultur/auslieferung'
import buildSammlungAusLieferungKulturAnLieferungFolder from '../../components/Tree/nodes/sammlung/auslieferung/kultur/anlieferung/folder'
import buildSammlungAusLieferungKulturAnLieferung from '../../components/Tree/nodes/sammlung/auslieferung/kultur/anlieferung'
import buildSammlungAusLieferungKulturTeilkulturFolder from '../../components/Tree/nodes/sammlung/auslieferung/kultur/teilkultur/folder'
import buildSammlungAusLieferungKulturTeilkultur from '../../components/Tree/nodes/sammlung/auslieferung/kultur/teilkultur'

import buildKulturFolder from '../../components/Tree/nodes/kultur/folder'
import buildKultur from '../../components/Tree/nodes/kultur'
import buildKulturTeilkulturFolder from '../../components/Tree/nodes/kultur/teilkultur/folder'
import buildKulturTeilkultur from '../../components/Tree/nodes/kultur/teilkultur'
import buildKulturZaehlungFolder from '../../components/Tree/nodes/kultur/zaehlung/folder'
import buildKulturZaehlung from '../../components/Tree/nodes/kultur/zaehlung'
import buildKulturAnLieferungFolder from '../../components/Tree/nodes/kultur/anlieferung/folder'
import buildKulturAnLieferung from '../../components/Tree/nodes/kultur/anlieferung'
import buildKulturAusLieferungFolder from '../../components/Tree/nodes/kultur/auslieferung/folder'
import buildKulturAusLieferung from '../../components/Tree/nodes/kultur/auslieferung'
import buildKulturEventFolder from '../../components/Tree/nodes/kultur/event/folder'
import buildKulturEvent from '../../components/Tree/nodes/kultur/event'

import artIdInUrl from '../../utils/artIdInUrl'
import eventIdInUrl from '../../utils/eventIdInUrl'
import herkunftIdInUrl from '../../utils/herkunftIdInUrl'
import gartenIdInUrl from '../../utils/gartenIdInUrl'
import kulturIdInUrl from '../../utils/kulturIdInUrl'
import anLieferungIdInUrl from '../../utils/anLieferungIdInUrl'
import ausLieferungIdInUrl from '../../utils/ausLieferungIdInUrl'
import lieferungIdInUrl from '../../utils/lieferungIdInUrl'
import teilkulturIdInUrl from '../../utils/teilkulturIdInUrl'
import personIdInUrl from '../../utils/personIdInUrl'
import sammlungIdInUrl from '../../utils/sammlungIdInUrl'
import zaehlungIdInUrl from '../../utils/zaehlungIdInUrl'

import Node from './nodeModel'

export default types
  .model('Tree', {
    activeNodeArray: types.array(types.union(types.string, types.number)),
    openNodes: types.array(
      types.array(types.union(types.string, types.number)),
    ),
    widthInPercentOfScreen: types.optional(types.number, 33),
    artNodes: types.array(Node),
  })
  .actions((self) => ({
    setArtNodes(val) {
      self.artNodes = val
    },
    setWidthInPercentOfScreen(val) {
      self.widthInPercentOfScreen = val
    },
    setActiveNodeArray(val, nonavigate) {
      self.activeNodeArray = val
      if (!nonavigate) {
        navigate(`/Vermehrung/${val.join('/')}`)
        self.addOpenNode(val)
      }
    },
    setOpenNodes(val) {
      // need set to ensure contained arrays are unique
      const set = new Set(val.map(JSON.stringify))
      self.openNodes = Array.from(set).map(JSON.parse)
    },
    removeOpenNode(val) {
      self.openNodes = self.openNodes.filter((n) => !isEqual(n, val))
    },
    removeOpenNodeWithChildren(url) {
      self.openNodes = self.openNodes.filter((n) => {
        const urlPartWithEqualLength = n.slice(0, url.length)
        return !isEqual(urlPartWithEqualLength, url)
      })
    },
    addOpenNode(url) {
      // add all parent nodes
      let addedOpenNodes = []
      for (let i = 1; i <= url.length; i++) {
        addedOpenNodes.push(url.slice(0, i))
      }
      self.addOpenNodes(addedOpenNodes)
    },
    addOpenNodes(nodes) {
      // need set to ensure contained arrays are unique
      const set = new Set([...self.openNodes, ...nodes].map(JSON.stringify))
      self.openNodes = Array.from(set).map(JSON.parse)
    },
  }))
  .views((self) => ({
    get singleRowHeight() {
      const store = getParent(self, 1)
      const { showTreeInSingleColumnView, singleColumnView } = store
      const isMobile = showTreeInSingleColumnView && singleColumnView
      const singleRowHeight = isMobile ? 30 : 23
      return singleRowHeight
    },
    get activeNode() {
      return self.nodes.find((n) => isEqual(n.url, self.activeNodeArray))
    },
    get nodes() {
      const store = getParent(self, 1)
      //console.log('store tree building nodes')
      return sortNodes(
        buildNodes({
          store,
        }),
      )
    },
    get openNodesNotFiltered() {
      const store = getParent(self, 1)
      const {
        artsFiltered,
        eventsFiltered,
        gartensFiltered,
        herkunftsFiltered,
        kultursFiltered,
        lieferungsFiltered,
        personsFiltered,
        sammlungsFiltered,
        teilkultursFiltered,
        zaehlungsFiltered,
      } = store

      // if id is in url check if it is also in tablesFiltered
      return getSnapshot(self.openNodes).filter((n) => {
        const anLieferungId = anLieferungIdInUrl(n)
        const ausLieferungId = ausLieferungIdInUrl(n)
        const lieferungId = lieferungIdInUrl(n)
        const artId = artIdInUrl(n)
        const eventId = eventIdInUrl(n)
        const gartenId = gartenIdInUrl(n)
        const herkunftId = herkunftIdInUrl(n)
        const kulturId = kulturIdInUrl(n)
        const personId = personIdInUrl(n)
        const sammlungId = sammlungIdInUrl(n)
        const teilkulturId = teilkulturIdInUrl(n)
        const zaehlungId = zaehlungIdInUrl(n)

        const criteria = [
          anLieferungId
            ? lieferungsFiltered.map((l) => l.id).includes(anLieferungId)
            : true,
          ausLieferungId
            ? lieferungsFiltered.map((l) => l.id).includes(ausLieferungId)
            : true,
          lieferungId
            ? lieferungsFiltered.map((l) => l.id).includes(lieferungId)
            : true,
          artId ? artsFiltered.map((l) => l.id).includes(artId) : true,
          eventId ? eventsFiltered.map((l) => l.id).includes(eventId) : true,
          gartenId ? gartensFiltered.map((l) => l.id).includes(gartenId) : true,
          herkunftId
            ? herkunftsFiltered.map((l) => l.id).includes(herkunftId)
            : true,
          kulturId ? kultursFiltered.map((l) => l.id).includes(kulturId) : true,
          personId ? personsFiltered.map((l) => l.id).includes(personId) : true,
          sammlungId
            ? sammlungsFiltered.map((l) => l.id).includes(sammlungId)
            : true,
          teilkulturId
            ? teilkultursFiltered.map((l) => l.id).includes(teilkulturId)
            : true,
          zaehlungId
            ? zaehlungsFiltered.map((l) => l.id).includes(zaehlungId)
            : true,
        ]

        return !criteria.includes(false)
      })
    },
    get visibleOpenNodes() {
      const store = getParent(self, 1)
      return self.openNodesNotFiltered.filter((url) =>
        allParentNodesAreOpen({ store, url }),
      )
    },
    get showArt() {
      const store = getParent(self, 1)
      return store?.userRole !== 'gaertner'
    },
    get showEvent() {
      const store = getParent(self, 1)
      return store?.userPersonOption?.tree_event
    },
    get showGarten() {
      return true
    },
    get showHerkunft() {
      const store = getParent(self, 1)
      return store?.userRole !== 'gaertner'
    },
    get showKultur() {
      const store = getParent(self, 1)
      return store?.userPersonOption?.tree_kultur
    },
    get showLieferung() {
      const store = getParent(self, 1)
      return store?.userPersonOption?.tree_lieferung
    },
    get showPerson() {
      return true
    },
    get showSammelLieferung() {
      const store = getParent(self, 1)
      // TODO: own setting?
      return store?.userPersonOption?.tree_lieferung
    },
    get showSammlung() {
      const store = getParent(self, 1)
      return store?.userRole !== 'gaertner'
    },
    get showTeilkultur() {
      const store = getParent(self, 1)
      return store?.userPersonOption?.tree_teilkultur
    },
    get showTeilzaehlung() {
      return true
    },
    get showZaehlung() {
      const store = getParent(self, 1)
      return store?.userPersonOption?.tree_zaehlung
    },
    get artFolder() {
      const store = getParent(self, 1)
      return buildArtFolder({ store })
    },
    get art() {
      const store = getParent(self, 1)
      return buildArt({ store })
    },
    get artSammlungFolder() {
      const store = getParent(self, 1)
      return buildArtSammlungFolder({
        store,
      })
    },
    get artSammlung() {
      const store = getParent(self, 1)
      return buildArtSammlung({ store })
    },
    get artSammlungAusLieferungFolder() {
      const store = getParent(self, 1)
      return buildArtSammlungAusLieferungFolder({
        store,
      })
    },
    get artSammlungAusLieferung() {
      const store = getParent(self, 1)
      return buildArtSammlungAusLieferung({
        store,
      })
    },
    get artKulturFolder() {
      const store = getParent(self, 1)
      return buildArtKulturFolder({ store })
    },
    get artKultur() {
      const store = getParent(self, 1)
      return buildArtKultur({ store })
    },
    get artKulturZaehlungFolder() {
      const store = getParent(self, 1)
      return buildArtKulturZaehlungFolder({ store })
    },
    get artKulturZaehlung() {
      const store = getParent(self, 1)
      return buildArtKulturZaehlung({ store })
    },
    get artKulturTeilkulturFolder() {
      const store = getParent(self, 1)
      return buildArtKulturTeilkulturFolder({ store })
    },
    get artKulturTeilkultur() {
      const store = getParent(self, 1)
      return buildArtKulturTeilkultur({ store })
    },
    get artKulturEventFolder() {
      const store = getParent(self, 1)
      return buildArtKulturEventFolder({ store })
    },
    get artKulturEvent() {
      const store = getParent(self, 1)
      return buildArtKulturEvent({ store })
    },
    get artKulturAusLieferungFolder() {
      const store = getParent(self, 1)
      return buildArtKulturAusLieferungFolder({ store })
    },
    get artKulturAusLieferung() {
      const store = getParent(self, 1)
      return buildArtKulturAusLieferung({ store })
    },
    get artKulturAnLieferungFolder() {
      const store = getParent(self, 1)
      return buildArtKulturAnLieferungFolder({ store })
    },
    get artKulturAnLieferung() {
      const store = getParent(self, 1)
      return buildArtKulturAnLieferung({ store })
    },
    get eventFolder() {
      const store = getParent(self, 1)
      return buildEventFolder({ store })
    },
    get event() {
      const store = getParent(self, 1)
      return buildEvent({ store })
    },
    get gartenFolder() {
      const store = getParent(self, 1)
      return buildGartenFolder({ store })
    },
    get garten() {
      const store = getParent(self, 1)
      return buildGarten({ store })
    },
    get gartenKulturFolder() {
      const store = getParent(self, 1)
      return buildGartenKulturFolder({ store })
    },
    get gartenKultur() {
      const store = getParent(self, 1)
      return buildGartenKultur({ store })
    },
    get gartenKulturZaehlungFolder() {
      const store = getParent(self, 1)
      return buildGartenKulturZaehlungFolder({ store })
    },
    get gartenKulturZaehlung() {
      const store = getParent(self, 1)
      return buildGartenKulturZaehlung({ store })
    },
    get gartenKulturTeilkulturFolder() {
      const store = getParent(self, 1)
      return buildGartenKulturTeilkulturFolder({ store })
    },
    get gartenKulturTeilkultur() {
      const store = getParent(self, 1)
      return buildGartenKulturTeilkultur({ store })
    },
    get gartenKulturEventFolder() {
      const store = getParent(self, 1)
      return buildGartenKulturEventFolder({ store })
    },
    get gartenKulturEvent() {
      const store = getParent(self, 1)
      return buildGartenKulturEvent({ store })
    },
    get gartenKulturAusLieferungFolder() {
      const store = getParent(self, 1)
      return buildGartenKulturAusLieferungFolder({ store })
    },
    get gartenKulturAusLieferung() {
      const store = getParent(self, 1)
      return buildGartenKulturAusLieferung({ store })
    },
    get gartenKulturAnLieferungFolder() {
      const store = getParent(self, 1)
      return buildGartenKulturAnLieferungFolder({ store })
    },
    get gartenKulturAnLieferung() {
      const store = getParent(self, 1)
      return buildGartenKulturAnLieferung({ store })
    },
    get herkunftFolder() {
      const store = getParent(self, 1)
      return buildHerkunftFolder({ store })
    },
    get herkunft() {
      const store = getParent(self, 1)
      return buildHerkunftHerkunft({ store })
    },
    get herkunftSammlungFolder() {
      const store = getParent(self, 1)
      return buildHerkunftSammlungFolder({ store })
    },
    get herkunftSammlung() {
      const store = getParent(self, 1)
      return buildHerkunftSammlung({ store })
    },
    get herkunftSammlungAusLieferungFolder() {
      const store = getParent(self, 1)
      return buildHerkunftSammlungAusLieferungFolder({ store })
    },
    get herkunftSammlungausLieferung() {
      const store = getParent(self, 1)
      return buildHerkunftSammlungAusLieferung({ store })
    },
    get kulturFolder() {
      const store = getParent(self, 1)
      return buildKulturFolder({ store })
    },
    get kultur() {
      const store = getParent(self, 1)
      return buildKultur({ store })
    },
    get kulturZaehlungFolder() {
      const store = getParent(self, 1)
      return buildKulturZaehlungFolder({ store })
    },
    get kulturZaehlung() {
      const store = getParent(self, 1)
      return buildKulturZaehlung({ store })
    },
    get kulturTeilkulturFolder() {
      const store = getParent(self, 1)
      return buildKulturTeilkulturFolder({ store })
    },
    get kulturTeilkultur() {
      const store = getParent(self, 1)
      return buildKulturTeilkultur({ store })
    },
    get kulturEventFolder() {
      const store = getParent(self, 1)
      return buildKulturEventFolder({ store })
    },
    get kulturEvent() {
      const store = getParent(self, 1)
      return buildKulturEvent({ store })
    },
    get kulturAnLieferungFolder() {
      const store = getParent(self, 1)
      return buildKulturAnLieferungFolder({ store })
    },
    get kulturLieferungAnLieferung() {
      const store = getParent(self, 1)
      return buildKulturAnLieferung({ store })
    },
    get kulturAusLieferungFolder() {
      const store = getParent(self, 1)
      return buildKulturAusLieferungFolder({ store })
    },
    get kulturLieferungAusLieferung() {
      const store = getParent(self, 1)
      return buildKulturAusLieferung({ store })
    },
    get lieferungFolder() {
      const store = getParent(self, 1)
      return buildLieferungFolder({ store })
    },
    get lieferung() {
      const store = getParent(self, 1)
      return buildLieferung({ store })
    },
    get personFolder() {
      const store = getParent(self, 1)
      return buildPersonFolder({ store })
    },
    get person() {
      const store = getParent(self, 1)
      return buildPerson({ store })
    },
    get personLieferungFolder() {
      const store = getParent(self, 1)
      return buildPersonLieferungFolder({ store })
    },
    get personLieferung() {
      const store = getParent(self, 1)
      return buildPersonLieferung({ store })
    },
    get personSammlungFolder() {
      const store = getParent(self, 1)
      return buildPersonSammlungFolder({ store })
    },
    get personSammlungSammlung() {
      const store = getParent(self, 1)
      return buildPersonSammlung({ store })
    },
    get personGartenFolder() {
      const store = getParent(self, 1)
      return buildPersonGartenFolder({ store })
    },
    get personGarten() {
      const store = getParent(self, 1)
      return buildPersonGarten({ store })
    },
    get personGartenKulturFolder() {
      const store = getParent(self, 1)
      return buildPersonGartenKulturFolder({ store })
    },
    get personGartenKultur() {
      const store = getParent(self, 1)
      return buildPersonGartenKultur({ store })
    },
    get personGartenKulturEventFolder() {
      const store = getParent(self, 1)
      return buildPersonGartenKulturEventFolder({ store })
    },
    get personGartenKulturEvent() {
      const store = getParent(self, 1)
      return buildPersonGartenKulturEvent({ store })
    },
    get personGartenKulturAnlieferungFolder() {
      const store = getParent(self, 1)
      return buildPersonGartenKulturAnlieferungFolder({ store })
    },
    get personGartenKulturAnlieferung() {
      const store = getParent(self, 1)
      return buildPersonGartenKulturAnlieferung({ store })
    },
    get personGartenKulturAuslieferungFolder() {
      const store = getParent(self, 1)
      return buildPersonGartenKulturAuslieferungFolder({ store })
    },
    get personGartenKulturAuslieferung() {
      const store = getParent(self, 1)
      return buildPersonGartenKulturAuslieferung({ store })
    },
    get personGartenKulturZaehlungFolder() {
      const store = getParent(self, 1)
      return buildPersonGartenKulturZaehlungFolder({ store })
    },
    get personGartenKulturTeilkulturFolder() {
      const store = getParent(self, 1)
      return buildPersonGartenKulturTeilkulturFolder({ store })
    },
    get personGartenKulturTeilkultur() {
      const store = getParent(self, 1)
      return buildPersonGartenKulturTeilkultur({ store })
    },
    get personGartenKulturZaehlung() {
      const store = getParent(self, 1)
      return buildPersonGartenKulturZaehlung({ store })
    },
    get sammelLieferungFolder() {
      const store = getParent(self, 1)
      return buildSammelLieferungFolder({ store })
    },
    get sammelLieferung() {
      const store = getParent(self, 1)
      return buildSammelLieferung({ store })
    },
    get sammelLieferungLieferungFolder() {
      const store = getParent(self, 1)
      return buildSammelLieferungLieferungFolder({ store })
    },
    get sammelLieferungLieferung() {
      const store = getParent(self, 1)
      return buildSammelLieferungLieferung({ store })
    },
    get teilkulturFolder() {
      const store = getParent(self, 1)
      return buildTeilkulturFolder({ store })
    },
    get teilkultur() {
      const store = getParent(self, 1)
      return buildTeilkultur({ store })
    },
    get zaehlungFolder() {
      const store = getParent(self, 1)
      return buildZaehlungFolder({ store })
    },
    get zaehlung() {
      const store = getParent(self, 1)
      return buildZaehlung({ store })
    },
    get sammlungFolder() {
      const store = getParent(self, 1)
      return buildSammlungFolder({ store })
    },
    get sammlung() {
      const store = getParent(self, 1)
      return buildSammlung({ store })
    },
    get sammlungHerkunftFolder() {
      const store = getParent(self, 1)
      return buildSammlungHerkunftFolder({ store })
    },
    get sammlungHerkunft() {
      const store = getParent(self, 1)
      return buildSammlungHerkunft({ store })
    },
    get sammlungAusLieferungFolder() {
      const store = getParent(self, 1)
      return buildSammlungAusLieferungFolder({ store })
    },
    get sammlungAusLieferung() {
      const store = getParent(self, 1)
      return buildSammlungAusLieferung({ store })
    },
    get sammlungAusLieferungKulturFolder() {
      const store = getParent(self, 1)
      return buildSammlungAusLieferungKulturFolder({ store })
    },
    get sammlungAusLieferungKultur() {
      const store = getParent(self, 1)
      return buildSammlungAusLieferungKultur({ store })
    },
    get sammlungAusLieferungKulturEventFolder() {
      const store = getParent(self, 1)
      return buildSammlungAusLieferungKulturEventFolder({ store })
    },
    get sammlungAusLieferungKulturEvent() {
      const store = getParent(self, 1)
      return buildSammlungAusLieferungKulturEvent({ store })
    },
    get sammlungAusLieferungKulturAnLieferungFolder() {
      const store = getParent(self, 1)
      return buildSammlungAusLieferungKulturAnLieferungFolder({ store })
    },
    get sammlungAusLieferungKulturAnLieferung() {
      const store = getParent(self, 1)
      return buildSammlungAusLieferungKulturAnLieferung({ store })
    },
    get sammlungAusLieferungKulturAusLieferungFolder() {
      const store = getParent(self, 1)
      return buildSammlungAusLieferungKulturAusLieferungFolder({ store })
    },
    get sammlungAusLieferungKulturAusLieferung() {
      const store = getParent(self, 1)
      return buildSammlungAusLieferungKulturAusLieferung({ store })
    },
    get sammlungAusLieferungKulturTeilkulturFolder() {
      const store = getParent(self, 1)
      return buildSammlungAusLieferungKulturTeilkulturFolder({ store })
    },
    get sammlungAusLieferungKulturTeilkultur() {
      const store = getParent(self, 1)
      return buildSammlungAusLieferungKulturTeilkultur({ store })
    },
    get sammlungAusLieferungKulturZaehlungFolder() {
      const store = getParent(self, 1)
      return buildSammlungAusLieferungKulturZaehlungFolder({ store })
    },
    get sammlungAusLieferungKulturZaehlung() {
      const store = getParent(self, 1)
      return buildSammlungAusLieferungKulturZaehlung({ store })
    },
  }))

export const defaultValue = {
  activeNodeArray: [],
  openNodes: [],
  nodes: [],
}