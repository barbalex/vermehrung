import { types } from 'mobx-state-tree'
import isEqual from 'lodash/isEqual'

import Node from './Node'

const compare = (a, b) => {
  // sort a before, if it has no value at this index
  if (a !== 0 && !a) return -1
  // sort a after if b has no value at this index
  if (b !== 0 && !b) return 1
  // sort a before if its value is smaller
  return a - b
}

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
    addOpenNodes(nodes) {
      // need set to ensure contained arrays are unique
      const set = new Set([...self.openNodes, ...nodes].map(JSON.stringify))
      self.openNodes = Array.from(set).map(JSON.parse)
    },
    setNodes(val) {
      self.nodes = val
    },
    addNode(node) {
      self.nodes = [...self.nodes, node]
    },
    setRefetch(func) {
      self.refetch = func
    },
  }))
  .views(self => ({
    get activeNode() {
      return self.nodes.find(n => isEqual(n.url, self.activeNodeArray))
    },
    get nodesSorted() {
      /**
       * As all nodes are now in one flat list,
       * we need to sort them
       *
       * This is the sorting algorithm:
       *
       * compare the sort array value in the nodes
       * to determine sorting
       *
       * compare arrays element by element, starting with first
       * if a has no value at this index (> a is folder), sort a before b
       * if b has no value at this index (> b is folder), sort a after b
       * if a is smaller than b, sort a before b
       * if both array elements at this index are same,
       * compare values at next index
       *
       * see: stackoverflow.com/questions/13211709/javascript-sort-array-by-multiple-number-fields
       */
      return self.nodes.sort(
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
    },
  }))

export const defaultValue = {
  activeNodeArray: [],
  openNodes: [],
  nodes: [],
}
