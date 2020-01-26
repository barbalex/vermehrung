// see: https://auth0.com/blog/securing-gatsby-with-auth0/
// also: https://docs.hasura.io/1.0/graphql/manual/guides/integrations/auth0-jwt.html

import auth0 from 'auth0-js'
import { navigate } from 'gatsby'
import axios from 'axios'
import gql from 'graphql-tag'

import { person as personFragment } from './fragments'

const isBrowser = typeof window !== 'undefined'

const auth = isBrowser
  ? new auth0.WebAuth({
      domain: process.env.AUTH0_DOMAIN,
      clientID: process.env.AUTH0_CLIENTID,
      redirectUri: process.env.AUTH0_CALLBACK,
      // did not work, extra config needed?
      //audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
      responseType: 'token id_token',
      scope:
        'create:users read:current_user update:current_user_metadata delete:users openid profile email',
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

const setSession = ({ callback, nav, store }) => async (err, authResult) => {
  if (err) {
    console.log('auth.js, setSession Error:', err.description)
    /*store.enqueNotification({
      message: err.description,
      options: {
        variant: 'error',
      },
    })*/
    return auth.authorize()
    //
    //navigate('/')
    //callback && callback()
  }

  if (authResult && authResult.accessToken && authResult.idToken) {
    store.setAuth0Token(authResult.accessToken)
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

    const claims = user['https://hasura.io/jwt/claims'] || {}
    const role = claims['x-hasura-role']
    if (role === 'manager') {
      auth.checkSession(
        {
          audience: `https://${process.env.AUTH0_DOMAIN2}/api/v2/`,
          scope: 'create:users read:users',
        },
        () => {
          auth0Manage = new auth0.Management({
            domain: process.env.AUTH0_DOMAIN2,
            token: tokens.accessToken,
          })
          store.setAuth0ManagementToken(auth0Manage.baseOptions.token)
          axios.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${tokens.accessToken}`
        },
      )
    }
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

// not in use
export const patchUserMetadata = ({ userId, userMetadata }) =>
  auth0Manage.patchUserMetadata(userId, userMetadata, () => {
    console.log('done')
  })

/**
 * This does not work
 */
export const signoff = async ({ account_id, store }) => {
  // 1. get token for management api
  let res1
  try {
    res1 = await axios.post(
      `https://${process.env.AUTH0_DOMAIN2}/oauth/token`,
      {
        grant_type: 'Authorization Code',
        client_id: process.env.AUTH0_CLIENTID,
        client_secret: process.env.AUTH0_MACHINE_ID,
        audience: `https://${process.env.AUTH0_DOMAIN2}/api/v2/`,
      },
    )
  } catch (error) {
    store.enqueNotification({
      message: `Das Konto konnte nicht gelöscht werden: ${error.message}`,
      options: {
        variant: 'error',
      },
    })
  }
  console.log('res1', res1)

  let res2
  try {
    res2 = await axios.delete(
      `https://${process.env.AUTH0_DOMAIN2}/api/v2/users/${account_id}`,
      { headers: { Authorization: `Bearer ${res1.access_token}` } },
    )
  } catch (error) {
    store.enqueNotification({
      message: `Das Konto konnte nicht gelöscht werden: ${error.message}`,
      options: {
        variant: 'error',
      },
    })
  }
  console.log('auth, signoff, res2', res2)
}

/***
 * functionality to
 * create new user:
 * - add email
 * - add personId to metadata auth0-side
 * - add auth0-id to person data vermehrung-side
 * - user gets email to set password
 */
export const signup = ({ email, personId, userRole, store, client }) => {
  auth.signup(
    {
      connection: 'Username-Password-Authentication',
      email,
      password: process.env.AUTH0_USER_INITIAL_PASSWORD,
      user_metadata: { personId, userRole },
    },
    (err, resp) => {
      if (!err) {
        store.enqueNotification({
          message: `Für ${email} wurde ein Konto erstellt`,
          options: {
            variant: 'success',
          },
        })
        store.enqueNotification({
          message: `Benutzer ${email} erhält nun ein Email, um ein Passwort zu setzen`,
          options: {
            variant: 'info',
          },
        })
        // save resp.Id to mark users with account
        client.mutate({
          mutation: gql`
            mutation update_person_for_signup(
              $id: bigint!
            ) {
              update_person(
                where: { id: { _eq: $id } }
                _set: {
                  account_id: "${resp.Id}"
                }
              ) {
                affected_rows
                returning {
                  ...PersonFields
                }
              }
            }
            ${personFragment}
          `,
          variables: {
            id: personId,
          },
        })
      } else {
        if (err.code === 'user_exists' && err.statusCode === 400) {
          return store.enqueNotification({
            message: `${email} hat schon ein Konto`,
            options: {
              variant: 'warning',
            },
          })
        }
        store.enqueNotification({
          message: `Sorry, das hat nicht funktioniert`,
          options: {
            variant: 'error',
          },
        })
      }
    },
  )
}
