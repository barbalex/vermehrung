'use strict'
// see: https://nodejs.org/de/docs/guides/nodejs-docker-webapp/

const Hapi = require('@hapi/hapi')
// see: https://firebase.google.com/docs/auth/admin/manage-users
const admin = require('firebase-admin')
const postgres = require('postgres')

const serviceAccount = require('./config.js')

const server = new Hapi.Server({
  host: '0.0.0.0',
  port: 7000,
})

/*console.log(
  'HASURA_GRAPHQL_DATABASE_URL:',
  process.env.HASURA_GRAPHQL_DATABASE_URL,
)
console.log('serviceAccount:', serviceAccount)*/
const sql = postgres(process.env.HASURA_GRAPHQL_DATABASE_URL)

let error = null
// Initialize the Firebase admin SDK with your service account credentials
if (serviceAccount) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(JSON.parse(serviceAccount)),
    })
  } catch (e) {
    error = e
  }
}

async function start() {
  server.route({
    method: 'GET',
    path: '/{uid}',
    handler: async (req, h) => {
      console.log('you hit root with a get')
      const { uid } = req.params
      console.log('req:', req)
      console.log('uid:', uid)
      // Throw 500 if firebase is not configured
      if (!serviceAccount) {
        return h.response('Firebase not configured').code(500)
      }
      // Check for errors initializing firebase SDK
      if (error) {
        return h.response('Invalid firebase configuration').code(500)
      }

      if (!uid) {
        return h.response('no user-uid was passed').code(500)
      }

      // fetch id and user_role
      sql`select * from person where account_id = '${uid}'`
        .then(persons => {
          console.log('persons:', persons)
          if (!persons) {
            return h.response('Got no persons when querying db').code(500)
          }
          const person = persons[0]
          if (!person) {
            return h.response('Got no person when querying db').code(500)
          }
          const { id, user_role } = person
          if (!id) {
            return h.response('Got no person_id when querying db').code(500)
          }
          if (!user_role) {
            return h
              .response('Got no person-user_role when querying db')
              .code(500)
          }
          const hasuraVariables = {
            'x-hasura-default-role': user_role,
            'x-hasura-role': user_role,
            'x-hasura-allowed-roles': user_role,
            'x-hasura-user-id': id,
          }

          admin
            .auth()
            .createCustomToken(uid, hasuraVariables)
            .then(customToken =>
              // Send token back to client
              h.response(customToken),
            )
            .catch(adminError =>
              h.response('Error creating custom token:', adminError).code(500),
            )
        })
        .catch(sqlError => h.response('Error querying db:', sqlError).code(500))
    },
  })
  await server.start()
  console.log('JSON-API-Server running at:', server.info.uri)
}

process.on('unhandledRejection', err => {
  console.log(err)
  process.exit(1)
})

start()
