import { RootStoreBase } from './RootStore.base'
import { types } from 'mobx-state-tree'
import { reaction, flow } from 'mobx'
import sortBy from 'lodash/sortBy'
import { v1 as uuidv1 } from 'uuid'
import md5 from 'blueimp-md5'
import last from 'lodash/last'
import isUuid from 'is-uuid'

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
                error.message.includes('_rev_id__rev_key')
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
      upsertArtModel(val) {
        self.arts.set(val.id, val)
      },
      deleteArtModel(val) {
        self.arts.delete(val.id)
      },
      insertArtRev() {
        const { user, addQueuedQuery, upsertArtModel } = self
        const {
          activeNodeArray,
          setActiveNodeArray,
          addOpenNodes,
          refetch,
        } = self.tree

        const id = uuidv1()
        const _depth = 1
        const newObject = {
          art_id: id,
          ae_id: undefined,
          changed: new window.Date().toISOString(),
          changed_by: user.email,
          _depth,
          _parent_rev: undefined,
          _deleted: false,
        }
        const rev = `${_depth}-${md5(JSON.stringify(newObject))}`
        newObject._rev = rev
        newObject.id = uuidv1()
        const newObjectForStore = { ...newObject }
        newObject._revisions = `{"${rev}"}`
        newObjectForStore._revisions = [rev]
        addQueuedQuery({
          name: 'mutateInsert_art_rev_one',
          variables: JSON.stringify({
            object: newObject,
            on_conflict: {
              constraint: 'art_rev_pkey',
              update_columns: ['id'],
            },
          }),
          callbackQuery: 'queryArt',
          callbackQueryVariables: JSON.stringify({
            where: { id: { _eq: id } },
          }),
        })
        // optimistically update store
        upsertArtModel(newObjectForStore)
        setTimeout(() => {
          // will be unnecessary once tree is converted to mst
          refetch()
          let newActiveNodeArray
          // slice if last is uuid
          if (isUuid.v1(last(activeNodeArray))) {
            newActiveNodeArray = [...activeNodeArray.slice(0, -1), id]
          } else {
            newActiveNodeArray = [...activeNodeArray, id]
          }
          // update tree status
          setActiveNodeArray(newActiveNodeArray)
          addOpenNodes([newActiveNodeArray])
        })
      },
      deleteArtRevModel(val) {
        self.art_revs.delete(val.id)
      },
      upsertArtFileModel(val) {
        self.art_files.set(val.id, val)
      },
      deleteArtFileModel(val) {
        self.art_files.delete(val.id)
      },
      upsertArtQkModel(val) {
        self.art_qks.set(val.id, val)
      },
      deleteArtQkModel(val) {
        self.art_qks.delete(val.id)
      },
      upsertAvArtModel(val) {
        self.av_arts.set(val.id, val)
      },
      deleteAvArtModel(val) {
        self.av_arts.delete(val.id)
      },
      deleteAvArtRevModel(val) {
        self.av_art_revs.delete(val.id)
      },
      upsertEventModel(val) {
        self.events.set(val.id, val)
      },
      deleteEventModel(val) {
        self.events.delete(val.id)
      },
      deleteEventRevModel(val) {
        self.event_revs.delete(val.id)
      },
      upsertGartenModel(val) {
        self.gartens.set(val.id, val)
      },
      deleteGartenModel(val) {
        self.gartens.delete(val.id)
      },
      deleteGartenRevModel(val) {
        self.garten_revs.delete(val.id)
      },
      upsertGartenFileModel(val) {
        self.garten_files.set(val.id, val)
      },
      deleteGartenFileModel(val) {
        self.garten_files.delete(val.id)
      },
      upsertHerkunftModel(val) {
        self.herkunfts.set(val.id, val)
      },
      deleteHerkunftModel(val) {
        self.herkunfts.delete(val.id)
      },
      deleteHerkunftRevModel(val) {
        self.herkunft_revs.delete(val.id)
      },
      upsertHerkunftFileModel(val) {
        self.herkunft_files.set(val.id, val)
      },
      deleteHerkunftFileModel(val) {
        self.herkunft_files.delete(val.id)
      },
      upsertKulturModel(val) {
        self.kulturs.set(val.id, val)
      },
      deleteKulturModel(val) {
        self.kulturs.delete(val.id)
      },
      deleteKulturRevModel(val) {
        self.kultur_revs.delete(val.id)
      },
      upsertKulturFileModel(val) {
        self.kultur_files.set(val.id, val)
      },
      deleteKulturFileModel(val) {
        self.kultur_files.delete(val.id)
      },
      upsertKulturOptionModel(val) {
        self.kultur_options.set(val.id, val)
      },
      deleteKulturOptionModel(val) {
        self.kultur_options.delete(val.id)
      },
      deleteKulturOptionRevModel(val) {
        self.kultur_option_revs.delete(val.id)
      },
      upsertKulturQkModel(val) {
        self.kultur_qks.set(val.id, val)
      },
      deleteKulturQkModel(val) {
        self.kultur_qks.delete(val.id)
      },
      upsertKulturQkChoosenModel(val) {
        self.kultur_qk_choosens.set(val.id, val)
      },
      deleteKulturQkChoosenModel(val) {
        self.kultur_qk_choosens.delete(val.id)
      },
      upsertLieferungModel(val) {
        self.lieferungs.set(val.id, val)
      },
      deleteLieferungModel(val) {
        self.lieferungs.delete(val.id)
      },
      deleteLieferungRevModel(val) {
        self.lieferung_revs.delete(val.id)
      },
      upsertLieferungFileModel(val) {
        self.lieferung_files.set(val.id, val)
      },
      deleteLieferungFileModel(val) {
        self.lieferung_files.delete(val.id)
      },
      upsertPersonModel(val) {
        self.persons.set(val.id, val)
      },
      deletePersonModel(val) {
        self.persons.delete(val.id)
      },
      deletePersonRevModel(val) {
        self.person_revs.delete(val.id)
      },
      upsertPersonFileModel(val) {
        self.person_files.set(val.id, val)
      },
      deletePersonFileModel(val) {
        self.person_files.delete(val.id)
      },
      upsertPersonOptionModel(val) {
        self.person_options.set(val.id, val)
      },
      deletePersonOptionModel(val) {
        self.person_options.delete(val.id)
      },
      deletePersonOptionRevModel(val) {
        self.person_option_revs.delete(val.id)
      },
      upsertSammelLieferungModel(val) {
        self.sammel_lieferungs.set(val.id, val)
      },
      deleteSammelLieferungModel(val) {
        self.sammel_lieferungs.delete(val.id)
      },
      deleteSammelLieferungRevModel(val) {
        self.sammel_lieferung_revs.delete(val.id)
      },
      upsertSammlungModel(val) {
        self.sammlungs.set(val.id, val)
      },
      deleteSammlungModel(val) {
        self.sammlungs.delete(val.id)
      },
      deleteSammlungRevModel(val) {
        self.sammlung_revs.delete(val.id)
      },
      upsertSammlungFileModel(val) {
        self.sammlung_files.set(val.id, val)
      },
      deleteSammlungFileModel(val) {
        self.sammlung_files.delete(val.id)
      },
      upsertTeilkulturModel(val) {
        self.teilkulturs.set(val.id, val)
      },
      deleteTeilkulturModel(val) {
        self.teilkulturs.delete(val.id)
      },
      deleteTeilkulturRevModel(val) {
        self.teilkultur_revs.delete(val.id)
      },
      upsertTeilzaehlungModel(val) {
        self.teilzaehlungs.set(val.id, val)
      },
      deleteTeilzaehlungModel(val) {
        self.teilzaehlungs.delete(val.id)
      },
      deleteTeilzaehlungRevModel(val) {
        self.teilzaehlung_revs.delete(val.id)
      },
      upsertUserRoleModel(val) {
        self.user_roles.set(val.id, val)
      },
      deleteUserRoleModel(val) {
        self.user_roles.delete(val.id)
      },
      upsertZaehlungModel(val) {
        self.zaehlungs.set(val.id, val)
      },
      deleteZaehlungModel(val) {
        self.zaehlungs.delete(val.id)
      },
      deleteZaehlungRevModel(val) {
        self.zaehlung_revs.delete(val.id)
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
