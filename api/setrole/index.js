const request = require('request-promise-native')

const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN
const AUTH0_CLIENTID = process.env.AUTH0_CLIENTID
const AUTH0_CLIENT_SECRET = process.env.AUTH0_CLIENT_SECRET

module.exports = async (req, res) => {
  let payload
  try {
    payload = await json(req)
  } catch (error) {
    return
  }

  const {
    id,
    event: { op, data },
    table,
    trigger,
  } = payload

  const { user_role, id: user_id, account_id } = data.new.user_role
  const roleHasChanged =
    (user_role && !data.old) || data.new.user_role !== data.old.user_role
  const shouldSetRole = roleHasChanged && !!account_id

  if (!shouldSetRole) return

  let auth0AccessTokenBody
  auth0AccessTokenBody = await request({
    method: 'POST',
    uri: 'https://vermehrung.eu.auth0.com/oauth/token',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    form: {
      grant_type: 'client_credentials',
      client_id: AUTH0_CLIENTID,
      client_secret: AUTH0_CLIENT_SECRET,
      audience: 'https://vermehrung.eu.auth0.com/api/v2/',
    },
  })

  if (!auth0AccessTokenBody) return
  const accessToken = auth0AccessTokenBody.access_token

  const headers = {
    Authorization: 'Bearer ' + accessToken,
  }
  const json = {
    roles: [`"[${user_role}]"`],
  }

  request({
    method: 'POST',
    uri: `https://${AUTH0_DOMAIN}/api/v2/users/${user_id}/roles`,
    headers: headers,
    json,
  }).then(body =>
    console.log({
      user_id,
      user_role,
      new: data.new,
      old: data.old,
      body,
    }),
  )
}
