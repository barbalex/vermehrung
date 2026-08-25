import { useEffect } from 'react'

import { observeQueuedQueries } from '../modules/observeQueuedQueries.js'
import { store, retryTickAtom } from '../store/index.js'

export const QueuedQueriesObserver = () => {
  useEffect(() => {
    const unobserve = observeQueuedQueries()

    // make sure retried in intervals
    // a reconnect can be missed when it happens
    // while a failed query is still retrying
    const retryInterval = setInterval(() => {
      store.set(retryTickAtom, Date.now())
    }, 30000)

    return () => {
      unobserve()
      clearInterval(retryInterval)
    }
  }, [])

  return null
}
