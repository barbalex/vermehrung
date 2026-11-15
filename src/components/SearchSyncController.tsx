import { useEffect } from 'react'
import { useLocation } from 'react-router'

import {
  applySearchParams,
  initSearchParamsSync,
} from '../modules/searchSync.ts'

// Syncs the url's query string (filters, filter pane, ap filter) with the
// atoms, see modules/searchSync.ts. This is the ONLY component allowed to
// subscribe to the router for search params: components read and write
// atoms, so param writes cannot fan re-renders out into the data
// components.
export const SearchSyncController = () => {
  const { search } = useLocation()

  // url -> atoms on every location change (boot, back/forward,
  // in-app navigation). Runs before the persisted atoms hydrate: values
  // it sets are dirty-marked and win over the persisted ones.
  useEffect(() => {
    applySearchParams(search)
  }, [search])

  // atoms -> url, armed once the persisted atoms hydrated
  useEffect(() => {
    initSearchParamsSync()
  }, [])

  return null
}
