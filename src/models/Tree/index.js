import { types, getParent } from 'mobx-state-tree'
import isEqual from 'lodash/isEqual'
import { navigate } from '@reach/router'

import Node from './Node'
import buildNodes from '../../components/TreeContainer/nodes'
import buildArtFolderNode from '../../components/TreeContainer/nodes/art/folder'

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
    get artFolderNode() {
      const store = getParent(self, 1)
      return buildArtFolderNode({ loading: self.loading, store })
    },
  }))

export const defaultValue = {
  activeNodeArray: [],
  openNodes: [],
  nodes: [],
}
