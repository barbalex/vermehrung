'use strict'
// see: https://nodejs.org/de/docs/guides/nodejs-docker-webapp/

const Hapi = require('@hapi/hapi')
// see: https://firebase.google.com/docs/auth/admin/manage-users
// since firebase-admin v14 the modules are imported separately
const { initializeApp, cert } = require('firebase-admin/app')
const { getAuth } = require('firebase-admin/auth')
const crypto = require('node:crypto')
const postgres = require('postgres')

const serviceAccount = require('./config.js')

const server = new Hapi.Server({
  host: '0.0.0.0',
  port: 7000,
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

// TODO: check how to add db-url using v3
const sql = postgres(
  process.env.DATABASE_URL || process.env.HASURA_GRAPHQL_DATABASE_URL,
)

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
    Buffer.from(buf).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
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
        const persons = await sql`select p.id, u.name as user_role from person p inner join user_role u on u.id = p.user_role_id where account_id = ${decoded.uid}`
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
  await server.start()
  console.log('JSON-API-Server running at:', server.info.uri)
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

start()
