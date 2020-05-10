import { RootStoreBase } from './RootStore.base'
import { v1 as uuidv1 } from 'uuid'
import { types } from 'mobx-state-tree'

import Tree, { defaultValue as defaultTree } from './Tree'
import Filter from './Filter/types'
import initialFilterValues from './Filter/initialValues'
import activeFormFromActiveNodeArray from '../utils/activeFormFromActiveNodeArray'

export const RootStore = RootStoreBase.props({
  tree: types.optional(Tree, defaultTree),
  filter: types.optional(Filter, initialFilterValues),
  docFilter: types.optional(types.union(types.string, types.number), ''),
  hideInactive: types.optional(types.maybeNull(types.boolean), true),
  sidebarWidth: types.maybeNull(types.number, null),
  isPrint: types.optional(types.boolean, false),
  updateExists: types.optional(types.boolean, false),
  // on startup need to wait with showing data
  // until hasura claims have been added
  // this is _after_ user is set so need another variable
  authorizing: types.optional(types.boolean, true),
})
  // structure of these variables is not controlled
  // so need to define this as volatile
  .volatile(() => ({
    notifications: [],
    user: {},
    // started out using context for firebase
    // refactored here because of some weird stuff
    // but that probably had other reasons
    // so could move this back to context if necessary
    firebase: null,
  }))
  .actions((self) => ({
    addPerson() {
      const id = uuidv1()
      const newPerson = { id }
      return self.mutateInsert_person(
        {
          objects: [newPerson],
          on_conflict: { constraint: 'person_pkey', update_columns: [] },
        },
        undefined,
        () => {
          self.persons = { newPerson, ...self.persons.toJS() }
        },
      )
    },
    setFirebase(val) {
      if (!self.firebase) {
        self.firebase = val
      }
    },
    setAuthorizing(val) {
      if (val !== self.authorizing) {
        self.authorizing = val
      }
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
      self.notifications = self.notifications.filter((n) => n.key !== note)
    },
    setDocFilter(val) {
      self.docFilter = val
    },
  }))
  .views((self) => ({
    get activeForm() {
      return activeFormFromActiveNodeArray(self.tree.activeNodeArray)
    },
  }))
