import { useEffect, useState } from 'react'

import { store, apiClientAtom } from '../store/index.ts'

// minimal replacement for urql's useQuery for the one-off api reads
// (history revisions, conflict revisions). Pass null to skip fetching.
export const useApiQuery = (path) => {
  const [state, setState] = useState({
    data: null,
    error: null,
    fetching: !!path,
  })
  // reset when the path changes: adjusting state during render is the
  // sanctioned pattern for derived state (setState in an effect would
  // cascade renders)
  const [prevPath, setPrevPath] = useState(path)
  if (prevPath !== path) {
    setPrevPath(path)
    setState({ data: null, error: null, fetching: !!path })
  }

  useEffect(() => {
    if (!path) return
    let isActive = true
    store
      .get(apiClientAtom)
      .get(path)
      .then((data) => {
        if (isActive) setState({ data, error: null, fetching: false })
      })
      .catch((error) => {
        if (isActive) setState({ data: null, error, fetching: false })
      })
    return () => {
      isActive = false
    }
  }, [path])

  return state
}
