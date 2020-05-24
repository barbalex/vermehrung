import { RootStoreBase } from './RootStore.base'
import { types } from 'mobx-state-tree'
import { reaction, flow } from 'mobx'
import sortBy from 'lodash/sortBy'
import { v1 as uuidv1 } from 'uuid'

import Tree, { defaultValue as defaultTree } from './Tree'
import Filter from './Filter/types'
import initialFilterValues from './Filter/initialValues'
import activeFormFromActiveNodeArray from '../utils/activeFormFromActiveNodeArray'
import QueuedQueryType from './QueuedQuery'
import NotificationType from './Notification'

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
  queuedQueries: types.map(QueuedQueryType),
  notifications: types.map(NotificationType),
  // on startup need to wait with showing data
  // until hasura claims have been added
  // this is _after_ user is set so need another variable
  authorizing: types.optional(types.boolean, true),
})
  // structure of these variables is not controlled
  // so need to define this as volatile
  .volatile(() => ({
    user: {},
    // started out using context for firebase
    // refactored here because of some weird stuff
    // but that probably had other reasons
    // so could move this back to context if necessary
    firebase: null,
  }))
  .actions((self) => {
    reaction(
      () => `${self.queuedQueries}/${self.online}`,
      flow(function* () {
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
          const query = self.queuedQueriesSorted[0]
          if (!query) return
          if (query) {
            const {
              name,
              variables,
              callbackQuery,
              callbackQueryVariables,
            } = query
            console.log('executing query:', name)
            try {
              if (variables) {
                yield self[name](JSON.parse(variables))
              } else {
                yield self[name]()
              }
            } catch (error) {
              console.log({ error })
              // In case a conflict was caused by two EXACT SAME changes,
              // this will bounce because of the same rev. We want to ignore this:
              if (
                error.message.includes('Uniqueness violation') &&
                error.message.includes('teilkultur_rev_id__rev_key')
              ) {
                console.log(
                  'There is a conflict with exact same changes - ingoring the error thrown',
                )
              } else {
                // Maybe do it like superhuman and check if network error
                // then retry and set online without using tool?
                // TODO: describe operation better. User should know what is happening
                // TODO: add button to remove all queued operations
                // use new notification system for this
                return self.addNotification({
                  message: error.message,
                  action1Label: 'Operation löschen',
                  action1Name: 'removeQueuedQueryById',
                  action1Argument: query.id,
                })
              }
            }
            // query to refresh the data updated in all used views (tree...)
            if (callbackQuery) {
              try {
                if (callbackQueryVariables) {
                  self[callbackQuery](JSON.parse(callbackQueryVariables))
                } else {
                  self[callbackQuery]()
                }
              } catch (error) {
                // do nothing
              }
            }
          }
          // remove operation from queue
          // use action because this is async
          self.removeQueuedQueryById(query.id)
        }
      }),
      {
        // make sure retried in a minute
        // https://github.com/mobxjs/mst-gql/issues/198#issuecomment-628083160
        scheduler: (run) => {
          run() // ensure it runs immediately if online
          setInterval(run, 30000) // 30000 = thirty seconds
        },
      },
    )
    return {
      removeQueuedQueryById(id) {
        self.queuedQueries.delete(id)
      },
      addQueuedQuery(valPassed) {
        const val = {
          // set default values
          id: uuidv1(),
          time: Date.now(),
          // overwrite with passed in ones:
          ...valPassed,
        }
        self.queuedQueries.set(val.id, val)
      },
      addNotification(valPassed) {
        const val = {
          // set default values
          id: uuidv1(),
          time: Date.now(),
          duration: 100000, // standard value: 10000
          dismissable: true,
          allDismissable: true,
          type: 'error',
          // overwrite with passed in ones:
          ...valPassed,
        }
        self.notifications.set(val.id, val)
        // remove after duration
        setTimeout(() => {
          self.removeNotificationById(val.id)
        }, val.duration)
      },
      removeNotificationById(id) {
        self.notifications.delete(id)
      },
      removeAllNotifications() {
        self.notifications.clear()
      },
      upsertArt(val) {
        self.arts.set(val.id, val)
      },
      deleteArt(val) {
        self.arts.delete(val.id)
      },
      upsertArtFile(val) {
        self.art_files.set(val.id, val)
      },
      deleteArtFile(val) {
        self.art_files.delete(val.id)
      },
      upsertArtQk(val) {
        self.art_qks.set(val.id, val)
      },
      deleteArtQk(val) {
        self.art_qks.delete(val.id)
      },
      upsertAvArt(val) {
        self.av_arts.set(val.id, val)
      },
      deleteAvArt(val) {
        self.av_arts.delete(val.id)
      },
      upsertEvent(val) {
        self.events.set(val.id, val)
      },
      deleteEvent(val) {
        self.events.delete(val.id)
      },
      upsertGarten(val) {
        self.gartens.set(val.id, val)
      },
      deleteGarten(val) {
        self.gartens.delete(val.id)
      },
      upsertGartenFile(val) {
        self.garten_files.set(val.id, val)
      },
      deleteGartenFile(val) {
        self.garten_files.delete(val.id)
      },
      upsertHerkunft(val) {
        self.herkunfts.set(val.id, val)
      },
      deleteHerkunft(val) {
        self.herkunfts.delete(val.id)
      },
      upsertHerkunftFile(val) {
        self.herkunft_files.set(val.id, val)
      },
      deleteHerkunftFile(val) {
        self.herkunft_files.delete(val.id)
      },
      upsertKultur(val) {
        self.kulturs.set(val.id, val)
      },
      deleteKultur(val) {
        self.kulturs.delete(val.id)
      },
      upsertKulturFile(val) {
        self.kultur_files.set(val.id, val)
      },
      deleteKulturFile(val) {
        self.kultur_files.delete(val.id)
      },
      upsertKulturOption(val) {
        self.kultur_options.set(val.id, val)
      },
      deleteKulturOption(val) {
        self.kultur_options.delete(val.id)
      },
      upsertKulturQk(val) {
        self.kultur_qks.set(val.id, val)
      },
      deleteKulturQk(val) {
        self.kultur_qks.delete(val.id)
      },
      upsertKulturQkChoosen(val) {
        self.kultur_qk_choosens.set(val.id, val)
      },
      deleteKulturQkChoosen(val) {
        self.kultur_qk_choosens.delete(val.id)
      },
      upsertLieferung(val) {
        self.lieferungs.set(val.id, val)
      },
      deleteLieferung(val) {
        self.lieferungs.delete(val.id)
      },
      upsertLieferungFile(val) {
        self.lieferung_files.set(val.id, val)
      },
      deleteLieferungFile(val) {
        self.lieferung_files.delete(val.id)
      },
      upsertPerson(val) {
        self.persons.set(val.id, val)
      },
      deletePerson(val) {
        self.persons.delete(val.id)
      },
      upsertPersonFile(val) {
        self.person_files.set(val.id, val)
      },
      deletePersonFile(val) {
        self.person_files.delete(val.id)
      },
      upsertPersonOption(val) {
        self.person_options.set(val.id, val)
      },
      deletePersonOption(val) {
        self.person_options.delete(val.id)
      },
      upsertSammelLieferung(val) {
        self.sammel_lieferungs.set(val.id, val)
      },
      deleteSammelLieferung(val) {
        self.sammel_lieferungs.delete(val.id)
      },
      upsertSammlung(val) {
        self.sammlungs.set(val.id, val)
      },
      deleteSammlung(val) {
        self.sammlungs.delete(val.id)
      },
      upsertSammlungFile(val) {
        self.sammlung_files.set(val.id, val)
      },
      deleteSammlungFile(val) {
        self.sammlung_files.delete(val.id)
      },
      upsertTeilkultur(val) {
        self.teilkulturs.set(val.id, val)
      },
      deleteTeilkultur(val) {
        self.teilkulturs.delete(val.id)
      },
      upsertTeilzaehlung(val) {
        self.teilzaehlungs.set(val.id, val)
      },
      deleteTeilzaehlung(val) {
        self.teilzaehlungs.delete(val.id)
      },
      upsertUserRole(val) {
        self.user_roles.set(val.id, val)
      },
      deleteUserRole(val) {
        self.user_roles.delete(val.id)
      },
      upsertZaehlung(val) {
        self.zaehlungs.set(val.id, val)
      },
      deleteZaehlung(val) {
        self.zaehlungs.delete(val.id)
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
      setDocFilter(val) {
        self.docFilter = val
      },
    }
  })
  .views((self) => ({
    get activeForm() {
      return activeFormFromActiveNodeArray(self.tree.activeNodeArray)
    },
    get notificationsSorted() {
      return (
        sortBy([...self.notifications.values()], 'time')
          .reverse()
          // limit number to 4
          .slice(0, 4)
      )
    },
    get queuedQueriesSorted() {
      return sortBy([...self.queuedQueries.values()], 'time')
    },
  }))
