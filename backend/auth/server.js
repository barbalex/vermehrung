'use strict'
// see: https://nodejs.org/de/docs/guides/nodejs-docker-webapp/

const Hapi = require('@hapi/hapi')
// see: https://firebase.google.com/docs/auth/admin/manage-users
// since firebase-admin v14 the modules are imported separately
const { initializeApp, cert } = require('firebase-admin/app')
const { getAuth } = require('firebase-admin/auth')
const crypto = require('node:crypto')
const { PassThrough } = require('node:stream')
const postgres = require('postgres')

const serviceAccount = require('./config.js')

const server = new Hapi.Server({
  host: '0.0.0.0',
  port: 7000,
  // compression off: the SSE /events stream is never-ending and tiny -
  // a gzip writer buffers it indefinitely, so nothing ever reaches the
  // client through proxies that send Accept-Encoding (Go/caddy always
  // does). The other responses are small json - nothing to gain.
  compression: false,
  // cors must be handled here: the browser sends a preflight OPTIONS for
  // the /token POST (Authorization header), which hapi only answers when
  // cors is configured. Caddy could only patch response headers - enough
  // for the old header-less GETs, but it cannot answer a preflight.
  // Authorization and Content-Type are in hapi's default allowed headers.
  routes: {
    cors: {
      origin: ['*'],
    },
  },
})

const sql = postgres(process.env.DATABASE_URL)

let firebaseInitializationError = null
// Initialize the Firebase admin SDK with our service account credentials
if (serviceAccount) {
  try {
    initializeApp({
      credential: cert(serviceAccount),
    })
  } catch (e) {
    firebaseInitializationError = e
  }
}

// Mint the HS256 JWT PostgREST verifies (PGRST_JWT_SECRET).
// Claims: PostgREST switches to the db role in `role` (PGRST_ROLE_CLAIM_KEY),
// row level security reads `user_id` (app.current_user_id()).
const signToken = (claims, secret, ttlSeconds) => {
  const b64url = (buf) =>
    Buffer.from(buf)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '')
  const header = b64url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const payload = b64url(
    JSON.stringify({
      ...claims,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + ttlSeconds,
    }),
  )
  const signature = crypto
    .createHmac('sha256', secret)
    .update(`${header}.${payload}`)
    .digest()
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
  return `${header}.${payload}.${signature}`
}

// Verify an api JWT minted by /token (HS256, PGRST_JWT_SECRET).
// Returns its claims if signature and expiry are valid, else null.
const verifyToken = (token, secret) => {
  const parts = (token || '').split('.')
  if (parts.length !== 3) return null
  const [header, payload, signature] = parts
  const expected = crypto
    .createHmac('sha256', secret)
    .update(`${header}.${payload}`)
    .digest()
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
  const received = Buffer.from(signature)
  const wanted = Buffer.from(expected)
  if (
    received.length === 0 ||
    received.length !== wanted.length ||
    !crypto.timingSafeEqual(received, wanted)
  ) {
    return null
  }
  let claims
  try {
    claims = JSON.parse(
      Buffer.from(
        payload.replace(/-/g, '+').replace(/_/g, '/'),
        'base64',
      ).toString('utf8'),
    )
  } catch {
    return null
  }
  if (!claims.exp || claims.exp < Math.floor(Date.now() / 1000)) return null
  return claims
}

// Verify the api JWT this service mints. Returns { claims } when valid,
// { error } with a ready hapi response when not.
const getApiTokenClaims = (req, h) => {
  const secret = process.env.PGRST_JWT_SECRET
  if (!secret) {
    return { error: h.response('PGRST_JWT_SECRET is not configured').code(500) }
  }
  const claims = verifyToken(
    (req.headers.authorization || '').replace(/^Bearer /, ''),
    secret,
  )
  if (!claims) {
    return { error: h.response('a valid api token is required').code(401) }
  }
  return { claims }
}

// Gate for the account-admin routes: only a manager with a valid api JWT
// may call them. Returns a hapi response when denied, null when allowed.
const requireManager = (req, h) => {
  const { claims, error } = getApiTokenClaims(req, h)
  if (error) return error
  if (claims.role !== 'manager') {
    return h.response('only managers may administer accounts').code(403)
  }
  return null
}

// === SSE: tell clients when data changed on the server ===
// one LISTEN connection (channel vermehrung_changed, payload = table
// name) fans out to every connected event stream. Table signals are
// debounced so a bulk import emits one event, not thousands. Signals
// carry no data: clients answer by running their /rpc/sync delta fetch,
// row visibility stays with the api's row level security.
const sseClients = new Set()
let pendingTables = new Set()
let flushTimer = null

const flushPendingTables = () => {
  flushTimer = null
  const tables = [...pendingTables]
  pendingTables = new Set()
  if (!sseClients.size || !tables.length) return
  const payload = `event: changed\ndata: ${JSON.stringify(tables)}\n\n`
  for (const client of sseClients) {
    client.write(payload)
  }
}

const startEventListener = async () => {
  try {
    await sql.listen('vermehrung_changed', (table) => {
      pendingTables.add(table)
      if (!flushTimer) {
        flushTimer = setTimeout(flushPendingTables, 250)
      }
    })
    console.log('listening on channel vermehrung_changed')
  } catch (error) {
    console.log('error listening on vermehrung_changed:', error)
  }
}

async function start() {
  server.route({
    method: '*',
    path: '/',
    handler: () => {
      return `Hello from the auth api`
    },
  })
  server.route({
    method: 'GET',
    path: '/create-user/{email}',
    handler: async (req, h) => {
      const denied = requireManager(req, h)
      if (denied) return denied
      if (!serviceAccount) {
        return h.response('Firebase not configured').code(500)
      }
      // Check for errors initializing firebase SDK
      if (firebaseInitializationError) {
        console.log('firebaseInitializationError:', firebaseInitializationError)
        return h
          .response(
            `firebase initalization error: ${firebaseInitializationError.message}`,
          )
          .code(500)
      }
      const { email } = req.params
      if (!email) {
        return h.response('no email was passed').code(500)
      }

      let user
      try {
        user = await getAuth().createUser({
          email,
          password: 'initial-passwort-bitte-aendern',
        })
      } catch (error) {
        console.log(
          `firebase error while creating user for email ${email}:`,
          error,
        )
        const code = error.errorInfo.code
        if (code === 'auth/email-already-exists') {
          // Somehow the uid did not arrive in vermehrung.ch. Re-query this users uid
          const existingUser = await getAuth().getUserByEmail(email)
          console.log(`returning uid of the existing user:`, existingUser.uid)
          return h.response(existingUser.uid).code(200)
        }
        return h
          .response(`firebase createUser error: ${error.message}`)
          .code(500)
      }
      return h.response(user.uid).code(200)
    },
  })

  server.route({
    method: 'GET',
    path: '/delete-user/{uid}',
    handler: async (req, h) => {
      const denied = requireManager(req, h)
      if (denied) return denied
      if (!serviceAccount) {
        return h.response('Firebase not configured').code(500)
      }
      // Check for errors initializing firebase SDK
      if (firebaseInitializationError) {
        console.log('firebaseInitializationError:', firebaseInitializationError)
        return h
          .response(
            `firebase initalization error: ${firebaseInitializationError.message}`,
          )
          .code(500)
      }

      const { uid } = req.params
      if (!uid) {
        return h.response('no uid was passed').code(500)
      }

      try {
        await getAuth().deleteUser(uid)
      } catch (error) {
        return h
          .response(`firebase deleteUser error: ${error.message}`)
          .code(500)
      }
      return h.response().code(200)
    },
  })

  // SSE stream: emits a 'changed' event (data: json array of table
  // names) whenever postgres notifies a write. Gated by any valid api
  // JWT - the signal itself carries no data.
  server.route({
    method: 'GET',
    path: '/events',
    handler: (req, h) => {
      const { error } = getApiTokenClaims(req, h)
      if (error) return error
      const stream = new PassThrough()
      stream.write(': connected\n\n')
      sseClients.add(stream)
      // proxies kill idle connections: heartbeat keeps the stream open
      const heartbeat = setInterval(() => {
        stream.write(': heartbeat\n\n')
      }, 25000)
      const cleanup = () => {
        clearInterval(heartbeat)
        sseClients.delete(stream)
        stream.end()
      }
      req.events.once('disconnect', cleanup)
      stream.once('close', cleanup)
      return h
        .response(stream)
        .type('text/event-stream')
        .header('cache-control', 'no-cache')
        .header('connection', 'keep-alive')
        .header('x-accel-buffering', 'no')
    },
  })

  // exchanges a Firebase ID token for the JWT the api (PostgREST) accepts
  server.route({
    method: 'POST',
    path: '/token',
    handler: async (req, h) => {
      if (!serviceAccount) {
        return h.response('Firebase not configured').code(500)
      }
      if (firebaseInitializationError) {
        console.log('firebaseInitializationError:', firebaseInitializationError)
        return h
          .response(
            `firebase initalization error: ${firebaseInitializationError.message}`,
          )
          .code(500)
      }
      const secret = process.env.PGRST_JWT_SECRET
      if (!secret) {
        return h.response('PGRST_JWT_SECRET is not configured').code(500)
      }
      const idToken = (req.headers.authorization || '').replace(/^Bearer /, '')
      if (!idToken) {
        return h.response('no bearer token was passed').code(401)
      }

      let decoded
      try {
        decoded = await getAuth().verifyIdToken(idToken)
      } catch (error) {
        return h.response(`invalid firebase token: ${error.message}`).code(401)
      }

      let person
      try {
        const persons =
          await sql`select p.id, u.name as user_role from person p inner join user_role u on u.id = p.user_role_id where account_id = ${decoded.uid}`
        person = persons[0]
      } catch (sqlError) {
        console.log('Error querying db:', sqlError)
        return h.response(`Error querying db: ${sqlError.message}`).code(500)
      }
      if (!person) {
        return h
          .response(
            'Für diesen Account existiert keine Person. Ohne Person ist eine Anmeldung nicht möglich.',
          )
          .code(412)
      }
      if (!person.user_role) {
        return h
          .response(
            'Diese Person hat keine Rolle. Ohne Rolle ist eine Anmeldung nicht möglich.',
          )
          .code(412)
      }

      const token = signToken(
        {
          role: person.user_role,
          user_id: person.id,
          sub: decoded.uid,
          email: decoded.email ?? null,
        },
        secret,
        60 * 60 * 12,
      )
      return h.response({ token }).code(200)
    },
  })
  startEventListener()
  await server.start()
  console.log('JSON-API-Server running at:', server.info.uri)
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

start()
