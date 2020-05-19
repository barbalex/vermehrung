import axios from 'axios'

export default async ({ store, user, gqlHttpClient }) => {
  const { addNotif, setAuthorizing } = store
  setAuthorizing(true)
  let res
  try {
    res = await axios.get(
      `https://auth.vermehrung.ch/add-hasura-claims/${user.uid}`,
    )
  } catch (error) {
    console.log('error from getting claims from auth.vermehrung.ch:', error)
    setAuthorizing(false)
    return addNotif({
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
      console.log('error from calling getting id token:', error)
      setAuthorizing(false)
      return addNotif({
        message: error.message,
        options: {
          variant: 'error',
        },
      })
    }
    //console.log('tokenWithRoles:', tokenWithRoles)
    // set token to localStorage so authLink picks it up on next db call
    // see: https://www.apollographql.com/docs/react/networking/authentication/#header
    window.localStorage.setItem('token', tokenWithRoles)
    gqlHttpClient.setHeaders({ authorization: `Bearer ${tokenWithRoles}` })
    setAuthorizing(false)
  } else {
    setAuthorizing(false)
  }
}
