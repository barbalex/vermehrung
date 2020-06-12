import axios from 'axios'

export default async ({ store }) => {
  const {
    addNotification,
    setAuthorizing,
    user,
    gqlHttpClient,
    gqlWsClient,
  } = store
  setAuthorizing(true)
  if (!user?.uid) return
  let res
  try {
    res = await axios.get(
      `https://auth.vermehrung.ch/add-hasura-claims/${user.uid}`,
    )
  } catch (error) {
    // TODO: catch no network error and return token from localStorage
    console.log('error from getting claims from auth.vermehrung.ch:', error)
    addNotification({
      message: error?.response?.data,
    })
  }
  if (res.status === 200) {
    let token
    try {
      token = await user.getIdToken(true)
    } catch (error) {
      console.log('error from calling getting id token:', error)
      setAuthorizing(false)
      return addNotification({
        message: error.message,
      })
    }
    // set token to localStorage so authLink picks it up on next db call
    // see: https://www.apollographql.com/docs/react/networking/authentication/#header
    // see: https://github.com/apollographql/subscriptions-transport-ws/issues/171#issuecomment-348492358
    // see: https://github.com/apollographql/subscriptions-transport-ws/issues/171#issuecomment-406859244
    window.localStorage.setItem('token', token)
    gqlHttpClient.setHeaders({ authorization: `Bearer ${token}` })
    gqlWsClient.close(false, false)
    setAuthorizing(false)
  } else {
    //console.log('getAuthToken, got no new token')
    setAuthorizing(false)
  }
  setAuthorizing(false)
}
