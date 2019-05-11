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
  // pass doNotNavigate to not change url
  auth.checkSession({}, setSession({ callback, nav: false, store }))
}

export const logout = () => {
  localStorage.setItem('isLoggedIn', false)
  auth.logout()
}
