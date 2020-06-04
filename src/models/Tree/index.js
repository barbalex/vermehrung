import { types, getParent, getSnapshot } from 'mobx-state-tree'
import isEqual from 'lodash/isEqual'
import { navigate } from '@reach/router'

import allParentNodesAreOpen from '../../components/TreeContainer/allParentNodesAreOpen'

import Node from './Node'
import buildNodes from '../../components/TreeContainer/nodes'

import buildGartenFolder from '../../components/TreeContainer/nodes/garten/folder'
import buildKulturFolder from '../../components/TreeContainer/nodes/kultur/folder'
import buildLieferungFolder from '../../components/TreeContainer/nodes/lieferung/folder'
import buildPersonFolder from '../../components/TreeContainer/nodes/person/folder'
import buildSammelLieferungFolder from '../../components/TreeContainer/nodes/sammelLieferung/folder'
import buildSammlungFolder from '../../components/TreeContainer/nodes/sammlung/folder'
import buildTeilkulturFolder from '../../components/TreeContainer/nodes/teilkultur/folder'
import buildZaehlungFolder from '../../components/TreeContainer/nodes/zaehlung/folder'

import buildArtFolder from '../../components/TreeContainer/nodes/art/folder'
import buildArtArt from '../../components/TreeContainer/nodes/art'

import buildArtSammlungFolder from '../../components/TreeContainer/nodes/art/sammlung/folder'
import buildArtSammlung from '../../components/TreeContainer/nodes/art/sammlung'
import buildArtSammlungAusLieferungFolder from '../../components/TreeContainer/nodes/art/sammlung/auslieferung/folder'
import buildArtSammlungLieferungAusLieferung from '../../components/TreeContainer/nodes/art/sammlung/auslieferung'

import buildArtKulturFolder from '../../components/TreeContainer/nodes/art/kultur/folder'
import buildArtKultur from '../../components/TreeContainer/nodes/art/kultur'
import buildArtKulturEventFolder from '../../components/TreeContainer/nodes/art/kultur/event/folder'
import buildArtKulturEventEvent from '../../components/TreeContainer/nodes/art/kultur/event'
import buildArtKulturTeilkulturFolder from '../../components/TreeContainer/nodes/art/kultur/teilkultur/folder'
import buildArtKulturTeilkulturTeilkultur from '../../components/TreeContainer/nodes/art/kultur/teilkultur'
import buildArtKulturZaehlungFolder from '../../components/TreeContainer/nodes/art/kultur/zaehlung/folder'
import buildArtKulturZaehlungZaehlung from '../../components/TreeContainer/nodes/art/kultur/zaehlung'
import buildArtKulturAusLieferungFolder from '../../components/TreeContainer/nodes/art/kultur/auslieferung/folder'
import buildArtKulturLieferungAusLieferung from '../../components/TreeContainer/nodes/art/kultur/auslieferung'
import buildArtKulturAnLieferungFolder from '../../components/TreeContainer/nodes/art/kultur/anlieferung/folder'
import buildArtKulturLieferungAnLieferung from '../../components/TreeContainer/nodes/art/kultur/anlieferung'

import buildGartenGarten from '../../components/TreeContainer/nodes/garten'
import buildGartenKulturFolder from '../../components/TreeContainer/nodes/garten/kultur/folder'
import buildGartenKultur from '../../components/TreeContainer/nodes/garten/kultur'
import buildGartenKulturTeilkulturFolder from '../../components/TreeContainer/nodes/garten/kultur/teilkultur/folder'
import buildGartenKulturTeilkulturTeilkultur from '../../components/TreeContainer/nodes/garten/kultur/teilkultur'
import buildGartenKulturEventFolder from '../../components/TreeContainer/nodes/garten/kultur/event/folder'
import buildGartenKulturEventEvent from '../../components/TreeContainer/nodes/garten/kultur/event'
import buildGartenKulturZaehlungFolder from '../../components/TreeContainer/nodes/garten/kultur/zaehlung/folder'
import buildGartenKulturZaehlungZaehlung from '../../components/TreeContainer/nodes/garten/kultur/zaehlung'
import buildGartenKulturAusLieferungFolder from '../../components/TreeContainer/nodes/garten/kultur/auslieferung/folder'
import buildGartenKulturLieferungAusLieferung from '../../components/TreeContainer/nodes/garten/kultur/auslieferung'
import buildGartenKulturAnLieferungFolder from '../../components/TreeContainer/nodes/garten/kultur/anlieferung/folder'
import buildGartenKulturLieferungAnLieferung from '../../components/TreeContainer/nodes/garten/kultur/anlieferung'

import buildHerkunftFolder from '../../components/TreeContainer/nodes/herkunft/folder'
import buildHerkunftHerkunft from '../../components/TreeContainer/nodes/herkunft'
import buildHerkunftSammlungFolder from '../../components/TreeContainer/nodes/herkunft/sammlung/folder'
import buildHerkunftSammlungSammlung from '../../components/TreeContainer/nodes/herkunft/sammlung'
import buildHerkunftSammlungAusLieferungFolder from '../../components/TreeContainer/nodes/herkunft/sammlung/auslieferung/folder'
import buildHerkunftSammlungausLieferungLieferung from '../../components/TreeContainer/nodes/herkunft/sammlung/auslieferung'

import buildLieferungLieferung from '../../components/TreeContainer/nodes/lieferung'

import buildSammelLieferungSammelLieferung from '../../components/TreeContainer/nodes/sammelLieferung'
import buildSammelLieferungLieferungFolder from '../../components/TreeContainer/nodes/sammelLieferung/lieferung/folder'
import buildSammelLieferungLieferungLieferung from '../../components/TreeContainer/nodes/sammelLieferung/lieferung'

import buildTeilkulturTeilkultur from '../../components/TreeContainer/nodes/teilkultur'

import buildZaehlungZaehlung from '../../components/TreeContainer/nodes/zaehlung'

import buildEventFolder from '../../components/TreeContainer/nodes/event/folder'
import buildEventEvent from '../../components/TreeContainer/nodes/event'

import buildPersonPerson from '../../components/TreeContainer/nodes/person'
import buildPersonGartenFolder from '../../components/TreeContainer/nodes/person/garten/folder'
import buildPersonGartenGarten from '../../components/TreeContainer/nodes/person/garten'
import buildPersonGartenKulturFolder from '../../components/TreeContainer/nodes/person/garten/kultur/folder'
import buildPersonGartenKulturKultur from '../../components/TreeContainer/nodes/person/garten/kultur'
import buildPersonGartenKulturZaehlungFolder from '../../components/TreeContainer/nodes/person/garten/kultur/zaehlung/folder'
import buildPersonGartenKulturZaehlungZaehlung from '../../components/TreeContainer/nodes/person/garten/kultur/zaehlung'
import buildPersonGartenKulturEventFolder from '../../components/TreeContainer/nodes/person/garten/kultur/event/folder'
import buildPersonGartenKulturEventEvent from '../../components/TreeContainer/nodes/person/garten/kultur/event'
import buildPersonGartenKulturTeilkulturFolder from '../../components/TreeContainer/nodes/person/garten/kultur/teilkultur/folder'
import buildPersonGartenKulturTeilkulturTeilkultur from '../../components/TreeContainer/nodes/person/garten/kultur/teilkultur'
import buildPersonGartenKulturAuslieferungFolder from '../../components/TreeContainer/nodes/person/garten/kultur/auslieferung/folder'
import buildPersonGartenKulturAuslieferungLieferung from '../../components/TreeContainer/nodes/person/garten/kultur/auslieferung'
import buildPersonGartenKulturAnlieferungFolder from '../../components/TreeContainer/nodes/person/garten/kultur/anlieferung/folder'
import buildPersonGartenKulturAnlieferungLieferung from '../../components/TreeContainer/nodes/person/garten/kultur/anlieferung'
import buildPersonGartenSammlungFolder from '../../components/TreeContainer/nodes/person/sammlung/folder'
import buildPersonGartenSammlungSammlung from '../../components/TreeContainer/nodes/person/sammlung'
import buildPersonGartenLieferungFolder from '../../components/TreeContainer/nodes/person/lieferung/folder'
import buildPersonGartenLieferungLieferung from '../../components/TreeContainer/nodes/person/lieferung'

import buildSammlungSammlung from '../../components/TreeContainer/nodes/sammlung'
import buildSammlungHerkunftFolder from '../../components/TreeContainer/nodes/sammlung/herkunft/folder'
import buildSammlungHerkunftHerkunft from '../../components/TreeContainer/nodes/sammlung/herkunft'
import buildSammlungAusLieferungFolder from '../../components/TreeContainer/nodes/sammlung/auslieferung/folder'
import buildSammlungAusLieferungLieferung from '../../components/TreeContainer/nodes/sammlung/auslieferung'
import buildSammlungAusLieferungKulturFolder from '../../components/TreeContainer/nodes/sammlung/auslieferung/kultur/folder'
import buildSammlungAusLieferungKulturKultur from '../../components/TreeContainer/nodes/sammlung/auslieferung/kultur'
import buildSammlungAusLieferungKulturZaehlungFolder from '../../components/TreeContainer/nodes/sammlung/auslieferung/kultur/zaehlung/folder'
import buildSammlungAusLieferungKulturZaehlungZaehlung from '../../components/TreeContainer/nodes/sammlung/auslieferung/kultur/zaehlung'
import buildSammlungAusLieferungKulturEventFolder from '../../components/TreeContainer/nodes/sammlung/auslieferung/kultur/event/folder'
import buildSammlungAusLieferungKulturEventEvent from '../../components/TreeContainer/nodes/sammlung/auslieferung/kultur/event'
import buildSammlungAusLieferungKulturAusLieferungFolder from '../../components/TreeContainer/nodes/sammlung/auslieferung/kultur/auslieferung/folder'
import buildSammlungAusLieferungKulturAusLieferungLieferung from '../../components/TreeContainer/nodes/sammlung/auslieferung/kultur/auslieferung'
import buildSammlungAusLieferungKulturAnLieferungFolder from '../../components/TreeContainer/nodes/sammlung/auslieferung/kultur/anlieferung/folder'
import buildSammlungAusLieferungKulturAnLieferungLieferung from '../../components/TreeContainer/nodes/sammlung/auslieferung/kultur/anlieferung'

import buildKulturKultur from '../../components/TreeContainer/nodes/kultur'
import buildKulturTeilkulturFolder from '../../components/TreeContainer/nodes/kultur/teilkultur/folder'
import buildKulturTeilkulturTeilkultur from '../../components/TreeContainer/nodes/kultur/teilkultur'
import buildKulturZaehlungFolder from '../../components/TreeContainer/nodes/kultur/zaehlung/folder'
import buildKulturZaehlungZaehlung from '../../components/TreeContainer/nodes/kultur/zaehlung'
import buildKulturAnLieferungFolder from '../../components/TreeContainer/nodes/kultur/anlieferung/folder'
import buildKulturLieferungAnLieferung from '../../components/TreeContainer/nodes/kultur/anlieferung'
import buildKulturAusLieferungFolder from '../../components/TreeContainer/nodes/kultur/auslieferung/folder'
import buildKulturLieferungAusLieferung from '../../components/TreeContainer/nodes/kultur/auslieferung'
import buildKulturEventFolder from '../../components/TreeContainer/nodes/kultur/event/folder'
import buildKulturEventEvent from '../../components/TreeContainer/nodes/kultur/event'

export default types
  .model('Tree', {
    activeNodeArray: types.array(types.union(types.string, types.number)),
    openNodes: types.array(
      types.array(types.union(types.string, types.number)),
    ),
    nodesToAdd: types.array(Node),
    widthInPercentOfScreen: types.optional(types.number, 33),
    widthEnforced: types.maybeNull(types.number, null),
    loading: types.optional(types.boolean, false),
  })
  .volatile(() => ({
    refetch: () => {},
  }))
  .actions((self) => ({
    setLoading(val) {
      self.loading = val
    },
    setWidthInPercentOfScreen(val) {
      self.widthInPercentOfScreen = val
    },
    setWidthEnforced(val) {
      self.widthEnforced = val
    },
    setActiveNodeArray(val, nonavigate) {
      self.activeNodeArray = val
      !nonavigate && navigate(`/Vermehrung/${val.join('/')}`)
    },
    setOpenNodes(val) {
      // need set to ensure contained arrays are unique
      const set = new Set(val.map(JSON.stringify))
      self.openNodes = Array.from(set).map(JSON.parse)
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
    setRefetch(func) {
      self.refetch = func
    },
  }))
  .views((self) => ({
    get activeNode() {
      return self.nodes.find((n) => isEqual(n.url, self.activeNodeArray))
    },
    get nodes() {
      const store = getParent(self, 1)
      console.log('store tree building nodes')
      return buildNodes({
        store: store,
        loading: self.loading,
        role: store.userPerson.user_role,
      })
    },
    get visibleOpenNodes() {
      // for unknown reason using self.openNodes directly
      // suddenly started to cause errors
      // so need to snapshot
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
    get kulturFolder() {
      const store = getParent(self, 1)
      return buildKulturFolder({ loading: self.loading, store })
    },
    get lieferungFolder() {
      const store = getParent(self, 1)
      return buildLieferungFolder({ loading: self.loading, store })
    },
    get personFolder() {
      const store = getParent(self, 1)
      return buildPersonFolder({ loading: self.loading, store })
    },
    get sammelLieferungFolder() {
      const store = getParent(self, 1)
      return buildSammelLieferungFolder({ loading: self.loading, store })
    },
    get sammlungFolder() {
      const store = getParent(self, 1)
      return buildSammlungFolder({ loading: self.loading, store })
    },
    get teilkulturFolder() {
      const store = getParent(self, 1)
      return buildTeilkulturFolder({ loading: self.loading, store })
    },
    get zaehlungFolder() {
      const store = getParent(self, 1)
      return buildZaehlungFolder({ loading: self.loading, store })
    },
    get artArt() {
      const store = getParent(self, 1)
      return buildArtArt({ store })
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
    get artSammlungAusLieferungLieferung() {
      const store = getParent(self, 1)
      return buildArtSammlungLieferungAusLieferung({
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
    get artKulturZaehlungZaehlung() {
      const store = getParent(self, 1)
      return buildArtKulturZaehlungZaehlung({ store })
    },
    get artKulturTeilkulturFolder() {
      const store = getParent(self, 1)
      return buildArtKulturTeilkulturFolder({ store })
    },
    get artKulturTeilkulturTeilkultur() {
      const store = getParent(self, 1)
      return buildArtKulturTeilkulturTeilkultur({ store })
    },
    get artKulturEventFolder() {
      const store = getParent(self, 1)
      return buildArtKulturEventFolder({ store })
    },
    get artKulturEventEvent() {
      const store = getParent(self, 1)
      return buildArtKulturEventEvent({ store })
    },
    get artKulturAusLieferungFolder() {
      const store = getParent(self, 1)
      return buildArtKulturAusLieferungFolder({ store })
    },
    get artKulturLieferungAusLieferung() {
      const store = getParent(self, 1)
      return buildArtKulturLieferungAusLieferung({ store })
    },
    get artKulturAnLieferungFolder() {
      const store = getParent(self, 1)
      return buildArtKulturAnLieferungFolder({ store })
    },
    get artKulturLieferungAnLieferung() {
      const store = getParent(self, 1)
      return buildArtKulturLieferungAnLieferung({ store })
    },
    get eventFolder() {
      const store = getParent(self, 1)
      return buildEventFolder({ loading: self.loading, store })
    },
    get eventEvent() {
      const store = getParent(self, 1)
      return buildEventEvent({ store })
    },
    get gartenFolder() {
      const store = getParent(self, 1)
      return buildGartenFolder({ loading: self.loading, store })
    },
    get gartenGarten() {
      const store = getParent(self, 1)
      return buildGartenGarten({ store })
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
    get gartenKulturZaehlungZaehlung() {
      const store = getParent(self, 1)
      return buildGartenKulturZaehlungZaehlung({ store })
    },
    get gartenKulturTeilkulturFolder() {
      const store = getParent(self, 1)
      return buildGartenKulturTeilkulturFolder({ store })
    },
    get gartenKulturTeilkulturTeilkultur() {
      const store = getParent(self, 1)
      return buildGartenKulturTeilkulturTeilkultur({ store })
    },
    get gartenKulturEventFolder() {
      const store = getParent(self, 1)
      return buildGartenKulturEventFolder({ store })
    },
    get gartenKulturEventEvent() {
      const store = getParent(self, 1)
      return buildGartenKulturEventEvent({ store })
    },
    get gartenKulturAusLieferungFolder() {
      const store = getParent(self, 1)
      return buildGartenKulturAusLieferungFolder({ store })
    },
    get gartenKulturLieferungAusLieferung() {
      const store = getParent(self, 1)
      return buildGartenKulturLieferungAusLieferung({ store })
    },
    get gartenKulturAnLieferungFolder() {
      const store = getParent(self, 1)
      return buildGartenKulturAnLieferungFolder({ store })
    },
    get gartenKulturLieferungAnLieferung() {
      const store = getParent(self, 1)
      return buildGartenKulturLieferungAnLieferung({ store })
    },
    get herkunftFolder() {
      const store = getParent(self, 1)
      return buildHerkunftFolder({ loading: self.loading, store })
    },
    get herkunftHerkunft() {
      const store = getParent(self, 1)
      return buildHerkunftHerkunft({ store })
    },
    get herkunftSammlungFolder() {
      const store = getParent(self, 1)
      return buildHerkunftSammlungFolder({ store })
    },
    get herkunftSammlung() {
      const store = getParent(self, 1)
      return buildHerkunftSammlungSammlung({ store })
    },
    get herkunftSammlungAusLieferungFolder() {
      const store = getParent(self, 1)
      return buildHerkunftSammlungAusLieferungFolder({ store })
    },
    /*get xxFolder() {
      const store = getParent(self, 1)
      return buildXxFolder({ store })
    },
    get xxFolder() {
      const store = getParent(self, 1)
      return buildXxFolder({ store })
    },
    get xxFolder() {
      const store = getParent(self, 1)
      return buildXxFolder({ store })
    },
    get xxFolder() {
      const store = getParent(self, 1)
      return buildXxFolder({ store })
    },
    get xxFolder() {
      const store = getParent(self, 1)
      return buildXxFolder({ store })
    },
    get xxFolder() {
      const store = getParent(self, 1)
      return buildXxFolder({ store })
    },
    get xxFolder() {
      const store = getParent(self, 1)
      return buildXxFolder({ store })
    },
    get xxFolder() {
      const store = getParent(self, 1)
      return buildXxFolder({ store })
    },*/
  }))

export const defaultValue = {
  activeNodeArray: [],
  openNodes: [],
  nodes: [],
}
