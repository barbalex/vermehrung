import axios from 'axios'

export default async ({ store }) => {
  if (typeof window === 'undefined') return 'none'
  const {
    addNotification,
    setAuthorizing,
    user,
    gqlHttpClient,
    gqlWsClient,
    setAuthToken,
  } = store
  setAuthorizing(true)
  if (!user?.uid) return 'none'
  let res
  try {
    res = await axios.get(
      `https://auth.vermehrung.ch/add-hasura-claims/${user.uid}`,
    )
  } catch (error) {
    // TODO: catch no network error and return token from localStorage
    console.log('error from getting claims from auth.vermehrung.ch:', error)
    setAuthorizing(false)
    addNotification({
      message: error?.response?.data,
    })
    return window.localStorage.getItem('token') || 'none'
  }
  if (res.status === 200) {
    let tokenWithRoles
    try {
      tokenWithRoles = await user.getIdToken(true)
    } catch (error) {
      console.log('error from calling getting id token:', error)
      setAuthorizing(false)
      return addNotification({
        message: error.message,
      })
    }
    //console.log('tokenWithRoles:', tokenWithRoles)
    // set token to localStorage so authLink picks it up on next db call
    // see: https://www.apollographql.com/docs/react/networking/authentication/#header
    // see: https://github.com/apollographql/subscriptions-transport-ws/issues/171#issuecomment-348492358
    // see: https://github.com/apollographql/subscriptions-transport-ws/issues/171#issuecomment-406859244
    window.localStorage.setItem('token', tokenWithRoles)
    setAuthToken(tokenWithRoles)
    gqlHttpClient.setHeaders({ authorization: `Bearer ${tokenWithRoles}` })
    gqlWsClient.close(false, false)
    setAuthorizing(false)
    console.log('getAuthToken, got new tokenWithRoles:', tokenWithRoles)
    return tokenWithRoles
  }
  setAuthorizing(false)
  console.log('getAuthToken, returning old tokenWithRoles')
  return window.localStorage.getItem('token') || 'none'
}
