import { RootStoreBase } from './RootStore.base'
import { types, destroy } from 'mobx-state-tree'
import { reaction, flow } from 'mobx'
import sortBy from 'lodash/sortBy'
import { v1 as uuidv1 } from 'uuid'
import md5 from 'blueimp-md5'
import last from 'lodash/last'
import set from 'lodash/set'
import unset from 'lodash/unset'
import isUuid from 'is-uuid'

import Tree, { defaultValue as defaultTree } from './Tree'
import Filter from './Filter/types'
import initialFilterValues from './Filter/initialValues'
import activeFormFromActiveNodeArray from '../utils/activeFormFromActiveNodeArray'
import queryFromStore from '../utils/queryFromStore'
import QueuedQueryType from './QueuedQuery'
import NotificationType from './Notification'
import artSort from '../utils/artSort'
import avSort from '../utils/avSort'
import gvSort from '../utils/gvSort'
import eventSort from '../utils/eventSort'
import lieferungSort from '../utils/lieferungSort'
import personSort from '../utils/personSort'
import sammlungSort from '../utils/sammlungSort'
import teilkulturSort from '../utils/teilkulturSort'
import teilzaehlungSort from '../utils/teilzaehlungSort'
import zaehlungSort from '../utils/zaehlungSort'
import gartenSort from '../utils/gartenSort'
import herkunftSort from '../utils/herkunftSort'
import kulturSort from '../utils/kulturSort'
import notDeletedOrHasConflict from '../utils/notDeletedOrHasConflict'
import artIdInUrl from '../utils/artIdInUrl'
import herkunftIdInUrl from '../utils/herkunftIdInUrl'
import gartenIdInUrl from '../utils/gartenIdInUrl'
import kulturIdInUrl from '../utils/kulturIdInUrl'
import anLieferungIdInUrl from '../utils/anLieferungIdInUrl'
import eventIdInUrl from '../utils/eventIdInUrl'
import ausLieferungIdInUrl from '../utils/ausLieferungIdInUrl'
import lieferungIdInUrl from '../utils/lieferungIdInUrl'
import teilkulturIdInUrl from '../utils/teilkulturIdInUrl'
import personIdInUrl from '../utils/personIdInUrl'
import sammelLieferungIdInUrl from '../utils/sammelLieferungIdInUrl'
import sammlungIdInUrl from '../utils/sammlungIdInUrl'
import kulturIdOfAnLieferungInUrl from '../utils/kulturIdOfAnLieferungInUrl'
import kulturIdOfAusLieferungInUrl from '../utils/kulturIdOfAusLieferungInUrl'
import zaehlungIdInUrl from '../utils/zaehlungIdInUrl'
import getAuthToken from '../utils/getAuthToken'
import queryAllData from '../utils/queryAllData'
import Errors, { defaultValue as defaultErrors } from './Errors'

export const RootStore = RootStoreBase.props({
  tree: types.optional(Tree, defaultTree),
  filter: types.optional(Filter, initialFilterValues),
  docFilter: types.optional(types.union(types.string, types.number), ''),
  docsCount: types.maybeNull(types.number, null),
  docsFilteredCount: types.maybeNull(types.number, null),
  isPrint: types.optional(types.boolean, false),
  singleColumnView: types.optional(types.boolean, false),
  showTreeInSingleColumnView: types.optional(types.boolean, false),
  online: types.optional(types.boolean, true),
  lastUpdatedAt: types.optional(types.number, 0),
  /**
   * This is a queue of all queries
   * When online they they are immediatly executed by the reaction
   * When offline they remain queued until connectivity is back
   */
  queuedQueries: types.map(QueuedQueryType),
  showQueuedQueries: types.optional(types.boolean, false),
  notifications: types.map(NotificationType),
  // on startup need to wait with showing data
  // until hasura claims have been added
  // this is _after_ user is set so need another variable
  gettingAuthUser: types.optional(types.boolean, true),
  authorizing: types.optional(types.boolean, true),
  initialDataQueried: types.optional(types.boolean, false),
  errors: types.optional(Errors, defaultErrors),
  diffConflict: types.optional(types.boolean, true),
})
  .volatile(() => ({
    user: {},
    firebase: null,
    gqlHttpClient: null,
    gqlWsClient: null,
  }))
  .actions((self) => {
    reaction(
      () => `${self.initialDataQueried}/${self.online}`,
      () => {
        const { initialDataQueried, online } = self
        if (!initialDataQueried && online) {
          console.log('store reaction querying initial data')
          queryAllData({ store: self })
        }
      },
    ),
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
            const {
              name,
              variables,
              revertTable,
              revertField,
              revertId,
              revertValue,
            } = query
            try {
              if (variables) {
                yield self[name](JSON.parse(variables))
              } else {
                yield self[name]()
              }
            } catch (error) {
              const lcMessage = error.message.toLowerCase()
              console.log('store, error:', { error, query })
              // In case a conflict was caused by two EXACT SAME changes,
              // this will bounce because of the same rev. We want to ignore this:
              if (error.message.includes('JWT')) {
                return getAuthToken({ store: self })
              } else if (
                lcMessage.includes('uniqueness violation') &&
                lcMessage.includes('_rev_id__rev_key')
              ) {
                console.log(
                  'There is a conflict with exact same changes - ingoring the error thrown',
                )
              } else if (lcMessage.includes('unique-constraint')) {
                let { message } = error
                if (
                  lcMessage.includes('single_art_herkunft_garden_active_idx')
                ) {
                  message =
                    'Pro Art, Herkunft und Garten darf nur eine Kultur aktiv sein (plus ein Zwischenlager). Offenbar gibt es schon eine aktive Kultur'
                }
                // do not add a notification: show this error below the field
                self.setError({
                  path: `${revertTable}.${revertField}`,
                  value: message,
                })
                console.log('a unique constraint was violated')
              } else if (error.message.includes('Failed to fetch')) {
                console.log('ignore fetch failing')
              } else {
                self.setError({
                  path: `${revertTable}.${revertField}`,
                  value: error.message,
                })
                return self.addNotification({
                  title:
                    'Eine Operation kann nicht in die Datenbank geschrieben werden',
                  message: error.message,
                  actionLabel: 'Operation löschen',
                  actionName: 'removeQueuedQueryById',
                  actionArgument: query.id,
                })
              }
              // revert change
              self.updateModelValue({
                table: revertTable,
                id: revertId,
                field: revertField,
                value: revertValue,
              })
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
      setLastUpdatedAt(val) {
        //console.log('store, setLastUpdatedAt:', val)
        self.lastUpdatedAt = val
      },
      setDiffConflict(val) {
        self.diffConflict = val
      },
      setShowTreeInSingleColumnView(val) {
        self.showTreeInSingleColumnView = val
      },
      setSingleColumnView(val) {
        self.singleColumnView = val
      },
      setDocsCount(val) {
        self.docsCount = val
      },
      setDocsFilteredCount(val) {
        self.docsFilteredCount = val
      },
      setShowQueuedQueries(val) {
        self.showQueuedQueries = val
      },
      setError({ path, value }) {
        set(self.errors, path, value)
      },
      unsetError(path) {
        unset(self.errors, path)
      },
      setInitialDataQueried(val) {
        self.initialDataQueried = val
      },
      setGqlHttpClient(val) {
        self.gqlHttpClient = val
      },
      setGqlWsClient(val) {
        self.gqlWsClient = val
      },
      updateModelValue({ table, id, field, value }) {
        // used to revert offline operations if they error
        const model = self[`${table}s`].get(id)
        if (!model) return
        self[`${table}s`].set(id, { ...model, [field]: value })
      },
      updateModelValues({ table, id, values }) {
        // used to revert offline operations if they error
        const model = self[`${table}s`].get(id)
        if (!model) return
        self[`${table}s`].set(id, { ...model, ...values })
      },
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
          duration: 10000, // standard value: 10000
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
        const { user, addQueuedQuery, upsertArtModel } = self
        const { activeNodeArray, setActiveNodeArray } = self.tree
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
          revertTable: 'art',
          revertId: id,
          revertField: '_deleted',
          revertValue: true,
          isInsert: true,
        })
        // optimistically update store
        upsertArtModel(newObjectForStore)
        setTimeout(() => {
          const newActiveNodeArray = isUuid.v1(last(activeNodeArray))
            ? // slice if last is uuid
              [...activeNodeArray.slice(0, -1), id]
            : [...activeNodeArray, id]
          // update tree status
          setActiveNodeArray(newActiveNodeArray)
        })
      },
      deleteArtRevModel(val) {
        // 1. update model: remove this conflict
        const model = self.arts.get(val.art_id)
        const newModel = {
          ...model,
          _conflicts: model._conflicts.filter((c) => c !== val._rev),
        }
        self.arts.set(val.art_id, newModel)
        // 2. delete rev model
        const rev_model = self.art_revs.get(val.id)
        destroy(rev_model)
      },
      upsertArtQkChoosenModel(val) {
        self.art_qk_choosens.set(val.id, val)
      },
      insertArtQkChoosenRev(args) {
        const { user, addQueuedQuery, upsertArtQkChoosenModel } = self
        const valuesPassed = args?.values ?? {}

        const id = uuidv1()
        const _depth = 1
        const newObject = {
          art_qk_choosen_id: id,
          art_id: undefined,
          qk_name: undefined,
          choosen: undefined,
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
        newObjectForStore.id = newObjectForStore.art_qk_choosen_id
        delete newObjectForStore.art_qk_choosen_id
        addQueuedQuery({
          name: 'mutateInsert_art_qk_choosen_rev_one',
          variables: JSON.stringify({
            object: newObject,
            on_conflict: {
              constraint: 'art_qk_choosen_rev_pkey',
              update_columns: ['id'],
            },
          }),
          revertTable: 'art_qk_choosen',
          revertId: id,
          revertField: '_deleted',
          revertValue: true,
          isInsert: true,
        })
        // optimistically update store
        upsertArtQkChoosenModel(newObjectForStore)
      },
      deleteArtQkChoosenRevModel(val) {
        // 1. update model: remove this conflict
        const model = self.art_qk_choosens.get(val.art_qk_choosen_id)
        const newModel = {
          ...model,
          _conflicts: model._conflicts.filter((c) => c !== val._rev),
        }
        self.art_qk_choosens.set(val.art_qk_choosen_id, newModel)
        // 2. delete rev model
        const rev_model = self.art_qk_choosen_revs.get(val.id)
        destroy(rev_model)
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
      upsertAvModel(val) {
        self.avs.set(val.id, val)
      },
      insertAvRev(args) {
        const { user, addQueuedQuery, upsertAvModel } = self
        const valuesPassed = args?.values ?? {}

        const id = uuidv1()
        const _depth = 1
        const newObject = {
          av_id: id,
          art_id: undefined,
          person_id: undefined,
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
        newObjectForStore.id = newObjectForStore.av_id
        delete newObjectForStore.av_id
        addQueuedQuery({
          name: 'mutateInsert_av_rev_one',
          variables: JSON.stringify({
            object: newObject,
            on_conflict: {
              constraint: 'av_rev_pkey',
              update_columns: ['id'],
            },
          }),
          revertTable: 'av',
          revertId: id,
          revertField: '_deleted',
          revertValue: true,
          isInsert: true,
        })
        // optimistically update store
        upsertAvModel(newObjectForStore)
      },
      deleteAvRevModel(val) {
        // 1. update model: remove this conflict
        const model = self.avs.get(val.av_id)
        const newModel = {
          ...model,
          _conflicts: model._conflicts.filter((c) => c !== val._rev),
        }
        self.avs.set(val.av_id, newModel)
        // 2. delete rev model
        const rev_model = self.av_revs.get(val.id)
        destroy(rev_model)
      },
      upsertEventModel(val) {
        self.events.set(val.id, val)
      },
      insertEventRev(args) {
        const {
          user,
          addQueuedQuery,
          upsertEventModel,
          kulturIdInActiveNodeArray,
          teilkulturIdInActiveNodeArray,
        } = self

        const valuesPassed = args?.values ?? {}
        const { activeNodeArray: aNaRaw, setActiveNodeArray } = self.tree
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
          revertTable: 'event',
          revertId: id,
          revertField: '_deleted',
          revertValue: true,
          isInsert: true,
        })
        // optimistically update store
        upsertEventModel(newObjectForStore)
        setTimeout(() => {
          const newActiveNodeArray = isUuid.v1(last(activeNodeArray))
            ? // slice if last is uuid
              [...activeNodeArray.slice(0, -1), id]
            : [...activeNodeArray, id]
          // update tree status
          setActiveNodeArray(newActiveNodeArray)
        })
      },
      deleteEventRevModel(val) {
        // 1. update model: remove this conflict
        const model = self.events.get(val.event_id)
        const newModel = {
          ...model,
          _conflicts: model._conflicts.filter((c) => c !== val._rev),
        }
        self.events.set(val.event_id, newModel)
        // 2. delete rev model
        const rev_model = self.event_revs.get(val.id)
        destroy(rev_model)
      },
      upsertGartenModel(val) {
        self.gartens.set(val.id, val)
      },
      insertGartenRev(args) {
        const {
          user,
          addQueuedQuery,
          upsertGartenModel,
          personIdInActiveNodeArray,
        } = self

        const valuesPassed = args?.values ?? {}
        const { activeNodeArray: aNaRaw, setActiveNodeArray } = self.tree
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
          revertTable: 'garten',
          revertId: id,
          revertField: '_deleted',
          revertValue: true,
          isInsert: true,
        })
        // optimistically update store
        upsertGartenModel(newObjectForStore)
        setTimeout(() => {
          const newActiveNodeArray = isUuid.v1(last(activeNodeArray))
            ? // slice if last is uuid
              [...activeNodeArray.slice(0, -1), id]
            : [...activeNodeArray, id]
          // update tree status
          setActiveNodeArray(newActiveNodeArray)
        })
      },
      deleteGartenRevModel(val) {
        // 1. update model: remove this conflict
        const model = self.gartens.get(val.garten_id)
        const newModel = {
          ...model,
          _conflicts: model._conflicts.filter((c) => c !== val._rev),
        }
        self.gartens.set(val.garten_id, newModel)
        // 2. delete rev model
        const rev_model = self.garten_revs.get(val.id)
        destroy(rev_model)
      },
      upsertGartenFileModel(val) {
        self.garten_files.set(val.id, val)
      },
      deleteGartenFileModel(val) {
        self.garten_files.delete(val.id)
      },
      upsertGvModel(val) {
        self.gvs.set(val.id, val)
      },
      insertGvRev(args) {
        const { user, addQueuedQuery, upsertGvModel } = self
        const valuesPassed = args?.values ?? {}

        const id = uuidv1()
        const _depth = 1
        const newObject = {
          gv_id: id,
          garten_id: undefined,
          person_id: undefined,
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
        newObjectForStore.id = newObjectForStore.gv_id
        delete newObjectForStore.gv_id
        addQueuedQuery({
          name: 'mutateInsert_gv_rev_one',
          variables: JSON.stringify({
            object: newObject,
            on_conflict: {
              constraint: 'gv_rev_pkey',
              update_columns: ['id'],
            },
          }),
          revertTable: 'gv',
          revertId: id,
          revertField: '_deleted',
          revertValue: true,
          isInsert: true,
        })
        // optimistically update store
        upsertGvModel(newObjectForStore)
      },
      deleteGvRevModel(val) {
        // 1. update model: remove this conflict
        const model = self.gvs.get(val.gv_id)
        const newModel = {
          ...model,
          _conflicts: model._conflicts.filter((c) => c !== val._rev),
        }
        self.gvs.set(val.gv_id, newModel)
        // 2. delete rev model
        const rev_model = self.gv_revs.get(val.id)
        destroy(rev_model)
      },
      upsertHerkunftModel(val) {
        self.herkunfts.set(val.id, val)
      },
      insertHerkunftRev(args) {
        const { user, addQueuedQuery, upsertHerkunftModel } = self

        const valuesPassed = args?.values ?? {}
        const { activeNodeArray: aNaRaw, setActiveNodeArray } = self.tree
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
          revertTable: 'herkunft',
          revertId: id,
          revertField: '_deleted',
          revertValue: true,
          isInsert: true,
        })
        // optimistically update store
        upsertHerkunftModel(newObjectForStore)
        setTimeout(() => {
          const newActiveNodeArray = isUuid.v1(last(activeNodeArray))
            ? // slice if last is uuid
              [...activeNodeArray.slice(0, -1), id]
            : [...activeNodeArray, id]
          // update tree status
          setActiveNodeArray(newActiveNodeArray)
        })
      },
      deleteHerkunftRevModel(val) {
        // 1. update model: remove this conflict
        const model = self.herkunfts.get(val.herkunft_id)
        const newModel = {
          ...model,
          _conflicts: model._conflicts.filter((c) => c !== val._rev),
        }
        self.herkunfts.set(val.herkunft_id, newModel)
        // 2. delete rev model
        const rev_model = self.herkunft_revs.get(val.id)
        destroy(rev_model)
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
          artIdInActiveNodeArray,
          herkunftIdInActiveNodeArray,
          gartenIdInActiveNodeArray,
        } = self
        const valuesPassed = args?.values ?? {}
        const { activeNodeArray: aNaRaw, setActiveNodeArray } = self.tree
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
          revertTable: 'kultur',
          revertId: id,
          revertField: '_deleted',
          revertValue: true,
          isInsert: true,
        })
        // optimistically update store
        upsertKulturModel(newObjectForStore)
        setTimeout(() => {
          const newActiveNodeArray = isUuid.v1(last(activeNodeArray))
            ? // slice if last is uuid
              [...activeNodeArray.slice(0, -1), id]
            : [...activeNodeArray, id]
          // update tree status
          setActiveNodeArray(newActiveNodeArray)
        })
      },
      deleteKulturRevModel(val) {
        // 1. update model: remove this conflict
        const model = self.kulturs.get(val.kultur_id)
        const newModel = {
          ...model,
          _conflicts: model._conflicts.filter((c) => c !== val._rev),
        }
        self.kulturs.set(val.kultur_id, newModel)
        // 2. delete rev model
        const rev_model = self.kultur_revs.get(val.id)
        destroy(rev_model)
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
        // 1. update model: remove this conflict
        const model = self.kultur_options.get(val.kultur_option_id)
        const newModel = {
          ...model,
          _conflicts: model._conflicts.filter((c) => c !== val._rev),
        }
        self.kultur_options.set(val.kultur_option_id, newModel)
        // 2. delete rev model
        const rev_model = self.kultur_option_revs.get(val.id)
        destroy(rev_model)
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
      insertKulturQkChoosenRev(args) {
        const { user, addQueuedQuery, upsertKulturQkChoosenModel } = self
        const valuesPassed = args?.values ?? {}

        const id = uuidv1()
        const _depth = 1
        const newObject = {
          kultur_qk_choosen_id: id,
          kultur_id: undefined,
          qk_name: undefined,
          choosen: undefined,
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
        newObjectForStore.id = newObjectForStore.kultur_qk_choosen_id
        delete newObjectForStore.kultur_qk_choosen_id
        addQueuedQuery({
          name: 'mutateInsert_kultur_qk_choosen_rev_one',
          variables: JSON.stringify({
            object: newObject,
            on_conflict: {
              constraint: 'kultur_qk_choosen_rev_pkey',
              update_columns: ['id'],
            },
          }),
          revertTable: 'kultur_qk_choosen',
          revertId: id,
          revertField: '_deleted',
          revertValue: true,
          isInsert: true,
        })
        // optimistically update store
        upsertKulturQkChoosenModel(newObjectForStore)
      },
      deleteKulturQkChoosenRevModel(val) {
        // 1. update model: remove this conflict
        const model = self.kultur_qk_choosens.get(val.kultur_qk_choosen_id)
        const newModel = {
          ...model,
          _conflicts: model._conflicts.filter((c) => c !== val._rev),
        }
        self.kultur_qk_choosens.set(val.kultur_qk_choosen_id, newModel)
        // 2. delete rev model
        const rev_model = self.kultur_qk_choosen_revs.get(val.id)
        destroy(rev_model)
      },
      upsertLieferungModel(val) {
        self.lieferungs.set(val.id, val)
      },
      insertLieferungRev(args) {
        const {
          user,
          addQueuedQuery,
          upsertLieferungModel,
          artIdInActiveNodeArray,
          personIdInActiveNodeArray,
          sammelLieferungIdInActiveNodeArray,
          sammlungIdInActiveNodeArray,
          kulturIdOfAnLieferungInActiveNodeArray,
          kulturIdOfAusLieferungInActiveNodeArray,
        } = self

        const valuesPassed = args?.values ?? {}
        const { activeNodeArray: aNaRaw, setActiveNodeArray } = self.tree
        const activeNodeArray = aNaRaw.toJSON()

        const kultur = kulturIdOfAnLieferungInActiveNodeArray
          ? self.kulturs.get(kulturIdOfAnLieferungInActiveNodeArray)
          : kulturIdOfAusLieferungInActiveNodeArray
          ? self.kulturs.get(kulturIdOfAusLieferungInActiveNodeArray)
          : undefined
        const artIdOfKultur = kultur?.artId

        const id = uuidv1()
        const _depth = 1
        const newObject = {
          lieferung_id: id,
          sammel_lieferung_id: sammelLieferungIdInActiveNodeArray,
          art_id: artIdInActiveNodeArray ?? artIdOfKultur,
          person_id: personIdInActiveNodeArray,
          von_sammlung_id: sammlungIdInActiveNodeArray,
          von_kultur_id: kulturIdOfAusLieferungInActiveNodeArray,
          datum: undefined,
          nach_kultur_id: kulturIdOfAnLieferungInActiveNodeArray,
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
          revertTable: 'lieferung',
          revertId: id,
          revertField: '_deleted',
          revertValue: true,
          isInsert: true,
        })
        // optimistically update store
        upsertLieferungModel(newObjectForStore)
        setTimeout(() => {
          const newActiveNodeArray = isUuid.v1(last(activeNodeArray))
            ? // slice if last is uuid
              [...activeNodeArray.slice(0, -1), id]
            : [...activeNodeArray, id]
          // update tree status
          setActiveNodeArray(newActiveNodeArray)
        })
      },
      deleteLieferungRevModel(val) {
        // 1. update model: remove this conflict
        const model = self.lieferungs.get(val.lieferung_id)
        const newModel = {
          ...model,
          _conflicts: model._conflicts.filter((c) => c !== val._rev),
        }
        self.lieferungs.set(val.lieferung_id, newModel)
        // 2. delete rev model
        const rev_model = self.lieferung_revs.get(val.id)
        destroy(rev_model)
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
        const { user, addQueuedQuery, upsertPersonModel } = self
        const { activeNodeArray, setActiveNodeArray } = self.tree

        const valuesPassed = args?.values ?? {}
        const id = uuidv1()
        const _depth = 1
        const newObject = {
          person_id: id,
          nr: undefined,
          vorname: undefined,
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
          revertTable: 'person',
          revertId: id,
          revertField: '_deleted',
          revertValue: true,
          isInsert: true,
        })
        // optimistically update store
        upsertPersonModel(newObjectForStore)
        setTimeout(() => {
          const newActiveNodeArray = isUuid.v1(last(activeNodeArray))
            ? // slice if last is uuid
              [...activeNodeArray.slice(0, -1), id]
            : [...activeNodeArray, id]
          // update tree status
          setActiveNodeArray(newActiveNodeArray)
        })
      },
      deletePersonRevModel(val) {
        // 1. update model: remove this conflict
        const model = self.persons.get(val.person_id)
        const newModel = {
          ...model,
          _conflicts: model._conflicts.filter((c) => c !== val._rev),
        }
        self.persons.set(val.person_id, newModel)
        // 2. delete rev model
        const rev_model = self.person_revs.get(val.id)
        destroy(rev_model)
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
        // 1. update model: remove this conflict
        const model = self.person_options.get(val.person_option_id)
        const newModel = {
          ...model,
          _conflicts: model._conflicts.filter((c) => c !== val._rev),
        }
        self.person_options.set(val.person_option_id, newModel)
        // 2. delete rev model
        const rev_model = self.person_option_revs.get(val.id)
        destroy(rev_model)
      },
      upsertSammelLieferungModel(val) {
        self.sammel_lieferungs.set(val.id, val)
      },
      insertSammelLieferungRev(args) {
        const {
          user,
          addQueuedQuery,
          upsertSammelLieferungModel,
          artIdInActiveNodeArray,
          personIdInActiveNodeArray,
          sammlungIdInActiveNodeArray,
          kulturIdOfAnLieferungInActiveNodeArray,
        } = self

        const valuesPassed = args?.values ?? {}
        const { activeNodeArray: aNaRaw, setActiveNodeArray } = self.tree
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
          revertTable: 'sammel_lieferung',
          revertId: id,
          revertField: '_deleted',
          revertValue: true,
          isInsert: true,
        })
        // optimistically update store
        upsertSammelLieferungModel(newObjectForStore)
        setTimeout(() => {
          const newActiveNodeArray = isUuid.v1(last(activeNodeArray))
            ? // slice if last is uuid
              [...activeNodeArray.slice(0, -1), id]
            : [...activeNodeArray, id]
          // update tree status
          setActiveNodeArray(newActiveNodeArray)
        })
      },
      deleteSammelLieferungRevModel(val) {
        // 1. update model: remove this conflict
        const model = self.sammel_lieferungs.get(val.sammel_lieferung_id)
        const newModel = {
          ...model,
          _conflicts: model._conflicts.filter((c) => c !== val._rev),
        }
        self.sammel_lieferungs.set(val.sammel_lieferung_id, newModel)
        // 2. delete rev model
        const rev_model = self.sammel_lieferung_revs.get(val.id)
        destroy(rev_model)
      },
      upsertSammlungModel(val) {
        self.sammlungs.set(val.id, val)
      },
      insertSammlungRev(args) {
        const {
          user,
          addQueuedQuery,
          upsertSammlungModel,
          artIdInActiveNodeArray,
          herkunftIdInActiveNodeArray,
          personIdInActiveNodeArray,
        } = self

        const valuesPassed = args?.values ?? {}
        const { activeNodeArray: aNaRaw, setActiveNodeArray } = self.tree
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
          revertTable: 'sammlung',
          revertId: id,
          revertField: '_deleted',
          revertValue: true,
        })
        // optimistically update store
        upsertSammlungModel(newObjectForStore)
        setTimeout(() => {
          const newActiveNodeArray = isUuid.v1(last(activeNodeArray))
            ? // slice if last is uuid
              [...activeNodeArray.slice(0, -1), id]
            : [...activeNodeArray, id]
          // update tree status
          setActiveNodeArray(newActiveNodeArray)
        })
      },
      deleteSammlungRevModel(val) {
        // 1. update model: remove this conflict
        const model = self.sammlungs.get(val.sammlung_id)
        const newModel = {
          ...model,
          _conflicts: model._conflicts.filter((c) => c !== val._rev),
        }
        self.sammlungs.set(val.sammlung_id, newModel)
        // 2. delete rev model
        const rev_model = self.sammlung_revs.get(val.id)
        destroy(rev_model)
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
          kulturIdInActiveNodeArray,
        } = self

        const noNavigateInTree = args?.noNavigateInTree ?? false
        const valuesPassed = args?.values ?? {}

        const { activeNodeArray: aNaRaw, setActiveNodeArray } = self.tree
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
          revertTable: 'teilkultur',
          revertId: id,
          revertField: '_deleted',
          revertValue: true,
          isInsert: true,
        })
        // optimistically update store
        upsertTeilkulturModel(newObjectForStore)
        if (!noNavigateInTree) {
          setTimeout(() => {
            const newActiveNodeArray = isUuid.v1(last(activeNodeArray))
              ? // slice if last is uuid
                [...activeNodeArray.slice(0, -1), id]
              : [...activeNodeArray, id]
            // update tree status
            setActiveNodeArray(newActiveNodeArray)
          })
        }
        return id
      },
      deleteTeilkulturRevModel(val) {
        // 1. update model: remove this conflict
        const model = self.teilkulturs.get(val.teilkultur_id)
        const newModel = {
          ...model,
          _conflicts: model._conflicts.filter((c) => c !== val._rev),
        }
        self.teilkulturs.set(val.teilkultur_id, newModel)
        // 2. delete rev model
        const rev_model = self.teilkultur_revs.get(val.id)
        destroy(rev_model)
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
          revertTable: 'teilzaehlung',
          revertId: id,
          revertField: '_deleted',
          revertValue: true,
          isInsert: true,
        })
        // optimistically update store
        upsertTeilzaehlungModel(newObjectForStore)
      },
      deleteTeilzaehlungRevModel(val) {
        // 1. update model: remove this conflict
        const model = self.teilzaehlungs.get(val.teilzaehlung_id)
        const newModel = {
          ...model,
          _conflicts: model._conflicts.filter((c) => c !== val._rev),
        }
        self.teilzaehlungs.set(val.teilzaehlung_id, newModel)
        // 2. delete rev model
        const rev_model = self.teilzaehlung_revs.get(val.id)
        destroy(rev_model)
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
          kulturIdInActiveNodeArray,
        } = self
        const valuesPassed = args?.values ?? {}

        const { activeNodeArray: aNaRaw, setActiveNodeArray } = self.tree
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
          revertTable: 'zaehlung',
          revertId: id,
          revertField: '_deleted',
          revertValue: true,
          isInsert: true,
        })
        // optimistically update store
        upsertZaehlungModel(newObjectForStore)
        setTimeout(() => {
          const newActiveNodeArray = isUuid.v1(last(activeNodeArray))
            ? // slice if last is uuid
              [...activeNodeArray.slice(0, -1), id]
            : [...activeNodeArray, id]
          // update tree status
          setActiveNodeArray(newActiveNodeArray)
        })
        return id
      },
      deleteZaehlungRevModel(val) {
        // 1. update model: remove this conflict
        const model = self.zaehlungs.get(val.zaehlung_id)
        const newModel = {
          ...model,
          _conflicts: model._conflicts.filter((c) => c !== val._rev),
        }
        self.zaehlungs.set(val.zaehlung_id, newModel)
        // 2. delete rev model
        const rev_model = self.zaehlung_revs.get(val.id)
        destroy(rev_model)
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
      setGettingAuthUser(val) {
        if (val !== self.gettingAuthUser) {
          self.gettingAuthUser = val
        }
      },
      setUser(val) {
        self.user = val || {}
      },
      setIsPrint(val) {
        self.isPrint = val
      },
      setDocFilter(val) {
        self.docFilter = val
      },
      flushData() {
        self.lastUpdatedAt = 0
        self.ae_arts.clear()
        self.arts.clear()
        self.art_files.clear()
        self.art_qks.clear()
        self.art_qk_choosens.clear()
        self.avs.clear()
        self.events.clear()
        self.gartens.clear()
        self.garten_files.clear()
        self.gvs.clear()
        self.herkunfts.clear()
        self.herkunft_files.clear()
        self.kulturs.clear()
        self.kultur_files.clear()
        self.kultur_options.clear()
        self.kultur_qks.clear()
        self.lieferungs.clear()
        self.lieferung_files.clear()
        self.persons.clear()
        self.person_files.clear()
        self.person_options.clear()
        self.sammel_lieferungs.clear()
        self.sammlungs.clear()
        self.sammlung_files.clear()
        self.teilkulturs.clear()
        self.teilzaehlungs.clear()
        self.user_roles.clear()
        self.zaehlungs.clear()
      },
    }
  })
  .views((self) => ({
    get activeForm() {
      return activeFormFromActiveNodeArray(self.tree.activeNodeArray)
    },
    get queuedQueriesSorted() {
      return sortBy([...self.queuedQueries.values()], 'time')
    },
    get artIdInActiveNodeArray() {
      return artIdInUrl(self.tree.activeNodeArray)
    },
    get herkunftIdInActiveNodeArray() {
      return herkunftIdInUrl(self.tree.activeNodeArray)
    },
    get gartenIdInActiveNodeArray() {
      return gartenIdInUrl(self.tree.activeNodeArray)
    },
    get kulturIdInActiveNodeArray() {
      return kulturIdInUrl(self.tree.activeNodeArray)
    },
    get anLieferungIdInActiveNodeArray() {
      return anLieferungIdInUrl(self.tree.activeNodeArray)
    },
    get ausLieferungIdInActiveNodeArray() {
      return ausLieferungIdInUrl(self.tree.activeNodeArray)
    },
    get lieferungIdInActiveNodeArray() {
      return lieferungIdInUrl(self.tree.activeNodeArray)
    },
    get eventIdInActiveNodeArray() {
      return eventIdInUrl(self.tree.activeNodeArray)
    },
    get teilkulturIdInActiveNodeArray() {
      return teilkulturIdInUrl(self.tree.activeNodeArray)
    },
    get personIdInActiveNodeArray() {
      return personIdInUrl(self.tree.activeNodeArray)
    },
    get sammelLieferungIdInActiveNodeArray() {
      return sammelLieferungIdInUrl(self.tree.activeNodeArray)
    },
    get sammlungIdInActiveNodeArray() {
      return sammlungIdInUrl(self.tree.activeNodeArray)
    },
    get kulturIdOfAnLieferungInActiveNodeArray() {
      return kulturIdOfAnLieferungInUrl(self.tree.activeNodeArray)
    },
    get kulturIdOfAusLieferungInActiveNodeArray() {
      return kulturIdOfAusLieferungInUrl(self.tree.activeNodeArray)
    },
    get zaehlungIdInActiveNodeArray() {
      return zaehlungIdInUrl(self.tree.activeNodeArray)
    },
    get userPerson() {
      const { user, persons } = self
      const userPerson = [...persons.values()].find(
        (p) => p.account_id === user.uid,
      )
      return userPerson ?? {}
    },
    get userPersonOption() {
      const { userPerson, person_options } = self
      const userPersonOption = person_options.get(userPerson.id)
      return userPersonOption ?? {}
    },
    get artsFiltered() {
      return queryFromStore({ store: self, table: 'art' })
    },
    get artsSorted() {
      return [...self.arts.values()]
        .filter((a) => {
          if (self.filter.art._deleted === false) {
            return notDeletedOrHasConflict(a)
          }
          return true
        })
        .sort((a, b) => artSort({ a, b, store: self }))
    },
    get avsSorted() {
      return [...self.avs.values()]
        .filter((a) => notDeletedOrHasConflict(a))
        .sort((a, b) => avSort({ a, b, store: self }))
    },
    get gvsSorted() {
      return [...self.gvs.values()]
        .filter((a) => notDeletedOrHasConflict(a))
        .sort((a, b) => gvSort({ a, b, store: self }))
    },
    get eventsFiltered() {
      return queryFromStore({ store: self, table: 'event' })
    },
    get eventsSorted() {
      return [...self.events.values()]
        .filter((a) => {
          if (self.filter.event._deleted === false) {
            return notDeletedOrHasConflict(a)
          }
          return true
        })
        .sort((a, b) => eventSort({ a, b }))
    },
    get gartensFiltered() {
      return queryFromStore({ store: self, table: 'garten' })
    },
    get gartensSorted() {
      return [...self.gartens.values()]
        .filter((a) => {
          if (self.filter.garten._deleted === false) {
            return notDeletedOrHasConflict(a)
          }
          return true
        })
        .filter((a) =>
          self.filter.garten.aktiv === true ? a.aktiv === true : true,
        )
        .sort((a, b) => gartenSort({ a, b, store: self }))
    },
    get herkunftsFiltered() {
      return queryFromStore({ store: self, table: 'herkunft' })
    },
    get herkunftsSorted() {
      return [...self.herkunfts.values()]
        .filter((a) => {
          if (self.filter.herkunft._deleted === false) {
            return notDeletedOrHasConflict(a)
          }
          return true
        })
        .sort((a, b) => herkunftSort({ a, b }))
    },
    get kultursFiltered() {
      return queryFromStore({ store: self, table: 'kultur' })
    },
    get kultursSorted() {
      return [...self.kulturs.values()]
        .filter((a) => {
          if (self.filter.kultur._deleted === false) {
            return notDeletedOrHasConflict(a)
          }
          return true
        })
        .filter((a) =>
          self.filter.kultur.aktiv === true ? a.aktiv === true : true,
        )
        .sort((a, b) => kulturSort({ a, b, store: self }))
    },
    get lieferungsFiltered() {
      return queryFromStore({ store: self, table: 'lieferung' })
    },
    get lieferungsSorted() {
      return [...self.lieferungs.values()]
        .filter((a) => {
          if (self.filter.lieferung._deleted === false) {
            return notDeletedOrHasConflict(a)
          }
          return true
        })
        .sort((a, b) => lieferungSort({ a, b }))
    },
    get personsFiltered() {
      return queryFromStore({ store: self, table: 'person' })
    },
    get personsSorted() {
      return [...self.persons.values()]
        .filter((a) => {
          if (self.filter.person._deleted === false) {
            return notDeletedOrHasConflict(a)
          }
          return true
        })
        .filter((a) =>
          self.filter.person.aktiv === true ? a.aktiv === true : true,
        )
        .sort((a, b) => personSort({ a, b }))
    },
    get sammelLieferungsFiltered() {
      return queryFromStore({ store: self, table: 'sammel_lieferung' })
    },
    get sammelLieferungsSorted() {
      return [...self.sammel_lieferungs.values()]
        .filter((a) => {
          if (self.filter.sammel_lieferung._deleted === false) {
            return notDeletedOrHasConflict(a)
          }
          return true
        })
        .sort((a, b) => lieferungSort({ a, b }))
    },
    get sammlungsFiltered() {
      return queryFromStore({ store: self, table: 'sammlung' })
    },
    get sammlungsSorted() {
      return [...self.sammlungs.values()]
        .filter((a) => {
          if (self.filter.sammlung._deleted === false) {
            return notDeletedOrHasConflict(a)
          }
          return true
        })
        .sort((a, b) => sammlungSort({ a, b, store: self }))
    },
    get teilkultursFiltered() {
      return queryFromStore({ store: self, table: 'teilkultur' })
    },
    get teilkultursSorted() {
      return [...self.teilkulturs.values()]
        .filter((a) => {
          if (self.filter.teilkultur._deleted === false) {
            return notDeletedOrHasConflict(a)
          }
          return true
        })
        .sort((a, b) => teilkulturSort({ a, b, store: self }))
    },
    get teilzaehlungsSorted() {
      return [...self.teilzaehlungs.values()]
        .filter((a) => {
          if (self.filter.teilzaehlung._deleted === false) {
            return notDeletedOrHasConflict(a)
          }
          return true
        })
        .sort((a, b) => teilzaehlungSort({ a, b, store: self }))
    },
    get zaehlungsFiltered() {
      return queryFromStore({ store: self, table: 'zaehlung' })
    },
    get zaehlungsSorted() {
      return [...self.zaehlungs.values()]
        .filter((a) => {
          if (self.filter.zaehlung._deleted === false) {
            return notDeletedOrHasConflict(a)
          }
          return true
        })
        .sort((a, b) => zaehlungSort({ a, b, store: self }))
    },
  }))
