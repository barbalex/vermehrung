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
      addArt(val) {
        self.arts = { ...{ [val.id]: val }, ...self.arts.toJS() }
      },
      addArtFile(val) {
        self.art_files = { ...{ [val.id]: val }, ...self.art_files.toJS() }
      },
      addArtQk(val) {
        self.art_qks = { ...{ [val.id]: val }, ...self.art_qks.toJS() }
      },
      addAvArt(val) {
        self.av_arts = { ...{ [val.id]: val }, ...self.av_arts.toJS() }
      },
      addEvent(val) {
        self.events = { ...{ [val.id]: val }, ...self.events.toJS() }
      },
      addGarten(val) {
        self.gartens = { ...{ [val.id]: val }, ...self.gartens.toJS() }
      },
      addGartenFile(val) {
        self.garten_files = {
          ...{ [val.id]: val },
          ...self.garten_files.toJS(),
        }
      },
      addHerkunft(val) {
        self.herkunfts = { ...{ [val.id]: val }, ...self.herkunfts.toJS() }
      },
      addHerkunftFile(val) {
        self.herkunft_files = {
          ...{ [val.id]: val },
          ...self.herkunft_files.toJS(),
        }
      },
      addKultur(val) {
        self.kulturs = { ...{ [val.id]: val }, ...self.kulturs.toJS() }
      },
      addKulturFile(val) {
        self.kultur_files = {
          ...{ [val.id]: val },
          ...self.kultur_files.toJS(),
        }
      },
      addKulturOption(val) {
        self.kultur_options = {
          ...{ [val.id]: val },
          ...self.kultur_options.toJS(),
        }
      },
      addKulturQk(val) {
        self.kultur_qks = { ...{ [val.id]: val }, ...self.kultur_qks.toJS() }
      },
      addKulturQkChoosen(val) {
        self.kultur_qk_choosens = {
          ...{ [val.id]: val },
          ...self.kultur_qk_choosens.toJS(),
        }
      },
      addLieferung(val) {
        self.lieferungs = { ...{ [val.id]: val }, ...self.lieferungs.toJS() }
      },
      addLieferungFile(val) {
        self.lieferung_files = {
          ...{ [val.id]: val },
          ...self.lieferung_files.toJS(),
        }
      },
      addPerson(val) {
        self.persons = { ...{ [val.id]: val }, ...self.persons.toJS() }
      },
      addPersonFile(val) {
        self.person_files = {
          ...{ [val.id]: val },
          ...self.person_files.toJS(),
        }
      },
      addPersonOption(val) {
        self.person_options = {
          ...{ [val.id]: val },
          ...self.person_options.toJS(),
        }
      },
      addSammelLieferung(val) {
        self.sammel_lieferungs = {
          ...{ [val.id]: val },
          ...self.sammel_lieferungs.toJS(),
        }
      },
      addSammlung(val) {
        self.sammlungs = { ...{ [val.id]: val }, ...self.sammlungs.toJS() }
      },
      addSammlungFile(val) {
        self.sammlung_files = {
          ...{ [val.id]: val },
          ...self.sammlung_files.toJS(),
        }
      },
      addTeilkultur(val) {
        self.teilkulturs = { ...{ [val.id]: val }, ...self.teilkulturs.toJS() }
      },
      addTeilzaehlung(val) {
        self.teilzaehlungs = {
          ...{ [val.id]: val },
          ...self.teilzaehlungs.toJS(),
        }
      },
      addUserRole(val) {
        self.user_roles = { ...{ [val.id]: val }, ...self.user_roles.toJS() }
      },
      addZaehlung(val) {
        self.zaehlungs = { ...{ [val.id]: val }, ...self.zaehlungs.toJS() }
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
