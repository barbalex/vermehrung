// see: https://auth0.com/blog/securing-gatsby-with-auth0/
// also: https://docs.hasura.io/1.0/graphql/manual/guides/integrations/auth0-jwt.html

import auth0 from 'auth0-js'
import { navigate } from 'gatsby'

const isBrowser = typeof window !== 'undefined'

const auth = isBrowser
  ? new auth0.WebAuth({
      domain: process.env.AUTH0_DOMAIN,
      clientID: process.env.AUTH0_CLIENTID,
      redirectUri: process.env.AUTH0_CALLBACK,
      responseType: 'token id_token',
      scope: 'openid profile email',
    })
  : {}

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

  auth.authorize({ language: 'de' })
}

const setSession = (cb = () => {}, doNotNavigate) => (err, authResult) => {
  if (err) {
    navigate('/')
    cb()
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
    !doNotNavigate && navigate('/Vermehrung')
    cb()
  }
}

export const handleAuthentication = () => {
  if (!isBrowser) {
    return
  }

  auth.parseHash(setSession())
}

export const getProfile = () => {
  return user
}

export const silentAuth = callback => {
  if (!isAuthenticated()) return callback()
  // pass doNotNavigate to not change url
  auth.checkSession({}, setSession(callback, 'doNotNavigate'))
}

export const logout = () => {
  localStorage.setItem('isLoggedIn', false)
  auth.logout()
}
