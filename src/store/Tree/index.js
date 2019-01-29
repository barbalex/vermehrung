import { types } from 'mobx-state-tree'
import isEqual from 'lodash/isEqual'

import Node from './Node'

export default types
  .model('Tree', {
    activeNodeArray: types.optional(
      types.array(types.union(types.string, types.number)),
      [],
    ),
    openNodes: types.optional(
      types.array(types.array(types.union(types.string, types.number))),
      [],
    ),
    nodes: types.optional(types.array(Node), []),
  })
  .volatile(() => ({
    refetch: () => {},
  }))
  .actions(self => ({
    setActiveNodeArray(val) {
      self.activeNodeArray = val
    },
    setOpenNodes(val) {
      self.openNodes = val
    },
    setNodes(val) {
      self.nodes = val
    },
    setRefetch(func) {
      self.refetch = func
    },
  }))
  .views(self => ({
    get activeNode() {
      return self.nodes.find(n => isEqual(n.url, self.activeNodeArray))
    },
  }))

export const defaultValue = {
  activeNodeArray: [],
  openNodes: [],
  nodes: [],
}
