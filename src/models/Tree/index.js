import { types, getParent } from 'mobx-state-tree'
import isEqual from 'lodash/isEqual'
import { navigate } from '@reach/router'

export default types
  .model('Tree', {
    activeNodeArray: types.array(types.union(types.string, types.number)),
    openNodes: types.array(
      types.array(types.union(types.string, types.number)),
    ),
    widthInPercentOfScreen: types.optional(types.number, 33),
  })
  .actions((self) => ({
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
  }))

export const defaultValue = {
  activeNodeArray: [],
  openNodes: [],
  widthInPercentOfScreen: 33,
}
