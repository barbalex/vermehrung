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
import { fetchWithTimeout } from './fetchWithTimeout.js'

// subscriptions must not start before a fresh token was stored:
// with a stale one every ws connection is rejected and the initial
// queries never complete - all forms would wait forever
const retryMs = 5000
const maxRetryMs = 60000

// exponential backoff: be gentle with a struggling auth service
const retry = (nextRetryMs) => {
  setTimeout(() => getAuthToken(nextRetryMs), nextRetryMs)
}

const hasHasuraClaims = (token) => {
  try {
    const payload = atob(
      token.split('.')[1].replaceAll('-', '+').replaceAll('_', '/'),
    )
    return !!JSON.parse(payload)?.['https://hasura.io/jwt/claims']
  } catch {
    return false
  }
}

export const getAuthToken = async (nextRetryMs = retryMs) => {
  const user = store.get(userAtom)
  if (!user?.uid) {
    // nothing to fetch without a user.
    // do NOT reload the page here: that races logins (fetchLogin signs out
    // first, then the pending reload could wipe the in-progress login).
    // onAuthStateChanged calls again as soon as a user exists
    return
  }
  setAuthorizing(true)
  let res
  try {
    res = await fetchWithTimeout(
      `https://auth.vermehrung.ch/add-hasura-claims/${user.uid}`,
    )
  } catch (error) {
    console.log('error from getting claims from auth.vermehrung.ch:', error)
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
  if (res?.status !== 200) {
    console.log('getAuthToken, got no new token')
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
    // only force a refresh when the cached token has no hasura claims;
    // forcing on every boot hammers Firebase needlessly
    token = await user.getIdToken(
      !hasHasuraClaims(window.localStorage.getItem('token')),
    )
  } catch (error) {
    console.log('error from calling getting id token:', error)
    addNotification({ message: error.message })
    return retry(Math.min(nextRetryMs * 2, maxRetryMs))
  }
  // set token to localStorage so the links pick it up on next call
  window.localStorage.setItem('token', token)
  setAuthorizing(false)
  return true
}

export default getAuthToken
