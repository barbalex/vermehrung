import { types } from 'mobx-state-tree'

import Tree, { defaultValue as defaultTree } from './Tree'
import Filter from './Filter/types'
import initialFilterValues from './Filter/initialValues'
import activeFormFromActiveNodeArray from '../utils/activeFormFromActiveNodeArray'

const myTypes = types
  .model({
    tree: types.optional(Tree, defaultTree),
    filter: types.optional(Filter, initialFilterValues),
    docFilter: types.optional(types.union(types.string, types.number), ''),
    hideInactive: types.optional(types.maybeNull(types.boolean), true),
    sidebarWidth: types.maybeNull(types.number, null),
    isPrint: types.optional(types.boolean, false),
    updateExists: types.optional(types.boolean, false),
    authorizing: types.optional(types.boolean, true),
    isSignedIn: types.optional(types.boolean, false),
  })
  // structure of these variables is not controlled
  // so need to define this as volatile
  .volatile(() => ({
    notifications: [],
    user: {},
  }))
  .actions(self => ({
    setIsSignedIn(val) {
      self.isSignedIn = val
    },
    setAuthorizing(val) {
      self.authorizing = val
    },
    setUser(val) {
      self.user = val || {}
    },
    setUpdateExists(val) {
      self.updateExists = val
    },
    setIsPrint(val) {
      self.isPrint = val
    },
    setSidebarWidth(val) {
      self.sidebarWidth = val
    },
    setHideInactive(val) {
      self.hideInactive = val
      // TODO:
      // set filters for person,garten,sammlung
      const key = 'aktiv'
      const value = val
      self.filter.setValue({ table: 'person', key, value })
      self.filter.setValue({ table: 'garten', key, value })
      self.filter.setValue({ table: 'kultur', key, value })
    },
    enqueNotification(note) {
      self.notifications = [
        ...self.notifications,
        {
          key: new Date().getTime() + Math.random(),
          ...note,
        },
      ]
    },
    removeNotification(note) {
      self.notifications = self.notifications.filter(n => n.key !== note)
    },
    setDocFilter(val) {
      self.docFilter = val
    },
  }))
  .views(self => ({
    get activeForm() {
      return activeFormFromActiveNodeArray(self.tree.activeNodeArray)
    },
  }))

export default myTypes
