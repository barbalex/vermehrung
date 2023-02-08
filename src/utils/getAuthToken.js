import axios from 'redaxios'
import throttle from 'lodash/throttle'

const getAuthToken = async ({ store }) => {
  const {
    addNotification,
    setAuthorizing,
    user,
    online,
    setOnline,
    shortTermOnline,
    setShortTermOnline,
  } = store
  if (!user?.uid) {
    console.log('getAuthToken missing user.uid')
    const regetMe = () => {
      console.log('getAuthToken recalling itself')
      getAuthToken({ store })
      setTimeout(() => {
        console.log('getAuthToken reloading window')
        window.location.reload(true)
      }, 300)
    }
    // need to throttle to prevent cycle
    //throttle(regetMe, 5000, { leading: true })
    setTimeout(() => throttle(regetMe, 5000, { leading: true }), 300)
    return
  }
  //console.log('getAuthToken, user.uid:', user.uid)
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
    if (shortTermOnline) {
      setShortTermOnline(false)
    }
    addNotification({
      message: error?.response?.data,
    })
  }
  if (res?.status === 200) {
    if (!online) {
      setOnline(true)
    }
    if (!shortTermOnline) {
      setShortTermOnline(true)
    }
    // TODO: timeout this?
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
    //console.log('getAuthToken setting new token:', token)
    window.localStorage.setItem('token', token)
    // TODO: do i need to reload window here?
    setAuthorizing(false)
    return true
  } else {
    console.log('getAuthToken, got no new token')
    setAuthorizing(false)
    return true
  }
}

export default getAuthToken
