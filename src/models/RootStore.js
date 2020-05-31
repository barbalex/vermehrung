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
import queryFromTable from '../utils/queryFromTable'
import queryFromStore from '../utils/queryFromStore'
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
            //console.log('executing query:', name)
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
                // delay to prevent app from requerying BEFORE trigger updated the winner
                if (callbackQueryVariables) {
                  setTimeout(
                    () =>
                      self[callbackQuery](JSON.parse(callbackQueryVariables)),
                    500,
                  )
                } else {
                  setTimeout(() => self[callbackQuery](), 500)
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
      insertArtRev(args) {
        const { user, addQueuedQuery, upsertArtModel, tree } = self
        const { activeNodeArray, setActiveNodeArray, addOpenNodes } = self.tree
        const valuesPassed = args?.values ?? {}

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
          ...valuesPassed,
        }
        const rev = `${_depth}-${md5(JSON.stringify(newObject))}`
        newObject._rev = rev
        newObject.id = uuidv1()
        const newObjectForStore = { ...newObject }
        newObject._revisions = `{"${rev}"}`
        newObjectForStore._revisions = [rev]
        // for store: convert rev to winner
        newObjectForStore.id = newObjectForStore.art_id
        delete newObjectForStore.art_id
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
          tree.refetch() // will be unnecessary once tree consists of mst models
          const newActiveNodeArray = isUuid.v1(last(activeNodeArray))
            ? // slice if last is uuid
              [...activeNodeArray.slice(0, -1), id]
            : [...activeNodeArray, id]
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
      insertEventRev(args) {
        const {
          user,
          addQueuedQuery,
          upsertEventModel,
          tree,
          kulturIdInActiveNodeArray,
          teilkulturIdInActiveNodeArray,
        } = self

        const valuesPassed = args?.values ?? {}
        const {
          activeNodeArray: aNaRaw,
          setActiveNodeArray,
          addOpenNodes,
        } = self.tree
        const activeNodeArray = aNaRaw.toJSON()

        const id = uuidv1()
        const _depth = 1
        const newObject = {
          event_id: id,
          // pass in possibly passed kultur_id or undefined
          kultur_id: kulturIdInActiveNodeArray,
          teilkultur_id: teilkulturIdInActiveNodeArray,
          person_id: undefined,
          beschreibung: undefined,
          geplant: undefined,
          datum: undefined,
          changed: new window.Date().toISOString(),
          changed_by: user.email,
          _depth,
          _parent_rev: undefined,
          _deleted: false,
          ...valuesPassed,
        }
        const rev = `${_depth}-${md5(JSON.stringify(newObject))}`
        newObject._rev = rev
        newObject.id = uuidv1()
        const newObjectForStore = { ...newObject }
        newObject._revisions = `{"${rev}"}`
        newObjectForStore._revisions = [rev]
        // for store: convert rev to winner
        newObjectForStore.id = newObjectForStore.event_id
        delete newObjectForStore.event_id
        addQueuedQuery({
          name: 'mutateInsert_event_rev_one',
          variables: JSON.stringify({
            object: newObject,
            on_conflict: {
              constraint: 'event_rev_pkey',
              update_columns: ['id'],
            },
          }),
          callbackQuery: 'queryEvent',
          callbackQueryVariables: JSON.stringify({
            where: { id: { _eq: id } },
          }),
        })
        // optimistically update store
        upsertEventModel(newObjectForStore)
        setTimeout(() => {
          tree.refetch() // will be unnecessary once tree consists of mst models
          const newActiveNodeArray = isUuid.v1(last(activeNodeArray))
            ? // slice if last is uuid
              [...activeNodeArray.slice(0, -1), id]
            : [...activeNodeArray, id]
          // update tree status
          setActiveNodeArray(newActiveNodeArray)
          addOpenNodes([newActiveNodeArray])
        })
      },
      deleteEventRevModel(val) {
        self.event_revs.delete(val.id)
      },
      upsertGartenModel(val) {
        self.gartens.set(val.id, val)
      },
      insertGartenRev(args) {
        const {
          user,
          addQueuedQuery,
          upsertGartenModel,
          tree,
          personIdInActiveNodeArray,
        } = self

        const valuesPassed = args?.values ?? {}
        const {
          activeNodeArray: aNaRaw,
          setActiveNodeArray,
          addOpenNodes,
        } = self.tree
        const activeNodeArray = aNaRaw.toJSON()

        const id = uuidv1()
        const _depth = 1
        const newObject = {
          garten_id: id,
          name: undefined,
          person_id: personIdInActiveNodeArray,
          strasse: undefined,
          plz: undefined,
          ort: undefined,
          geom_point: undefined,
          aktiv: undefined,
          bemerkungen: undefined,
          changed: new window.Date().toISOString(),
          changed_by: user.email,
          _depth,
          _parent_rev: undefined,
          _deleted: false,
          ...valuesPassed,
        }
        const rev = `${_depth}-${md5(JSON.stringify(newObject))}`
        newObject._rev = rev
        newObject.id = uuidv1()
        const newObjectForStore = { ...newObject }
        newObject._revisions = `{"${rev}"}`
        newObjectForStore._revisions = [rev]
        // for store: convert rev to winner
        newObjectForStore.id = newObjectForStore.garten_id
        delete newObjectForStore.garten_id
        addQueuedQuery({
          name: 'mutateInsert_garten_rev_one',
          variables: JSON.stringify({
            object: newObject,
            on_conflict: {
              constraint: 'garten_rev_pkey',
              update_columns: ['id'],
            },
          }),
          callbackQuery: 'queryGarten',
          callbackQueryVariables: JSON.stringify({
            where: { id: { _eq: id } },
          }),
        })
        // optimistically update store
        upsertGartenModel(newObjectForStore)
        setTimeout(() => {
          tree.refetch() // will be unnecessary once tree consists of mst models
          const newActiveNodeArray = isUuid.v1(last(activeNodeArray))
            ? // slice if last is uuid
              [...activeNodeArray.slice(0, -1), id]
            : [...activeNodeArray, id]
          // update tree status
          setActiveNodeArray(newActiveNodeArray)
          addOpenNodes([newActiveNodeArray])
        })
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
      insertHerkunftRev(args) {
        const { user, addQueuedQuery, upsertHerkunftModel, tree } = self

        const valuesPassed = args?.values ?? {}
        const {
          activeNodeArray: aNaRaw,
          setActiveNodeArray,
          addOpenNodes,
        } = self.tree
        const activeNodeArray = aNaRaw.toJSON()

        const id = uuidv1()
        const _depth = 1
        const newObject = {
          herkunft_id: id,
          nr: undefined,
          lokalname: undefined,
          gemeinde: undefined,
          kanton: undefined,
          land: undefined,
          geom_point: undefined,
          bemerkungen: undefined,
          changed: new window.Date().toISOString(),
          changed_by: user.email,
          _depth,
          _parent_rev: undefined,
          _deleted: false,
          ...valuesPassed,
        }
        const rev = `${_depth}-${md5(JSON.stringify(newObject))}`
        newObject._rev = rev
        newObject.id = uuidv1()
        const newObjectForStore = { ...newObject }
        newObject._revisions = `{"${rev}"}`
        newObjectForStore._revisions = [rev]
        // for store: convert herkuft_rev to herkunft
        newObjectForStore.id = newObjectForStore.herkunft_id
        delete newObjectForStore.herkunft_id
        addQueuedQuery({
          name: 'mutateInsert_herkunft_rev_one',
          variables: JSON.stringify({
            object: newObject,
            on_conflict: {
              constraint: 'herkunft_rev_pkey',
              update_columns: ['id'],
            },
          }),
          callbackQuery: 'queryHerkunft',
          callbackQueryVariables: JSON.stringify({
            where: { id: { _eq: id } },
          }),
        })
        // optimistically update store
        upsertHerkunftModel(newObjectForStore)
        setTimeout(() => {
          tree.refetch() // will be unnecessary once tree consists of mst models
          const newActiveNodeArray = isUuid.v1(last(activeNodeArray))
            ? // slice if last is uuid
              [...activeNodeArray.slice(0, -1), id]
            : [...activeNodeArray, id]
          // update tree status
          setActiveNodeArray(newActiveNodeArray)
          addOpenNodes([newActiveNodeArray])
        })
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
      insertKulturRev(args) {
        const {
          user,
          addQueuedQuery,
          upsertKulturModel,
          tree,
          artIdInActiveNodeArray,
          herkunftIdInActiveNodeArray,
          gartenIdInActiveNodeArray,
        } = self
        const valuesPassed = args?.values ?? {}
        const {
          activeNodeArray: aNaRaw,
          setActiveNodeArray,
          addOpenNodes,
        } = self.tree
        const activeNodeArray = aNaRaw.toJSON()

        const id = uuidv1()
        const _depth = 1
        const newObject = {
          kultur_id: id,
          art_id: artIdInActiveNodeArray,
          herkunft_id: herkunftIdInActiveNodeArray,
          garten_id: gartenIdInActiveNodeArray,
          zwischenlager: undefined,
          erhaltungskultur: undefined,
          von_anzahl_individuen: undefined,
          bemerkungen: undefined,
          aktiv: undefined,
          changed: new window.Date().toISOString(),
          changed_by: user.email,
          _depth,
          _parent_rev: undefined,
          _deleted: false,
          ...valuesPassed,
        }
        const rev = `${_depth}-${md5(JSON.stringify(newObject))}`
        newObject._rev = rev
        newObject.id = uuidv1()
        const newObjectForStore = { ...newObject }
        newObject._revisions = `{"${rev}"}`
        newObjectForStore._revisions = [rev]
        // for store: convert rev to winner
        newObjectForStore.id = newObjectForStore.kultur_id
        delete newObjectForStore.kultur_id
        addQueuedQuery({
          name: 'mutateInsert_kultur_rev_one',
          variables: JSON.stringify({
            object: newObject,
            on_conflict: {
              constraint: 'kultur_rev_pkey',
              update_columns: ['id'],
            },
          }),
          callbackQuery: 'queryKultur',
          callbackQueryVariables: JSON.stringify({
            where: { id: { _eq: id } },
          }),
        })
        // optimistically update store
        upsertKulturModel(newObjectForStore)
        setTimeout(() => {
          tree.refetch() // will be unnecessary once tree consists of mst models
          const newActiveNodeArray = isUuid.v1(last(activeNodeArray))
            ? // slice if last is uuid
              [...activeNodeArray.slice(0, -1), id]
            : [...activeNodeArray, id]
          // update tree status
          setActiveNodeArray(newActiveNodeArray)
          addOpenNodes([newActiveNodeArray])
        })
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
      insertLieferungRev(args) {
        const {
          user,
          addQueuedQuery,
          upsertLieferungModel,
          tree,
          artIdInActiveNodeArray,
          personIdInActiveNodeArray,
          sammelLieferungIdInActiveNodeArray,
          sammlungIdInActiveNodeArray,
          kulturIdOfAnLieferungInActiveNodeArray,
        } = self

        const valuesPassed = args?.values ?? {}
        const {
          activeNodeArray: aNaRaw,
          setActiveNodeArray,
          addOpenNodes,
        } = self.tree
        const activeNodeArray = aNaRaw.toJSON()

        const id = uuidv1()
        const _depth = 1
        const newObject = {
          lieferung_id: id,
          sammel_lieferung_id: sammelLieferungIdInActiveNodeArray,
          art_id: artIdInActiveNodeArray,
          person_id: personIdInActiveNodeArray,
          von_sammlung_id: sammlungIdInActiveNodeArray,
          von_kultur_id: kulturIdOfAnLieferungInActiveNodeArray,
          datum: undefined,
          nach_kultur_id: undefined,
          nach_ausgepflanzt: undefined,
          von_anzahl_individuen: undefined,
          anzahl_pflanzen: undefined,
          anzahl_auspflanzbereit: undefined,
          gramm_samen: undefined,
          andere_menge: undefined,
          geplant: undefined,
          bemerkungen: undefined,
          changed: new window.Date().toISOString(),
          changed_by: user.email,
          _depth,
          _parent_rev: undefined,
          _deleted: false,
          ...valuesPassed,
        }
        const rev = `${_depth}-${md5(JSON.stringify(newObject))}`
        newObject._rev = rev
        newObject.id = uuidv1()
        const newObjectForStore = { ...newObject }
        newObject._revisions = `{"${rev}"}`
        newObjectForStore._revisions = [rev]
        // for store: convert rev to winner
        newObjectForStore.id = newObjectForStore.lieferung_id
        delete newObjectForStore.lieferung_id
        addQueuedQuery({
          name: 'mutateInsert_lieferung_rev_one',
          variables: JSON.stringify({
            object: newObject,
            on_conflict: {
              constraint: 'lieferung_rev_pkey',
              update_columns: ['id'],
            },
          }),
          callbackQuery: 'queryLieferung',
          callbackQueryVariables: JSON.stringify({
            where: { id: { _eq: id } },
          }),
        })
        // optimistically update store
        upsertLieferungModel(newObjectForStore)
        setTimeout(() => {
          tree.refetch() // will be unnecessary once tree consists of mst models
          const newActiveNodeArray = isUuid.v1(last(activeNodeArray))
            ? // slice if last is uuid
              [...activeNodeArray.slice(0, -1), id]
            : [...activeNodeArray, id]
          // update tree status
          setActiveNodeArray(newActiveNodeArray)
          addOpenNodes([newActiveNodeArray])
        })
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
      insertPersonRev(args) {
        const { user, addQueuedQuery, upsertPersonModel, tree } = self
        const { activeNodeArray, setActiveNodeArray, addOpenNodes } = self.tree

        const valuesPassed = args?.values ?? {}
        const id = uuidv1()
        const _depth = 1
        const newObject = {
          person_id: id,
          nr: undefined,
          name: undefined,
          adresszusatz: undefined,
          strasse: undefined,
          plz: undefined,
          ort: undefined,
          telefon_privat: undefined,
          telefon_geschaeft: undefined,
          telefon_mobile: undefined,
          email: undefined,
          kein_email: undefined,
          bemerkungen: undefined,
          account_id: undefined,
          user_role: undefined,
          kommerziell: undefined,
          info: undefined,
          aktiv: undefined,
          changed: new window.Date().toISOString(),
          changed_by: user.email,
          _depth,
          _parent_rev: undefined,
          _deleted: false,
          ...valuesPassed,
        }
        const rev = `${_depth}-${md5(JSON.stringify(newObject))}`
        newObject._rev = rev
        newObject.id = uuidv1()
        const newObjectForStore = { ...newObject }
        newObject._revisions = `{"${rev}"}`
        newObjectForStore._revisions = [rev]
        // for store: convert rev to winner
        newObjectForStore.id = newObjectForStore.person_id
        delete newObjectForStore.person_id
        addQueuedQuery({
          name: 'mutateInsert_person_rev_one',
          variables: JSON.stringify({
            object: newObject,
            on_conflict: {
              constraint: 'person_rev_pkey',
              update_columns: ['id'],
            },
          }),
          callbackQuery: 'queryPerson',
          callbackQueryVariables: JSON.stringify({
            where: { id: { _eq: id } },
          }),
        })
        // optimistically update store
        upsertPersonModel(newObjectForStore)
        setTimeout(() => {
          tree.refetch() // will be unnecessary once tree consists of mst models
          const newActiveNodeArray = isUuid.v1(last(activeNodeArray))
            ? // slice if last is uuid
              [...activeNodeArray.slice(0, -1), id]
            : [...activeNodeArray, id]
          // update tree status
          setActiveNodeArray(newActiveNodeArray)
          addOpenNodes([newActiveNodeArray])
        })
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
      deletePersonOptionRevModel(val) {
        self.person_option_revs.delete(val.id)
      },
      upsertSammelLieferungModel(val) {
        self.sammel_lieferungs.set(val.id, val)
      },
      insertSammelLieferungRev(args) {
        const {
          user,
          addQueuedQuery,
          upsertSammelLieferungModel,
          tree,
          artIdInActiveNodeArray,
          personIdInActiveNodeArray,
          sammlungIdInActiveNodeArray,
          kulturIdOfAnLieferungInActiveNodeArray,
        } = self

        const valuesPassed = args?.values ?? {}
        const {
          activeNodeArray: aNaRaw,
          setActiveNodeArray,
          addOpenNodes,
        } = self.tree
        const activeNodeArray = aNaRaw.toJSON()

        const id = uuidv1()
        const _depth = 1
        const newObject = {
          sammel_lieferung_id: id,
          art_id: artIdInActiveNodeArray,
          person_id: personIdInActiveNodeArray,
          von_sammlung_id: sammlungIdInActiveNodeArray,
          von_kultur_id: kulturIdOfAnLieferungInActiveNodeArray,
          datum: undefined,
          nach_kultur_id: undefined,
          nach_ausgepflanzt: undefined,
          von_anzahl_individuen: undefined,
          anzahl_pflanzen: undefined,
          anzahl_auspflanzbereit: undefined,
          gramm_samen: undefined,
          andere_menge: undefined,
          geplant: undefined,
          bemerkungen: undefined,
          changed: new window.Date().toISOString(),
          changed_by: user.email,
          _depth,
          _parent_rev: undefined,
          _deleted: false,
          ...valuesPassed,
        }
        const rev = `${_depth}-${md5(JSON.stringify(newObject))}`
        newObject._rev = rev
        newObject.id = uuidv1()
        const newObjectForStore = { ...newObject }
        newObject._revisions = `{"${rev}"}`
        newObjectForStore._revisions = [rev]
        // for store: convert rev to winner
        newObjectForStore.id = newObjectForStore.sammel_lieferung_id
        delete newObjectForStore.sammel_lieferung_id
        addQueuedQuery({
          name: 'mutateInsert_sammel_lieferung_rev_one',
          variables: JSON.stringify({
            object: newObject,
            on_conflict: {
              constraint: 'sammel_lieferung_rev_pkey',
              update_columns: ['id'],
            },
          }),
          callbackQuery: 'querySammel_sammel_lieferung',
          callbackQueryVariables: JSON.stringify({
            where: { id: { _eq: id } },
          }),
        })
        // optimistically update store
        upsertSammelLieferungModel(newObjectForStore)
        setTimeout(() => {
          tree.refetch() // will be unnecessary once tree consists of mst models
          const newActiveNodeArray = isUuid.v1(last(activeNodeArray))
            ? // slice if last is uuid
              [...activeNodeArray.slice(0, -1), id]
            : [...activeNodeArray, id]
          // update tree status
          setActiveNodeArray(newActiveNodeArray)
          addOpenNodes([newActiveNodeArray])
        })
      },
      deleteSammelLieferungRevModel(val) {
        self.sammel_lieferung_revs.delete(val.id)
      },
      upsertSammlungModel(val) {
        self.sammlungs.set(val.id, val)
      },
      insertSammlungRev(args) {
        const {
          user,
          addQueuedQuery,
          upsertSammlungModel,
          tree,
          artIdInActiveNodeArray,
          herkunftIdInActiveNodeArray,
          personIdInActiveNodeArray,
        } = self

        const valuesPassed = args?.values ?? {}
        const {
          activeNodeArray: aNaRaw,
          setActiveNodeArray,
          addOpenNodes,
        } = self.tree
        const activeNodeArray = aNaRaw.toJSON()

        const id = uuidv1()
        const _depth = 1
        const newObject = {
          sammlung_id: id,
          art_id: artIdInActiveNodeArray,
          person_id: personIdInActiveNodeArray,
          herkunft_id: herkunftIdInActiveNodeArray,
          nr: undefined,
          datum: undefined,
          von_anzahl_individuen: undefined,
          anzahl_pflanzen: undefined,
          gramm_samen: undefined,
          andere_menge: undefined,
          geom_point: undefined,
          geplant: undefined,
          bemerkungen: undefined,
          changed: new window.Date().toISOString(),
          changed_by: user.email,
          _depth,
          _parent_rev: undefined,
          _deleted: false,
          ...valuesPassed,
        }
        const rev = `${_depth}-${md5(JSON.stringify(newObject))}`
        newObject._rev = rev
        newObject.id = uuidv1()
        const newObjectForStore = { ...newObject }
        newObject._revisions = `{"${rev}"}`
        newObjectForStore._revisions = [rev]
        // for store: convert rev to winner
        newObjectForStore.id = newObjectForStore.sammlung_id
        delete newObjectForStore.sammlung_id
        addQueuedQuery({
          name: 'mutateInsert_sammlung_rev_one',
          variables: JSON.stringify({
            object: newObject,
            on_conflict: {
              constraint: 'sammlung_rev_pkey',
              update_columns: ['id'],
            },
          }),
          callbackQuery: 'querySammlung',
          callbackQueryVariables: JSON.stringify({
            where: { id: { _eq: id } },
          }),
        })
        // optimistically update store
        upsertSammlungModel(newObjectForStore)
        setTimeout(() => {
          tree.refetch() // will be unnecessary once tree consists of mst models
          const newActiveNodeArray = isUuid.v1(last(activeNodeArray))
            ? // slice if last is uuid
              [...activeNodeArray.slice(0, -1), id]
            : [...activeNodeArray, id]
          // update tree status
          setActiveNodeArray(newActiveNodeArray)
          addOpenNodes([newActiveNodeArray])
        })
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
      insertTeilkulturRev(args) {
        const {
          user,
          addQueuedQuery,
          upsertTeilkulturModel,
          tree,
          kulturIdInActiveNodeArray,
        } = self

        const noNavigateInTree = args?.noNavigateInTree ?? false
        const valuesPassed = args?.values ?? {}

        const {
          activeNodeArray: aNaRaw,
          setActiveNodeArray,
          addOpenNodes,
        } = self.tree
        const activeNodeArray = aNaRaw.toJSON()

        const id = uuidv1()
        const _depth = 1
        const newObject = {
          teilkultur_id: id,
          kultur_id: kulturIdInActiveNodeArray,
          name: undefined,
          ort1: undefined,
          ort2: undefined,
          ort3: undefined,
          bemerkungen: undefined,
          changed: new window.Date().toISOString(),
          changed_by: user.email,
          _depth,
          _parent_rev: undefined,
          _deleted: false,
          ...valuesPassed,
        }
        const rev = `${_depth}-${md5(JSON.stringify(newObject))}`
        newObject._rev = rev
        newObject.id = uuidv1()
        const newObjectForStore = { ...newObject }
        newObject._revisions = `{"${rev}"}`
        newObjectForStore._revisions = [rev]
        // for store: convert rev to winner
        newObjectForStore.id = id
        delete newObjectForStore.teilkultur_id
        addQueuedQuery({
          name: 'mutateInsert_teilkultur_rev_one',
          variables: JSON.stringify({
            object: newObject,
            on_conflict: {
              constraint: 'teilkultur_rev_pkey',
              update_columns: ['id'],
            },
          }),
          callbackQuery: 'queryTeilkultur',
          callbackQueryVariables: JSON.stringify({
            where: { id: { _eq: id } },
          }),
        })
        // optimistically update store
        upsertTeilkulturModel(newObjectForStore)
        if (!noNavigateInTree) {
          setTimeout(() => {
            tree.refetch() // will be unnecessary once tree consists of mst models
            const newActiveNodeArray = isUuid.v1(last(activeNodeArray))
              ? // slice if last is uuid
                [...activeNodeArray.slice(0, -1), id]
              : [...activeNodeArray, id]
            // update tree status
            setActiveNodeArray(newActiveNodeArray)
            addOpenNodes([newActiveNodeArray])
          })
        }
        return id
      },
      deleteTeilkulturRevModel(val) {
        self.teilkultur_revs.delete(val.id)
      },
      upsertTeilzaehlungModel(val) {
        self.teilzaehlungs.set(val.id, val)
      },
      insertTeilzaehlungRev(args) {
        const {
          user,
          addQueuedQuery,
          upsertTeilzaehlungModel,
          zaehlungIdInActiveNodeArray,
          teilkulturIdInActiveNodeArray,
        } = self
        const valuesPassed = args?.values ?? {}

        const id = uuidv1()
        const _depth = 1
        const newObject = {
          teilzaehlung_id: id,
          zaehlung_id: zaehlungIdInActiveNodeArray,
          teilkultur_id: teilkulturIdInActiveNodeArray,
          anzahl_pflanzen: undefined,
          anzahl_auspflanzbereit: undefined,
          anzahl_mutterpflanzen: undefined,
          andere_menge: undefined,
          auspflanzbereit_beschreibung: undefined,
          bemerkungen: undefined,
          prognose_von_tz: undefined,
          changed: new window.Date().toISOString(),
          changed_by: user.email,
          _depth,
          _parent_rev: undefined,
          _deleted: false,
          ...valuesPassed,
        }
        const rev = `${_depth}-${md5(JSON.stringify(newObject))}`
        newObject._rev = rev
        newObject.id = uuidv1()
        const newObjectForStore = { ...newObject }
        newObject._revisions = `{"${rev}"}`
        newObjectForStore._revisions = [rev]
        // for store: convert rev to winner
        newObjectForStore.id = newObjectForStore.teilzaehlung_id
        delete newObjectForStore.teilzaehlung_id
        addQueuedQuery({
          name: 'mutateInsert_teilzaehlung_rev_one',
          variables: JSON.stringify({
            object: newObject,
            on_conflict: {
              constraint: 'teilzaehlung_rev_pkey',
              update_columns: ['id'],
            },
          }),
          callbackQuery: 'queryTeilzaehlung',
          callbackQueryVariables: JSON.stringify({
            where: { id: { _eq: id } },
          }),
        })
        // optimistically update store
        upsertTeilzaehlungModel(newObjectForStore)
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
      insertZaehlungRev(args) {
        const {
          user,
          addQueuedQuery,
          upsertZaehlungModel,
          tree,
          kulturIdInActiveNodeArray,
        } = self
        const valuesPassed = args?.values ?? {}

        const {
          activeNodeArray: aNaRaw,
          setActiveNodeArray,
          addOpenNodes,
        } = self.tree
        const activeNodeArray = aNaRaw.toJSON()

        const id = uuidv1()
        const _depth = 1
        const newObject = {
          zaehlung_id: id,
          kultur_id: kulturIdInActiveNodeArray,
          datum: undefined,
          prognose: undefined,
          bemerkungen: undefined,
          changed: new window.Date().toISOString(),
          changed_by: user.email,
          _depth,
          _parent_rev: undefined,
          _deleted: false,
          ...valuesPassed,
        }
        const rev = `${_depth}-${md5(JSON.stringify(newObject))}`
        newObject._rev = rev
        newObject.id = uuidv1()
        const newObjectForStore = { ...newObject }
        newObject._revisions = `{"${rev}"}`
        newObjectForStore._revisions = [rev]
        // for store: convert rev to winner
        newObjectForStore.id = newObjectForStore.zaehlung_id
        delete newObjectForStore.zaehlung_id
        addQueuedQuery({
          name: 'mutateInsert_zaehlung_rev_one',
          variables: JSON.stringify({
            object: newObject,
            on_conflict: {
              constraint: 'zaehlung_rev_pkey',
              update_columns: ['id'],
            },
          }),
          callbackQuery: 'queryZaehlung',
          callbackQueryVariables: JSON.stringify({
            where: { id: { _eq: id } },
          }),
        })
        // optimistically update store
        upsertZaehlungModel(newObjectForStore)
        setTimeout(() => {
          tree.refetch() // will be unnecessary once tree consists of mst models
          const newActiveNodeArray = isUuid.v1(last(activeNodeArray))
            ? // slice if last is uuid
              [...activeNodeArray.slice(0, -1), id]
            : [...activeNodeArray, id]
          // update tree status
          setActiveNodeArray(newActiveNodeArray)
          addOpenNodes([newActiveNodeArray])
        })
        return id
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
    get artIdInActiveNodeArray() {
      const { activeNodeArray: aNaRaw } = self.tree
      const activeNodeArray = aNaRaw.toJSON()
      if (activeNodeArray.includes('Arten')) {
        const indexOfId = activeNodeArray.indexOf('Arten') + 1
        if (activeNodeArray.length > indexOfId) {
          const id = activeNodeArray?.[indexOfId]
          if (isUuid.v1(id)) return id
        }
      }
      return undefined
    },
    get herkunftIdInActiveNodeArray() {
      const { activeNodeArray: aNaRaw } = self.tree
      const activeNodeArray = aNaRaw.toJSON()
      if (activeNodeArray.includes('Herkuenfte')) {
        const indexOfId = activeNodeArray.indexOf('Herkuenfte') + 1
        if (activeNodeArray.length > indexOfId) {
          const id = activeNodeArray?.[indexOfId]
          if (isUuid.v1(id)) return id
        }
      }
      return undefined
    },
    get gartenIdInActiveNodeArray() {
      const { activeNodeArray: aNaRaw } = self.tree
      const activeNodeArray = aNaRaw.toJSON()
      if (activeNodeArray.includes('Gaerten')) {
        const indexOfId = activeNodeArray.indexOf('Gaerten') + 1
        if (activeNodeArray.length > indexOfId) {
          const id = activeNodeArray?.[indexOfId]
          if (isUuid.v1(id)) return id
        }
      }
      return undefined
    },
    get kulturIdInActiveNodeArray() {
      const { activeNodeArray: aNaRaw } = self.tree
      const activeNodeArray = aNaRaw.toJSON()
      if (activeNodeArray.includes('Kulturen')) {
        const indexOfId = activeNodeArray.indexOf('Kulturen') + 1
        if (activeNodeArray.length > indexOfId) {
          const id = activeNodeArray?.[indexOfId]
          if (isUuid.v1(id)) return id
        }
      }
      return undefined
    },
    get teilkulturIdInActiveNodeArray() {
      const { activeNodeArray: aNaRaw } = self.tree
      const activeNodeArray = aNaRaw.toJSON()
      if (activeNodeArray.includes('Teilkulturen')) {
        const indexOfId = activeNodeArray.indexOf('Teilkulturen') + 1
        if (activeNodeArray.length > indexOfId) {
          const id = activeNodeArray?.[indexOfId]
          if (isUuid.v1(id)) return id
        }
      }
      return undefined
    },
    get personIdInActiveNodeArray() {
      const { activeNodeArray: aNaRaw } = self.tree
      const activeNodeArray = aNaRaw.toJSON()
      if (activeNodeArray.includes('Personen')) {
        const indexOfId = activeNodeArray.indexOf('Personen') + 1
        if (activeNodeArray.length > indexOfId) {
          const id = activeNodeArray?.[indexOfId]
          if (isUuid.v1(id)) return id
        }
      }
      return undefined
    },
    get sammelLieferungIdInActiveNodeArray() {
      const { activeNodeArray: aNaRaw } = self.tree
      const activeNodeArray = aNaRaw.toJSON()
      if (activeNodeArray.includes('Sammel-Lieferungen')) {
        const indexOfId = activeNodeArray.indexOf('Sammel-Lieferungen') + 1
        if (activeNodeArray.length > indexOfId) {
          const id = activeNodeArray?.[indexOfId]
          if (isUuid.v1(id)) return id
        }
      }
      return undefined
    },
    get sammlungIdInActiveNodeArray() {
      const { activeNodeArray: aNaRaw } = self.tree
      const activeNodeArray = aNaRaw.toJSON()
      if (activeNodeArray.includes('Sammlungen')) {
        const indexOfId = activeNodeArray.indexOf('Sammlungen') + 1
        if (activeNodeArray.length > indexOfId) {
          const id = activeNodeArray?.[indexOfId]
          if (isUuid.v1(id)) return id
        }
      }
      return undefined
    },
    get kulturIdOfAnLieferungInActiveNodeArray() {
      const { activeNodeArray: aNaRaw } = self.tree
      const activeNodeArray = aNaRaw.toJSON()
      if (
        activeNodeArray.includes('An-Lieferungen') &&
        activeNodeArray.includes('Kulturen')
      ) {
        const indexOfId = activeNodeArray.indexOf('Kulturen') + 1
        if (activeNodeArray.length > indexOfId) {
          const id = activeNodeArray?.[indexOfId]
          if (isUuid.v1(id)) return id
        }
      }
      return undefined
    },
    get zaehlungIdInActiveNodeArray() {
      const { activeNodeArray: aNaRaw } = self.tree
      const activeNodeArray = aNaRaw.toJSON()
      if (activeNodeArray.includes('Zaehlungen')) {
        const indexOfId = activeNodeArray.indexOf('Zaehlungen') + 1
        if (activeNodeArray.length > indexOfId) {
          const id = activeNodeArray?.[indexOfId]
          if (isUuid.v1(id)) return id
        }
      }
      return undefined
    },
    get userPerson() {
      const { user, queryPerson, persons } = self
      const userPerson = [...persons.values()].find(
        (p) => p.account_id === user.uid,
      )
      if (!userPerson) {
        queryPerson({ where: { account_id: { _eq: user.uid } } })
      }
      return userPerson ?? {}
    },
    get userPersonOption() {
      const { userPerson, person_options, queryPerson_option } = self
      const userPersonOption = person_options.get(userPerson.id)
      if (!userPersonOption && userPerson.id) {
        queryPerson_option({ where: { id: { _eq: userPerson.id } } })
      }
      return userPersonOption ?? {}
    },
    get artFilter() {
      return queryFromTable({ store: self, table: 'art' })
    },
    get artFiltered() {
      return queryFromStore({ store: self, table: 'art' })
    },
    get eventFilter() {
      return queryFromTable({ store: self, table: 'event' })
    },
    get eventFiltered() {
      return queryFromStore({ store: self, table: 'event' })
    },
    get gartenFilter() {
      return queryFromTable({ store: self, table: 'garten' })
    },
    get gartenFiltered() {
      return queryFromStore({ store: self, table: 'garten' })
    },
    get herkunftFilter() {
      return queryFromTable({ store: self, table: 'herkunft' })
    },
    get herkunftFiltered() {
      return queryFromStore({ store: self, table: 'herkunft' })
    },
    get kulturFilter() {
      return queryFromTable({ store: self, table: 'kultur' })
    },
    get kulturFiltered() {
      return queryFromStore({ store: self, table: 'kultur' })
    },
    get lieferungFilter() {
      return queryFromTable({ store: self, table: 'lieferung' })
    },
    get lieferungFiltered() {
      return queryFromStore({ store: self, table: 'lieferung' })
    },
    get personFilter() {
      return queryFromTable({ store: self, table: 'person' })
    },
    get personFiltered() {
      return queryFromStore({ store: self, table: 'person' })
    },
    get sammelLieferungFilter() {
      return queryFromTable({ store: self, table: 'sammel_lieferung' })
    },
    get sammelLieferungFiltered() {
      return queryFromStore({ store: self, table: 'sammel_lieferung' })
    },
    get sammlungFilter() {
      return queryFromTable({ store: self, table: 'sammlung' })
    },
    get sammlungFiltered() {
      return queryFromStore({ store: self, table: 'sammlung' })
    },
    get teilkulturFilter() {
      return queryFromTable({ store: self, table: 'teilkultur' })
    },
    get teilkulturFiltered() {
      return queryFromStore({ store: self, table: 'teilkultur' })
    },
    get zaehlungFilter() {
      return queryFromTable({ store: self, table: 'zaehlung' })
    },
    get zaehlungFiltered() {
      return queryFromStore({ store: self, table: 'zaehlung' })
    },
  }))
