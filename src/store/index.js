import { types, destroy } from 'mobx-state-tree'
import { reaction, flow } from 'mobx'
import sortBy from 'lodash/sortBy'
import { v1 as uuidv1 } from 'uuid'
import md5 from 'blueimp-md5'
import last from 'lodash/last'
import set from 'lodash/set'
import isUuid from 'is-uuid'

import { Tree, defaultValue as defaultTree } from './Tree.js'
import { Filter } from './Filter/types.js'
import { initialFilterValues } from './Filter/initialValues.js'
import { QueuedQuery } from './QueuedQuery.js'
import { Notification } from './Notification.js'
import { Errors, defaultValue as defaultErrors } from './Errors/index.js'

import { activeFormFromActiveNodeArray } from '../utils/activeFormFromActiveNodeArray.js'
import { artIdInUrl } from '../utils/artIdInUrl.js'
import { herkunftIdInUrl } from '../utils/herkunftIdInUrl.js'
import { gartenIdInUrl } from '../utils/gartenIdInUrl.js'
import kulturIdInUrl from '../utils/kulturIdInUrl.js'
import anLieferungIdInUrl from '../utils/anLieferungIdInUrl.js'
import eventIdInUrl from '../utils/eventIdInUrl.js'
import ausLieferungIdInUrl from '../utils/ausLieferungIdInUrl.js'
import lieferungIdInUrl from '../utils/lieferungIdInUrl.js'
import teilkulturIdInUrl from '../utils/teilkulturIdInUrl.js'
import personIdInUrl from '../utils/personIdInUrl.js'
import sammelLieferungIdInUrl from '../utils/sammelLieferungIdInUrl.js'
import sammlungIdInUrl from '../utils/sammlungIdInUrl.js'
import kulturIdOfAnLieferungInUrl from '../utils/kulturIdOfAnLieferungInUrl.js'
import kulturIdOfAusLieferungInUrl from '../utils/kulturIdOfAusLieferungInUrl.js'
import zaehlungIdInUrl from '../utils/zaehlungIdInUrl.js'
import { getAuthToken } from '../utils/getAuthToken.js'
import { mutations } from '../utils/mutations.js'

const myTypes = types
  .model({
    tree: types.optional(Tree, defaultTree),
    filter: types.optional(Filter, initialFilterValues),
    docFilter: types.optional(types.union(types.string, types.number), ''),
    docsCount: types.maybeNull(types.number, null),
    docsFilteredCount: types.maybeNull(types.number, null),
    isPrint: types.optional(types.boolean, false),
    singleColumnView: types.optional(types.boolean, false),
    showTreeInSingleColumnView: types.optional(types.boolean, false),
    online: types.optional(types.boolean, true),
    shortTermOnline: types.optional(types.boolean, true),
    // every table saves last updated timestamp in seconds since 1.1.1970
    // why? so data to be updated can be efficiently extracted
    // from the live queries
    ae_art_lastUpdated: types.optional(types.number, 0),
    art_lastUpdated: types.optional(types.number, 0),
    art_file_lastUpdated: types.optional(types.number, 0),
    art_qk_lastUpdated: types.optional(types.number, 0),
    av_lastUpdated: types.optional(types.number, 0),
    event_lastUpdated: types.optional(types.number, 0),
    garten_lastUpdated: types.optional(types.number, 0),
    garten_file_lastUpdated: types.optional(types.number, 0),
    gv_lastUpdated: types.optional(types.number, 0),
    herkunft_lastUpdated: types.optional(types.number, 0),
    herkunft_file_lastUpdated: types.optional(types.number, 0),
    kultur_lastUpdated: types.optional(types.number, 0),
    kultur_file_lastUpdated: types.optional(types.number, 0),
    kultur_option_lastUpdated: types.optional(types.number, 0),
    kultur_qk_lastUpdated: types.optional(types.number, 0),
    lieferung_lastUpdated: types.optional(types.number, 0),
    lieferung_file_lastUpdated: types.optional(types.number, 0),
    person_lastUpdated: types.optional(types.number, 0),
    person_file_lastUpdated: types.optional(types.number, 0),
    person_option_lastUpdated: types.optional(types.number, 0),
    sammel_lieferung_lastUpdated: types.optional(types.number, 0),
    sammlung_lastUpdated: types.optional(types.number, 0),
    sammlung_file_lastUpdated: types.optional(types.number, 0),
    teilkultur_lastUpdated: types.optional(types.number, 0),
    teilzaehlung_lastUpdated: types.optional(types.number, 0),
    user_role_lastUpdated: types.optional(types.number, 0),
    zaehlung_lastUpdated: types.optional(types.number, 0),
    ae_art_initially_queried: types.optional(types.boolean, false),
    art_initially_queried: types.optional(types.boolean, false),
    art_file_initially_queried: types.optional(types.boolean, false),
    art_qk_initially_queried: types.optional(types.boolean, false),
    av_initially_queried: types.optional(types.boolean, false),
    event_initially_queried: types.optional(types.boolean, false),
    garten_initially_queried: types.optional(types.boolean, false),
    garten_file_initially_queried: types.optional(types.boolean, false),
    gv_initially_queried: types.optional(types.boolean, false),
    herkunft_initially_queried: types.optional(types.boolean, false),
    herkunft_file_initially_queried: types.optional(types.boolean, false),
    kultur_initially_queried: types.optional(types.boolean, false),
    kultur_file_initially_queried: types.optional(types.boolean, false),
    kultur_option_initially_queried: types.optional(types.boolean, false),
    kultur_qk_initially_queried: types.optional(types.boolean, false),
    lieferung_initially_queried: types.optional(types.boolean, false),
    lieferung_file_initially_queried: types.optional(types.boolean, false),
    person_initially_queried: types.optional(types.boolean, false),
    person_file_initially_queried: types.optional(types.boolean, false),
    person_option_initially_queried: types.optional(types.boolean, false),
    sammel_lieferung_initially_queried: types.optional(types.boolean, false),
    sammlung_initially_queried: types.optional(types.boolean, false),
    sammlung_file_initially_queried: types.optional(types.boolean, false),
    teilkultur_initially_queried: types.optional(types.boolean, false),
    teilzaehlung_initially_queried: types.optional(types.boolean, false),
    user_role_initially_queried: types.optional(types.boolean, false),
    zaehlung_initially_queried: types.optional(types.boolean, false),
    initiallyQuerying: types.optional(types.string, ''),
    /**
     * This is a queue of all queries
     * When online they they are immediately executed by the reaction
     * When offline they remain queued until connectivity is back
     */
    queuedQueries: types.map(QueuedQuery),
    notifications: types.map(Notification),
    // on startup need to wait with showing data
    // until hasura claims have been added
    // this is _after_ user is set so need another variable
    gettingAuthUser: types.optional(types.boolean, true),
    authorizing: types.optional(types.boolean, true),
    errors: types.optional(Errors, defaultErrors),
    diffConflict: types.optional(types.boolean, true),
    // wsReconnectCount is made so a subscription can provoke re-subscription on error
    // see initializeSubscriptions, unsubscribe.ae_art
    wsReconnectCount: types.maybeNull(types.number, 0),
  })
  .volatile(() => ({
    user: {},
    firebaseAuth: null,
    gqlWsClient: null,
    db: null,
    gqlClient: null,
    navigate: undefined,
  }))
  .actions((self) => {
    reaction(
      () => `${self.queuedQueries.size}/${self.shortTermOnline}`,
      flow(function* () {
        /*console.log('Store, reaction, shortTermOnline:', {
          shortTermOnline: self.shortTermOnline,
          queuedQueriesSize: self.queuedQueries.size,
        })*/
        /**
         * TODO:
         * When new query is added
         * check if same exists already
         * then combine them into one
         * Goal: reduce network traffic and revision numbers when many fields were updated
         * Build new reaction for this that only depends on self.queuedQueries.length? (but must run first...)
         * Also important: How to combine when online?
         * as long as same id is active?
         */
        if (self.shortTermOnline) {
          // execute operation
          const query = self.queuedQueriesSorted[0]
          //console.log('Store, reaction, shortTermOnline:', self.shortTermOnline)
          if (!query) return
          const {
            name,
            variables,
            revertTable,
            revertField,
            revertId,
            revertValue,
          } = query
          const mutation = mutations[name]
          if (!mutation) throw new Error('keine Mutation gefunden für: ', name)
          let response
          // see: https://formidable.com/open-source/urql/docs/concepts/core-package/#one-off-queries-and-mutations
          variables ?
            (response = yield self.gqlClient
              .mutation(mutation, JSON.parse(variables))
              .toPromise())
          : (response = yield self.gqlClient.mutation(mutation).toPromise())
          if (response.error) {
            // TODO:
            // use urql difference between networkError and graphQLErrors
            console.log('operation reaction error:', response.error)
            // TODO: if offline, return and set shortTermOffline
            const lcMessage = response.error.message.toLowerCase()
            // In case a conflict was caused by two EXACT SAME changes,
            // this will bounce because of the same rev. We want to ignore this:
            if (response.error.message.includes('JWT')) {
              console.log('getting auth token due to jwt error')
              return getAuthToken({ store: self })
            } else if (
              lcMessage.includes('uniqueness violation') &&
              lcMessage.includes('_rev_id__rev_key')
            ) {
              console.log(
                'There is a conflict with exact same changes - ingoring the error thrown',
              )
            } else if (
              response.error?.graphQLErrors?.[0]?.extensions?.internal?.error
                ?.status_code === '21000'
            ) {
              console.log('user sent same edit to soon again')
            } else if (lcMessage.includes('unique-constraint')) {
              let { message } = response.error
              if (lcMessage.includes('single_art_herkunft_garden_active_idx')) {
                message =
                  'Pro Art, Herkunft und Garten darf nur eine Kultur aktiv sein (plus ein Zwischenlager). Offenbar gibt es schon eine aktive Kultur'
              }
              // do not add a notification: show this response.error below the field
              self.setError({
                path: `${revertTable}.${revertField}`,
                value: message,
              })
              console.log('a unique constraint was violated')
            } else if (response.error.message.includes('Failed to fetch')) {
              console.log('network is failing')
              self.setShortTermOnline(false)
              return
            } else {
              // Move this operation to the end of the queue
              // to prevent it from blocking other operations
              self.deferQueuedQueryById(query.id)
              self.setError({
                path: `${revertTable}.${revertField}`,
                value: response.error.message,
              })
              return self.addNotification({
                title:
                  'Eine Operation kann nicht in die Datenbank geschrieben werden',
                message: response.error.message,
                info: 'Bei der nächsten Synchronisierung wird wieder versucht, diese Operation auszuführen',
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
        fireImmediately: true,
      },
    )
    return {
      setNavigate(val) {
        return (self.navigate = val)
      },
      incrementWsReconnectCount() {
        self.wsReconnectCount = self.wsReconnectCount + 1
      },
      setInitiallyQuerying(val) {
        self.initiallyQuerying = val
      },
      setGqlClient(val) {
        self.gqlClient = val
      },
      setDb(val) {
        self.db = val
      },
      setLastUpdated({ table, val: valPassed }) {
        // 1. enable not having to pass val
        //    thus set standard value
        // 2. substract some time to account for:
        //    - server inserting winner
        //    - live query fetching the data
        //    too small value is bad (some data is never updated)
        //    too large value not so (too much data is checked for update)
        // 3. server sets seconds since 1.1.1970
        //    Date.now is MILLIseconds since 1.1.1970
        //    thus need to correct!
        const standardVal = Date.now() / 1000 - 50
        const val = valPassed ?? standardVal
        self[`${table}_lastUpdated`] = val
      },
      setInitiallyQueried({ table }) {
        self[`${table}_initially_queried`] = true
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
      setError({ path, value }) {
        set(self.errors, path, value)
      },
      unsetError(path) {
        self.errors[path] = {}
      },
      setGqlWsClient(val) {
        self.gqlWsClient = val
      },
      async updateModelValue({ table, id, field, value }) {
        // used to revert offline operations if they fail
        const { db } = self
        // find model = row
        let row
        try {
          row = db.get(table).find(id).fetch()
        } catch {}
        if (row) {
          await db.write(async () => {
            await row.update((row) => {
              row[field] = value
            })
          })
        }
      },
      async updateModelValues({ table, id, values }) {
        // used to revert offline operations if they fail
        const { db } = self
        // find model = row
        let row
        try {
          row = db.get(table).find(id).fetch()
        } catch {}
        await db.write(async () => {
          await row.update((row) => {
            Object.entries(values).forEach(([key, value]) => {
              row[key] = value
            })
          })
        })
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
      deferQueuedQueryById(id) {
        const query = self.queuedQueries.get(id)
        query.time = Date.now()
        self.queuedQueries.set(id, query)
      },
      addNotification(valPassed) {
        // do not stack same messages
        const notificationsWithSameMessage = Array.from(
          self.notifications.values(),
        ).filter((n) => n.message === valPassed.message)
        if (notificationsWithSameMessage.length > 0) return

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
        return val.id
      },
      removeNotificationById(id) {
        self.notifications.delete(id)
      },
      removeAllNotifications() {
        self.notifications.clear()
      },
      async insertArtRev(args) {
        const { user, addQueuedQuery } = self
        const { activeNodeArray, setActiveNodeArray } = self.tree
        const valuesPassed = args?.values ?? {}

        const id = uuidv1()
        const _depth = 1
        const newObject = {
          art_id: id,
          ae_id: undefined,
          set: undefined,
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
        newObjectForStore._revisions = JSON.stringify([rev])
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
        const { db } = self
        await db.write(async () => {
          const collection = db.get('art')
          // using batch because can create from raw
          // which enables overriding watermelons own id
          await db.batch([
            collection.prepareCreateFromDirtyRaw(newObjectForStore),
          ])
        })
        setTimeout(() => {
          const newActiveNodeArray =
            isUuid.v1(last(activeNodeArray)) ?
              // slice if last is uuid
              [...activeNodeArray.slice(0, -1), id]
            : [...activeNodeArray, id]
          // update tree status
          setActiveNodeArray(newActiveNodeArray)
        })
      },
      async insertAvRev(args) {
        const { user, addQueuedQuery } = self
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
        newObjectForStore._revisions = JSON.stringify([rev])
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
        const { db } = self
        await db.write(async () => {
          const collection = db.get('av')
          // using batch because can create from raw
          // which enables overriding watermelons own id
          await db.batch([
            collection.prepareCreateFromDirtyRaw(newObjectForStore),
          ])
        })
      },
      async insertEventRev(args) {
        const {
          user,
          addQueuedQuery,
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
        newObjectForStore._revisions = JSON.stringify([rev])
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
        const { db } = self
        await db.write(async () => {
          const collection = db.get('event')
          // using batch because can create from raw
          // which enables overriding watermelons own id
          await db.batch([
            collection.prepareCreateFromDirtyRaw(newObjectForStore),
          ])
        })
        setTimeout(() => {
          const newActiveNodeArray =
            isUuid.v1(last(activeNodeArray)) ?
              // slice if last is uuid
              [...activeNodeArray.slice(0, -1), id]
            : [...activeNodeArray, id]
          // update tree status
          setActiveNodeArray(newActiveNodeArray)
        })
      },
      async insertGartenRev(args) {
        const { user, addQueuedQuery, personIdInActiveNodeArray } = self

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
          aktiv: true,
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
        newObjectForStore._revisions = JSON.stringify([rev])
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
        const { db } = self
        await db.write(async () => {
          const collection = db.get('garten')
          // using batch because can create from raw
          // which enables overriding watermelons own id
          await db.batch([
            collection.prepareCreateFromDirtyRaw(newObjectForStore),
          ])
        })
        setTimeout(() => {
          const newActiveNodeArray =
            isUuid.v1(last(activeNodeArray)) ?
              // slice if last is uuid
              [...activeNodeArray.slice(0, -1), id]
            : [...activeNodeArray, id]
          // update tree status
          setActiveNodeArray(newActiveNodeArray)
        })
      },
      async insertGvRev(args) {
        const { user, addQueuedQuery } = self
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
        newObjectForStore._revisions = JSON.stringify([rev])
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
        const { db } = self
        await db.write(async () => {
          const collection = db.get('gv')
          // using batch because can create from raw
          // which enables overriding watermelons own id
          await db.batch([
            collection.prepareCreateFromDirtyRaw(newObjectForStore),
          ])
        })
      },
      async insertHerkunftRev(args) {
        const { user, addQueuedQuery } = self

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
        newObjectForStore._revisions = JSON.stringify([rev])
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
        const { db } = self
        await db.write(async () => {
          const collection = db.get('herkunft')
          // using batch because can create from raw
          // which enables overriding watermelons own id
          await db.batch([
            collection.prepareCreateFromDirtyRaw(newObjectForStore),
          ])
        })
        setTimeout(() => {
          const newActiveNodeArray =
            isUuid.v1(last(activeNodeArray)) ?
              // slice if last is uuid
              [...activeNodeArray.slice(0, -1), id]
            : [...activeNodeArray, id]
          // update tree status
          setActiveNodeArray(newActiveNodeArray)
        })
      },
      destroy(model) {
        destroy(model)
      },
      async insertKulturRev(args) {
        const {
          user,
          addQueuedQuery,
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
          aktiv: true,
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
        newObjectForStore._revisions = JSON.stringify([rev])
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
        const { db } = self
        await db.write(async () => {
          const kulturCollection = db.get('kultur')
          const kulturOptionCollection = db.get('kultur_option')
          // using batch because can create from raw
          // which enables overriding watermelons own id
          await db.batch([
            kulturCollection.prepareCreateFromDirtyRaw(newObjectForStore),
            kulturOptionCollection.prepareCreateFromDirtyRaw({ id }),
          ])
        })
        if (!args?.nonavigate === true) {
          setTimeout(() => {
            const newActiveNodeArray =
              isUuid.v1(last(activeNodeArray)) ?
                // slice if last is uuid
                [...activeNodeArray.slice(0, -1), id]
              : [...activeNodeArray, id]
            // update tree status
            setActiveNodeArray(newActiveNodeArray)
          })
        }
        return
      },
      async insertLieferungRev(args) {
        const {
          user,
          addQueuedQuery,
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

        const kultur =
          kulturIdOfAnLieferungInActiveNodeArray ?
            self.kulturs?.get(kulturIdOfAnLieferungInActiveNodeArray)
          : kulturIdOfAusLieferungInActiveNodeArray ?
            self.kulturs?.get(kulturIdOfAusLieferungInActiveNodeArray)
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
        newObjectForStore._revisions = JSON.stringify([rev])
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
        const { db } = self
        await db.write(async () => {
          const collection = db.get('lieferung')
          // using batch because can create from raw
          // which enables overriding watermelons own id
          await db.batch([
            collection.prepareCreateFromDirtyRaw(newObjectForStore),
          ])
        })
        setTimeout(() => {
          const newActiveNodeArray =
            isUuid.v1(last(activeNodeArray)) ?
              // slice if last is uuid
              [...activeNodeArray.slice(0, -1), id]
            : [...activeNodeArray, id]
          // update tree status
          setActiveNodeArray(newActiveNodeArray)
        })
      },
      async insertPersonRev(args) {
        const { user, addQueuedQuery } = self
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
          user_role_id: undefined,
          kommerziell: undefined,
          info: undefined,
          aktiv: true,
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
        newObjectForStore._revisions = JSON.stringify([rev])
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
        const { db } = self
        await db.write(async () => {
          const personCollection = db.get('person')
          const personOptionCollection = db.get('person_option')
          // using batch because can create from raw
          // which enables overriding watermelons own id
          await db.batch([
            personCollection.prepareCreateFromDirtyRaw(newObjectForStore),
            personOptionCollection.prepareCreateFromDirtyRaw({ id }),
          ])
        })
        setTimeout(() => {
          const newActiveNodeArray =
            isUuid.v1(last(activeNodeArray)) ?
              // slice if last is uuid
              [...activeNodeArray.slice(0, -1), id]
            : [...activeNodeArray, id]
          // update tree status
          setActiveNodeArray(newActiveNodeArray)
        })
      },
      async insertSammelLieferungRev(args) {
        const {
          user,
          addQueuedQuery,
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
        newObjectForStore._revisions = JSON.stringify([rev])
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
        const { db } = self
        await db.write(async () => {
          const collection = db.get('sammel_lieferung')
          // using batch because can create from raw
          // which enables overriding watermelons own id
          await db.batch([
            collection.prepareCreateFromDirtyRaw(newObjectForStore),
          ])
        })
        setTimeout(() => {
          const newActiveNodeArray =
            isUuid.v1(last(activeNodeArray)) ?
              // slice if last is uuid
              [...activeNodeArray.slice(0, -1), id]
            : [...activeNodeArray, id]
          // update tree status
          setActiveNodeArray(newActiveNodeArray)
        })
      },
      async insertSammlungRev(args) {
        const {
          user,
          addQueuedQuery,
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
        newObjectForStore._revisions = JSON.stringify([rev])
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
        const { db } = self
        await db.write(async () => {
          const collection = db.get('sammlung')
          // using batch because can create from raw
          // which enables overriding watermelons own id
          await db.batch([
            collection.prepareCreateFromDirtyRaw(newObjectForStore),
          ])
        })
        setTimeout(() => {
          const newActiveNodeArray =
            isUuid.v1(last(activeNodeArray)) ?
              // slice if last is uuid
              [...activeNodeArray.slice(0, -1), id]
            : [...activeNodeArray, id]
          // update tree status
          setActiveNodeArray(newActiveNodeArray)
        })
      },
      async insertTeilkulturRev(args) {
        const { user, addQueuedQuery, kulturIdInActiveNodeArray } = self

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
        newObjectForStore._revisions = JSON.stringify([rev])
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
        const { db } = self
        await db.write(async () => {
          const collection = db.get('teilkultur')
          // using batch because can create from raw
          // which enables overriding watermelons own id
          await db.batch([
            collection.prepareCreateFromDirtyRaw(newObjectForStore),
          ])
        })
        if (!noNavigateInTree) {
          setTimeout(() => {
            const newActiveNodeArray =
              isUuid.v1(last(activeNodeArray)) ?
                // slice if last is uuid
                [...activeNodeArray.slice(0, -1), id]
              : [...activeNodeArray, id]
            // update tree status
            setActiveNodeArray(newActiveNodeArray)
          })
        }
        return id
      },
      async insertTeilzaehlungRev(args) {
        const {
          user,
          addQueuedQuery,
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
        newObjectForStore._revisions = JSON.stringify([rev])
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
        const { db } = self
        await db.write(async () => {
          const collection = db.get('teilzaehlung')
          // using batch because can create from raw
          // which enables overriding watermelons own id
          await db.batch([
            collection.prepareCreateFromDirtyRaw(newObjectForStore),
          ])
        })
      },
      async insertZaehlungRev(args) {
        const { user, addQueuedQuery, kulturIdInActiveNodeArray } = self
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
        newObjectForStore._revisions = JSON.stringify([rev])
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
        const { db } = self
        await db.write(async () => {
          const collection = db.get('zaehlung')
          // using batch because can create from raw
          // which enables overriding watermelons own id
          await db.batch([
            collection.prepareCreateFromDirtyRaw(newObjectForStore),
          ])
        })
        setTimeout(() => {
          const newActiveNodeArray =
            isUuid.v1(last(activeNodeArray)) ?
              // slice if last is uuid
              [...activeNodeArray.slice(0, -1), id]
            : [...activeNodeArray, id]
          // update tree status
          setActiveNodeArray(newActiveNodeArray)
        })
        return id
      },
      setOnline(val) {
        self.online = val
      },
      setShortTermOnline(val) {
        self.shortTermOnline = val
      },
      setFirebaseAuth(val) {
        if (!self.firebaseAuth) {
          self.firebaseAuth = val
        }
      },
      setAuthorizing(val) {
        if (val !== self.authorizing) {
          self.authorizing = val
        }
      },
      setGettingAuthUser(val) {
        self.gettingAuthUser = val
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
    }
  })
  .views((self) => ({
    get initialDataQueried() {
      return (
        self.ae_art_initially_queried &&
        self.art_initially_queried &&
        self.art_file_initially_queried &&
        self.art_qk_initially_queried &&
        self.av_initially_queried &&
        self.event_initially_queried &&
        self.garten_initially_queried &&
        self.garten_file_initially_queried &&
        self.gv_initially_queried &&
        self.herkunft_initially_queried &&
        self.herkunft_file_initially_queried &&
        self.kultur_initially_queried &&
        self.kultur_file_initially_queried &&
        self.kultur_option_initially_queried &&
        self.kultur_qk_initially_queried &&
        self.lieferung_initially_queried &&
        self.lieferung_file_initially_queried &&
        self.person_initially_queried &&
        self.person_file_initially_queried &&
        self.person_option_initially_queried &&
        self.sammel_lieferung_initially_queried &&
        self.sammlung_initially_queried &&
        self.sammlung_file_initially_queried &&
        self.teilkultur_initially_queried &&
        self.teilzaehlung_initially_queried &&
        self.user_role_initially_queried &&
        self.zaehlung_initially_queried
      )
    },
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
  }))

export default myTypes
