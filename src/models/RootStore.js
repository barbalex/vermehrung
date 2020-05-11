import { RootStoreBase } from './RootStore.base'
import { types } from 'mobx-state-tree'
import { reaction } from 'mobx'

import Tree, { defaultValue as defaultTree } from './Tree'
import Filter from './Filter/types'
import initialFilterValues from './Filter/initialValues'
import activeFormFromActiveNodeArray from '../utils/activeFormFromActiveNodeArray'
import QueuedQueryType from './QueuedQuery'

export const RootStore = RootStoreBase.props({
  tree: types.optional(Tree, defaultTree),
  filter: types.optional(Filter, initialFilterValues),
  docFilter: types.optional(types.union(types.string, types.number), ''),
  hideInactive: types.optional(types.maybeNull(types.boolean), true),
  sidebarWidth: types.maybeNull(types.number, null),
  isPrint: types.optional(types.boolean, false),
  updateExists: types.optional(types.boolean, false),
  online: types.optional(types.boolean, true),
  /**
   * This is a queue of all queries
   * When online they they are immediatly executed by the reaction
   * When offline they remain queued until connectivity is back
   */
  queuedQueries: types.optional(types.array(QueuedQueryType), []),
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
  .actions((self) => {
    reaction(
      () => `${self.queuedQueries.length}/${self.online}`,
      () => {
        /**
         * TODO:
         * When new query is added
         * check if same exists already
         * then combine them into one
         * Goal: reduce network traffic and revision numbers when many fields were updated
         * Build new reaction for this that only depends on self.queuedQueries.length? (but must run first...)
         * Also big problem: How to combine when online?
         */
        if (self.online) {
          // execute operation
          const query = self.queuedQueries[0]
          if (query) {
            const {
              name,
              variables,
              callbackQuery,
              callbackQueryVariables,
            } = query
            console.log('will execute query:', name)
            try {
              variables ? self[name](JSON.parse(variables)) : self[name]()
            } catch (error) {
              // Maybe do it like superhuman and check if network error
              // then retry and set online without using tool?
              return
            }
            // idea: query to refresh the data updated in all used views (tree...)
            if (callbackQuery) {
              try {
                callbackQueryVariables
                  ? self[callbackQuery](JSON.parse(callbackQueryVariables))
                  : self[callbackQuery]()
              } catch (error) {
                return
              }
            }
          }
          // remove operation from queue
          self.queuedQueries.shift()
        }
      },
    )
    return {
      addQueuedQuery(val) {
        self.queuedQueries.push(val)
      },
      addHerkunft(val) {
        self.herkunfts = { val, ...self.herkunfts.toJS() }
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
