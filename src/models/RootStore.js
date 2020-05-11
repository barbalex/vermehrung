import { RootStoreBase } from './RootStore.base'
import { types } from 'mobx-state-tree'
import { observable, reaction } from 'mobx'

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
  online: types.optional(types.boolean, true),
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
    onlineOperations: observable([]),
    // started out using context for firebase
    // refactored here because of some weird stuff
    // but that probably had other reasons
    // so could move this back to context if necessary
    firebase: null,
  }))
  .actions((self) => {
    reaction(
      () => `${self.onlineOperations.length}/${self.online}`,
      () => {
        if (self.online) {
          console.log('checking for operations to execute')
          // execute operation
          if (self.onlineOperations[0]) {
            console.log('will execute:', self.onlineOperations[0].toString())
            try {
              self.onlineOperations[0]()
            } catch (error) {
              // Maybe do it like superhuman and check if network error
              // then retry and set online without using tool?
              return
            }
          }
          // remove operation from queue
          self.onlineOperations.shift()
          console.log('executed, remaining:', self.onlineOperations.toString())
        }
      },
    )
    return {
      addOnlineOperation(op) {
        self.onlineOperations.push(op)
      },
      setOnline(val) {
        self.online = val
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
    }
  })
  .views((self) => ({
    get activeForm() {
      return activeFormFromActiveNodeArray(self.tree.activeNodeArray)
    },
  }))
