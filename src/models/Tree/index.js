import { types, getParent, getSnapshot } from 'mobx-state-tree'
import isEqual from 'lodash/isEqual'
import { navigate } from '@reach/router'

import allParentNodesAreOpen from '../../components/TreeContainer/allParentNodesAreOpen'

import Node from './Node'
import buildNodes from '../../components/TreeContainer/nodes'
import sortNodes from '../../utils/sortNodes'

import buildArtFolder from '../../components/TreeContainer/nodes/art/folder'
import buildArt from '../../components/TreeContainer/nodes/art'

import buildArtSammlungFolder from '../../components/TreeContainer/nodes/art/sammlung/folder'
import buildArtSammlung from '../../components/TreeContainer/nodes/art/sammlung'
import buildArtSammlungAusLieferungFolder from '../../components/TreeContainer/nodes/art/sammlung/auslieferung/folder'
import buildArtSammlungAusLieferung from '../../components/TreeContainer/nodes/art/sammlung/auslieferung'

import buildArtKulturFolder from '../../components/TreeContainer/nodes/art/kultur/folder'
import buildArtKultur from '../../components/TreeContainer/nodes/art/kultur'
import buildArtKulturEventFolder from '../../components/TreeContainer/nodes/art/kultur/event/folder'
import buildArtKulturEvent from '../../components/TreeContainer/nodes/art/kultur/event'
import buildArtKulturTeilkulturFolder from '../../components/TreeContainer/nodes/art/kultur/teilkultur/folder'
import buildArtKulturTeilkultur from '../../components/TreeContainer/nodes/art/kultur/teilkultur'
import buildArtKulturZaehlungFolder from '../../components/TreeContainer/nodes/art/kultur/zaehlung/folder'
import buildArtKulturZaehlung from '../../components/TreeContainer/nodes/art/kultur/zaehlung'
import buildArtKulturAusLieferungFolder from '../../components/TreeContainer/nodes/art/kultur/auslieferung/folder'
import buildArtKulturAusLieferung from '../../components/TreeContainer/nodes/art/kultur/auslieferung'
import buildArtKulturAnLieferungFolder from '../../components/TreeContainer/nodes/art/kultur/anlieferung/folder'
import buildArtKulturAnLieferung from '../../components/TreeContainer/nodes/art/kultur/anlieferung'

import buildGartenFolder from '../../components/TreeContainer/nodes/garten/folder'
import buildGarten from '../../components/TreeContainer/nodes/garten'
import buildGartenKulturFolder from '../../components/TreeContainer/nodes/garten/kultur/folder'
import buildGartenKultur from '../../components/TreeContainer/nodes/garten/kultur'
import buildGartenKulturTeilkulturFolder from '../../components/TreeContainer/nodes/garten/kultur/teilkultur/folder'
import buildGartenKulturTeilkultur from '../../components/TreeContainer/nodes/garten/kultur/teilkultur'
import buildGartenKulturEventFolder from '../../components/TreeContainer/nodes/garten/kultur/event/folder'
import buildGartenKulturEvent from '../../components/TreeContainer/nodes/garten/kultur/event'
import buildGartenKulturZaehlungFolder from '../../components/TreeContainer/nodes/garten/kultur/zaehlung/folder'
import buildGartenKulturZaehlung from '../../components/TreeContainer/nodes/garten/kultur/zaehlung'
import buildGartenKulturAusLieferungFolder from '../../components/TreeContainer/nodes/garten/kultur/auslieferung/folder'
import buildGartenKulturAusLieferung from '../../components/TreeContainer/nodes/garten/kultur/auslieferung'
import buildGartenKulturAnLieferungFolder from '../../components/TreeContainer/nodes/garten/kultur/anlieferung/folder'
import buildGartenKulturAnLieferung from '../../components/TreeContainer/nodes/garten/kultur/anlieferung'

import buildHerkunftFolder from '../../components/TreeContainer/nodes/herkunft/folder'
import buildHerkunftHerkunft from '../../components/TreeContainer/nodes/herkunft'
import buildHerkunftSammlungFolder from '../../components/TreeContainer/nodes/herkunft/sammlung/folder'
import buildHerkunftSammlung from '../../components/TreeContainer/nodes/herkunft/sammlung'
import buildHerkunftSammlungAusLieferungFolder from '../../components/TreeContainer/nodes/herkunft/sammlung/auslieferung/folder'
import buildHerkunftSammlungAusLieferung from '../../components/TreeContainer/nodes/herkunft/sammlung/auslieferung'

import buildLieferungFolder from '../../components/TreeContainer/nodes/lieferung/folder'
import buildLieferung from '../../components/TreeContainer/nodes/lieferung'

import buildSammelLieferungFolder from '../../components/TreeContainer/nodes/sammelLieferung/folder'
import buildSammelLieferung from '../../components/TreeContainer/nodes/sammelLieferung'
import buildSammelLieferungLieferungFolder from '../../components/TreeContainer/nodes/sammelLieferung/lieferung/folder'
import buildSammelLieferungLieferung from '../../components/TreeContainer/nodes/sammelLieferung/lieferung'

import buildTeilkulturFolder from '../../components/TreeContainer/nodes/teilkultur/folder'
import buildTeilkultur from '../../components/TreeContainer/nodes/teilkultur'

import buildZaehlungFolder from '../../components/TreeContainer/nodes/zaehlung/folder'
import buildZaehlung from '../../components/TreeContainer/nodes/zaehlung'

import buildEventFolder from '../../components/TreeContainer/nodes/event/folder'
import buildEvent from '../../components/TreeContainer/nodes/event'

import buildPersonFolder from '../../components/TreeContainer/nodes/person/folder'
import buildPerson from '../../components/TreeContainer/nodes/person'
import buildPersonGartenFolder from '../../components/TreeContainer/nodes/person/garten/folder'
import buildPersonGarten from '../../components/TreeContainer/nodes/person/garten'
import buildPersonGartenKulturFolder from '../../components/TreeContainer/nodes/person/garten/kultur/folder'
import buildPersonGartenKultur from '../../components/TreeContainer/nodes/person/garten/kultur'
import buildPersonGartenKulturZaehlungFolder from '../../components/TreeContainer/nodes/person/garten/kultur/zaehlung/folder'
import buildPersonGartenKulturZaehlung from '../../components/TreeContainer/nodes/person/garten/kultur/zaehlung'
import buildPersonGartenKulturEventFolder from '../../components/TreeContainer/nodes/person/garten/kultur/event/folder'
import buildPersonGartenKulturEvent from '../../components/TreeContainer/nodes/person/garten/kultur/event'
import buildPersonGartenKulturTeilkulturFolder from '../../components/TreeContainer/nodes/person/garten/kultur/teilkultur/folder'
import buildPersonGartenKulturTeilkultur from '../../components/TreeContainer/nodes/person/garten/kultur/teilkultur'
import buildPersonGartenKulturAuslieferungFolder from '../../components/TreeContainer/nodes/person/garten/kultur/auslieferung/folder'
import buildPersonGartenKulturAuslieferung from '../../components/TreeContainer/nodes/person/garten/kultur/auslieferung'
import buildPersonGartenKulturAnlieferungFolder from '../../components/TreeContainer/nodes/person/garten/kultur/anlieferung/folder'
import buildPersonGartenKulturAnlieferung from '../../components/TreeContainer/nodes/person/garten/kultur/anlieferung'
import buildPersonSammlungFolder from '../../components/TreeContainer/nodes/person/sammlung/folder'
import buildPersonSammlung from '../../components/TreeContainer/nodes/person/sammlung'
import buildPersonLieferungFolder from '../../components/TreeContainer/nodes/person/lieferung/folder'
import buildPersonLieferung from '../../components/TreeContainer/nodes/person/lieferung'

import buildSammlungFolder from '../../components/TreeContainer/nodes/sammlung/folder'
import buildSammlung from '../../components/TreeContainer/nodes/sammlung'
import buildSammlungHerkunftFolder from '../../components/TreeContainer/nodes/sammlung/herkunft/folder'
import buildSammlungHerkunft from '../../components/TreeContainer/nodes/sammlung/herkunft'
import buildSammlungAusLieferungFolder from '../../components/TreeContainer/nodes/sammlung/auslieferung/folder'
import buildSammlungAusLieferung from '../../components/TreeContainer/nodes/sammlung/auslieferung'
import buildSammlungAusLieferungKulturFolder from '../../components/TreeContainer/nodes/sammlung/auslieferung/kultur/folder'
import buildSammlungAusLieferungKultur from '../../components/TreeContainer/nodes/sammlung/auslieferung/kultur'
import buildSammlungAusLieferungKulturZaehlungFolder from '../../components/TreeContainer/nodes/sammlung/auslieferung/kultur/zaehlung/folder'
import buildSammlungAusLieferungKulturZaehlung from '../../components/TreeContainer/nodes/sammlung/auslieferung/kultur/zaehlung'
import buildSammlungAusLieferungKulturEventFolder from '../../components/TreeContainer/nodes/sammlung/auslieferung/kultur/event/folder'
import buildSammlungAusLieferungKulturEvent from '../../components/TreeContainer/nodes/sammlung/auslieferung/kultur/event'
import buildSammlungAusLieferungKulturAusLieferungFolder from '../../components/TreeContainer/nodes/sammlung/auslieferung/kultur/auslieferung/folder'
import buildSammlungAusLieferungKulturAusLieferung from '../../components/TreeContainer/nodes/sammlung/auslieferung/kultur/auslieferung'
import buildSammlungAusLieferungKulturAnLieferungFolder from '../../components/TreeContainer/nodes/sammlung/auslieferung/kultur/anlieferung/folder'
import buildSammlungAusLieferungKulturAnLieferung from '../../components/TreeContainer/nodes/sammlung/auslieferung/kultur/anlieferung'
import buildSammlungAusLieferungKulturTeilkulturFolder from '../../components/TreeContainer/nodes/sammlung/auslieferung/kultur/teilkultur/folder'
import buildSammlungAusLieferungKulturTeilkultur from '../../components/TreeContainer/nodes/sammlung/auslieferung/kultur/teilkultur'

import buildKulturFolder from '../../components/TreeContainer/nodes/kultur/folder'
import buildKultur from '../../components/TreeContainer/nodes/kultur'
import buildKulturTeilkulturFolder from '../../components/TreeContainer/nodes/kultur/teilkultur/folder'
import buildKulturTeilkultur from '../../components/TreeContainer/nodes/kultur/teilkultur'
import buildKulturZaehlungFolder from '../../components/TreeContainer/nodes/kultur/zaehlung/folder'
import buildKulturZaehlung from '../../components/TreeContainer/nodes/kultur/zaehlung'
import buildKulturAnLieferungFolder from '../../components/TreeContainer/nodes/kultur/anlieferung/folder'
import buildKulturAnLieferung from '../../components/TreeContainer/nodes/kultur/anlieferung'
import buildKulturAusLieferungFolder from '../../components/TreeContainer/nodes/kultur/auslieferung/folder'
import buildKulturAusLieferung from '../../components/TreeContainer/nodes/kultur/auslieferung'
import buildKulturEventFolder from '../../components/TreeContainer/nodes/kultur/event/folder'
import buildKulturEvent from '../../components/TreeContainer/nodes/kultur/event'

export default types
  .model('Tree', {
    activeNodeArray: types.array(types.union(types.string, types.number)),
    openNodes: types.array(
      types.array(types.union(types.string, types.number)),
    ),
    nodesToAdd: types.array(Node),
    widthInPercentOfScreen: types.optional(types.number, 33),
    widthEnforced: types.maybeNull(types.number, null),
  })
  .actions((self) => ({
    setWidthInPercentOfScreen(val) {
      self.widthInPercentOfScreen = val
    },
    setWidthEnforced(val) {
      self.widthEnforced = val
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
    addNode(node) {
      self.nodesToAdd = [...self.nodesToAdd, node]
    },
    setNodesToAdd(val) {
      self.nodesToAdd = val
    },
  }))
  .views((self) => ({
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
    get visibleOpenNodes() {
      // for unknown reason using self.openNodes directly
      // suddenly started to cause errors
      // so need to snapshot
      // TODO: also check if parent nodes were not filtered away
      // 1. get uuids
      // 2. get their table from parent
      // 3. check that id is included in tablesFiltered
      // 4. return false if is not included
      return getSnapshot(self.openNodes).filter((node) =>
        allParentNodesAreOpen(self.openNodes, node),
      )
    },
    get showArt() {
      const store = getParent(self, 1)
      return store?.userPerson?.user_role !== 'gaertner'
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
      return store?.userPerson?.user_role !== 'gaertner'
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
      return store?.userPerson?.user_role !== 'gaertner'
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
      return buildArtFolder({ loading: self.loading, store })
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
      return buildEventFolder({ loading: self.loading, store })
    },
    get event() {
      const store = getParent(self, 1)
      return buildEvent({ store })
    },
    get gartenFolder() {
      const store = getParent(self, 1)
      return buildGartenFolder({ loading: self.loading, store })
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
      return buildHerkunftFolder({ loading: self.loading, store })
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
      return buildKulturFolder({ loading: self.loading, store })
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
      return buildLieferungFolder({ loading: self.loading, store })
    },
    get lieferung() {
      const store = getParent(self, 1)
      return buildLieferung({ store })
    },
    get personFolder() {
      const store = getParent(self, 1)
      return buildPersonFolder({ loading: self.loading, store })
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
      return buildSammelLieferungFolder({ loading: self.loading, store })
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
      return buildTeilkulturFolder({ loading: self.loading, store })
    },
    get teilkultur() {
      const store = getParent(self, 1)
      return buildTeilkultur({ store })
    },
    get zaehlungFolder() {
      const store = getParent(self, 1)
      return buildZaehlungFolder({ loading: self.loading, store })
    },
    get zaehlung() {
      const store = getParent(self, 1)
      return buildZaehlung({ store })
    },
    get sammlungFolder() {
      const store = getParent(self, 1)
      return buildSammlungFolder({ loading: self.loading, store })
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
