import { types, getParent } from 'mobx-state-tree'
import isEqual from 'lodash/isEqual'

export default types
  .model('Tree', {
    activeNodeArray: types.array(types.union(types.string, types.number)),
    // lastTouchedNode is needed to keep the last clicked arrow known
    // so it does not jump
    // before using this, activeNodeArray was used instead
    // but then when an arrow out of sight of the active node
    // is clicked, the list jumps back to the active node :-(
    lastTouchedNode: types.optional(
      types.array(types.union(types.string, types.number)),
      [],
    ),
    openNodes: types.array(
      types.array(types.union(types.string, types.number)),
    ),
    widthInPercentOfScreen: types.optional(types.number, 33),
  })
  .actions((self) => ({
    setLastTouchedNode(val) {
      self.lastTouchedNode = val
    },
    setWidthInPercentOfScreen(val) {
      self.widthInPercentOfScreen = val
    },
    setActiveNodeArray(val, nonavigate) {
      self.activeNodeArray = val
      if (!nonavigate) {
        self.navigate(`/Vermehrung/${val.join('/')}`)
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
      const addedOpenNodes = []
      for (let i = 1; i <= url.length; i++) {
        addedOpenNodes.push(url.slice(0, i))
      }
      self.addOpenNodes(addedOpenNodes)
    },
    addOpenNodes(nodes) {
      // need set to ensure contained arrays are unique
      const set = new Set([...self.openNodes, ...nodes].map(JSON.stringify))
      const newOpenNodes = Array.from(set).map(JSON.parse)
      self.openNodes = newOpenNodes
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
  }))

export const defaultValue = {
  activeNodeArray: [],
  lastTouchedNode: [],
  openNodes: [],
  widthInPercentOfScreen: 33,
}
