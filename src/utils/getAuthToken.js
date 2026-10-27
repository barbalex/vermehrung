import {
  store,
  addNotification,
  setAuthorizing,
  userAtom,
  onlineAtom,
  shortTermOnlineAtom,
  setOnline,
  setShortTermOnline,
} from '../store/index.js'
import { constants } from './constants.js'
import { fetchWithTimeout } from './fetchWithTimeout.js'

// exchanges the Firebase ID token for the api JWT (auth service /token):
// the api JWT carries the role and person id PostgREST and row level
// security work with. Stored in localStorage, picked up by the api
// client on every request.
// Polling and the offline queue must not start before a fresh token was
// stored: with a stale one every request is rejected - all forms would
// wait forever.
const retryMs = 5000
const maxRetryMs = 60000

// exponential backoff: be gentle with a struggling auth service
const retry = (nextRetryMs, forceRefresh = false) => {
  setTimeout(() => getAuthToken(nextRetryMs, forceRefresh), nextRetryMs)
}

export const getAuthToken = async (
  nextRetryMs = retryMs,
  forceRefresh = false,
) => {
  const user = store.get(userAtom)
  if (!user?.uid) {
    // nothing to fetch without a user.
    // do NOT reload the page here: that races logins (fetchLogin signs out
    // first, then the pending reload could wipe the in-progress login).
    // onAuthStateChanged calls again as soon as a user exists
    return
  }
  setAuthorizing(true)
  let idToken
  try {
    idToken = await user.getIdToken(forceRefresh)
  } catch (error) {
    console.log('error from calling getting id token:', error)
    addNotification({ message: error.message })
    return retry(Math.min(nextRetryMs * 2, maxRetryMs))
  }
  let res
  try {
    res = await fetchWithTimeout(`${constants.authUri}/token`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${idToken}`,
        'content-type': 'application/json',
      },
    })
  } catch (error) {
    console.log('error getting api token from auth service:', error)
    if (store.get(onlineAtom)) {
      setOnline(false)
    }
    if (store.get(shortTermOnlineAtom)) {
      setShortTermOnline(false)
    }
    addNotification({
      message: 'error getting auth token, will retry',
    })
    return retry(Math.min(nextRetryMs * 2, maxRetryMs))
  }
  if (res?.status === 401) {
    // the firebase token was stale (they expire after an hour and the
    // sdk only refreshes them on demand): force a refresh and retry
    console.log('auth service rejected the firebase token, refreshing')
    return retry(Math.min(nextRetryMs * 2, maxRetryMs), true)
  }
  if (res?.status !== 200) {
    console.log('getAuthToken, got no api token (status ' + res.status + ')')
    return retry(Math.min(nextRetryMs * 2, maxRetryMs))
  }
  if (!store.get(onlineAtom)) {
    setOnline(true)
  }
  if (!store.get(shortTermOnlineAtom)) {
    setShortTermOnline(true)
  }
  let token
  try {
    const body = await res.json()
    token = body?.token
  } catch (error) {
    console.log('error parsing token response:', error)
    return retry(Math.min(nextRetryMs * 2, maxRetryMs))
  }
  if (!token) {
    console.log('getAuthToken, response contained no token')
    return retry(Math.min(nextRetryMs * 2, maxRetryMs))
  }
  // set token to localStorage so the api client picks it up on next call
  window.localStorage.setItem('token', token)
  setAuthorizing(false)
  return true
}

export default getAuthToken
