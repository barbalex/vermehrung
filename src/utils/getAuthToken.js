import axios from 'axios'

const getAuthToken = async ({ store }) => {
  const {
    addNotification,
    setAuthorizing,
    setQueryingAllData,
    user,
    gqlHttpClient,
    gqlWsClient,
    online,
    setOnline,
  } = store
  if (!user?.uid) {
    console.log('getAuthToken returning because of missing user.uid')
    setTimeout(() => getAuthToken({ store }), 200)
    return
  }
  /*if (authorizing) {
    console.log('getAuthToken returning because authorizing is true')
    return
  }*/
  setAuthorizing(true)
  let res
  try {
    res = await axios.get(
      `https://auth.vermehrung.ch/add-hasura-claims/${user.uid}`,
    )
  } catch (error) {
    // TODO: catch no network error and return token from localStorage
    console.log('error from getting claims from auth.vermehrung.ch:', error)
    if (online) {
      setOnline(false)
    }
    addNotification({
      message: error?.response?.data,
    })
  }
  if (res?.status === 200) {
    if (!online) {
      setOnline(true)
    }
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
    console.log('getAuthToken got new token')
    window.localStorage.setItem('token', token)
    gqlHttpClient.setHeaders({ authorization: `Bearer ${token}` })
    setAuthorizing(false)
    setQueryingAllData(false)
    setTimeout(() => {
      console.log('getAuthToken closing gqlWsClient')
      gqlWsClient.close(false, false)
      /**
       * ws client only works if app is reloaded after closing it :-(
       * otherwise keeps getting jwt errors
       */

      console.log('getAuthToken reloading')
      window.location.reload(true)
    }, 1000)
  } else {
    //console.log('getAuthToken, got no new token')
    setAuthorizing(false)
  }
  setAuthorizing(false)
}

export default getAuthToken
