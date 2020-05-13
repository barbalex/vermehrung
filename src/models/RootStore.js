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
      upsertArt(val) {
        self.arts.set(val.id, val)
      },
      upsertArtFile(val) {
        self.art_files.set(val.id, val)
      },
      upsertArtQk(val) {
        self.art_qks.set(val.id, val)
      },
      upsertAvArt(val) {
        self.av_arts.set(val.id, val)
      },
      upsertEvent(val) {
        self.events.set(val.id, val)
      },
      upsertGarten(val) {
        self.gartens.set(val.id, val)
      },
      upsertGartenFile(val) {
        self.garten_files.set(val.id, val)
      },
      upsertHerkunft(val) {
        self.herkunfts.set(val.id, val)
      },
      upsertHerkunftFile(val) {
        self.herkunft_files.set(val.id, val)
      },
      upsertKultur(val) {
        self.kulturs.set(val.id, val)
      },
      upsertKulturFile(val) {
        self.kultur_files.set(val.id, val)
      },
      upsertKulturOption(val) {
        self.kultur_options.set(val.id, val)
      },
      upsertKulturQk(val) {
        self.kultur_qks.set(val.id, val)
      },
      upsertKulturQkChoosen(val) {
        self.kultur_qk_choosens.set(val.id, val)
      },
      upsertLieferung(val) {
        self.lieferungs.set(val.id, val)
      },
      upsertLieferungFile(val) {
        self.lieferung_files.set(val.id, val)
      },
      upsertPerson(val) {
        self.persons.set(val.id, val)
      },
      upsertPersonFile(val) {
        self.person_files.set(val.id, val)
      },
      upsertPersonOption(val) {
        self.person_options.set(val.id, val)
      },
      upsertSammelLieferung(val) {
        self.sammel_lieferungs.set(val.id, val)
      },
      upsertSammlung(val) {
        self.sammlungs.set(val.id, val)
      },
      addSammlungFile(val) {
        self.sammlung_files.set(val.id, val)
      },
      eilkultur(val) {
        self.teilkulturs.set(val.id, val)
      },
      addTeilzaehlung(val) {
        self.teilzaehlungs.set(val.id, val)
      },
      addUserRole(val) {
        self.user_roles.set(val.id, val)
      },
      addZaehlung(val) {
        self.zaehlungs.set(val.id, val)
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
