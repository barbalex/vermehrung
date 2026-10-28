import { useEffect } from 'react'

import { observeQueuedQueries } from '../modules/observeQueuedQueries.ts'
import { store, retryTickAtom } from '../store/index.ts'

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
