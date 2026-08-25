import { observe } from 'jotai-effect'

import {
  store,
  shortTermOnlineAtom,
  retryTickAtom,
  queueSizeAtom,
  queuedQueriesSortedAtom,
  setError,
  setShortTermOnline,
  updateModelValue,
  deferQueuedQueryById,
  removeQueuedQueryById,
  addNotification,
} from '../store/index.js'
import { getAuthToken } from '../utils/getAuthToken.js'
import { executeQueuedQuery } from './executeQueuedQuery.js'

// Guard: if a network send is already in-flight, skip this trigger.
// Without this, rapid queue changes cause the same oldest query
// to be sent multiple times before it is removed.
let isProcessing = false

// returns unobserve function
// https://jotai.org/docs/extensions/effect
export const observeQueuedQueries = () =>
  observe(async (get) => {
    if (isProcessing) return

    // always tracked so the periodic tick re-runs this effect
    void get(retryTickAtom)
    // tracked: new or removed queries re-trigger; deferred ones do not
    void get(queueSizeAtom)

    if (!get(shortTermOnlineAtom)) return

    // execute oldest operation first
    // read via store.get so queue contents are not tracked
    const query = store.get(queuedQueriesSortedAtom)[0]
    if (!query) return

    const { revertTable, revertField, revertId, revertValue } = query

    isProcessing = true
    let response
    try {
      response = await executeQueuedQuery(query)
    } catch (error) {
      console.error('observeQueuedQueries, error executing query:', error)
      isProcessing = false
      return
    }
    // Release the lock BEFORE any queue mutation so the observer picks up
    // the next query immediately when removeQueuedQueryById fires
    isProcessing = false

    if (response.error) {
        // TODO:
        // use urql difference between networkError and graphQLErrors
        console.log('operation observer error:', response.error)
        const lcMessage = response.error.message.toLowerCase()
        if (response.error.message.includes('JWT')) {
          console.log('getting auth token due to jwt error')
          return getAuthToken()
        } else if (
          lcMessage.includes('uniqueness violation') &&
          lcMessage.includes('_rev_id__rev_key')
        ) {
          // In case a conflict was caused by two EXACT SAME changes,
          // this will bounce because of the same rev. We want to ignore this:
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
          setError({
            path: `${revertTable}.${revertField}`,
            value: message,
          })
          console.log('a unique constraint was violated')
        } else if (response.error.message.includes('Failed to fetch')) {
          console.log('network is failing')
          setShortTermOnline(false)
          return
        } else {
          // Move this operation to the end of the queue
          // to prevent it from blocking other operations
          deferQueuedQueryById(query.id)
          setError({
            path: `${revertTable}.${revertField}`,
            value: response.error.message,
          })
          return addNotification({
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
        await updateModelValue({
          table: revertTable,
          id: revertId,
          field: revertField,
          value: revertValue,
        })
    }
    // remove operation from queue
    removeQueuedQueryById(query.id)
  }, store)
