// see: https://auth0.com/blog/securing-gatsby-with-auth0/
// also: https://docs.hasura.io/1.0/graphql/manual/guides/integrations/auth0-jwt.html

import auth0 from 'auth0-js'
import { navigate } from 'gatsby'
import axios from 'axios'

const isBrowser = typeof window !== 'undefined'

const auth = isBrowser
  ? new auth0.WebAuth({
      domain: process.env.AUTH0_DOMAIN,
      clientID: process.env.AUTH0_CLIENTID,
      redirectUri: process.env.AUTH0_CALLBACK,
      audience: 'https://vermehrung.eu.auth0.com/api/v2/',
      responseType: 'token id_token',
      scope:
        'read:current_user update:current_user_metadata openid profile email',
    })
  : {}

let auth0Manage

const tokens = {
  accessToken: false,
  idToken: false,
  expiresAt: false,
}

let user = {}

export const isAuthenticated = () => {
  if (!isBrowser) {
    return
  }

  return localStorage.getItem('isLoggedIn') === 'true'
}

export const login = () => {
  if (!isBrowser) {
    return
  }
  auth.authorize()
}

const setSession = ({ callback, nav, store }) => (err, authResult) => {
  if (err) {
    store.addError(err)
    navigate('/')
    callback && callback()
    return
  }

  if (authResult && authResult.accessToken && authResult.idToken) {
    let expiresAt = authResult.expiresIn * 1000 + new Date().getTime()
    tokens.accessToken = authResult.accessToken
    tokens.idToken = authResult.idToken
    tokens.expiresAt = expiresAt
    user = authResult.idTokenPayload
    localStorage.setItem('isLoggedIn', true)
    // TODO: navigate to original url?
    nav && navigate('/Vermehrung')
    callback && callback()
    isBrowser
    auth0Manage = new auth0.Management({
      domain: process.env.AUTH0_DOMAIN,
      token: tokens.accessToken,
    })
  }
}

export const handleAuthentication = store => {
  if (!isBrowser) {
    return
  }
  auth.parseHash(setSession({ callback: null, nav: true, store }))
}

export const getProfile = () => {
  return user
}

export const silentAuth = ({ callback, store }) => {
  if (!isAuthenticated()) return callback()
  // pass 'nav: false' to not change url
  auth.checkSession({}, setSession({ callback, nav: false, store }))
}

export const logout = () => {
  localStorage.setItem('isLoggedIn', false)
  auth.logout()
}

export const patchUserMetadata = ({ userId, userMetadata }) =>
  auth0Manage.patchUserMetadata(userId, userMetadata, () => {
    console.log('done')
  })

/***
 * TODO
 * add functionality to
 * create new user:
 * - add email
 * - add personId to metadata
 * - user gets email to set password
 */
export const signup = async ({ email, personId }) => {
  // 1. signup user
  try {
    auth.signup(
      {
        connection: 'Username-Password-Authentication',
        email,
        password: process.env.AUTH0_USER_INITIAL_PASSWORD,
        user_metadata: { personId },
      },
      () => console.log('done'),
    )
  } catch (error) {
    throw error
  }

  // 2. make him change password
  try {
    axios.post(
      `https://${process.env.AUTH0_DOMAIN}/dbconnections/change_password`,
      {
        client_id: process.env.AUTH0_CLIENTID,
        email,
        connection: 'Username-Password-Authentication',
      },
    )
  } catch (error) {
    throw error
  }
}
