import axios from 'axios'

export default async ({ store, user }) => {
  const { enqueNotification, setInitializingFirebase } = store
  let res
  try {
    res = await axios.get(
      `https://auth.vermehrung.ch/add-hasura-claims/${user.uid}`,
    )
  } catch (error) {
    console.log(error)
    setInitializingFirebase(false)
    return enqueNotification({
      message: error.response.data,
      options: {
        variant: 'error',
      },
    })
  }
  if (res.status === 200) {
    let tokenWithRoles
    try {
      tokenWithRoles = await user.getIdToken(true)
    } catch (error) {
      console.log(error)
    }
    //console.log('tokenWithRoles:', tokenWithRoles)
    // set token to localStorage so authLink picks it up on next db call
    // see: https://www.apollographql.com/docs/react/networking/authentication/#header
    window.localStorage.setItem('token', tokenWithRoles)
    setTimeout(() => setInitializingFirebase(false))
  } else {
    setInitializingFirebase(false)
  }
}
